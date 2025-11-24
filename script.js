// Heaer and Footer

function getBasePath() {
    // Count the number of slashes in the current path to determine folder depth
    const depth = window.location.pathname.split('/').length - 2; // Adjust for domain and file
    return "../".repeat(depth); // Go up one level for each folder depth
}

function loadComponent(selector, filePath) {
    const basePath = getBasePath(); // Dynamically calculate base path
    fetch(basePath + filePath)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then((html) => {
            document.querySelector(selector).innerHTML = html;

            // Attach carousel script if it's the add-on products section
            if (selector === "#add-on-products-container") {
                attachCarouselScript();
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "components/header.html");
    loadComponent("footer", "components/footer.html");
    loadComponent("#add-on-products-container", "components/add-on-products.html");
    loadComponent("#policy", "components/policys.html");
});

function attachCarouselScript() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return; // Ensure carousel exists before proceeding

    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');

    prevBtn.className = 'carousel-btn prev-btn';
    prevBtn.innerHTML = '❮';
    nextBtn.className = 'carousel-btn next-btn';
    nextBtn.innerHTML = '❯';

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -200, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 200, behavior: 'smooth' });
    });

    document.querySelector('.add-on-products').appendChild(prevBtn);
    document.querySelector('.add-on-products').appendChild(nextBtn);
}




//----------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------


function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show Back to Top button on scroll
window.addEventListener('scroll', () => {
    const backToTop = document.querySelector('.back-to-top');
    backToTop.classList.toggle('show', window.scrollY > 200);
});

//----------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------

// Enhanced Search Functionality

let debounceTimeout;

const pages = [
{ name: 'Home', path: '/home.html', tags: ['gifts', 'store', 'category'] },
{ name: 'Star Maps', path: '/categories/starmaps/starmapspage.html', tags: ['star', 'maps', 'custom'] },
{ name: 'Star Map 1', path: '/categories/starmaps/starmap1/starmap1.html', tags: ['star', 'maps', 'custom'] },
{ name: 'Memory Map 1', path: './categories/memory maps/memorymap1.html', tags: ['memory', 'maps'] },
{ name: 'Mugs', path: './categories/mugs/mugs.html', tags: ['mugs', 'drinkware'] },
{ name: 'Heart Cards', path: './categories/cards/cards.html', tags: ['cards', 'gifts'] },
];

function performSearch() {
const query = document.getElementById('search').value.trim().toLowerCase();
const matches = pages.filter(page =>
page.name.toLowerCase().includes(query) ||
page.tags.some(tag => tag.toLowerCase().includes(query))
);

const resultsContainer = document.getElementById('searchResults');
resultsContainer.innerHTML = '';

if (matches.length > 0) {
matches.forEach(match => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="${match.path}" style="text-decoration: none; color: #4B0082; font-size: 1rem;">${match.name}</a>`;
    resultsContainer.appendChild(listItem);
});
} else {
resultsContainer.innerHTML = `<li style="color: #4B0082; font-size: 1rem;">No matching results found.</li>`;
}

document.getElementById('searchModal').style.display = 'block';
}

function closeSearchModal() {
const modal = document.getElementById('searchModal');
modal.style.display = 'none';
}

function showSuggestions() {
clearTimeout(debounceTimeout);
debounceTimeout = setTimeout(() => {
const query = document.getElementById('search').value.trim().toLowerCase();
const suggestionsContainer = document.getElementById('search-suggestions');
suggestionsContainer.innerHTML = '';

if (query) {
    const matches = pages.filter(page =>
        page.name.toLowerCase().includes(query) ||
        page.tags.some(tag => tag.toLowerCase().includes(query))
    );

    if (matches.length > 0) {
        suggestionsContainer.style.display = 'block';
        matches.forEach(match => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.innerHTML = match.name;
            suggestionItem.onclick = () => {
                window.location.href = match.path;
            };
            suggestionsContainer.appendChild(suggestionItem);
        });
    } else {
        suggestionsContainer.style.display = 'none';
    }
} else {
    suggestionsContainer.style.display = 'none';
}
}, 300);
}

function clearSearch() {
document.getElementById('search').value = '';
document.getElementById('search-suggestions').style.display = 'none';
}

// Close modal on clicking outside
window.onclick = function (event) {
const modal = document.getElementById('searchModal');
if (event.target === modal) {
closeSearchModal();
}
};

//Add on product


document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const items = Array.from(carousel.children);
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(carousel).gap);
    const totalItems = items.length;

    let position = 0;

    // Function to move the carousel
    const moveCarousel = (direction) => {
        if (direction === 'next') {
            if (position < (totalItems - 1) * itemWidth) {
                position += itemWidth;
            } else {
                // Redirect to the first item
                position = 0;
            }
        } else if (direction === 'prev') {
            if (position > 0) {
                position -= itemWidth;
            } else {
                position = (totalItems - 1) * itemWidth; // Go to the last item
            }
        }

        carousel.scroll({
            left: position,
            behavior: 'smooth',
        });
    };

    // Manual navigation buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => moveCarousel('prev'));
        nextBtn.addEventListener('click', () => moveCarousel('next'));
    }

    // Touch functionality for mobile
    let startX = 0;
    let isDragging = false;
    let scrollStart = 0;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        scrollStart = carousel.scrollLeft;
        isDragging = true;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].pageX;
        const deltaX = startX - currentX;
        carousel.scrollLeft = scrollStart + deltaX;
    });

    carousel.addEventListener('touchend', () => {
        isDragging = false;

        // Check if the user scrolled past the last item
        if (carousel.scrollLeft >= (totalItems - 1) * itemWidth) {
            position = 0; // Reset to the first item
            carousel.scrollLeft = position;
        } else if (carousel.scrollLeft <= 0) {
            position = (totalItems - 1) * itemWidth; // Go to the last item
            carousel.scrollLeft = position;
        }
    });

    // Handle responsive view
    window.addEventListener('resize', () => {
        position = 0;
        carousel.scrollLeft = position;
    });
});




console.log('Current position:', position);
console.log('ScrollLeft:', carousel.scrollLeft);

//policys

function togglePolicy() {
    const policyContent = document.getElementById('policyContent');
    if (policyContent.style.display === 'none' || !policyContent.style.display) {
        policyContent.style.display = 'block';
    } else {
        policyContent.style.display = 'none';
    }
}