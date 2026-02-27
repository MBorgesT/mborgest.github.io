const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');

const prevBtn = document.querySelector('.lightbox-btn.left');
const nextBtn = document.querySelector('.lightbox-btn.right');

const closeBtn = document.getElementById('lightbox-close');

let currentIndex = 0;
let currentPhotos = [];


export function openLightboxAt(index, photos) {
    currentPhotos = photos;
    currentIndex = index;

    updateLightboxImage();
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function updateLightboxImage() {
    lightboxImage.src = currentPhotos[currentIndex].imgPath;
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImage.src = '';
    document.body.style.overflow = '';
}

function showNext() {
    currentIndex = (currentIndex + 1) % currentPhotos.length;
    updateLightboxImage();
}

function showPrev() {
    currentIndex =
        (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
    updateLightboxImage();
}

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
});

window.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;

    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'Escape') closeLightbox();
});


// Touch events for swipe
let touchStartX = 0;
let touchCurrentX = 0;

lightboxImage.addEventListener(
    'touchstart',
    (e) => {
        touchStartX = e.touches[0].clientX;
        touchCurrentX = touchStartX;
    },
    { passive: true }
);

lightboxImage.addEventListener(
    'touchmove',
    (e) => {
        touchCurrentX = e.touches[0].clientX;
    },
    { passive: true }
);

lightboxImage.addEventListener('touchend', () => {
    const deltaX = touchCurrentX - touchStartX;
    const swipeThreshold = 50;

    if (Math.abs(deltaX) < swipeThreshold) return;

    if (deltaX < 0) {
        showNext();
    } else {
        showPrev();
    }
});


// Closing logic
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
});

lightbox.addEventListener('click', (e) => {
    if (
        e.target.classList.contains('lightbox-backdrop')
    ) {
        closeLightbox();
    }
});

// Disabling right click on photo
lightboxImage.addEventListener('contextmenu', event => event.preventDefault());

