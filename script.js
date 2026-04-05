// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize home as active
window.addEventListener('load', () => {
    navLinks[0].classList.add('active');
});

// Contact form submission via EmailJS
window.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const sendBtn = document.getElementById('send-btn');
    const formStatus = document.getElementById('form-status');

    if (!contactForm || !sendBtn || !formStatus || typeof emailjs === 'undefined') {
        return;
    }

    emailjs.init({
        publicKey: 'bkq2H3Oz_6M2ux68Z'
    });

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending...';
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        try {
            await emailjs.sendForm('service_m9dza2e', 'template_k1l21rm', contactForm);
            formStatus.textContent = 'Message sent successfully. Thank you!';
            formStatus.classList.add('success');
            contactForm.reset();
        } catch (error) {
            const reason = error && (error.text || error.message) ? ` (${error.text || error.message})` : '';
            formStatus.textContent = `Failed to send message. Please try again${reason}`;
            formStatus.classList.add('error');
        } finally {
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send Message';
        }
    });
});
