// Simulasi Data Buku
const books = {
    "Fiksi": [
        { id: 1, title: "Bumi", author: "Tere Liye", price: 85000, stock: 10, image: "img/Bumi-New-Cover.jpg" },
        { id: 2, title: "Laskar Pelangi", author: "Andrea Hirata", price: 95000, stock: 15, image: "img/Laskar_pelangi_sampul.jpg" },
    ],
    "Non-Fiksi": [
        { id: 3, title: "Filosofi Teras", author: "Henry Manampiring", price: 75000, stock: 8, image: "img/filosofiterascover.jpg" },
        { id: 4, title: "Sapiens", author: "Yuval Noah Harari", price: 120000, stock: 5, image: "img/Sapiens_Grafis_vol_2__spot_uv-1.jpg" },
    ],
    "Teknologi": [
        { id: 5, title: "Data Science from Scratch: First Principles with Python", author: "Joel Grus", price: 95000, stock: 10, image: "img/Datascience.jpg" },
        { id: 6, title: "Clean Code", author: "Robert C. Martin", price: 200000, stock: 7, image: "img/cleancode.jpg" },
        { id: 7, title: "Introduction to Algorithms", author: "Cormen et al.", price: 350000, stock: 4, image: "img/algorithms.jpg" },
    ],
    "Pendidikan": [],
};

let selectedBook = null; // Untuk menyimpan buku yang dipilih

// ===== Fungsi Navigasi Antar Langkah =====
function showSection(step) {
    const steps = document.querySelectorAll(".step");
    steps.forEach((section, index) => {
        if (index + 1 === step) {
            section.classList.add("active");
            section.classList.remove("hidden");
        } else {
            section.classList.remove("active");
            section.classList.add("hidden");
        }
    });
}

// ===== Menampilkan Daftar Buku Berdasarkan Kategori =====
function showBooks(category) {
    const bookList = document.getElementById("book-list");
    const categoryName = document.getElementById("category-name");

    // Tampilkan nama kategori
    categoryName.textContent = `(${category})`;

    // Kosongkan daftar buku sebelumnya
    bookList.innerHTML = "";

    // Ambil data buku dari kategori
    if (books[category] && books[category].length > 0) {
        books[category].forEach(book => {
            const bookItem = document.createElement("div");
            bookItem.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <div>
                    <h3>${book.title}</h3>
                    <p>Penulis: ${book.author}</p>
                    <p>Harga: Rp ${book.price.toLocaleString()}</p>
                    <button onclick="viewBookDetail(${book.id}, '${category}')">Lihat Detail</button>
                </div>
            `;
            bookList.appendChild(bookItem);
        });
    } else {
        // Jika kategori tidak memiliki buku
        bookList.innerHTML = "<p>Buku tidak tersedia untuk kategori ini.</p>";
    }

    // Navigasi ke daftar buku (Step 2)
    showSection(2);
}


// ===== Menampilkan Detail Buku =====
function viewBookDetail(bookId, category) {
    const bookDetail = document.getElementById("book-detail");

    // Cari buku berdasarkan ID dan kategori
    const book = books[category].find(b => b.id === bookId);
    if (book) {
        selectedBook = book; // Simpan buku yang dipilih
        bookDetail.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Penulis: ${book.author}</p>
            <p>Harga: Rp ${book.price.toLocaleString()}</p>
            <p>Stok: ${book.stock} buku</p> <!-- Tambahkan stok buku -->
            <button onclick="addToOrder()">Tambahkan ke Pesanan</button>
        `;

        // Navigasi ke detail buku (Step 3)
        showSection(3);
    }
}

// ===== Menambahkan Buku ke Pesanan =====
function addToOrder() {
    const orderSummary = document.getElementById("order-summary");

    if (selectedBook) {
        orderSummary.innerHTML = `
            <p><strong>Buku:</strong> ${selectedBook.title}</p>
            <p><strong>Penulis:</strong> ${selectedBook.author}</p>
            <p><strong>Harga:</strong> Rp ${selectedBook.price.toLocaleString()}</p>
        `;

        // Navigasi ke ringkasan pesanan (Step 4)
        showSection(4);
    }
}

// ===== Konfirmasi Pesanan =====
function confirmOrder() {
    alert("Pesanan Anda telah dikonfirmasi. Terima kasih telah berbelanja di Toko Buku Online!");
    location.reload(); // Reset aplikasi
}

// ===== Kembali ke Langkah Sebelumnya =====
function goBack(step) {
    showSection(step);
}
