const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        document.getElementById('errorMessage').textContent = 'Please enter a city name.';
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                const container = document.getElementById("weatherInfo");
                container.innerHTML = '';
                document.getElementById('errorMessage').textContent = 'City not found! Please try again.';
                return;
            }
            
            document.getElementById('errorMessage').textContent = '';
            document.getElementById('weatherInfo').classList.remove('hidden');
            document.getElementById('cityName').textContent = data.name;
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById('description').textContent = data.weather[0].description;
            document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        })
        .catch(error => {
            document.getElementById('errorMessage').textContent = 'Error fetching data. Please try again later.';
            console.error(error);
        });
}
