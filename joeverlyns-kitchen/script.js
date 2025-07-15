const toggleBtn = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

toggleBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
});

import { recipes } from './recipes.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.search-formholder');
  const input = form.querySelector('input[type="search"]');
  const resultsContainer = document.getElementById('filtered-recipes');
const defaultSection = document.getElementById('default-recipe');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hide the default recipe only when searching
    if (defaultSection) {
      defaultSection.style.display = 'none';
    }

    const query = input.value.trim().toLowerCase();
    resultsContainer.innerHTML = '';

    if (!query) return;

    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = '<p>No matching recipes found.</p>';
      return;
    }

    filtered.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';

      const ingredientsHTML = recipe.ingredients
        .map(ing => `<li>${ing}</li>`)
        .join('');

      const instructionsHTML = recipe.instructions
        .map((step, index) => `<li><strong>Step ${index + 1}:</strong> ${step}</li>`)
        .join('');

        card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h1>${recipe.title}</h1>
        <p>${recipe.description}</p>
        <h2>Ingredients:</h2>
        <ul>${ingredientsHTML}</ul>
        <h2>Instructions:</h2>
        <ol>${instructionsHTML}</ol>
      `;

      resultsContainer.appendChild(card);

      
    });
  });
});
