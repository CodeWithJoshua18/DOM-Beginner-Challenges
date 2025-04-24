let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Function to show the current slide
function showSlide(index) {
  // Remove active class from all slides and dots
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
  });

  // Add active class to current slide and dot
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

// Navigate to next slide
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length; // Loop to first slide
  showSlide(currentIndex);
});

// Navigate to previous slide
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop to last slide
  showSlide(currentIndex);
});

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    showSlide(currentIndex);
  });
});

// Autoplay every 3 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length; // Loop to first slide
  showSlide(currentIndex);
}, 3000); // Change slide every 3 seconds

// Initialize the slider on page load
showSlide(currentIndex);
