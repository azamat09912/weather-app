const apiKey = 'e3ad77404dc88bee59f4a50942c3dbc6';

const cities = ['Алматы', 'Астана', 'Шымкент', 'Қарағанды', 'Тараз', 'Павлодар', 'Семей', 'Ақтөбе', 'Өскемен', 'Қостанай'];

const cityList = document.getElementById('city-list');

cities.forEach(city => {
    const listItem = document.createElement('');
    listItem.textContent = city;
    cityList.appendChild(listItem);
});

async function getWeather() {
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            document.getElementById('weather-info').innerHTML = `<p>Қала табылмады. Қайта енгізіңіз.</p>`;
        } else {
            document.getElementById('location').innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').innerText = `Температура: ${data.main.temp}°C`;
            document.getElementById('description').innerText = `Ауа райы: ${data.weather[0].description}`;
        }
    } catch (error) {
        console.error("Ошибка при получении города: ", error);
    }
}