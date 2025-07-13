document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded! Script.js mulai berjalan.'); // Log 1

    // Fungsi untuk membuat pesan WhatsApp
    function pesanWhatsApp(namaProduk) {
        const nomor = "6285878299285"; // Ganti dengan nomor WhatsApp Anda
        const pesan = `Halo, saya ingin memesan produk: ${namaProduk}`;
        const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
        window.open(url, '_blank');
        console.log(`Mencoba membuka WhatsApp dengan pesan: ${pesan}`); // Log 2
    }

    // Mendapatkan semua tombol dengan kelas 'whatsapp-button'
    const whatsappButtons = document.querySelectorAll('.whatsapp-button');
    console.log('Jumlah tombol WhatsApp yang ditemukan:', whatsappButtons.length); // Log 3

    // Menambahkan event listener ke setiap tombol WhatsApp
    whatsappButtons.forEach(button => {
        console.log('Menambahkan event listener ke tombol:', button); // Log 4 (akan muncul berkali-kali sesuai jumlah tombol)
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah tindakan default dari link (navigasi)
            const productName = this.dataset.productName; // Mengambil nama produk dari data-product-name
            console.log('Tombol WhatsApp diklik. Nama produk:', productName); // Log 5

            if (productName) {
                pesanWhatsApp(productName);
            } else {
                pesanWhatsApp("informasi lebih lanjut"); 
            }
        });
    });

    // JavaScript untuk efek fade-in
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
