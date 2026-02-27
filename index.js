import { PhotoImage, createMosaicElement } from './photo_mosaic.js';
import { portfolioText } from './page_text.js';


/* ========================= Handling page text and translation ========================= */
let currentLang = 'pt';

const langBtn = document.querySelector('.header-lang-btn');

function updateLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (portfolioText[lang][key]) {
            el.textContent = portfolioText[lang][key];
        }
    });

    // Update button text
    langBtn.textContent = lang.toUpperCase() === 'EN' ? 'PT' : 'EN';
}

// Initial load
updateLanguage(currentLang);

// Switch language on button click
langBtn.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'pt' : 'en';
    updateLanguage(newLang);
});


/* ========================= Populating the photo mosaics ========================= */

let photoList;
let mosaicContainer;

// Infrared section
photoList = Array(13);
for (let i = 0; i < 13; i++) {
    photoList[i] = new PhotoImage('./images/infrared/' + i + '.jpg');
}

mosaicContainer = document.getElementById('infrared-mosaic-container');
await createMosaicElement(photoList, mosaicContainer);

// People section
photoList = Array(14);
for (let i = 0; i < 14; i++) {
    photoList[i] = new PhotoImage('./images/people/' + i + '.jpg');
}

mosaicContainer = document.getElementById('people-mosaic-container');
await createMosaicElement(photoList, mosaicContainer);

// Portraits section
photoList = Array(9);
for (let i = 0; i < 9; i++) {
    photoList[i] = new PhotoImage('./images/portraits/' + i + '.jpg');
}

mosaicContainer = document.getElementById('portraits-mosaic-container');
await createMosaicElement(photoList, mosaicContainer);

// Landscapes/Other section
photoList = Array(15);
for (let i = 0; i < 15; i++) {
    photoList[i] = new PhotoImage('./images/landscapes-other/' + i + '.jpg');
}

mosaicContainer = document.getElementById('landscapes-other-mosaic-container');
await createMosaicElement(photoList, mosaicContainer);