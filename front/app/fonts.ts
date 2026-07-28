// Mengambil font 'Poppins' secara langsung dari library bawaan Next.js
// Ini otomatis mengoptimalkan font agar loading web lebih cepat tanpa mengambil dari luar
import { Poppins } from "next/font/google";

// Membuat konfigurasi font dan mengekspornya agar bisa dipakai di file lain (seperti layout.tsx)
export const poppins = Poppins({
    // Membuat nama variabel CSS khusus agar mudah dipanggil di file CSS murni
    // Contoh pemakaian di CSS nanti: font-family: var(--font-poppins);
    variable: "--font-poppins",

    // Hanya mengambil karakter abjad standar (A-Z) agar ukuran file font kecil dan ringan
    subsets: ["latin"],

    // Jika internet lambat, tampilkan font default komputer dulu, lalu ganti (swap) ke Poppins kalau sudah siap
    // Ini mencegah teks blank/hilang saat web baru dibuka
    display: "swap",

    // Hanya mengunduh ukuran ketebalan font yang benar-benar akan dipakai di desain proyek ini
    // (100 = Tipis, 400 = Normal/Reguler, 500 = Medium, 800/900 = Tebal/Judul)
    weight: ["100", "400", "500", "800", "900"]
});