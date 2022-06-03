//Mettre le code JavaScript lié à la page photographer.html

let data; 


function getIdFromParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id'); 
    return id; 
}
let result = {};

async function getPhotographerData(searchedId) {
   
  try {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
  
          const photographer = data.photographers.find((photographer) => {
              return photographer.id == searchedId;
          });
          const media = data.media.filter((item) => {
            return item.photographerId == searchedId;
          });
  
    return {photographer, media}; 
  } catch (error) {
    console.log(error.message);
    return null; 
  }

  }

id = getIdFromParams(); 
console.log('id : '+id);

// function printImg(imgs) {
//   const cardsContainer = document.getElementById('cards-container'); 
//   console.log('------'+imgs)
//   imgs.forEach(img => {
//     console.log(title);
//     const cardImg = document.createElement( 'div' );
//     cardImg.setAttribute('class',`img-container`);
//     cardImg.setAttribute('id',`img-(${id})`);
//     cardImg.innerHTML = `
//     <div >       
//         <img src="${picture}" alt="${title}" id="${id}">
//     </div>
//     `; 
//     cardsContainer.appendChild(cardImg); 

//   });
  
// }

async function displayHeader(photographer) {
    const photographersHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getHeaderForPhotographerPage();
    photographersHeader.appendChild(userCardDOM);
  
};


async function displayPhotos(media) {
  //const cardsContainer = document.getElementById('cards-container'); 
  const imgsCardsModel = mediaFactory(media); 
  //const imgDOM = imgsCardsModel.getImgs();
  //cardsContainer.appendChild(imgDOM); 

}



async function init() {
    // Récupère les datas des photographes
    data = await getPhotographerData(id); 
    //console.log('data : '+JSON.stringify(data));   
    displayHeader(data.photographer);
    displayPhotos(data.media);
    //console.log(data.media); 
};

init();