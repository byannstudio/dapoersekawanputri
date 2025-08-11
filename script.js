document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded! Script.js has started.'); // Log 1

    // Function to create a WhatsApp message
    function sendWhatsAppMessage(productName) {
        const number = "6285878299285"; // Replace with your WhatsApp number
        const message = `Halo, saya ingin memesan produk: ${productName}`;
        const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        console.log(`Attempting to open WhatsApp with message: ${message}`); // Log 2
    }

    // Get all buttons with the 'whatsapp-button' class
    const whatsappButtons = document.querySelectorAll('.whatsapp-button');
    console.log('Number of WhatsApp buttons found:', whatsappButtons.length); // Log 3

    // Add an event listener to each WhatsApp button
    whatsappButtons.forEach(button => {
        console.log('Adding event listener to button:', button); // Log 4 (will appear multiple times based on the number of buttons)
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default action of the link (navigation)
            const productName = this.dataset.productName; // Get the product name from data-product-name
            console.log('WhatsApp button clicked. Product name:', productName); // Log 5

            if (productName) {
                sendWhatsAppMessage(productName);
            } else {
                sendWhatsAppMessage("informasi lebih lanjut");  
            }
        });
    });

    // JavaScript for the fade-in effect
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
