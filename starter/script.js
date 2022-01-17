'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;
let greyIcon;
let mapEvent;

if(navigator.geolocation) 

navigator.geolocation.getCurrentPosition(
    function(pos){
    const {latitude} = pos.coords;
    const {longitude} = pos.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`)

    const coords = [latitude, longitude]

    map = L.map('map').setView(coords, 13);


        greyIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

        //handling clicks on map
        map.on('click', function(mapE) {
        mapEvent = mapE
        form.classList.remove('hidden')
        inputDistance.focus();
            
        
        
    })
    },
    function() {
        alert('could not get your posistion')
})


form.addEventListener('submit', function(e) {
    //display marker
    e.preventDefault()


    //Clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ""

    console.log(mapEvent.latlng)
    const {lat, lng} = mapEvent.latlng

        L.marker([lat, lng], {
            icon: greyIcon
        })
        .addTo(map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minwWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup'
        }))
        .setPopupContent("Workout")
        .openPopup(); 
})

inputType.addEventListener('change', function() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
})