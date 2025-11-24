let currentSlide = 0;
let startX = 0;
let endX = 0;
let isSwipe = false;

function slide(direction) {
    const slider = document.querySelector('.slider');
    const slides = slider.children.length;

    // Pause any video on the current slide
    const currentSlideElement = slider.children[currentSlide];
    if (currentSlideElement.tagName === 'VIDEO') {
        currentSlideElement.pause();
    }

    // Update current slide index
    currentSlide = (currentSlide + direction + slides) % slides;

    // Apply transform to move the slider
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Play video if the new slide contains a video element
    const newSlideElement = slider.children[currentSlide];
    if (newSlideElement.tagName === 'VIDEO') {
        newSlideElement.play();
    }
}

// Add play/pause toggle functionality for videos
document.querySelectorAll('.slider video').forEach(video => {
    video.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwipe = false; // Reset swipe flag
    });

    video.addEventListener('touchmove', (e) => {
        const currentX = e.touches[0].clientX;
        if (Math.abs(currentX - startX) > 20) {
            isSwipe = true; // Mark as swipe
        }
    });

    video.addEventListener('touchend', (e) => {
        if (!isSwipe) {
            // If it's not a swipe, toggle play/pause
            e.preventDefault();
            e.stopPropagation();
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
    });

    video.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent accidental double clicks
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
});

// Touch functionality for the slider
const slider = document.querySelector('.slider');
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwipe = false; // Reset swipe flag
});

slider.addEventListener('touchmove', (e) => {
    const currentX = e.touches[0].clientX;
    if (Math.abs(currentX - startX) > 20) {
        isSwipe = true; // Mark as swipe
    }
});

slider.addEventListener('touchend', (e) => {
    if (isSwipe) {
        endX = e.changedTouches[0].clientX;

        // Check swipe direction and slide
        if (startX - endX > 50) slide(1); // Swipe left
        if (startX - endX < -50) slide(-1); // Swipe right
    }
});



// Toggle menu
function toggleMenu() {
const menu = document.getElementById('menu');
menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Price calculation
// Price calculation 
let basePrice = 299;

// Initialize price display with placeholder text
document.getElementById('price-display').innerText = 'Select options to see the price';

function handleSizeChange() {
const size = document.getElementById('size').value;
const frame = document.getElementById('frame');

// Disable the frame selection if no size is selected or the "Digital file" is selected
if (!size) {
frame.disabled = true;
document.getElementById('price-display').innerText = 'Select options to see the price';
return;
}

frame.disabled = size === "299";

// Automatically set frame value to 0 if the digital file is selected
if (size === "299") frame.value = "0";

updatePrice();
}

function updatePrice() {
const sizeElement = document.getElementById('size');
const frameElement = document.getElementById('frame');
const sizePrice = parseInt(sizeElement.value || 0); // Default to 0 if no value
const framePrice = frameElement.disabled ? 0 : parseInt(frameElement.value || 0); // Default to 0 if disabled

// Calculate total price
const totalPrice = sizePrice + framePrice;

// Update the price display
document.getElementById('price-display').innerText = totalPrice ? `Price: ₹${totalPrice}` : 'Select options to see the price';
}


// Format date to dd-mm-yyyy

function formatDate(dateString) {
const [year, month, day] = dateString.split('-');
return `${day}-${month}-${year}`;
}


// Format time to hh:mm AM/PM
function formatTime(timeString) {
const [hour, minute] = timeString.split(':');
const hourInt = parseInt(hour);
const amPm = hourInt >= 12 ? 'PM' : 'AM';
const formattedHour = hourInt % 12 || 12; // Convert 0 to 12 for midnight
return `${formattedHour}:${minute} ${amPm}`;
}

// Send WhatsApp message
// Open WhatsApp with fallback for desktop

function sendWhatsAppMessage() {
    const location = document.getElementById('location').value.trim();
    const dateTime = document.getElementById('date').value.trim();
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const size = document.getElementById('size').selectedOptions[0]?.text || 'N/A';
    const frame = document.getElementById('frame').disabled ? "N/A" : document.getElementById('frame').selectedOptions[0]?.text || 'N/A';
    const price = document.getElementById('price-display')?.innerText || "N/A";

    let formattedDateTime = 'N/A';
    if (dateTime) {
        const [date, time] = dateTime.split('T');
        const formattedDate = formatDate(date);
        const formattedTime = formatTime(time);
        formattedDateTime = `${formattedDate} ${formattedTime}`;
    }

    const whatsappMessage = `
Hey GiftyHearts! I want to customize the Star Map 1. Here are my details:
• Location: ${location || 'N/A'}
• Date & Time: ${formattedDateTime}
• Name: ${name || 'N/A'}
• Message: ${message || 'N/A'}
• Size: ${size}
• Frame: ${frame}
• ${price}
`.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappWebUrl = `https://web.whatsapp.com/send?phone=918080959878&text=${encodedMessage}`;
    const whatsappAppUrl = `https://wa.me/918080959878?text=${encodedMessage}`;

    const isMobile = /iPhone|Android/i.test(navigator.userAgent);
    const whatsappUrl = isMobile ? whatsappAppUrl : whatsappWebUrl;

    // Open the WhatsApp URL
    window.open(whatsappUrl, '_blank');

    // Show the message in an alert box
    alert(`If WhatsApp Desktop doesn't open, copy the message below and paste it manually:\n\n${whatsappMessage}`);
}

// Copy message to clipboard
function copyMessageToClipboard() {
    const location = document.getElementById('location').value.trim();
    const date = document.getElementById('date').value.trim();
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const size = document.getElementById('size').selectedOptions[0]?.text || 'N/A';
    const frame = document.getElementById('frame').disabled ? "N/A" : document.getElementById('frame').selectedOptions[0]?.text || 'N/A';
    const price = document.getElementById('price-display')?.innerText || "N/A";

    const whatsappMessage = `
Hey GiftyHearts! I want to customize the Star Map 1. Here are my details:
• Location: ${location || 'N/A'}
• Date & Time: ${date || 'N/A'}
• Name: ${name || 'N/A'}
• Message: ${message || 'N/A'}
• Size: ${size}
• Frame: ${frame}
• ${price}
`.trim();

    navigator.clipboard.writeText(whatsappMessage).then(() => {
        alert("Message copied to clipboard. You can paste it in WhatsApp manually if needed.");
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const ratingDisplay = document.querySelector('.rating-display .stars');
    const ratingText = document.querySelector('.rating-display p');
    const totalCustomers = document.querySelector('.total-customers');

    // Example values (you can replace these with dynamic data)
    const rating = 5; // Rating out of 5
    const customers = 100; // Total customers

    // Update stars
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    ratingDisplay.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        if (i < filledStars) {
            star.textContent = '★';
            star.classList.add('filled');
        } else if (i === filledStars && halfStar) {
            star.textContent = '★';
            star.style.color = 'rgba(255, 204, 0, 0.5)'; // Half-filled star
        } else {
            star.textContent = '☆';
        }
        ratingDisplay.appendChild(star);
    }

    // Update text
    ratingText.textContent = `${rating.toFixed(1)} out of 5 stars`;
    totalCustomers.textContent = `${customers.toLocaleString()} customers have purchased this product`;
});

