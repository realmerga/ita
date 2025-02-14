// Falling Hearts Animation
function createHearts() {
  const heartsContainer = document.getElementById('hearts');
  const heart = document.createElement('div');
  heart.classList.add('heart');
  
  const left = Math.random() * 100;
  const animationDuration = Math.random() * 3 + 2;
  
  heart.style.left = left + 'vw';
  heart.style.animationDuration = animationDuration + 's';
  
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), animationDuration * 1000);
}

// setInterval(createHearts, 300);

// Falling Hearts Animation Function
function createHearts() {
  const heartsContainer = document.getElementById('hearts');
  const heart = document.createElement('div');
  heart.classList.add('heart');
  
  const left = Math.random() * 100;
  const animationDuration = Math.random() * 3 + 2;
  
  heart.style.left = left + 'vw';
  heart.style.animationDuration = animationDuration + 's';
    
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), animationDuration * 1000);
}

// Variable to store interval ID
let heartAnimationInterval;

// Initial setup
document.querySelector('.heart-icon').addEventListener('click', () => {
  const openingCard = document.getElementById('openingCard');
  const cardStack = document.getElementById('cardStack');
  const navigation = document.getElementById('navigation');
  const bgMusic = document.getElementById('bgMusic');
  const previewImage = document.getElementById('previewImage');
  const uploadButton = document.getElementById('uploadButton');

  // Add pattern background
  document.body.classList.add('pattern-bg');
  
  // Start falling hearts animation
  heartAnimationInterval = setInterval(createHearts, 300);

  openingCard.style.display = 'none';
  cardStack.style.display = 'block';
  navigation.style.display = 'flex';
  
  // Ensure upload button is visible and preview image is hidden initially
  uploadButton.style.display = 'block';
  previewImage.style.display = 'none';
  
  bgMusic.play().catch(error => console.log("Audio playback failed:", error));
  
  cards.forEach((card, index) => {
      card.style.opacity = '1';
      if (index === 0) {
          card.classList.add('active');
      } else {
          card.style.transform = `translateX(${index * 20}px) rotate(${index * 3}deg)`;
      }
  });
  
  updateCards();
});

// Card Stack Management
let currentIndex = 0;
const cards = document.querySelectorAll('.card');
const totalCards = cards.length;

function updateCards() {
  cards.forEach((card, index) => {
      card.classList.remove('active', 'prev', 'next');
      
      let position = (index - currentIndex + totalCards) % totalCards;
      
      if (position === 0) {
          card.classList.add('active');
          card.style.transform = 'translateX(0) rotate(0deg)';
          card.style.zIndex = 32;
      } else if (position === 1 || position === -2) {
          card.classList.add('next');
          card.style.transform = 'translateX(20px) rotate(3deg)';
          card.style.zIndex = 1;
      } else {
          card.classList.add('prev');
          card.style.transform = 'translateX(-20px) rotate(-3deg)';
          card.style.zIndex = 2;
      }
  });
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  const openingCard = document.getElementById('openingCard');
  const cardStack = document.getElementById('cardStack');
  const navigation = document.getElementById('navigation');
  const modal = document.getElementById('imageModal');
  const uploadButton = document.getElementById('uploadButton');
  const previewImage = document.getElementById('previewImage');
  const imageUpload = document.getElementById('imageUpload');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.close-btn');
  const bgMusic = document.getElementById('bgMusic');

  // Hide modal initially
  modal.style.display = 'none';

  // Opening card click event
  document.querySelector('.heart-icon').addEventListener('click', () => {
    openingCard.style.display = 'none';
    cardStack.style.display = 'block';
    navigation.style.display = 'flex';
    
    // Ensure upload button is visible and preview image is hidden
    uploadButton.style.display = 'block';
    previewImage.style.display = 'none';
    
    bgMusic.play().catch(error => console.log("Audio playback failed:", error));
    
    cards.forEach((card, index) => {
      card.style.opacity = '1';
      if (index === 0) {
        card.classList.add('active');
      } else {
        card.style.transform = `translateX(${index * 20}px) rotate(${index * 3}deg)`;
      }
    });
    
    updateCards();
  });

  // Upload button click event
  uploadButton.addEventListener('click', () => {
    imageUpload.click();
  });

  // Image upload change event
  imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';
        uploadButton.style.display = 'none';
        previewImage.classList.add('clickable-image');
      };
      
      reader.readAsDataURL(file);
    }
  });

  // Modal functionality - only active after opening card is dismissed
  previewImage.addEventListener('click', () => {
    if (openingCard.style.display === 'none') {
      modal.style.display = 'flex';
      modalImg.src = previewImage.src;
      modal.classList.add('fadeIn');
      modalImg.classList.add('scaleIn');
    }
  });

  // Close modal events
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  });

  // Navigation buttons
  document.querySelector('.nav-btn.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCards();
  });

  document.querySelector('.nav-btn.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCards();
  });
});