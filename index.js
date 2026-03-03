import { PhotoImage, createMosaicElement } from './photo_mosaic.js';


/* ========================= Populating the photo mosaics ========================= */

let photoList;
let mosaicContainer;

// Infrared section
photoList = Array(13);
for (let i = 0; i < 13; i++) {
    photoList[i] = new PhotoImage('../images/infrared/' + i + '.jpg');
}

mosaicContainer = document.getElementById('infrared-mosaic-container');
await createMosaicElement(photoList, mosaicContainer);
document.getElementById('loading-infrared').style.display = 'none';

// People section
photoList = Array(14);
for (let i = 0; i < 14; i++) {
    photoList[i] = new PhotoImage('../images/people/' + i + '.jpg');
}

mosaicContainer = document.getElementById('people-mosaic-container');
await createMosaicElement(photoList, mosaicContainer);
document.getElementById('loading-people').style.display = 'none';

// Landscapes/Other section
photoList = Array(15);
for (let i = 0; i < 15; i++) {
    photoList[i] = new PhotoImage('../images/landscapes-other/' + i + '.jpg');
}

mosaicContainer = document.getElementById('landscapes-other-mosaic-container');
await createMosaicElement(photoList, mosaicContainer);
document.getElementById('loading-landscapes-other').style.display = 'none';

// Portraits section
photoList = Array(9);
for (let i = 0; i < 9; i++) {
    photoList[i] = new PhotoImage('../images/portraits/' + i + '.jpg');
}

mosaicContainer = document.getElementById('portraits-mosaic-container');
await createMosaicElement(photoList, mosaicContainer);
document.getElementById('loading-portraits').style.display = 'none';
