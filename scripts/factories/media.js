function mediaFactory(mediadata) {
 console.log('donnée reçu en para par la media factory ej stringify'+ JSON.stringify(mediadata));

    const {id, photographerId, title, image, video, likes, date, price } = mediadata;
    const cardsContainer = document.getElementById('cards-container');
    const modalContent = document.getElementById('modalContent'); 
    // mediadata.forEach(image => {
        console.log('id'+ id); 
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
                            <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                        </video>
                    </div>
    
                    `; 
                }
                cardImg.innerHTML += 
                `
                    <div class="txt-box">
                    <p> ${title} </p>
                    <div class="likes-wrap">
                    ${likes}
                    <i class="fa fa-solid fa-heart"></i>
                    </div>
                    </div>    
                `;
                
            cardsContainer.appendChild(cardImg);    
            return (cardImg);
        }

        function getLightboxCardDOM() {
            console.log('coucou');
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
                        <source src="${videoUrl}" type="video/mp4">
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


        return { getMediaCardDOM , getLightboxCardDOM}
    // });

}