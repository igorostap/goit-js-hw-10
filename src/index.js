import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import fetchCountries  from './fetchCountries.js';
const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('input[id="search-box"]');
const listEl = document.querySelector('.country-list');

let country = '';
inputCountry.addEventListener('input', debounce(onInputCountry,DEBOUNCE_DELAY));



function onInputCountry(e) {
    e.preventDefault();
    country = e.target.value;
    if (country === '') {
      return  listEl.innerHTML = '';
    }
    
    fetchCountries(country).then(countryEl).catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    e.target.value=''
    })
    
}
function countryEl(countries) {

    const murkup = countries;
    
    if (murkup.length >= 2 && murkup.length <= 10) {
        listEl.innerHTML = '';
        return  murkup.map(x => {
        x.flags.svg;
        x.name.official;
       const a = `<li><img src="${x.flags.svg}" width="60"/> ${x.name.official}</li>`
       listEl.insertAdjacentHTML('beforeend',a);
    }).join('');
    } if (murkup.length === 1) {
        listEl.innerHTML = '';
        return  murkup.map(x => {
             x.flags.svg;
             x.name.official;
            x.capital;
            x.languages;
            x.population;
       const a = `<li><h1><img src="${x.flags.svg}" width="60"/>${x.name.official}</h1>  <h2>Capital: ${x.capital}</h2><h3>Populations: ${x.population}</h3> <h4>Languages: ${Object.values(x.languages)}</h4></li>`
       listEl.insertAdjacentHTML('beforeend',a);
        }).join('');
        
    } if (murkup.length >= 11) {
        listEl.innerHTML = '';
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } if (murkup.status === 404) {
        
        inputCountry.reset();
    }
    
   
   
    
}