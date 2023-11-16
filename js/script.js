import { fetchAxios, fetchAxiosByName, renderMyElement } from '../js/functions.js'
import { createNameSelector , renderPage} from '../js/renders.js'
import Country from '../js/classes.js';

let options = {};
let urlByName='https://restcountries.com/v3.1/name/';

const basicCountriesApi = async () => {

    const options = {}; 
    const baseCountries = ['usa', 'israel', 'uk', 'france', 'thailand'];

    for (let i = 0; i < baseCountries.length; i++) {
        const element = baseCountries[i];
        const baseCountryJson = await fetchAxiosByName(urlByName , element);
        const baseCountry = baseCountryJson.map(country => new Country(country))
        renderMyElement(baseCountry[0]);
    }
};

//the select call from api
const selectorApi = async () => {
    options = {};
    options.fields = 'name,idd';
    const url = 'https://restcountries.com/v3.1/independent?';
    const countryData = await fetchAxios(url, options);
    createNameSelector(countryData);
}

renderPage();
selectorApi();
basicCountriesApi();






