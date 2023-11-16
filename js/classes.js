import { fetchApi, fetchAxiosByName } from "./functions.js";

export default class Country {
  constructor(data) {
    if (data) {
      // If data is provided, initialize from data
      this.initializeFromData(data);
    } else {
      // If no data is provided, create an empty object
      this.name = {};
      this.capital = {};
      // Initialize other fields as needed
    }
  }

  // Constructor to copy from an existing country object
  static copyFromCountry(existingCountry) {
    const newCountry = new Country();
    Object.assign(newCountry, existingCountry);
    return newCountry;
  }

  // Constructor to set fields individually
  static initWithFields(
    commonName,
    officialName,
    capitalName,
    capitalLatlng
    // Add other fields as needed
  ) {
    const newCountry = new Country();
    newCountry.name = {
      common: commonName,
      official: officialName,
    };
    newCountry.capital = {
      name: capitalName,
      latlng: capitalLatlng,
    };
    // Set other fields here
    return newCountry;
  }

  // Initialize the country instance from data
  initializeFromData(data) {
    this.name = {
      common: data.name.common,
      official: data.name.official,
    };
    if (data.capital) {
      this.capital = {
        name: data.capital[0],
        latlng: data.capitalInfo.latlng,
      };
    }
    else {
      this.capital = {
        name: 'no capital',
        latlng: []
      };
    }
    this.area = data.area;
    this.population = data.population;
    this.region = data.region;
    this.subregion = data.subregion;
    this.languages = data.languages;
    this.demonyms = data.demonyms;
    this.flags = data.flags;
    this.currencies = data.currencies;
    this.timezones = data.timezones;
    this.maps = data.maps;
    this.tld = data.tld;
    this.translations = data.translations;
  }
  #borderCountryApi(url){
   
  }

  #renderFullCountry(country) {

    const countriesDiv = document.querySelector('#countries');
    countriesDiv.innerHTML = '';

    const countryDiv = document.querySelector('#country');
    countryDiv.innerHTML = ''
    const countryHolder = document.createElement('div');
    countryHolder.className = 'country-holder row justify-content-center align-items-center';
    countryDiv.append(countryHolder)
    const countryContentHolder = document.createElement('div');
    countryContentHolder.className='row col-12 col-sm-6 col-md-4'
    countryContentHolder.innerHTML = `
  <h3 class='text-center'>${country.name.official}</h3>
  <img src=${country.flags.png} alt='flag'>
  <h5>Population: ${country.population}</h5>
  <h5>Region: ${country.region}</h5> 
  <h5>Capital:${country.capital.name}</h5> 
  `;
    countryHolder.append(countryContentHolder)
    const countryCBordersHolder = document.createElement('div');
    countryHolder.append(countryCBordersHolder)
    countryCBordersHolder.className='m-1 col-10 col-sm-6 col-md-4 border_country'
    if(country.borders.length!==0){
    countryCBordersHolder.innerHTML += '<h5>Borders:</h5>';
    country.borders.map(border => {
      const borderElement = document.createElement('a');
      countryCBordersHolder.append(borderElement)
      borderElement.className = 'm-2';
      borderElement.id = border;
      borderElement.textContent = border;
      borderElement.style.color= 'white';
      // Add event listener to each dynamically created <a> tag
      borderElement.addEventListener('click', () => {
        console.log(country);
        let urlByName = `https://restcountries.com/v3.1/alpha/${border}`;
        fetchApi(urlByName,{})
          .then(res => {console.log('hiii');this.#renderFullCountry(res[0])})
          .catch(err => new Error(err));})
      });
    }
    // country.borders.map(border => countryCBordersHolder.innerHTML +=`<a class='border' id=${border}>${border}</a>`);
    countryDiv.append(countryHolder);
    const mapHolder = document.createElement('div');
    countryHolder.append(mapHolder)
    mapHolder.className = 'map col-12 col-sm-9 col-md-5';
    // const mapHolder = document.querySelector('.map');
    const mapContent = document.createElement('div');
    mapHolder.append(mapContent);
    mapContent.id = `map${country.ccn3}}`;
    mapContent.className = "mapContent w-100";
    const map = L.map(mapContent.id).setView([country.latlng[0], country.latlng[1]], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    countryHolder.append(countryContentHolder, countryCBordersHolder, mapHolder);
  }


  AllMyElementApi(countryName) {
    let urlByName = `https://restcountries.com/v3.1/name/${countryName}`;
    fetchApi(urlByName, {})
      .then(res => this.#renderFullCountry(res[0]))
      .catch(err => new Error(err));
  }

  renderElement() {
    const countryHolder= document.querySelector('.country-holder');
    const country= document.querySelector('#country')
    if(countryHolder)
    {
      country.innerHTML='';
      countryHolder.innerHTML='';
    }
    const countriesDiv = document.querySelector('#countries');
    const col = document.createElement('div');
    col.className = 'col-11  col-md-4 col';
    const card = document.createElement('div');
    card.setAttribute("data-aos", "fade-right");
    card.setAttribute("data-aos-offset", "300");
    card.setAttribute("data-aos-easing", "ease-in-sine");
    col.append(card);
    card.id = this.name.official;
    card.classList.add('card', 'border-white','w-100');
    const languagesContainer = document.createElement('div');
    const lang = document.createElement('h6');
    lang.textContent = `Languages:`;
    languagesContainer.append(lang)
    // Iterate over the keys of the languages object
    for (const key in this.languages) {
      if (this.languages.hasOwnProperty(key)) {
         lang.textContent += `${this.languages[key]}  `;
      }
    }

    const coinsContainer = document.createElement('div');
    const coins = document.createElement('h6');
    coins.textContent = 'Coins:';
    coinsContainer.append(coins)
    // Iterate over the keys of the languages object
    for (const key in this.currencies) {
      if (this.currencies.hasOwnProperty(key)) {
        coins.textContent += this.currencies[key].name+' ,';
        coins.textContent += 'symbol:'+this.currencies[key].symbol;
        
      }
    }

    card.innerHTML = `
      <h3 class='h-25'>${this.name.official}</h3>
      <img src=${this.flags.png} alt='flag' class='h-25'>
      <h6>Population: ${this.population}</h6>
      <h6>Region: ${this.region}</h6> 
      <h6>Capital:${this.capital.name}</h6>   
  `;

    const btnShowMore = document.createElement('button');
    btnShowMore.textContent = 'Show More';
    btnShowMore.id = this.name.official;
    btnShowMore.classList.add('btn', 'border-black', 'w-75','btn-show-more');
    btnShowMore.addEventListener('click', () => this.AllMyElementApi(btnShowMore.id));

    // Append the languagesContainer and coinsContainer to the card
    card.append(languagesContainer, coinsContainer, btnShowMore);

    // Add a container for additional details (hidden by default)
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');
    detailsContainer.style.display = 'none';

    // Append additional details to the detailsContainer
    detailsContainer.innerHTML = `
    <h5>Area: ${this.area}</h5>
    <h5>Subregion: ${this.subregion}</h5>
    <!-- Add more details as needed -->
  `;

    // Append the detailsContainer to the card
    card.append(detailsContainer);

    countriesDiv.append(col);
     AOS.init();
     card.addEventListener('mouseenter', () => {
      // Change AOS animation on hover
      card.setAttribute("data-aos", "zoom-in");
    });
  
  }


}

