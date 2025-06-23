import { recipes } from './recipes.mjs';

// STEP 1: Random number generator
function random(num) {
  return Math.floor(Math.random() * num);
}

// STEP 2: Get random recipe from the list
function getRandomRecipe() {
  return recipes[random(recipes.length)];
}

// STEP 3: Generate tags HTML (hidden with visually-hidden class)
function renderTags(tags = []) {
  return `<div class="visually-hidden">` + tags.map(tag => `
    <span class="category-tag">${tag}</span>
  `).join('') + `</div>`;
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

// STEP 5: Template function for recipe card
function recipeTemplate(recipe) {
  return `
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

// STEP 6: Render an array of recipes
function renderRecipes(recipeList) {
  const container = document.querySelector('.recipe-containerhere');
  const recipesHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
  container.innerHTML = recipesHTML;
}

// STEP 7: Filter recipes based on search query
function filterRecipes(query) {
  if (!query) return recipes;

  return recipes.filter(recipe => {
    const titleMatch = recipe.title.toLowerCase().includes(query);
    const descMatch = recipe.description.toLowerCase().includes(query);
    const tagsMatch = recipe.tags && recipe.tags.find(tag => tag.toLowerCase().includes(query));
    return titleMatch || descMatch || tagsMatch;
  }).sort((a, b) => a.title.localeCompare(b.title));
}

// STEP 8: Search handler when search button clicked
function searchHandler(event) {
  event.preventDefault(); // prevent form submission reload
  const query = document.getElementById('search-input').value.toLowerCase();
  const filtered = filterRecipes(query);
  renderRecipes(filtered);
}

// STEP 9: Init function to render random recipe and add search listener
function init() {
  const randomRecipe = getRandomRecipe();
  renderRecipes([randomRecipe]);

  // Attach event listener for search button
  document.getElementById('search-button').addEventListener('click', searchHandler);
}

// STEP 10: Wait for DOM to load then call init
document.addEventListener('DOMContentLoaded', init);
