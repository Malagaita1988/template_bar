const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
        minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es requerido'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Por favor, ingrese un correo electrónico válido']
    },
    phone: {
        type: String,
        required: [true, 'El número de teléfono es requerido'],
        match: [/^[0-9\s\-\+\(\)]{6,15}$/, 'Por favor, ingrese un número de teléfono válido']
    },
    date: {
        type: Date,
        required: [true, 'La fecha es requerida'],
        validate: {
            validator: function(value) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return value >= today;
            },
            message: 'La fecha no puede ser en el pasado'
        }
    },
    time: {
        type: String,
        required: [true, 'La hora es requerida']
    },
    guests: {
        type: Number,
        required: [true, 'El número de personas es requerido'],
        min: [1, 'Debe haber al menos 1 persona'],
        max: [20, 'Para grupos mayores de 20 personas, por favor contáctenos por teléfono']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);