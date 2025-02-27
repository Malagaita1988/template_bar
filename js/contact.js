document.addEventListener('DOMContentLoaded', () => {
    // Get the reservation form element
    const reservationForm = document.getElementById('reservation-form');
    
    // Add validation feedback elements to all form inputs
    function setupFormValidation() {
        const formInputs = reservationForm.querySelectorAll('.form__input, .form__textarea');
        
        formInputs.forEach(input => {
            // Create validation icon element
            const validationIcon = document.createElement('span');
            validationIcon.className = 'validation-icon';
            validationIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            validationIcon.style.position = 'absolute';
            validationIcon.style.right = '10px';
            validationIcon.style.top = '50%';
            validationIcon.style.transform = 'translateY(-50%)';
            validationIcon.style.color = '#4CAF50';
            validationIcon.style.display = 'none';
            
            // Create validation message element
            const validationMessage = document.createElement('span');
            validationMessage.className = 'validation-message';
            validationMessage.style.fontSize = '12px';
            validationMessage.style.marginTop = '5px';
            validationMessage.style.display = 'none';
            
            // Position the parent relatively for absolute positioning of the icon
            input.parentElement.style.position = 'relative';
            
            // Add validation elements to DOM
            input.parentElement.appendChild(validationIcon);
            input.parentElement.appendChild(validationMessage);
            
            // Add input event listeners for real-time validation
            input.addEventListener('input', () => validateInput(input));
            input.addEventListener('blur', () => validateInput(input));
        });
    }
    
    // Validate individual input field
    function validateInput(input) {
        const validationIcon = input.parentElement.querySelector('.validation-icon');
        const validationMessage = input.parentElement.querySelector('.validation-message');
        let isValid = true;
        let message = '';
        
        // Reset validation state
        validationIcon.style.display = 'none';
        validationMessage.style.display = 'none';
        input.classList.remove('input--valid', 'input--invalid');
        
        // Skip validation if field is empty and not required
        if (!input.value && !input.hasAttribute('required')) {
            return;
        }
        
        // Validate based on input type
        switch(input.id) {
            case 'name':
                if (!input.value.trim()) {
                    isValid = false;
                    message = 'El nombre es requerido';
                } else if (input.value.trim().length < 3) {
                    isValid = false;
                    message = 'El nombre debe tener al menos 3 caracteres';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    message = 'Por favor, ingrese un correo electrónico válido';
                }
                break;
                
            case 'phone':
                const phoneRegex = /^[0-9\s\-\+\(\)]{6,15}$/;
                if (!phoneRegex.test(input.value)) {
                    isValid = false;
                    message = 'Por favor, ingrese un número de teléfono válido';
                }
                break;
                
            case 'date':
                const selectedDate = new Date(input.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (!input.value) {
                    isValid = false;
                    message = 'La fecha es requerida';
                } else if (selectedDate < today) {
                    isValid = false;
                    message = 'La fecha no puede ser en el pasado';
                }
                break;
                
            case 'time':
                if (!input.value) {
                    isValid = false;
                    message = 'La hora es requerida';
                }
                break;
                
            case 'guests':
                const guestsNum = parseInt(input.value);
                if (isNaN(guestsNum) || guestsNum < 1) {
                    isValid = false;
                    message = 'Debe haber al menos 1 persona';
                } else if (guestsNum > 20) {
                    isValid = false;
                    message = 'Para grupos mayores de 20 personas, por favor contáctenos por teléfono';
                }
                break;
        }
        
        // Update UI based on validation result
        if (isValid) {
            input.classList.add('input--valid');
            validationIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            validationIcon.style.color = '#4CAF50';
            validationIcon.style.display = 'block';
        } else {
            input.classList.add('input--invalid');
            validationIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            validationIcon.style.color = '#F44336';
            validationIcon.style.display = 'block';
            validationMessage.textContent = message;
            validationMessage.style.color = '#F44336';
            validationMessage.style.display = 'block';
        }
        
        return isValid;
    }
    
    // Validate all form fields
    function validateForm() {
        const formInputs = reservationForm.querySelectorAll('.form__input[required], .form__textarea[required]');
        let isFormValid = true;
        
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    if (reservationForm) {
        // Setup form validation
        setupFormValidation();
        
        // Add submit event listener to the form
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields before submission
            if (!validateForm()) {
                showNotification('Por favor, corrija los errores en el formulario antes de enviar.', 'error');
                return;
            }
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            
            // Simulate form submission (in a real application, this would be an API call)
            showNotification('Procesando su reserva...', 'info');
            
            // Simulate server response delay
            setTimeout(() => {
                // In a real application, you would send the data to a server here
                console.log('Form submitted with data:', {
                    name,
                    email,
                    phone,
                    date,
                    time,
                    guests,
                    message
                });
                
                // Show success message
                showConfirmation();
                
                // Reset form and validation states
                reservationForm.reset();
                resetValidationStates();
            }, 1500);
        });
    }
    
    // Reset all validation states
    function resetValidationStates() {
        const formInputs = reservationForm.querySelectorAll('.form__input, .form__textarea');
        formInputs.forEach(input => {
            input.classList.remove('input--valid', 'input--invalid');
            const validationIcon = input.parentElement.querySelector('.validation-icon');
            const validationMessage = input.parentElement.querySelector('.validation-message');
            if (validationIcon) validationIcon.style.display = 'none';
            if (validationMessage) validationMessage.style.display = 'none';
        });
    }
    
    // Show confirmation message after successful submission
    function showConfirmation() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'confirmation-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1001';
        overlay.style.animation = 'fadeIn 0.3s ease';
        
        // Create confirmation box
        const confirmationBox = document.createElement('div');
        confirmationBox.className = 'confirmation-box';
        confirmationBox.style.backgroundColor = 'white';
        confirmationBox.style.borderRadius = '8px';
        confirmationBox.style.padding = '30px';
        confirmationBox.style.maxWidth = '500px';
        confirmationBox.style.width = '90%';
        confirmationBox.style.textAlign = 'center';
        confirmationBox.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        confirmationBox.style.animation = 'scaleIn 0.3s ease';
        
        // Add content to confirmation box
        confirmationBox.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 60px; color: #4CAF50; margin-bottom: 20px;"></i>
            <h3 style="margin-bottom: 15px; color: #333;">¡Reserva Confirmada!</h3>
            <p style="margin-bottom: 25px; color: #666;">Su reserva ha sido enviada con éxito. Nos pondremos en contacto con usted pronto para confirmar los detalles.</p>
            <button class="btn btn--primary" id="confirmation-close">Aceptar</button>
        `;
        
        // Add to DOM
        overlay.appendChild(confirmationBox);
        document.body.appendChild(overlay);
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes scaleIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Add close functionality
        const closeBtn = document.getElementById('confirmation-close');
        closeBtn.addEventListener('click', () => {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        });
    }
    
    // Function to show notifications
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <p>${message}</p>
            </div>
            <button class="notification__close">&times;</button>
        `;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        notification.style.zIndex = '1000';
        notification.style.minWidth = '300px';
        notification.style.maxWidth = '400px';
        notification.style.display = 'flex';
        notification.style.justifyContent = 'space-between';
        notification.style.alignItems = 'center';
        notification.style.animation = 'slideIn 0.3s ease';
        
        // Set color based on notification type
        if (type === 'success') {
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#F44336';
            notification.style.color = 'white';
        } else {
            notification.style.backgroundColor = '#2196F3';
            notification.style.color = 'white';
        }
        
        // Style close button
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'inherit';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.marginLeft = '10px';
        
        // Add close functionality
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds if it's a success message
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => {
                        if (document.body.contains(notification)) {
                            document.body.removeChild(notification);
                        }
                    }, 300);
                }
            }, 5000);
        }
    }
});