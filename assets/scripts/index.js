'use strict';

import { select, print } from './utils.js';

/***** LIST OF MOVIES PLAYING NOW SECTION ***/

const options = {
    method: 'GET',
    headers: {'Content-Type' : 'application/json; charset=UTF-8'},
    mode: 'cors'
}

async function listMovies() {

    const url = './assets/scripts/movies.json';
    const container = document.querySelector('.grid-container');
    let movieContent = '';

    try {
        const response = await fetch(url, options);

        if(!response.ok) {
           throw new Error(`${response.statusText}: ${response.status} error`);
        }

        const data = await response.json();
        data.movies.forEach((element) => {
           // console.log(element.title);
           // console.log(element.poster);
            movieContent += `
            <div class="movie-data">
                <div class="movie-image">
                    <img src="${element.poster}" > 
                </div>
                <div class="movie-title"><h5>${element.title}</h5></div>
            </div>`;
            
        });
        container.innerHTML = `${movieContent}`; 
    } catch(error) {
        console.log(error.message);
    }
}

window.addEventListener('load', () => {
    listMovies();
});


/***** CITIES LIST ON INPUT */

const citiesInput = select('.input-city');
const urlCities = './assets/scripts/cities.json';
const list = select('.autocomplete-list-cities');

list.style.display = 'none';

function listCities(array){
    list.style.display = 'block';
    list.innerHTML = '';
    let cities = '';
    print(array);

    if(array.length > 0){
        array.forEach((city) => {
           // console.log(city.name);
            let div = document.createElement('div');
            div.innerHTML = `${city.name}`;
            
            div.addEventListener('click', function () {
                console.log(this.innerHTML);
                citiesInput.value = this.innerHTML;
                list.innerHTML = '';
                cities = '';
                list.style.display = 'none';
            });

            list.appendChild(div);
            //cities += `<div>${city.name}</div>`;
        });
    } else {
        //cities = '<div>City not found</div>';
        let div = document.createElement('div');
        div.innerHTML = `City not found`;
        list.appendChild(div);
    }

    list.parentNode.appendChild(list);

    //list.innerHTML = `${cities}`;
}

function filterListCities(query, arr) {
    if (!query) { return; }
    console.log('QUERY', query);
    console.log('ARR',arr);
    console.log(arr[0]);
    query = query.toLowerCase();

    return arr.filter((element) => element.name.toLowerCase().includes(query));
}

async function getCities() {
    try {
        const response = await fetch (urlCities, options);

        if(!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        //print(data.cities);
        //listCities(data.cities);
        citiesInput.addEventListener('input', () => {
            console.log(filterListCities(citiesInput.value, data.cities));
            listCities(filterListCities(citiesInput.value, data.cities));
        });

    } catch(error) { 
        console.log(error.message);
    }
}

citiesInput.addEventListener('focus', () => {
    citiesInput.value = '';
});

citiesInput.addEventListener('click', () => {
    getCities();
});

/***** MOVIES LIST ON INPUT WITH AUTOCOMPLETE*/

const moviesInput = select('.input-search');
const urlMovies = './assets/scripts/movies.json';
const autoListMovies = select('.autocomplete-list-movies');

autoListMovies.style.display = 'none';

function showMoviesList(array){
    autoListMovies.style.display = 'block';
    autoListMovies.innerHTML = '';
    let movies = '';
    //print(array);
    //autoListMovies.parentNode.replaceChildren(autoListMovies); 

    if(array.length > 0){
        array.forEach((movie) => {
            console.log(movie.title);
            
            let div = document.createElement('div');
            div.innerHTML = `${movie.title}`;
            
          /////  movies += `<div>${movie.title}</div>`;

            div.addEventListener('click', function () {
                console.log(this.innerHTML);
                moviesInput.value = this.innerHTML;
                autoListMovies.innerHTML = '';
                movies = '';
                autoListMovies.style.display = 'none';
            });

            autoListMovies.appendChild(div);
        });
    } else {
        //movies = '<div>Movie not found</div>';
        let div = document.createElement('div');
        div.innerHTML = `Movie not found`;
        autoListMovies.appendChild(div);
    }

    autoListMovies.parentNode.appendChild(autoListMovies);
    //autoListMovies.innerHTML = `${movies}`;
    
}

function filterList(query, arr) {
    if (!query) { return; }
    console.log('QUERY', query);
    console.log('ARR',arr);
    console.log(arr[0]);
    query = query.toLowerCase();

    return arr.filter((element) => element.title.toLowerCase().includes(query));
}

async function getMovies() {
    try {
        const response = await fetch (urlMovies, options);

        if(!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        print(data.movies);
        //showMoviesList(data.movies);
        //autocompleteInputMovie(moviesInput, data.movies);

        moviesInput.addEventListener('input', () => {
            console.log(filterList(moviesInput.value, data.movies));
            showMoviesList(filterList(moviesInput.value, data.movies));
        });

    } catch(error) { 
        console.log(error.message);
    }
}

moviesInput.addEventListener('focus', () => {
    moviesInput.value = '';
});

moviesInput.addEventListener('click', () => {
    getMovies();
});

