// main.js
import { recipes } from './recipes.mjs';

// STEP 1: Random number generator
function random(num) {
  return Math.floor(Math.random() * num);
}

// STEP 2: Get random recipe from the list
function getRandomRecipe() {
  return recipes[random(recipes.length)];
}

// STEP 3: Generate tags HTML
function renderTags(tags = []) {
  return tags.map(tag => `
    <span class="category-tag">${tag}</span>
  `).join('');
}

// STEP 4: Generate rating stars HTML
function renderRating(rating = 0) {
  let fullStars = Math.floor(rating);
  let emptyStars = 5 - fullStars;

  let starsHtml = '';

  for (let i = 0; i < fullStars; i++) {
    starsHtml += `<span aria-hidden="true" class="icon-star">⭐</span>`;
  }

  for (let i = 0; i < emptyStars; i++) {
    starsHtml += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
  }

  return `
    <span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">
      ${starsHtml}
    </span>
  `;
}

// STEP 5: Render the selected recipe into the DOM
function renderRecipe(recipe) {
  const container = document.querySelector('.recipe-containerhere');
  container.innerHTML = `
    <article class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.title}">
      <div class="recipe-content">
        <span class="category">${recipe.category || 'Recipe'}</span>
        <h2>${recipe.title}</h2>
        <p>${recipe.description}</p>
        ${renderTags(recipe.tags || [])}
        ${renderRating(recipe.rating || 0)}
      </div>
    </article>
  `;
}

// STEP 6: Init function to run on page load
function init() {
  const randomRecipe = getRandomRecipe();
  renderRecipe(randomRecipe);
}

// STEP 7: Wait for DOM to load
document.addEventListener('DOMContentLoaded', init);
