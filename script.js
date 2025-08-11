document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded! Script.js is running.');

    // --- Language Management ---
    
    // Function to set the website language
    window.setLanguage = function(lang) {
        localStorage.setItem('lang', lang);

        const elements = document.querySelectorAll('[data-en], [data-id]');
        elements.forEach(el => {
            const translation = el.getAttribute(`data-${lang}`);
            if (translation) {
                el.innerHTML = translation;
            }
        });
    };

    // Load saved language or default to English
    const savedLang = localStorage.getItem('lang') || 'en';
    window.setLanguage(savedLang);

    // --- WhatsApp Messaging ---

    // Function to create and send a WhatsApp message
    function sendWhatsAppMessage(productName, lang) {
        const number = "6285878299285";
        let message;

        if (lang === 'id') {
            message = `Halo, saya ingin memesan produk: ${productName}`;
        } else {
            message = `Hello, I would like to order the product: ${productName}`;
        }

        const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        console.log(`Attempting to open WhatsApp with message: ${message}`);
    }

    // Get all buttons with the 'whatsapp-button' class
    const whatsappButtons = document.querySelectorAll('.whatsapp-button');
    console.log('Number of WhatsApp buttons found:', whatsappButtons.length);

    // Add event listener to each WhatsApp button
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productName = this.dataset.productName;
            const currentLang = localStorage.getItem('lang') || 'en';
            
            console.log('WhatsApp button clicked. Product name:', productName);

            if (productName) {
                sendWhatsAppMessage(productName, currentLang);
            } else {
                // Default message if no product name is provided
                if (currentLang === 'id') {
                    sendWhatsAppMessage("informasi lebih lanjut", currentLang);
                } else {
                    sendWhatsAppMessage("more information", currentLang);
                }
            }
        });
    });

    // --- Fade-in Effect ---

    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
