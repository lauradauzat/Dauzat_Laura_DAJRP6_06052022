function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute('onclick',`OpenPhotographerPage(${id})`);
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

        // container.innerHTML = `
        // <div class="left"> 
            
        //     <h1>${name}</h1>
        //     <p class="city">${city}, ${country}</p>
        //     <p class="tag">${tagline}</p>
        // </div>

        // <div class="middle">
        //          <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        // </div>

        // <div class="right">
            
        //     <img src="${picture}" alt="${name}" id="${id}">
        // </div>
        // `; 
        return (container);
    }

    
    return { name, picture, getUserCardDOM, getHeaderForPhotographerPage }
}

// function mediaFactory(data) {
//     // console.log('iugiuiugig'+JSON.stringify(data))
//     const {id, photographerId, title, image, likes, date, price } = data;
//     const cardsContainer = document.getElementById('cards-container');
//     data.forEach(image => {
//         console.log('lop'+image.title); 
//         const pic = `assets/photos/${image.image}`;

//         //function getImgs() {
//             const cardImg = document.createElement( 'div' );
//                 cardImg.setAttribute('class',`img-container`);
//                 cardImg.setAttribute('id',`img-${image.id})`);
//                 cardImg.innerHTML = `
//                 <div class="img-box">       
//                     <img src="${pic}" alt="${image.title}" id="${image.id}">
//                 </div>
//                 <div class="txt-box">
//                     <p> ${image.title} </p>
//                     <div class="likes-wrap">
//                     ${image.likes}
//                     <i class="fa fa-solid fa-heart"></i>
//                     </div>
//                 </div>    

//                 `; 
//             cardsContainer.appendChild(cardImg);    
//                 //return (cardImg);
//         //}
//         //return {id, title, image, pic, getImgs}
//     });

// }