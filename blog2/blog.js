const articles = [
  {
    id: 1,
    title: 'Septimus Heap Book One: Magyk',
    date: 'July 5, 2022',
    description: 'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
    imgAlt:  'Cover art of "Septimus Heap Book One: Magyk" by Angie Sage',
    ages: '10-14',
    genre: 'Fantasy',
    stars: '****'
  },
  {
    id: 2,
    title: 'Magnus Chase Book One: Sword of Summer',
    date: 'December 12, 2021',
    description: 'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
    imgSrc: 'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
    imgAlt: 'Illustrated cover of "Magnus Chase: Sword of Summer" by Rick Riordan',
    ages: '12-16',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('articles-container');

  articles.forEach(article => {
    const articleElement = document.createElement('article');
    articleElement.classList.add('article');

    articleElement.innerHTML = `
      <div class="details">
	    <time datetime="${new Date(article.date).toISOString()}" class="meta">${article.date}</time>
        <p><strong>Ages:</strong> ${article.ages}</p>
        <p><strong>Genre:</strong> ${article.genre}</p>
        <p><strong>Rating:</strong> ${article.stars}</p>
      </div>
      <div class="content">
        <h2>${article.title}</h2>
        <img src="${article.imgSrc}" alt="${article.imgAlt}">
        <p>${article.description}</p>
      </div>
    `;

    container.appendChild(articleElement);
  });
});
