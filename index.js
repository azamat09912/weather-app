const apiKey = 'e3ad77404dc88bee59f4a50942c3dbc6';

const cities = ['Алматы', 'Астана', 'Шымкент'];

const cityList = document.getElementById('city-list');
const kzlist =  document.querySelector('.kz-cityes')

cityList.addEventListener('click' , ()=>{
    document.getElementById('weather-info').innerHTML = ''
    cities.forEach(city => {
        getWeather(city)
    });
})

document.getElementById('search').addEventListener('click',function(){
    document.getElementById('weather-info').innerHTML = ''
    getWeather()
})

async function getWeather(city) {
    if (!city) {
        city = document.getElementById('city').value;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            document.getElementById('weather-info').innerHTML = `<p>Қала табылмады. Қайта енгізіңіз.</p>`;
        } else {

            let div = document.createElement('div')
            
            div.innerHTML = `<h3 id="location">${data.name}, ${data.sys.country}</h3>
                <p id="temperature">Температура: ${data.main.temp}°C</p>
                <p id="description">Ауа райы: ${data.weather[0].description}</p>`

            document.getElementById('weather-info').appendChild(div)
        }
    } catch (error) {
        console.error("Ошибка при получении города: ", error);
    }
}

function showDefaultCity() {
    document.getElementById('weather-info').innerHTML = ''
    getWeather('Almaty');
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('my-cities').addEventListener('click', showDefaultCity);
});
