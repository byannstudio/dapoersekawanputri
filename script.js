document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded! Script.js is running.');

    // --- Language Management ---
    
    /**
     * Sets the website's language and updates all translatable elements.
     * @param {string} lang The language code ('en' or 'id').
     */
    window.setLanguage = function(lang) {
        // Save language preference to local storage
        localStorage.setItem('lang', lang);

        // Find all elements with data-en or data-id attributes
        const elements = document.querySelectorAll('[data-en], [data-id], [data-en-text], [data-id-text]');
        
        elements.forEach(el => {
            let translation;
            if (el.hasAttribute(`data-${lang}-text`)) {
                translation = el.getAttribute(`data-${lang}-text`);
            } else {
                translation = el.getAttribute(`data-${lang}`);
            }

            if (translation) {
                el.innerHTML = translation;
            }
        });
    };

    // Load saved language from local storage, or default to English
    const savedLang = localStorage.getItem('lang') || 'en';
    window.setLanguage(savedLang);

    // --- WhatsApp Messaging ---

    /**
     * Constructs and opens a WhatsApp message URL.
     * @param {string} productName The name of the product to include in the message.
     * @param {string} lang The current language code ('en' or 'id').
     */
    function sendWhatsAppMessage(productName, lang) {
        const number = "6285878299285"; // Replace with your WhatsApp number
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

    // Add an event listener to each WhatsApp button
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default action of the link
            const productName = this.dataset.productName;
            const currentLang = localStorage.getItem('lang') || 'en';
            
            console.log('WhatsApp button clicked. Product name:', productName);

            if (productName) {
                sendWhatsAppMessage(productName, currentLang);
            } else {
                // Default message if no product name is specified
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
