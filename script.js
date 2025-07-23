// Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Move gradient balls on scroll
            const scrolled = window.pageYOffset;
            const balls = document.querySelectorAll('.gradient-ball');
            
            balls.forEach((ball, index) => {
                const speed = (index + 1) * 0.05;
                const yPos = scrolled * speed;
                const xPos = Math.sin(scrolled * 0.001 + index) * 20;
                ball.style.transform = `translateY(${yPos}px) translateX(${xPos}px)`;
            });

            // Move shapes on scroll
            const shapes = document.querySelectorAll('.moving-shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.02;
                const yPos = scrolled * speed;
                const rotation = scrolled * (speed * 0.5);
                shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
            });
        });

        // Countdown Timer
        function updateCountdown() {
            const eventDate = new Date('August 10, 2025 10:00:00').getTime();
            const now = new Date().getTime();
            const distance = eventDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
            }
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Counter Animation
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number[data-target]');
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }

        // Scroll Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Shuffle Animation for Stats
function initializeShuffleAnimation() {
    const statCards = document.querySelectorAll('.stat-card.shuffle-initial');
    
    statCards.forEach(card => {
        const shuffleX = card.getAttribute('data-shuffle-x') || '0';
        const shuffleY = card.getAttribute('data-shuffle-y') || '0';
        const shuffleRotate = card.getAttribute('data-shuffle-rotate') || '0';
        
        card.style.setProperty('--shuffle-x', shuffleX + 'px');
        card.style.setProperty('--shuffle-y', shuffleY + 'px');
        card.style.setProperty('--shuffle-rotate', shuffleRotate + 'deg');
    });
}

function organizeStats() {
    const statCards = document.querySelectorAll('.stat-card.shuffle-initial');
    const shuffleIndicator = document.querySelector('.stats-shuffle-indicator');
    
    // Hide shuffle indicator
    if (shuffleIndicator) {
        shuffleIndicator.style.opacity = '0';
        shuffleIndicator.style.transform = 'translateY(-20px)';
    }
    
    // Organize cards with staggered animation
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.remove('shuffle-initial');
            card.classList.add('shuffle-organized');
        }, index * 150);
    });
    
    // Start counter animation after cards are organized
    setTimeout(() => {
        animateCounters();
    }, 1000);
}

// Initialize shuffle animation on page load
window.addEventListener('load', function() {
    initializeShuffleAnimation();
});

const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Trigger shuffle animation for stats
                    if (entry.target.querySelector('.stat-card.shuffle-initial')) {
                        setTimeout(() => {
                            organizeStats();
                        }, 500);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Enhanced Modal Functions
        let autoModalShown = false; // Only blocks auto-open, not manual clicks

        function showModal() {
            const modal = document.getElementById('leadModal');
            const body = document.body;

            body.classList.add('modal-open');
            modal.classList.add('active');

            document.getElementById('leadForm').style.display = 'block';
            document.getElementById('successMessage').classList.remove('active');
            document.getElementById('leadForm').reset();
        }

        // Auto-show modal only ONCE after 10 seconds
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (!autoModalShown) {
                    showModal();
                    autoModalShown = true; // Prevent auto-trigger again
                }
            }, 10000);
        });


        function hideModal() {
            const modal = document.getElementById('leadModal');
            const body = document.body;
            
            // Remove modal-open class to restore scrolling
            body.classList.remove('modal-open');
            
            // Hide modal
            modal.classList.remove('active');
        }

        // Enhanced close modal when clicking outside
        document.getElementById('leadModal').addEventListener('click', function(e) {
            if (e.target === this) {
                hideModal();
            }
        });

        // Enhanced close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('leadModal').classList.contains('active')) {
                hideModal();
            }
        });

        // Enhanced Form Submission
        function submitLead(event) {
            event.preventDefault();
            
            const submitBtn = event.target.querySelector('.btn-submit');
            const formData = new FormData(event.target);
            
            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<span style="opacity: 0;">Reserve My Seat Now</span>';
            
            // Simulate API call
            setTimeout(() => {
                // Remove loading state
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = '<i class="fas fa-rocket me-2"></i>Reserve My Seat Now';
                
                // Show success message
                document.getElementById('leadForm').style.display = 'none';
                document.getElementById('successMessage').classList.add('active');
                
                // Log form data (replace with actual API call)
                console.log('Form submitted with data:', Object.fromEntries(formData));
                
                // Auto-close modal after 5 seconds
                setTimeout(() => {
                    hideModal();
                }, 5000);
                
            }, 2000); // Simulate 2 second loading
        }

        // Form Validation Enhancement
        document.querySelectorAll('.form-input, .form-select').forEach(input => {
            input.addEventListener('blur', function() {
                if (this.checkValidity()) {
                    this.style.borderColor = '#10b981';
                } else {
                    this.style.borderColor = '#ef4444';
                }
            });
            
            input.addEventListener('input', function() {
                this.style.borderColor = '#e2e8f0';
            });
        });

        // Phone number formatting
        document.querySelector('input[name="mobile"]').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            e.target.value = value;
        });

        
        // Enhanced Typing Animation
        function typeWriter(element, text, speed = 80) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Start typing animations when page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                const titleElement = document.getElementById('typingText');
                const subtitleElement = document.getElementById('typingSubtitle');
                
                // Type the main title with proper speed
                typeWriter(titleElement, 'One Day Mega Offer', 120);
                
                // Type the subtitle after title is done
                setTimeout(() => {
                    typeWriter(subtitleElement, 'Join Any Course @ ₹5000', 80);
                }, 2800);
                
            }, 1000);
        });

// Enhanced Horizontal Scroll with Mouse Wheel
        function initializeHorizontalScroll() {
            const scrollContainers = document.querySelectorAll('[data-scroll-container]');
            
            scrollContainers.forEach(container => {
                let isScrolling = false;
                
                container.addEventListener('wheel', (e) => {
                    // Prevent default vertical scrolling
                    e.preventDefault();
                    
                    // Get scroll amount (normalize for different browsers)
                    const scrollAmount = e.deltaY || e.detail || e.wheelDelta;
                    const scrollSpeed = 3; // Adjust scroll speed
                    
                    // Apply horizontal scroll
                    container.scrollLeft += scrollAmount * scrollSpeed;
                    
                    // Add visual feedback
                    if (!isScrolling) {
                        container.style.transform = 'scale(1.02)';
                        container.style.transition = 'transform 0.1s ease';
                        isScrolling = true;
                        
                        setTimeout(() => {
                            container.style.transform = 'scale(1)';
                            isScrolling = false;
                        }, 150);
                    }
                }, { passive: false });
                
                // Add mouse enter/leave effects
                container.addEventListener('mouseenter', () => {
                    container.style.cursor = 'grab';
                });
                
                container.addEventListener('mouseleave', () => {
                    container.style.cursor = 'default';
                });
                
                // Add drag scrolling
                let isDragging = false;
                let startX = 0;
                let scrollLeft = 0;
                
                container.addEventListener('mousedown', (e) => {
                    isDragging = true;
                    container.style.cursor = 'grabbing';
                    startX = e.pageX - container.offsetLeft;
                    scrollLeft = container.scrollLeft;
                });
                
                container.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                    const x = e.pageX - container.offsetLeft;
                    const walk = (x - startX) * 2;
                    container.scrollLeft = scrollLeft - walk;
                });
                
                container.addEventListener('mouseup', () => {
                    isDragging = false;
                    container.style.cursor = 'grab';
                });
                
                container.addEventListener('mouseleave', () => {
                    isDragging = false;
                    container.style.cursor = 'default';
                });
            });
        }
        
        // Touch/Swipe support for mobile
        function initializeTouchScroll() {
            const scrollContainers = document.querySelectorAll('[data-scroll-container]');
            
            scrollContainers.forEach(container => {
                let startX = 0;
                let scrollLeft = 0;
                
                container.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    scrollLeft = container.scrollLeft;
                });
                
                container.addEventListener('touchmove', (e) => {
                    if (!startX) return;
                    
                    const currentX = e.touches[0].clientX;
                    const diffX = startX - currentX;
                    
                    container.scrollLeft = scrollLeft + diffX;
                });
                
                container.addEventListener('touchend', () => {
                    startX = 0;
                });
            });
        }
        
        // Intersection Observer for animations
        function initializeScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        }
        
        // Initialize all functionality when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            initializeHorizontalScroll();
            initializeTouchScroll();
            initializeScrollAnimations();
            
            console.log('🚀 Enhanced Horizontal Scroll Course Catalog Loaded! 🚀');
        });
        
        // Add smooth scroll behavior for better UX
        document.querySelectorAll('[data-scroll-container]').forEach(container => {
            container.style.scrollBehavior = 'smooth';
        });

// Initialize horizontal scroll on page load
window.addEventListener('load', function() {
    initializeHorizontalScroll();
});

// Testimonials Horizontal Carousel
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const track = document.getElementById('testimonialsTrack');
let autoSlideInterval;

function updateCarousel() {
    if (track && slides.length > 0) {
        const slideWidth = 100;
        const translateX = -currentSlideIndex * slideWidth;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    updateCarousel();
    resetAutoSlide();
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    updateCarousel();
    resetAutoSlide();
}

function autoSlide() {
    currentSlideIndex++;
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }
    updateCarousel();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(autoSlide, 6000); // Change slide every 6 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize carousel
window.addEventListener('load', function() {
    if (slides.length > 0) {
        updateCarousel();
        startAutoSlide();
    }
});

// Pause auto-slide on hover
const carouselContainer = document.querySelector('.testimonials-carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Touch/Swipe support for mobile
let startX = 0;
let currentX = 0;
let isDragging = false;

if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoSlideInterval);
    });

    carouselContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                changeSlide(1); // Swipe left - next slide
            } else {
                changeSlide(-1); // Swipe right - previous slide
            }
        } else {
            startAutoSlide();
        }
    });
}

// Newsletter Subscription
        function subscribeNewsletter(event) {
            event.preventDefault();
            const email = event.target.querySelector('input[type="email"]').value;
            
            // Show success message
            alert(`Thank you for subscribing! We'll send updates to ${email}`);
            
            // Reset form
            event.target.reset();
        }

        // Back to Top Button
        window.addEventListener('scroll', function() {
            const backToTop = document.getElementById('backToTop');
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Animate footer stats on scroll
        function animateFooterStats() {
            const stats = document.querySelectorAll('.footer-stat-number[data-target]');
            
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateStat = () => {
                    if (current < target) {
                        current += increment;
                        stat.textContent = Math.ceil(current);
                        setTimeout(updateStat, 20);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateStat();
            });
        }

        // Observe elements for animation
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Add smooth hover effects to social links
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        console.log('🚀 T4TEQ Full Screen Landing Page with Enhanced Animations Loaded! 🚀');