// Set the target date and time for the countdown
const targetDate = new Date("September 30, 2023 10:00:00 GMT+0100").getTime();

// Update the countdown every second
const countdownInterval = setInterval(function() {
    const currentDate = new Date().getTime();
    const timeRemaining = targetDate - currentDate;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Display the countdown
    document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Check if the countdown is over
    if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "Countdown expired";
    }
}, 1000);


// JavaScript code goes here
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");
  let currentIndex = 0;

  function showSlide(index) {
    const slides = document.querySelectorAll(".carousel-slide");
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % 5;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + 5) % 5;
    showSlide(currentIndex);
  }

  const interval = setInterval(nextSlide, 2000);

  nextButton.addEventListener("click", () => {
    clearInterval(interval);
    nextSlide();
    interval = setInterval(nextSlide, 2000);
  });

  prevButton.addEventListener("click", () => {
    clearInterval(interval);
    prevSlide();
    interval = setInterval(nextSlide, 2000);
  });

  showSlide(currentIndex);
});