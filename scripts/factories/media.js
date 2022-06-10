function mediaFactory(data) {
    // console.log('iugiuiugig'+JSON.stringify(data))
    const {id, photographerId, title, image, video, likes, date, price } = data;
    const cardsContainer = document.getElementById('cards-container');
    // data.forEach(image => {
        console.log('lop'+title); 
        let pic ='';
        let videoUrl = '';
        if (data.hasOwnProperty('image')) {
            pic = `assets/photos/${image}`;
        } else if (data.hasOwnProperty('video')) 
        {
            console.log('video');
            videoUrl= `./assets/photos/${video}`;
        };
        

        function getMediaCardDOM() {
            const cardImg = document.createElement( 'div' );
                cardImg.setAttribute('class',`img-container`);
                cardImg.setAttribute('id',`img-${id})`);
                if (data.hasOwnProperty('image')) {
                    cardImg.innerHTML = `
                    <div class="img-box">       
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
        return { getMediaCardDOM }
    // });

}