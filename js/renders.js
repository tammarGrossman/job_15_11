import { fetchAxiosByName ,renderMyElement} from "./functions.js";
import Country from "./classes.js";
let urlByName='https://restcountries.com/v3.1/name/'

const navBarApi = async (event)=>{
   cleanPage();
   const countryJson = await fetchAxiosByName(urlByName, event.target.id);
   const country = countryJson.map(country => new Country(country))
   renderMyElement(country[0]);
}

const selectedOptionApi = async(selectedOption) =>{
   cleanPage();
   const countryJson = await fetchAxiosByName(urlByName, selectedOption.id);
   const country = countryJson.map(country => new Country(country))
   renderMyElement(country[0]);
}
const searchCountryByInput=async()=>{
   cleanPage();
   const countryNameInput = document.getElementById('countryNameInput');
   if(countryNameInput==='')
      alert('Please press country name')
   else{
      const countryJson = await fetchAxiosByName(urlByName, countryNameInput.value);
      countryNameInput.value='';
      const country = countryJson.map(country => new Country(country))
      renderMyElement(country[0]);
   }
   
}
 const cleanPage=()=>{
   const countriesDiv= document.querySelector('#countries');
   countriesDiv.innerHTML=''
   const countryHolder=document.querySelector('.country-holder');
   if(countryHolder)
      countryHolder.innerHTML=''
 }


const renderPage=()=>{
document.addEventListener("DOMContentLoaded",(event)=>{
   const navbarNav = document.getElementById("navbarNav");
   navbarNav.addEventListener("click", function (event) {
       if (event.target.tagName === "A") {
           navBarApi(event);
       }
   });

   const selector = document.getElementById("selector");

   // Add a change event listener to the select element
   selector.addEventListener("change", function () {
       const selectedOption = selector.options[selector.selectedIndex];
       selectedOptionApi(selectedOption)
   });

   const searchBtn =document.querySelector('#searchCountryBtn');
   searchBtn.addEventListener('click',searchCountryByInput);

}
);
}


const createNameSelector = (countries) => {
   const selector = document.querySelector('#selector');
   countries.forEach((country) => {
     const option = document.createElement("option");
     option.value = country.name.official;
     option.text = country.name.official;
     option.id=country.name.official;
     selector.appendChild(option); // Append the option to the selector
   });
 };
 

 export { createNameSelector, renderPage};
 