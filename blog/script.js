const container = document.getElementById('articles-container'); // updated selector


articles.forEach(article => {
	const articleElement = document.createElement('article');
	articleElement.classList.add('article');

	articleElement.innerHTML = `
		<img src="${article.imgSrc}" alt="${article.imgAlt}">
		<h2>${article.title}</h2>
		<time datetime="${new Date(article.date).toISOString()}" class="meta">${article.date}</time>
		<p>${article.description}</p>
		<p><strong>Ages:</strong> ${article.ages}</p>
		<p><strong>Genre:</strong> ${article.genre}</p>
		<p><strong>Rating:</strong> ${article.stars}</p>
	`;

	container.appendChild(articleElement);
});
