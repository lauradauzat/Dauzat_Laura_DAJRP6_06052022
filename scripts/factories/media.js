function mediaFactory(mediadata) {
 //console.log('donnée reçu en para par la media factory ej stringify'+ JSON.stringify(mediadata));

    const {id, photographerId, title, image, video, likes, date, price } = mediadata;
    const cardsContainer = document.getElementById('cards-container');
    const modalContent = document.getElementById('modalContent'); 
    const likeContainer = document.getElementById(`like${id}`);
    
        // console.log('id'+ id); 
        let pic ='';
        let videoUrl = '';
        if (mediadata.hasOwnProperty('image')) {
            pic = `assets/photos/${image}`;
        } else if (mediadata.hasOwnProperty('video')) 
        {
            console.log('video');
            videoUrl= `./assets/photos/${video}`;
        };
        

        function getMediaCardDOM() {
            const cardImg = document.createElement( 'div' );
                cardImg.setAttribute('class',`img-container`);
                cardImg.setAttribute('id',`${id}`);
                if (mediadata.hasOwnProperty('image')) {
                    cardImg.innerHTML = `
                    <div class="img-box" tabindex=0 onclick="openLB(${id})" onkeypress="handlekp(event, ${id})" id="${id}">       
                        <img src="${pic}" alt="${title}" id="${id}">
                    </div>
    
                    `; 
                }
                else 
                {
                    cardImg.innerHTML = `
                    <div class="img-box">       
                        <video controls>
                            <source src="${videoUrl}" alt="video called ${title}" type="video/mp4">
                        Your browser does not support the video tag.
                        </video>
                    </div>
    
                    `; 
                }
                cardImg.innerHTML += 
                `
                    <div  class="txt-box">
                    <p> ${title} </p>
                    <div id="like${id}" aria="liker l'élément" onclick="addLike(${likes}, ${id})" class="likes-wrap">
                    ${likes}
                    <i  class="fa fa-solid fa-heart"></i>
                    </div>
                    </div>    
                `;
                
            cardsContainer.appendChild(cardImg);    
            return (cardImg);
        }

        function refreshLikes(){
            let newLikes = likes + 1 
            likeContainer.innerHTML = ''; 
            likeContainer.innerHTML = `
            ${newLikes}
            <i  class="fa fa-solid fa-heart"></i>
            `; 
        }

        function getLightboxCardDOM() {
            //console.log('coucou');
            const cardImg = document.createElement( 'div' );
            cardImg.setAttribute('class',`img-container`);
            cardImg.setAttribute('id',`${id}`);
            
            if (mediadata.hasOwnProperty('image')) {
                cardImg.innerHTML = `
                <div class="img-box" onclick="openLB(${id})">       
                    <img src="${pic}" alt="${title}" id="${id}">
                </div>

                `; 
            }
            else 
            {
                cardImg.innerHTML = `
                <div class="img-box">       
                    <video controls>
                        <source src="${videoUrl}" type="video/mp4" alt="video called ${title}">
                    Your browser does not support the video tag.
                    </video>
                </div>

                `; 
            }
            cardImg.innerHTML += 
            `
                <div class="txt-box">
                <p> ${title} </p>
                </div>    
            `;
            
        modalContent.appendChild(cardImg);    
        return (cardImg);
        }


        return { getMediaCardDOM , getLightboxCardDOM, refreshLikes}
 

}