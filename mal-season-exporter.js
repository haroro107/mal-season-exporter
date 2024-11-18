// ==UserScript==
// @name         Extract Anime Titles and Dates with Header
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Mengambil judul anime, tanggal mulai, dan header dari halaman
// @author       Haroro
// @match        https://myanimelist.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Tunggu hingga halaman selesai dimuat
    window.addEventListener('load', () => {
        // Ambil semua elemen anime dengan class "js-seasonal-anime-list"
        const animeSections = document.querySelectorAll('.js-seasonal-anime-list');

        // Array untuk menyimpan hasil
        const animeData = [];

        // Loop untuk setiap "js-seasonal-anime-list" (section per kategori)
        animeSections.forEach(section => {
            // Ambil header kategori dari elemen "anime-header"
            const header = section.querySelector('.anime-header')?.textContent.trim();

            // Ambil semua anime dalam kategori ini
            const animeElements = section.querySelectorAll('.js-anime-category-producer');

            animeElements.forEach(element => {
                // Ambil judul anime
                const title = element.querySelector('.link-title')?.textContent.trim();
                // Ambil tanggal mulai (dari span dengan class js-start_date)
                const startDate = element.querySelector('.js-start_date')?.textContent.trim();

                if (title && startDate) {
                    // Format tanggal ke [YYMMDD]
                    const formattedDate = formatDate(startDate);
                    // Gabungkan dengan header kategori
                    animeData.push(`[${formattedDate}] ${title} 【${header}】`);
                }
            });
        });

        // Tampilkan hasil di konsol
        console.log('Judul Anime, Tanggal, dan Kategori:', animeData);

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
