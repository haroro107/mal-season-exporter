// ==UserScript==
// @name         Extract Anime Titles and Dates
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Mengambil judul anime dan tanggal mulai dari halaman
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
                // Format dan simpan data
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

    // Fungsi untuk mengubah tanggal dalam format yyyyMMdd menjadi format yang lebih baik
    function formatDate(dateString) {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return `${monthNames[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
    }
})();
