const toggleBtn = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

if (toggleBtn && nav) {
  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

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

      // Ensure alt attribute is never empty
      const altText = recipe.title ? recipe.title : "Recipe image";

      card.innerHTML = `
        <img src="${recipe.image}" alt="${altText}">
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

  // This second DOMContentLoaded inside the first looks redundant, so I'll merge it here
  const params = new URLSearchParams(window.location.search);
  const recipeName = params.get("recipe");

  const recipeData = {
    "pancit-canton": {
      title: "🍜 Pancit Canton",
      ingredients: [
        "200g pancit canton noodles",
        "1 cup chopped cabbage",
        "1/2 cup sliced carrots",
        "1/2 cup sliced green beans",
        "1 onion, sliced",
        "2 garlic cloves, minced",
        "1/2 cup sliced chicken or pork",
        "2 tbsp soy sauce",
        "1 tbsp oyster sauce",
        "Salt and pepper to taste",
        "1 tbsp oil"
      ],
      instructions: [
        "Heat oil in a pan and sauté garlic and onions until fragrant.",
        "Add chicken or pork, cook until browned.",
        "Add vegetables and stir-fry for 3–4 minutes.",
        "Pour in soy sauce and oyster sauce. Mix well.",
        "Add pancit canton noodles and 1/2 cup water.",
        "Simmer until noodles are soft and sauce is absorbed.",
        "Serve hot with calamansi if desired."
      ]
    },
    "halo-halo": {
      title: "🍧 Halo-Halo",
      ingredients: [
        "1/2 cup shaved ice",
        "2 tbsp sweetened bananas (saba)",
        "2 tbsp sweetened red mung beans",
        "2 tbsp sweetened jackfruit",
        "2 tbsp sweetened coconut",
        "1 scoop ube ice cream",
        "1 slice leche flan",
        "Evaporated milk"
      ],
      instructions: [
        "In a tall glass, layer all sweetened fruits and jellies.",
        "Add shaved ice on top.",
        "Pour evaporated milk generously over the ice.",
        "Top with leche flan and ube ice cream.",
        "Serve immediately and mix before eating!"
      ]
    }
  };

  if (recipeName) {
    const recipe = recipeData[recipeName];

    if (recipe) {
      document.getElementById("recipe-title").textContent = recipe.title;

      const ingList = document.getElementById("ingredients-list");
      ingList.innerHTML = "";
      recipe.ingredients.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ingList.appendChild(li);
      });

      const instList = document.getElementById("instructions-list");
      instList.innerHTML = "";
      recipe.instructions.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        instList.appendChild(li);
      });
    } else {
      document.getElementById("recipe-title").textContent = "Recipe not found.";
    }
  }
});
