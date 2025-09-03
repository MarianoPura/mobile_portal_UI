// Gym Member Profile JavaScript
class GymProfile {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeAnimations();
    }

    bindEvents() {
        // Appointment modal events
        const appointmentBtn = document.getElementById('appointment-btn');
        const appointmentModal = document.getElementById('appointment-modal');
        const closeAppointment = document.getElementById('close-appointment');
        const cancelAppointment = document.getElementById('cancel-appointment');

        appointmentBtn.addEventListener('click', () => {
            this.openModal(appointmentModal);
        });

        closeAppointment.addEventListener('click', () => {
            this.closeModal(appointmentModal);
        });

        cancelAppointment.addEventListener('click', () => {
            this.closeModal(appointmentModal);
        });

        // Referral modal events
        const referBtn = document.getElementById('refer-btn');
        const referralModal = document.getElementById('referral-modal');
        const closeReferral = document.getElementById('close-referral');
        const cancelReferral = document.getElementById('cancel-referral');

        referBtn.addEventListener('click', () => {
            this.openModal(referralModal);
        });

        closeReferral.addEventListener('click', () => {
            this.closeModal(referralModal);
        });

        cancelReferral.addEventListener('click', () => {
            this.closeModal(referralModal);
        });

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal(e.target);
            }
        });

        // Form submissions
        this.bindFormSubmissions();

        // Add ripple effects to buttons
        this.addRippleEffects();
    }

    openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first input in modal
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    bindFormSubmissions() {
        // Appointment form
        const appointmentForm = document.querySelector('#appointment-modal form');
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAppointmentSubmission();
        });

        // Referral form
        const referralForm = document.querySelector('#referral-modal form');
        referralForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleReferralSubmission();
        });
    }

    handleAppointmentSubmission() {
        // Simulate appointment booking
        this.showNotification('Appointment booked successfully!', 'success');
        this.closeModal(document.getElementById('appointment-modal'));
        
        // Reset form
        document.querySelector('#appointment-modal form').reset();
    }

    handleReferralSubmission() {
        // Simulate referral submission
        this.showNotification('Referral invitation sent!', 'success');
        this.closeModal(document.getElementById('referral-modal'));
        
        // Reset form
        document.querySelector('#referral-modal form').reset();
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600';
        const icon = type === 'success' ? 'check-circle' : 'alert-circle';
        
        notification.className = `
            fixed top-4 right-4 bg-gradient-to-r ${bgColor} 
            text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-full 
            transition-transform duration-300 z-50 max-w-sm
        `;
        
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <i data-lucide="${icon}" class="w-5 h-5"></i>
                <span class="font-semibold">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Initialize the icon
        lucide.createIcons();
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    addRippleEffects() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (this.contains(ripple)) {
                        ripple.remove();
                    }
                }, 600);
            });
        });
    }

    initializeAnimations() {
        // Animate stats on page load
        this.animateStats();
        
        // Add intersection observer for scroll animations
        this.setupScrollAnimations();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.text-2xl.font-bold.text-yellow-400');
        statNumbers.forEach((stat, index) => {
            const finalValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = finalValue / 30;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue);
                }
            }, 50 + (index * 20));
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe cards for scroll animations
        const cards = document.querySelectorAll('.bg-gradient-to-b');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const fullscreenFlag = localStorage.getItem("enterFullscreen");
    const btn = document.getElementById('enterFullscreenBtn');

    // if (fullscreenFlag === "true") {
    //     btn.classList.remove("hidden"); // show the button

    //     btn.addEventListener('click', () => {
    //         document.documentElement.requestFullscreen()
    //             .then(() => {
    //                 console.log("Entered fullscreen mode.");
    //                 btn.classList.add("hidden"); // hide the button
    //             })
    //             .catch((err) => {
    //                 console.warn("Fullscreen request failed:", err);
    //             });
    //     });

    //       // Listen for fullscreen exit
    //     document.addEventListener('fullscreenchange', () => {
    //         console.log
    //         const isFullscreen = document.fullscreenElement !== null;
    //         if (!isFullscreen) {
    //             console.log("Exited fullscreen mode.");
    //             btn.classList.remove("hidden"); // show the button again
    //         }
    //     });
    // }

    new GymProfile();
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);