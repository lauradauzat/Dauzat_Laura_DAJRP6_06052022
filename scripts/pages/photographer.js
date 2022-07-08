

//Mettre le code JavaScript lié à la page photographer.html

let data; 
let photographer; 
let media; 

const totalLikeContainer = document.getElementById('total-likes'); 
const priceContainer = document.getElementById('price'); 
leftBtn = document.getElementById('left');
rightBtn = document.getElementById('right');
const contactModal = document.getElementById('contact-modal'); 



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
   
    // let likesDisplay = likesDisplayEl.textContent; 
    // console.log('--------------' + likesDisplay);
    //totalLikesCounter += likesDisplay; 
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
  insideModal.innerHTML =  ` <button class="close" onclick="closeLightbox()"  tabindex="0">&times;</button>`;
  lightbox.style.display = "block";

  const selectedImg = media.filter((item) => {
    return item.id == cardId;

  });
//   console.log('select' + JSON.stringify(selectedImg));
//  console.log('oiuoiuoiu'+selectedImg[0].title);
//  console.log(Object.values(selectedImg));


  const mediaModel =  mediaFactory(selectedImg[0]);
  const selectedCardDOM = mediaModel.getLightboxCardDOM();
  insideModal.appendChild(selectedCardDOM); 
 
  leftBtn.focus();
  console.log(document.activeElement);
  
  

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
    insideModal.innerHTML =  ` <button class="close" onclick="closeLightbox()" tabindex="0">&times;</button>`;
    const mediaModel =  mediaFactory(media[previousIndex]);
    const selectedCardDOM = mediaModel.getLightboxCardDOM();
    insideModal.appendChild(selectedCardDOM); 
    currentImgId = media[previousIndex].id;
    console.log(currentIndex);
    console.log(media.length);
    leftBtn.focus();

}

rightBtn.addEventListener('click', goRight);
leftBtn.addEventListener('click', goLeft);

function goRight() {
    console.log('right' + currentImgId ); 
    insideModal.innerHTML = '';
    const currentIndex = media.map(object => object.id).indexOf(currentImgId);
    const nextIndex = (currentIndex + 1) % media.length;
     media[nextIndex];
    console.log(media[nextIndex].title);
    const closeBtn = document.createElement('button'); 
    closeBtn.className = 'close'; 
    closeBtn.setAttribute('tabindex','0' ); 
    closeBtn.innerHTML = '&times'; 
    closeBtn.addEventListener('click', closeLightbox);
    insideModal.appendChild(closeBtn);
    //insideModal.innerHTML =  ` <button class="close" onclick="closeLightbox()" tabindex="0">&times;</button>`;
    const mediaModel =  mediaFactory(media[nextIndex]);
    const selectedCardDOM = mediaModel.getLightboxCardDOM();
    insideModal.appendChild(selectedCardDOM)
    currentImgId = media[nextIndex].id;
    console.log(nextIndex);
    console.log(media.length);
    rightBtn.focus();

}


function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}


//handle likes

//voir avec Steeve addEventListener ne marche pas 

function addLike(likes, id) {  
  let currentImg = media.filter((item) => {
    return item.id == id;
  });
  const mediaModel =  mediaFactory(currentImg[0]);
  mediaModel.refreshLikes();
 // totalLikesCounter++ ; 
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
  var array = document.querySelectorAll('.likes-wrap'); 
  let newVarForLikes= 0; 
  for (const value of array) {
    console.log(parseInt(value.textContent));
    newVarForLikes += parseInt(value.textContent); 
  }

  totalLikeContainer.innerText = newVarForLikes; 
  //totalLikeContainer.innerText = totalLikesCounter;
}

function displayPrice() {
 priceContainer.innerText = photographer.price; 
}


// accessibilité 

function handlekp(e, id){
  //press  enter
  if(e.keyCode === 13){
      e.preventDefault(); // Ensure it is only this code that runs
      openLB(id);
  }

}



function handleKD(e)  {
 
    console.log('kd'); 
  if (e.keyCode == '37') {
     // left arrow
     goLeft();
  }
  if (e.keyCode == '39') {
     // right arrow
     goRight();
  }

  if(e.keyCode === 27){
    closeLightbox();
  }
}

const sc = document.getElementById('sc'); 
const cf = document.getElementById('cf-first');

function detectTabKey(e) {
  //tab
    if (e.keyCode == 9) {
      //on select
      if (sc === document.activeElement) {
        console.log('Element has focus!');
        // let elements = document.getElementsByClassName('select-items');
        // el = elements[0];
        // el.removeAttribute('select-hide'); 
    
      }
      else {
          console.log(`Element is not focused.`);
          console.log(document.activeElement);
      }
    }

}


  //enter
  if (sc === document.activeElement && e.keyCode == 13 ) {
    console.log('enter on modal');
    contactModal.click();
    
  }