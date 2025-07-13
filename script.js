document.addEventListener('DOMContentLoaded', () => {
    // Fungsi untuk membuat pesan WhatsApp
    function pesanWhatsApp(namaProduk) {
        const nomor = "6285878299285"; // Ganti dengan nomor WhatsApp Anda
        const pesan = `Halo, saya ingin memesan produk: ${namaProduk}`;
        const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
        window.open(url, '_blank');
    }

    // Mendapatkan semua tombol dengan kelas 'whatsapp-button'
    const whatsappButtons = document.querySelectorAll('.whatsapp-button');

    // Menambahkan event listener ke setiap tombol WhatsApp
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah tindakan default dari link (navigasi)
            const productName = this.dataset.productName; // Mengambil nama produk dari data-product-name
            if (productName) {
                pesanWhatsApp(productName);
            } else {
                // Ini untuk tombol WhatsApp di bagian kontak yang tidak spesifik produk
                pesanWhatsApp("informasi lebih lanjut"); 
            }
        });
    });

    // JavaScript untuk efek fade-in
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1, // Element is 10% visible
        rootMargin: "0px 0px -50px 0px" // Start animation 50px before element enters viewport
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
