function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.innerHTML = `<img src="${picture}" alt="${name}">
        <h2>${name}</h2>
        <h3>${city}, ${country}</h3>
        <p>${tagline}</p>
        <span>${price}€/jour</span>
        `; 

        // const img = document.createElement( 'img' );
        // img.setAttribute("src", picture)
        // const h2 = document.createElement( 'h2' );
        // h2.textContent = name;
        // article.appendChild(img);
        // article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}