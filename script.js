// Wait for DOM to fully load before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    /**
     * 1. EVENT HANDLING FEATURES
     */

    // Button click - Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const headerText = document.getElementById('header-text');

    themeToggleBtn.addEventListener('click', function() {
        // Toggle dark mode class on body
        body.classList.toggle('dark-mode');
        
        // Change button text based on current mode
        if (body.classList.contains('dark-mode')) {
            themeToggleBtn.textContent = 'Toggle Light Mode';
            headerText.textContent = 'Dark Mode Activated!';
        } else {
            themeToggleBtn.textContent = 'Toggle Dark Mode';
            headerText.textContent = 'Welcome to my JavaScript Playground';
        }
    });

    // Hover effects
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        // On mouse enter (hover start)
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s';
        });
        
        // On mouse leave (hover end)
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Keypress detection
    const keyInfo = document.getElementById('key-info');
    document.addEventListener('keydown', function(event) {
        keyInfo.innerHTML = `
            Key: <strong>${event.key}</strong> | 
            Code: <strong>${event.code}</strong> | 
            KeyCode: <strong>${event.keyCode}</strong>
        `;
        keyInfo.style.color = getRandomColor();
    });

    // Bonus: Secret action for double-click
    const secretModal = document.getElementById('secret-modal');
    const closeModal = document.querySelector('.close-modal');
    
    document.addEventListener('dblclick', function() {
        secretModal.classList.add('show');
    });
    
    closeModal.addEventListener('click', function() {
        secretModal.classList.remove('show');
    });

    // Bonus: Long press detection (press and hold for 1 second)
    let pressTimer;
    document.addEventListener('mousedown', function() {
        pressTimer = window.setTimeout(function() {
            // Change page background to a random color
            body.style.backgroundColor = getRandomColor();
            alert('🎉 You discovered the long-press secret! Background color changed!');
        }, 1000); // Wait for 1 second
    });

    document.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });

    /**
     * 2. INTERACTIVE ELEMENTS
     */

    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Image Gallery/Slideshow
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const galleryImages = document.querySelectorAll('.gallery-img');
    const indicators = document.querySelectorAll('.indicator');
    let currentImageIndex = 0;

    // Function to show image at specific index
    function showImage(index) {
        // Remove active class from all images
        galleryImages.forEach(img => img.classList.remove('active'));
        indicators.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current image and indicator
        galleryImages[index].classList.add('active');
        indicators[index].classList.add('active');
        currentImageIndex = index;
    }

    // Prev button click
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex === 0) ? galleryImages.length - 1 : currentImageIndex - 1;
        showImage(currentImageIndex);
    });

    // Next button click
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex === galleryImages.length - 1) ? 0 : currentImageIndex + 1;
        showImage(currentImageIndex);
    });

    // Click on indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showImage(index);
        });
    });

    // Auto-advance slideshow every 5 seconds
    setInterval(function() {
        currentImageIndex = (currentImageIndex === galleryImages.length - 1) ? 0 : currentImageIndex + 1;
        showImage(currentImageIndex);
    }, 5000);

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Get the content panel associated with this header
            const content = this.nextElementSibling;
            
            // Toggle the active class on the content
            content.classList.toggle('active');
            
            // Change header background based on active state
            if (content.classList.contains('active')) {
                this.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
                this.style.color = '#fff';
            } else {
                this.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--light-gray');
                this.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
            }
        });
    });

    /**
     * 3. FORM VALIDATION
     */
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageInput = document.getElementById('message');

    // Function to validate email format using regex
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to validate password (min 8 characters, at least one number, one uppercase)
    function isValidPassword(password) {
        return password.length >= 8 && 
               /[A-Z]/.test(password) && 
               /[0-9]/.test(password);
    }

    // Function to show validation message
    function showValidation(input, message, isValid) {
        const validationMessage = input.nextElementSibling;
        validationMessage.textContent = message;
        
        if (isValid) {
            input.classList.add('valid');
            input.classList.remove('invalid');
        } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
        }
    }

    // Real-time validation for all fields
    nameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            showValidation(this, 'Name is required', false);
        } else if (this.value.trim().length < 2) {
            showValidation(this, 'Name must be at least 2 characters', false);
        } else {
            showValidation(this, '✓ Looks good!', true);
        }
    });

    emailInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            showValidation(this, 'Email is required', false);
        } else if (!isValidEmail(this.value)) {
            showValidation(this, 'Please enter a valid email address', false);
        } else {
            showValidation(this, '✓ Valid email format', true);
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value === '') {
            showValidation(this, 'Password is required', false);
        } else if (this.value.length < 8) {
            showValidation(this, 'Password must be at least 8 characters', false);
        } else if (!/[A-Z]/.test(this.value)) {
            showValidation(this, 'Password must include at least one uppercase letter', false);
        } else if (!/[0-9]/.test(this.value)) {
            showValidation(this, 'Password must include at least one number', false);
        } else {
            showValidation(this, '✓ Strong password', true);
        }
    });

    messageInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            showValidation(this, 'Message is required', false);
        } else if (this.value.trim().length < 10) {
            showValidation(this, 'Message must be at least 10 characters', false);
        } else {
            showValidation(this, '✓ Looks good!', true);
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields before submission
        let isFormValid = true;
        
        // Check name
        if (nameInput.value.trim() === '' || nameInput.value.trim().length < 2) {
            showValidation(nameInput, 'Name is required (min 2 characters)', false);
            isFormValid = false;
        }
        
        // Check email
        if (!isValidEmail(emailInput.value)) {
            showValidation(emailInput, 'Please enter a valid email address', false);
            isFormValid = false;
        }
        
        // Check password
        if (!isValidPassword(passwordInput.value)) {
            showValidation(passwordInput, 'Password must be at least 8 characters with one uppercase letter and one number', false);
            isFormValid = false;
        }
        
        // Check message
        if (messageInput.value.trim() === '' || messageInput.value.trim().length < 10) {
            showValidation(messageInput, 'Please enter a message (min 10 characters)', false);
            isFormValid = false;
        }
        
        if (isFormValid) {
            alert('Form submitted successfully! In a real application, this would be sent to a server.');
            this.reset();
            // Reset validation styles
            document.querySelectorAll('input, textarea').forEach(input => {
                input.classList.remove('valid', 'invalid');
                input.nextElementSibling.textContent = '';
            });
        }
    });

    /**
     * HELPER FUNCTIONS
     */
    
    // Function to generate random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});