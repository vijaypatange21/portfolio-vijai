// Mobile Menu
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const icon = btn.querySelector('i');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

// Close menu when clicking links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// Scroll Reveal Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Copy Email
function copyEmail() {
    const email = document.getElementById('email-text').innerText;
    const msg = document.getElementById('copy-msg');

    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
            msg.classList.remove('hidden');
            setTimeout(() => msg.classList.add('hidden'), 2000);
        });
    } else {
        // Fallback
        const tempInput = document.createElement('textarea');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 2000);
    }
}

// Initialize EmailJS
(function () {
    // Check if configuration exists
    if (typeof EMAIL_CONFIG !== 'undefined' && EMAIL_CONFIG.PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
    } else {
        console.warn("EmailJS not configured. Please check env.js");
    }
})();

// Form Handler - Uses EmailJS
function handleForm(e) {
    e.preventDefault();

    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Small validation
    if (!name || !email || !message) {
        alert("Please fill out all fields before sending.");
        return;
    }

    if (typeof EMAIL_CONFIG === 'undefined' || EMAIL_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
        alert("EmailJS is not configured yet! Please update env.js with your keys.");
        return;
    }

    // UI: Loading State
    btn.innerText = 'Sending...';
    btn.disabled = true;
    btn.classList.add('opacity-75', 'cursor-not-allowed');

    // Prepare template parameters
    // IMPORTANT: Make sure your EmailJS template uses these variable names: {{from_name}}, {{from_email}}, {{message}}
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    // Send Email
    emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, templateParams)
        .then(() => {
            // Success
            btn.innerText = 'Message Sent!';
            btn.classList.remove('bg-gradient-to-r', 'from-primary', 'to-secondary');
            btn.classList.add('bg-green-600');

            e.target.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                btn.classList.remove('opacity-75', 'cursor-not-allowed', 'bg-green-600');
                btn.classList.add('bg-gradient-to-r', 'from-primary', 'to-secondary');
            }, 3000);
        })
        .catch((error) => {
            // Error
            console.error('FAILED...', error);
            btn.innerText = 'Failed to Send';
            btn.classList.remove('bg-gradient-to-r', 'from-primary', 'to-secondary');
            btn.classList.add('bg-red-600');

            alert("Failed to send message. Is your config correct?");

            // Reset button
            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                btn.classList.remove('opacity-75', 'cursor-not-allowed', 'bg-red-600');
                btn.classList.add('bg-gradient-to-r', 'from-primary', 'to-secondary');
            }, 3000);
        });
}

// Toggle Projects Visibility
function toggleProjects() {
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');

    let anyHidden = false;

    hiddenProjects.forEach(project => {
        if (project.classList.contains('hidden')) {
            anyHidden = true;
        }
    });

    hiddenProjects.forEach(project => {
        project.classList.toggle('hidden');
    });

    if (anyHidden) {
        btnText.textContent = 'Show Less Projects';
        btnIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        btnText.textContent = 'Show More Projects';
        btnIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}
