function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute('onclick',`OpenPhotographerPage(${id})`);
        article.setAttribute('tabIndex', '0');
        article.setAttribute('onkeypress', `checkIfEnter(event, ${id})` )
        article.innerHTML = `<img src="${picture}" alt="${name}" id="${id}">
        <h2>${name}</h2>
        <h3>${city}, ${country}</h3>
        <p>${tagline}</p>
        <span>${price}€/jour</span>
        `; 
        return (article);
    }

    function getHeaderForPhotographerPage() {
        const container = document.createElement( 'div' );
        container.setAttribute('class',`header-container`);
        container.setAttribute('id',`header-(${id})`);
        const leftBlock = document.createElement('div'); 
        leftBlock.setAttribute('class', 'left'); 
        container.appendChild(leftBlock); 
        const H1 = document.createElement('H1'); 
        H1.textContent = `${name}`;
        const cityContainer = document.createElement('p'); 
        cityContainer.setAttribute('class', 'city'); 
        cityContainer.textContent  = `${city}, ${country}`; 
        const tag = document.createElement('p'); 
        tag.setAttribute('class', 'tag'); 
        tag.textContent = `${tagline}`; 

        leftBlock.appendChild(H1); 
        leftBlock.appendChild(cityContainer); 
        leftBlock.appendChild(tag); 
  
        const blocB = document.createElement('div'); 
        blocB.className = 'middle'; 
        const btn = document.createElement('button'); 
        btn.className = 'contact_button'; 
        btn.innerText = `Contactez-moi`; 
        blocB.appendChild(btn); 
        container.appendChild(blocB); 

        const right = document.createElement('div'); 
        right.setAttribute('class', 'right'); 
        container.appendChild(right); 
        const img = document.createElement('img'); 
        img.setAttribute('src', `${picture}`); 
        img.setAttribute('alt', `${name}`); 
        img.setAttribute('id', `${id}`); 
        right.appendChild(img); 


        btn.addEventListener('click', displayModal); 

        return (container);
    }

    
    return { name, picture, getUserCardDOM, getHeaderForPhotographerPage }
}