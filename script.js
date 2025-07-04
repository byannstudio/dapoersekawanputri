function pesan(namaProduk) {
  const nomor = "6285878299285"; // Ganti dengan nomor WhatsApp kamu
  const pesan = `Halo, saya ingin memesan produk: ${namaProduk}`;
  const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
  window.open(url, '_blank');
}
