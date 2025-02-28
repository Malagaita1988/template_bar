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
        
        // Handle form submission
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate all fields before submission
            const formInputs = reservationForm.querySelectorAll('.form__input, .form__textarea');
            let isFormValid = true;
            
            formInputs.forEach(input => {
                validateInput(input);
                if (input.classList.contains('input--invalid')) {
                    isFormValid = false;
                }
            });
            
            if (isFormValid) {
                // Simulate form submission
                const submitButton = reservationForm.querySelector('.form__submit');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
                
                // Create a feedback message container if it doesn't exist
                let feedbackMessage = document.querySelector('.form-feedback');
                if (!feedbackMessage) {
                    feedbackMessage = document.createElement('div');
                    feedbackMessage.className = 'form-feedback';
                    feedbackMessage.style.padding = '15px';
                    feedbackMessage.style.marginTop = '20px';
                    feedbackMessage.style.borderRadius = '5px';
                    feedbackMessage.style.textAlign = 'center';
                    feedbackMessage.style.fontWeight = 'bold';
                    feedbackMessage.style.transition = 'all 0.3s ease';
                    reservationForm.appendChild(feedbackMessage);
                }
                
                // Prepare form data for submission
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    date: document.getElementById('date').value,
                    time: document.getElementById('time').value,
                    guests: parseInt(document.getElementById('guests').value),
                    message: document.getElementById('message') ? document.getElementById('message').value : ''
                };
                
                // Send data to the server
                fetch('http://localhost:3000/api/reservations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Reset form
                    reservationForm.reset();
                    
                    // Reset validation UI
                    formInputs.forEach(input => {
                        input.classList.remove('input--valid', 'input--invalid');
                        const validationIcon = input.parentElement.querySelector('.validation-icon');
                        const validationMessage = input.parentElement.querySelector('.validation-message');
                        validationIcon.style.display = 'none';
                        validationMessage.style.display = 'none';
                    });
                    
                    // Re-enable submit button
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    
                    if (data.success) {
                        // Show success message with visual feedback
                        feedbackMessage.style.backgroundColor = '#4CAF50';
                        feedbackMessage.style.color = 'white';
                        feedbackMessage.textContent = data.message || '¡Reserva enviada con éxito! Nos pondremos en contacto contigo pronto.';
                        
                        // Scroll to feedback message
                        feedbackMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // Show the confirmation overlay
                        showConfirmation();
                        
                        // Hide the message after 5 seconds
                        setTimeout(() => {
                            feedbackMessage.style.opacity = '0';
                            setTimeout(() => {
                                feedbackMessage.style.display = 'none';
                                feedbackMessage.style.opacity = '1';
                            }, 300);
                        }, 5000);
                    } else {
                        // Show error message
                        feedbackMessage.style.backgroundColor = '#f44336';
                        feedbackMessage.style.color = 'white';
                        feedbackMessage.style.display = 'block';
                        feedbackMessage.textContent = data.message || 'Ha ocurrido un error al procesar su reserva. Por favor, inténtelo de nuevo más tarde.';
                        
                        // If there are field-specific errors, highlight them
                        if (data.errors && Array.isArray(data.errors)) {
                            data.errors.forEach(err => {
                                const input = document.getElementById(err.field);
                                if (input) {
                                    input.classList.add('input--invalid');
                                    const validationMessage = input.parentElement.querySelector('.validation-message');
                                    if (validationMessage) {
                                        validationMessage.textContent = err.message;
                                        validationMessage.style.color = '#F44336';
                                        validationMessage.style.display = 'block';
                                    }
                                }
                            });
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    
                    // Re-enable submit button
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    
                    // Show error message
                    feedbackMessage.style.backgroundColor = '#f44336';
                    feedbackMessage.style.color = 'white';
                    feedbackMessage.style.display = 'block';
                    feedbackMessage.textContent = 'Error de conexión. Por favor, inténtelo de nuevo más tarde.';
                });
            } else {
                // Show error message for invalid form
                let feedbackMessage = document.querySelector('.form-feedback');
                if (!feedbackMessage) {
                    feedbackMessage = document.createElement('div');
                    feedbackMessage.className = 'form-feedback';
                    feedbackMessage.style.padding = '15px';
                    feedbackMessage.style.marginTop = '20px';
                    feedbackMessage.style.borderRadius = '5px';
                    feedbackMessage.style.textAlign = 'center';
                    feedbackMessage.style.fontWeight = 'bold';
                    feedbackMessage.style.transition = 'all 0.3s ease';
                    reservationForm.appendChild(feedbackMessage);
                }
                
                feedbackMessage.style.backgroundColor = '#f44336';
                feedbackMessage.style.color = 'white';
                feedbackMessage.style.display = 'block';
                feedbackMessage.textContent = 'Por favor, corrige los errores en el formulario antes de enviar.';
                
                // Scroll to the first invalid input
                const firstInvalidInput = reservationForm.querySelector('.input--invalid');
                if (firstInvalidInput) {
                    firstInvalidInput.focus();
                    firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
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