const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
});
// Get references to the search bar and search results
const searchBar = document.getElementById('search_bar');
const searchResults = document.getElementById('search_result');

// Function to perform the search
function performSearch() {
    // Clear previous search results
    searchResults.innerHTML = '';

    // Remove previous highlights
    const highlightedElements = document.getElementsByClassName('highlight');
    while (highlightedElements.length > 0) {
        const element = highlightedElements[0];
        element.outerHTML = element.innerHTML;
    }

    // Get the entered keyword
    const keyword = searchBar.value.trim().toLowerCase();

    // Get all the text elements on the page
    const textElements = document.getElementsByTagName('p');

    // Find the occurrences of the keyword within the text elements
    for (let i = 0; i < textElements.length; i++) {
        const textElement = textElements[i];
        const text = textElement.textContent.toLowerCase();

        if (text.includes(keyword)) {
            const highlightedText = text.replace(new RegExp(`(${keyword})`, 'gi'), '<span class="highlight">$1</span>');
            textElement.innerHTML = highlightedText;
        }
    }

    // Highlight the searched keyword for a few seconds
    highlightedElements = document.getElementsByClassName('highlight');
    for (let i = 0; i < highlightedElements.length; i++) {
        const element = highlightedElements[i];
        setTimeout(() => {
            element.classList.remove('highlight');
        }, 3000);
    }
}

// Attach an event listener to the search bar
searchBar.addEventListener('input', performSearch);
  