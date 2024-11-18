// ==UserScript==
// @name         Extract Anime Titles and Dates with Custom Date Format
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Mengambil judul anime dan tanggal mulai dari halaman dengan format tanggal [YYMMDD]
// @author       Haroro
// @match        https://myanimelist.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Tunggu hingga halaman selesai dimuat
    window.addEventListener('load', () => {
        // Ambil semua elemen dengan class "js-anime-category-producer" yang mengandung anime
        const animeElements = document.querySelectorAll('.js-anime-category-producer');

        // Array untuk menyimpan hasil
        const animeData = [];

        // Loop untuk mengambil data dari setiap anime
        animeElements.forEach(element => {
            // Ambil judul anime
            const title = element.querySelector('.link-title')?.textContent.trim();
            // Ambil tanggal mulai (dari span dengan class js-start_date)
            const startDate = element.querySelector('.js-start_date')?.textContent.trim();

            if (title && startDate) {
                // Format tanggal ke [YYMMDD]
                const formattedDate = formatDate(startDate);
                animeData.push(`[${formattedDate}] ${title}`);
            }
        });

        // Tampilkan hasil di konsol
        console.log('Judul Anime dan Tanggal Mulai:', animeData);

        // Menampilkan hasil di halaman (optional)
        const resultDiv = document.createElement('div');
        resultDiv.style.position = 'fixed';
        resultDiv.style.bottom = '10px';
        resultDiv.style.right = '10px';
        resultDiv.style.backgroundColor = 'white';
        resultDiv.style.border = '1px solid black';
        resultDiv.style.padding = '10px';
        resultDiv.style.zIndex = '10000';
        resultDiv.textContent = `Hasil: ${animeData.join(', ')}`;
        document.body.appendChild(resultDiv);
    });

    // Fungsi untuk mengubah tanggal dalam format yyyyMMdd menjadi [YYMMDD]
    function formatDate(dateString) {
        const year = dateString.substring(2, 4); // Ambil 2 digit terakhir dari tahun
        const month = dateString.substring(4, 6); // Ambil bulan
        const day = dateString.substring(6, 8); // Ambil hari
        return `${year}${month}${day}`;
    }
})();
