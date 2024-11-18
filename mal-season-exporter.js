// ==UserScript==
// @name         Extract Anime Titles and Dates
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Mengambil judul anime dan tanggal mulai dari halaman
// @author       Haroro
// @match        https://myanimelist.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Tunggu hingga halaman selesai dimuat
    window.addEventListener('load', () => {
        // Ambil semua elemen dengan class "js-start_date" dan "link-title"
        const animeElements = document.querySelectorAll('.js-anime-category-producer .title');

        // Array untuk menyimpan hasil
        const animeData = [];

        // Loop untuk mengambil data
        animeElements.forEach(element => {
            const title = element.querySelector('.link-title')?.textContent.trim(); // Ambil judul anime
            const startDate = element.querySelector('.prodsrc .info .item')?.textContent.trim(); // Ambil tanggal mulai

            if (title && startDate) {
                animeData.push(`[${startDate}] ${title}`);
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
})();
