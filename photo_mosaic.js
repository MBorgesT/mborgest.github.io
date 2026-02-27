import { openLightboxAt } from "./lightbox.js";


export class PhotoImage {
    constructor(imgPath) {
        this.imgPath = imgPath;
    }
}

function getResponsiveSpacing() {
    const width = window.innerWidth;

    if (width <= 600) return 24;   // phones
    if (width <= 1024) return 36;  // tablets
    return 64;                     // desktop
}

function getResponsiveNColumns() {
    const width = window.innerWidth;

    if (width <= 600) return 2;   // phones
    if (width <= 1024) return 3;  // tablets
    return 3;                     // desktop
}

export async function createMosaicElement(photoList, parentElement) {
    const spacing = getResponsiveSpacing();
    const nColumns = getResponsiveNColumns();

    const mosaicContainer = document.createElement('div');
    mosaicContainer.className = 'mosaic'; // Add this line!
    mosaicContainer.style.display = 'flex';
    mosaicContainer.style.gap = spacing + 'px';

    const columns = [];
    const columnHeights = new Array(nColumns).fill(0);

    for (let i = 0; i < nColumns; i++) {
        const col = document.createElement('div');
        col.style.flex = '1';
        col.style.display = 'flex';
        col.style.flexDirection = 'column';
        col.style.gap = spacing + 'px';

        columns.push(col);
        mosaicContainer.appendChild(col);
    }

    // ✅ CRITICAL: mount before measuring widths
    parentElement.appendChild(mosaicContainer);

    function findBestColumn(newImageHeight) {
        let bestIndex = 0;
        let bestDelta = Infinity;

        for (let index = 0; index < nColumns; index++) {
            let columnHeightsCopy = [...columnHeights];
            columnHeightsCopy[index] += newImageHeight;
            
            const maxHeight = Math.max(...columnHeightsCopy);
            const minHeight = Math.min(...columnHeightsCopy);
            const delta = maxHeight - minHeight;

            if (delta < bestDelta) {
                bestDelta = delta;
                bestIndex = index;
            }
        }

        return bestIndex;
    }

    // 1️⃣ preload images in order
    const images = await Promise.all(
        photoList.map(photo => {
            return new Promise(resolve => {
                const img = new Image();
                img.src = photo.imgPath;
                img.style.width = '100%';
                img.style.height = 'auto';
                img.onload = () => resolve(img);
            });
        })
    );

    // 2️⃣ place them deterministically
    images.forEach((img, index) => {
        const columnWidth = columns[0].clientWidth;
        const scale = columnWidth / img.naturalWidth;
        const scaledHeight = img.naturalHeight * scale;

        const columnIndex = findBestColumn(scaledHeight);
        columns[columnIndex].appendChild(img);
        columnHeights[columnIndex] += scaledHeight;

        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            openLightboxAt(index, photoList);
        });
        img.addEventListener('contextmenu', event => event.preventDefault());
    });
}