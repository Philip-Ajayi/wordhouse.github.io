const gallery = document.querySelector('.gallery');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;
const slideWidth = 25; // 25% for each image
const numImages = 20;
const interval = 2000; // 2 seconds

function slideTo(index) {
    if (index < 0) index = numImages - 4;
    if (index >= numImages - 3) index = 0;

    const translateX = -index * slideWidth;
    gallery.style.transform = `translateX(${translateX}%)`;
    currentIndex = index;
}

function nextSlide() {
    slideTo(currentIndex + 1);
}

function prevSlide() {
    slideTo(currentIndex - 1);
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

setInterval(nextSlide, interval);
