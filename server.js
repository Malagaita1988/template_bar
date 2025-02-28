require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Reservation = require('./models/reservation');
const Admin = require('./models/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Configure nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send email notification
async function sendReservationEmail(reservation) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `Nueva Reserva - ${reservation.name}`,
            html: `
                <h1>Nueva Reserva Recibida</h1>
                <p><strong>Nombre:</strong> ${reservation.name}</p>
                <p><strong>Email:</strong> ${reservation.email}</p>
                <p><strong>Teléfono:</strong> ${reservation.phone}</p>
                <p><strong>Fecha:</strong> ${new Date(reservation.date).toLocaleDateString()}</p>
                <p><strong>Hora:</strong> ${reservation.time}</p>
                <p><strong>Número de personas:</strong> ${reservation.guests}</p>
                <p><strong>Comentarios:</strong> ${reservation.comments || 'Ninguno'}</p>
                <p><strong>Estado:</strong> ${reservation.status}</p>
                <p><strong>Fecha de creación:</strong> ${new Date(reservation.createdAt).toLocaleString()}</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. Token no proporcionado.'
        });
    }
    
    jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key', (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Token inválido o expirado.'
            });
        }
        
        req.user = user;
        next();
    });
};

// Validation rules for reservation data
const reservationValidationRules = [
    body('name').trim().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('email').isEmail().withMessage('Por favor, ingrese un correo electrónico válido'),
    body('phone').matches(/^[0-9\s\-\+\(\)]{6,15}$/).withMessage('Por favor, ingrese un número de teléfono válido'),
    body('date').custom(value => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            throw new Error('La fecha no puede ser en el pasado');
        }
        return true;
    }),
    body('time').notEmpty().withMessage('La hora es requerida'),
    body('guests').isInt({ min: 1, max: 20 }).withMessage('El número de personas debe estar entre 1 y 20')
];

// POST endpoint for reservations
app.post('/api/reservations', reservationValidationRules, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }

        // Create new reservation
        const reservation = new Reservation(req.body);
        await reservation.save();

        // Send email notification
        await sendReservationEmail(reservation);

        // Send success response
        res.status(201).json({
            success: true,
            message: '¡Reserva enviada con éxito! Nos pondremos en contacto contigo pronto.',
            data: {
                reservation: reservation
            }
        });

    } catch (error) {
        console.error('Reservation error:', error);
        
        // Check if it's a validation error from Mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                errors: Object.values(error.errors).map(err => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }

        res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error al procesar su reserva. Por favor, inténtelo de nuevo más tarde.'
        });
    }
});

// Admin login route
app.post('/api/admin/login', [
    body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida')
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }

        const { username, password } = req.body;

        // Find admin by username
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Check password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Update last login
        admin.lastLogin = Date.now();
        await admin.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Inicio de sesión exitoso',
            data: {
                token,
                admin: {
                    id: admin._id,
                    username: admin.username,
                    email: admin.email,
                    role: admin.role
                }
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
});

// Admin registration route (protected, only super_admin can create new admins)
app.post('/api/admin/register', authenticateToken, async (req, res) => {
    try {
        // Check if user is super_admin
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({
                success: false,
                message: 'No tiene permisos para realizar esta acción'
            });
        }

        const { username, password, email, role } = req.body;

        // Check if username or email already exists
        const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: 'El nombre de usuario o correo electrónico ya está en uso'
            });
        }

        // Create new admin
        const admin = new Admin({
            username,
            password,
            email,
            role: role || 'admin'
        });

        await admin.save();

        res.status(201).json({
            success: true,
            message: 'Administrador creado con éxito',
            data: {
                admin: {
                    id: admin._id,
                    username: admin.username,
                    email: admin.email,
                    role: admin.role
                }
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                errors: Object.values(error.errors).map(err => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
});

// Create initial super admin if none exists
async function createInitialAdmin() {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const defaultAdmin = new Admin({
                username: 'admin',
                password: 'admin123',
                email: 'admin@labuenamesarestaurant.com',
                role: 'super_admin'
            });
            await defaultAdmin.save();
            console.log('Initial admin created successfully');
        }
    } catch (error) {
        console.error('Error creating initial admin:', error);
    }
}

// Call the function to create initial admin
createInitialAdmin();

// GET endpoint for retrieving all reservations (for admin purposes)
app.get('/api/reservations', authenticateToken, async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: {
                reservations: reservations
            }
        });
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las reservas'
        });
    }
});

// PATCH endpoint for updating reservation status
app.patch('/api/reservations/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // Validate status
        if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Estado no válido'
            });
        }
        
        // Find and update reservation
        const reservation = await Reservation.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );
        
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reserva no encontrada'
            });
        }
        
        res.json({
            success: true,
            message: 'Estado de la reserva actualizado con éxito',
            data: {
                reservation
            }
        });
        
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la reserva'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});