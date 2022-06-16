//Mettre le code JavaScript lié à la page photographer.html

let data; 
let photographer; 
let media; 




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


async function displayPhotos(media) {
  const cardsContainer = document.getElementById('cards-container'); 
  
  media.forEach(image => {
    console.log('foreach' + JSON.stringify(image));
    const mediaModel =  mediaFactory(image);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    cardsContainer.appendChild(mediaCardDOM)

  });  
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

const select = document.getElementById('order-select');

select.addEventListener("change", function() {
  console.log(select.value);
  if (select.value === "date") {
      media.sort(function(a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return d-c;
   
  
   });
  console.log(media)

  }

  if (select.value === "popularité")  {
    media.sort(function(a, b) {
      return a.likes - b.likes;
    });
    media.reverse();

  }

  if (select.value === "titre") {
    media.sort((a, b) => {
      let ma = a.title.toLowerCase(),
          mb = b.title.toLowerCase();
  
      if (ma < mb) {
          return -1;
      }
      if (ma > mb) {
          return 1;
      }
      return 0;
  });
  }
  const cardsContainer = document.getElementById('cards-container'); 
  cardsContainer.innerHTML = ''; 
  displayPhotos(data.media);
});

const lightbox = document.getElementById('lightbox'); 
const lbContent = document.getElementById('modalContent');
const modalContent = document.getElementById('modalContent'); 

function openLB(cardId) {
  lbContent.innerHTML =  ` <span class="close" onclick="closeLightbox()">&times;</span>`;
  lightbox.style.display = "block";
  const selectedImg = media.filter((item) => {
    return item.id == cardId;
  });
//   console.log('select' + JSON.stringify(selectedImg));
//  console.log('oiuoiuoiu'+selectedImg[0].title);
//  console.log(Object.values(selectedImg));


  const mediaModel =  mediaFactory(selectedImg[0]);
  const selectedCardDOM = mediaModel.getLightboxCardDOM();
  lbContent.appendChild(selectedCardDOM)
  


}

function closeLightbox() {
  lightbox.style.display = "none"; 
}

const titleName = document.getElementById('contact-name'); 


function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
  titleName.innerHTML += `${photographer.name}`
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

