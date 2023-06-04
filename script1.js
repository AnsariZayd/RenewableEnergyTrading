var currentSlide = 0;
var slides = document.getElementsByClassName("slide");

function showSlide() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[currentSlide].style.display = "block";
}

function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide();
}

function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  showSlide();
}

showSlide();

// Define a function to search the page for the given text
function search() {
  // Get the search term
  var searchTerm = document.getElementById('Search').value;

  // Remove any existing highlights
  var elements = document.querySelectorAll('.highlight');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('highlight');
  }

  // Search the page for the term
  if (searchTerm) {
    var regex = new RegExp(searchTerm, 'gi');
    var elements = document.querySelectorAll('body *');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.innerHTML.match(regex)) {
        element.innerHTML = element.innerHTML.replace(regex, '<span class="highlight">$&</span>');
      }
    }

    // Reset highlights after 2 seconds
    setTimeout(function() {
      var elements = document.querySelectorAll('.highlight');
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('highlight');
      }
    }, 2000);
  }
}

