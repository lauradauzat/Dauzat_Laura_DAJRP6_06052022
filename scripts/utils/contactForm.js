
const titleName = document.getElementById('contact-name'); 
const inputs = document.querySelectorAll(".form-input");
const form = document.getElementById('form');
const firstInput = document.getElementById('cf-first');
const modal = document.getElementById("contact_modal");

//setting checks for inputs 
let firstOk = false; 
let lastOk = false; 
let emailOk  = false; 

let prenom = ''; 
let nom = ''; 
let email = ''; 
let message = ''; 

inputs.forEach((input) => input.addEventListener('change', checkValue));
form.addEventListener('submit', handleSubmit);


//regex 
//General Email Regex (RFC 5322 Official Standard)
emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//Verify if name contains at least One letter - avoid 2 space characther for instance
nameReg = /[a-zA-Z]/;


function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
  titleName.innerHTML = 'Contactez-moi <br>';
  titleName.innerHTML += `${photographer.name}`; 
  console.log(form);
  modal.focus(); 
  
}


function closeModal() {
 
  modal.style.display = "none";
  
}


function clearData() {
  prenom = ''; 
  nom = ''; 
  email = ''; 
  message = ''; 
}


function checkValue(e) {
  const value = e.target.value; 
  console.log('coucou valu'+value); 

  switch(e.target.name) {
    case "prenom" :
      if((e.target.value.length) > 1 && (value.match(nameReg))) {
        firstOk = true;
      } else {
        firstOk = false;
      } 
      console.log(firstOk);
      break;
    
    case "last" : 
        
      if((e.target.value.length) > 1 && (value.match(nameReg))) {
        lastOk = true;
       
      } else {
        lastOk = false;
        
      };
      console.log(lastOk);
      break;  

    case "email" : 

      console.log(value);

      if (value.match(emailReg)) {
        emailOk = true; 
        

      } else {
        emailOk = false; 
      

      };
      console.log('email ' + emailOk);
      break;  
      default:    console.log('Default, something went wrong');
  }
}
//&& lastOk && emailOk && birthOk && quantityOk && locationOk && cuOk
function handleSubmit(e) {
  e.preventDefault();
  console.log('handleSubmit');
  e.preventDefault();
  if (firstOk ){
    storeData();
  } else {
    console.log('false');

    if (!firstOk) {
      alert('Merci de compléter le champ prénom'); 
    }; 

    if (!lastOk) {
      alert('Merci de compléter le champ nom')
    }; 

    if(!emailOk){
      alert('Votre email n est pas valide'); 
    }

    return false;
  }
}

function storeData(){
  prenom = document.querySelector("input[name='prenom']").value;
  nom =  document.querySelector("input[name='nom']").value;
  email =  document.querySelector("input[name='email']").value;
  message = document.querySelector("input[name='message']").value;
  closeModal(); 
  alert(`
  Merci ${prenom} ${nom} pour votre message !
  La réponse du photographe arrive sur votre adresse mail : ${email}
  Votre message : ${message}
  `);
  clearData();
  
}