// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';

    // Show/hide back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (scrollTop > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==========================================
// PROJECT MODAL
// ==========================================

const projectData = {
    1: {
        title: 'Home Inspection Lead Funnel',
        description: 'Designed a sample lead generation funnel for a home inspection company. This funnel demonstrates best practices for capturing qualified leads, organizing them in a CRM, automating follow-ups, and booking appointments.',
        features: [
            'Lead capture form with custom fields',
            'Automated welcome sequence',
            'Lead scoring and qualification',
            'Appointment booking integration',
            'Follow-up workflow automation',
            'Contact organization with smart tagging'
        ],
        skills: ['GoHighLevel', 'Funnels', 'Forms', 'CRM', 'Automation', 'Lead Capture']
    },
    2: {
        title: '4-Week VIP Email & SMS Campaign',
        description: 'Created a comprehensive 4-week email and SMS campaign designed specifically to strengthen relationships with VIP real estate agents. The campaign is structured to provide value while maintaining professional, non-pushy communication throughout.',
        features: [
            'Segmented audience approach',
            'Personalized email sequences',
            'SMS reminder and value messages',
            'Engagement tracking and metrics',
            'Timing optimization for opens and clicks',
            'Professional brand voice throughout'
        ],
        skills: ['Email Marketing', 'SMS Marketing', 'Campaign Planning', 'GoHighLevel', 'Segmentation']
    },
    3: {
        title: 'Lead Follow-Up Automation',
        description: 'Created a sample automation workflow that intelligently follows up with new leads through coordinated email and SMS messaging. The system organizes contacts with proper tags and automatically moves them through appropriate pipeline stages based on their engagement.',
        features: [
            'Trigger-based follow-up sequences',
            'Email and SMS coordination',
            'Automatic contact tagging',
            'Pipeline stage progression',
            'Engagement-based routing',
            'Response tracking and analytics'
        ],
        skills: ['Workflows', 'Triggers', 'Tags', 'Email', 'SMS', 'CRM', 'Automation']
    },
    4: {
        title: 'Appointment Reminder System',
        description: 'Created a sample appointment reminder workflow using automated email and SMS messages. This system is designed to significantly reduce missed appointments and improve customer experience by providing timely, helpful reminders.',
        features: [
            'Calendar-triggered reminders',
            'Dual-channel notifications (Email + SMS)',
            'Customizable reminder timing',
            'Automatic confirmation links',
            'Rescheduling workflow',
            'No-show follow-up sequences'
        ],
        skills: ['Calendar Integration', 'Automation', 'SMS', 'Email', 'Workflows']
    },
    5: {
        title: 'CRM Organization & Pipeline Management',
        description: 'Created a sample CRM structure for organizing contacts, tags, opportunities, and pipeline stages. This system demonstrates best practices for maintaining clean data, tracking leads effectively, and ensuring nothing falls through the cracks.',
        features: [
            'Hierarchical tag system',
            'Customized pipeline stages',
            'Opportunity tracking',
            'Contact field organization',
            'Automated data enrichment',
            'Regular maintenance protocols'
        ],
        skills: ['CRM', 'Pipelines', 'Tags', 'Opportunities', 'Data Management', 'Organization']
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projectData[projectId];

    if (project) {
        document.getElementById('projectTitle').textContent = project.title;
        document.getElementById('projectDescription').textContent = project.description;

        const featuresList = document.getElementById('projectFeatures');
        featuresList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });

        const skillsContainer = document.getElementById('projectSkills');
        skillsContainer.innerHTML = '';
        project.skills.forEach(skill => {
            const span = document.createElement('span');
            span.textContent = skill;
            skillsContainer.appendChild(span);
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
});

// ==========================================
// CONTACT FORM VALIDATION
// ==========================================

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Clear previous messages
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = '';
    formMessage.classList.remove('success', 'error');

    // Validation
    if (!name) {
        showFormMessage('Please enter your name.', 'error');
        return;
    }

    if (!email) {
        showFormMessage('Please enter your email address.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    if (!message) {
        showFormMessage('Please enter a message.', 'error');
        return;
    }

    if (message.length < 10) {
        showFormMessage('Your message should be at least 10 characters long.', 'error');
        return;
    }

    // If validation passes, show success message
    showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');

    // Clear form fields
    document.getElementById('contactForm').reset();

    // In a real implementation, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.classList.add(type);

    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.classList.remove(type);
            formMessage.textContent = '';
        }, 5000);
    }
}

// ==========================================
// SMOOTH SCROLL ENHANCEMENT
// ==========================================

// Add smooth scroll to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// ANIMATION ON SCROLL
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards, portfolio cards, etc.
document.querySelectorAll('.service-card, .portfolio-card, .highlight-card, .timeline-item, .why-card, .process-step, .testimonial-card, .tool-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ==========================================
// DOCUMENT READY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize any additional functionality
    console.log('Portfolio website loaded successfully');

    // Add active class to current nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy loading for images (when added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                image.classList.add('loaded');
                observer.unobserve(image);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Format phone number if needed
function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

// Copy to clipboard functionality for contact info
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

// ==========================================
// END OF SCRIPT
// ========================================== 
