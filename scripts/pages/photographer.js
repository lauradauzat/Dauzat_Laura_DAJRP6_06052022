

//Mettre le code JavaScript lié à la page photographer.html

let data; 
let photographer; 
let media; 

const totalLikeContainer = document.getElementById('total-likes'); 
const priceContainer = document.getElementById('price'); 


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
    data = await response.json();
  
          photographer = data.photographers.find((photographer) => {
              return photographer.id == searchedId;
          });
          media = data.media.filter((item) => {
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



async function displayHeader(photographer) {
    const photographersHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getHeaderForPhotographerPage();
    photographersHeader.appendChild(userCardDOM);
  
};

let totalLikesCounter = 0; 

async function displayPhotos(media) {
  const cardsContainer = document.getElementById('cards-container'); 
  
  media.forEach(image => {
    console.log('foreach' + JSON.stringify(image));
    const mediaModel =  mediaFactory(image);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    cardsContainer.appendChild(mediaCardDOM); 
    totalLikesCounter += image.likes; 
    console.log('loop'+ totalLikesCounter);
  });  

  console.log('counter tital' + totalLikesCounter);
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
    countTotalLikes();
    displayPrice();
};

init();

const select = document.getElementById('order-select');

//following code moved to select.js 

// select.addEventListener("change", function() {
//   console.log(select.value);
//   if (select.value === "date") {
//       media.sort(function(a, b) {
//       var c = new Date(a.date);
//       var d = new Date(b.date);
//       return d-c;
   
  
//    });
//   console.log(media)

//   }

//   if (select.value === "popularité")  {
//     media.sort(function(a, b) {
//       return a.likes - b.likes;
//     });
//     media.reverse();

//   }

//   if (select.value === "titre") {
//     media.sort((a, b) => {
//       let ma = a.title.toLowerCase(),
//           mb = b.title.toLowerCase();
  
//       if (ma < mb) {
//           return -1;
//       }
//       if (ma > mb) {
//           return 1;
//       }
//       return 0;
//   });
//   }
//   const cardsContainer = document.getElementById('cards-container'); 
//   cardsContainer.innerHTML = ''; 
//   displayPhotos(data.media);
// });

//gestion de la lightbox 

const lightbox = document.getElementById('lightbox'); 
const lbContent = document.getElementById('modalContent');
const modalContent = document.getElementById('modalContent'); 
const insideModal = document.getElementById('insideModal');
let currentImgId = 0;

function openLB(cardId) {
  currentImgId = cardId; 
  insideModal.innerHTML =  ` <span class="close" onclick="closeLightbox()">&times;</span>`;
  lightbox.style.display = "block";
  const selectedImg = media.filter((item) => {
    return item.id == cardId;

  });
//   console.log('select' + JSON.stringify(selectedImg));
//  console.log('oiuoiuoiu'+selectedImg[0].title);
//  console.log(Object.values(selectedImg));


  const mediaModel =  mediaFactory(selectedImg[0]);
  const selectedCardDOM = mediaModel.getLightboxCardDOM();
  insideModal.appendChild(selectedCardDOM)
  

}

function closeLightbox() {
  lightbox.style.display = "none"; 
}





leftBtn = document.getElementById('left'); 
rightBtn = document.getElementById('right'); 



function goLeft() {
  //console.log();('left' + currentImgId );
  const currentIndex = media.map(object => object.id).indexOf(currentImgId);
  let previousIndex = ''; 
    //repartir au dernier élément si first el
    if (currentIndex === 0) {
      previousIndex = media.length - 1;
    } 
    //boucle left classique 
    else {
      previousIndex = (currentIndex - 1) % media.length;
    }
     media[previousIndex];
    //console.log(media[previousIndex].title);
    insideModal.innerHTML =  ` <span class="close" onclick="closeLightbox()">&times;</span>`;
    const mediaModel =  mediaFactory(media[previousIndex]);
    const selectedCardDOM = mediaModel.getLightboxCardDOM();
    insideModal.appendChild(selectedCardDOM); 
    currentImgId = media[previousIndex].id;
    console.log(currentIndex);
    console.log(media.length);

}

function goRight() {
    console.log('right' + currentImgId ); 
    const currentIndex = media.map(object => object.id).indexOf(currentImgId);
    const nextIndex = (currentIndex + 1) % media.length;
     media[nextIndex];
    console.log(media[nextIndex].title);
    insideModal.innerHTML =  ` <span class="close" onclick="closeLightbox()">&times;</span>`;
    const mediaModel =  mediaFactory(media[nextIndex]);
    const selectedCardDOM = mediaModel.getLightboxCardDOM();
    insideModal.appendChild(selectedCardDOM)
    currentImgId = media[nextIndex].id;
    console.log(nextIndex);
    console.log(media.length);

}


function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}


//handle likes

//voir avec Steeve addEventListener ne marche pas 

let liked = false; 
function addLike(likes, id) {
  console.log('coucou' + likes);
  liked = true ;
  let currentImg = media.filter((item) => {
    return item.id == id;
  });
  currentImg.likes = likes + 1
  console.log(currentImg.likes);
  const mediaModel =  mediaFactory(currentImg[0]);
  mediaModel.refreshLikes();
  totalLikesCounter++ ; 
  countTotalLikes();
  
}

//const likeButtons = document.querySelectorAll(".likes-wrap")
// for (const button of likeButtons) {
//   button.addEventListener('click', function(event) {
//     console.log('coucou' + button.value );
//   })
// }

function toFrontPage() {
  window.open('/'); 
}

function countTotalLikes() {
  totalLikeContainer.innerText = totalLikesCounter;
}

function displayPrice() {
 priceContainer.innerText = photographer.price; 
}