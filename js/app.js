const tip = document.querySelector('#weatherApp-tip');
const appBox = document.querySelector('#weatherApp-box');
const appInfo = document.querySelector('.weatherApp-content');
const searchBtn = document.querySelector('#searchBtn');
const searchBox = document.querySelector('#searchBox');
const cityName = document.querySelector('#cityName');
const temperature = document.querySelector('#temperature');
const humid = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind');
const weatherDescription = document.querySelector('#weatherDescription');
const weatherImg = document.querySelector('#weatherImg');

function error(){
    cityName.innerText = `ERROR`;
    temperature.innerText = `Enter the correct City or Country name.`;
    humid.innerText = `While thinking about what to put in the box above...`;
    windSpeed.innerText = `...take a look at those cuties!`;
    weatherDescription.innerText = ``;
    weatherImg.setAttribute('src', 'https://i.makeagif.com/media/5-29-2018/5jw83a.gif');
}
function showInfo() {
    appBox.classList.remove('beforeSearch');
    appInfo.classList.remove('beforeInfo');
}

let weather = {
    apiKey: "8a0c4476f7d6ebcc88c5fe7f60ae104b",
    fetchWeather: function (city) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
        ).then((response) => response.json())
         .then((data) => this.showWeather(data))
         .catch((err) => error())
    },
    showWeather: function (data) {
        const {name} = data;
        const {icon, main} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, main, temp, humidity, speed);
        cityName.innerText = `${name}`;
        temperature.innerText = `Temperature: ${temp.toFixed(0)}`;
        humid.innerText = `Humidity: ${humidity}%`;
        windSpeed.innerText = `Wind Speed: ${speed.toFixed(1)}km/h`;
        weatherDescription.innerText = `${main}`;
        weatherImg.setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`);
        if(main === 'Clouds') {
            document.body.style.backgroundImage = `url('https://storage.needpix.com/rsynced_images/clouds-4258726_1280.jpg')`;
        } else if(main === 'Rain') {
            document.body.style.backgroundImage = `url('https://www.chemwatch.net/wp-content/uploads/2021/05/image-4.jpeg')`;
        } else if(main === 'Clear') {
            document.body.style.backgroundImage = `url('https://wallpaperaccess.com/full/3265126.jpg')`;
        } else if(main === 'Snow') {
            document.body.style.backgroundImage = `url('https://gigigriffis.com/wp-content/uploads/2019/01/32838110158_be4014b6f2_k-1.jpg')`;
        } else if(main === 'Thunderstorm') {
            document.body.style.backgroundImage = `url('https://globalnews.ca/wp-content/uploads/2022/05/GettyImages-819817820.jpg?quality=85&strip=all')`;
        } else if(main === 'Drizzle') {
            document.body.style.backgroundImage = `url('https://cdn.bolnews.com/wp-content/uploads/2022/08/Rain-Karachi.jpg')`;
        }
    },
    searchWeather: function () {
        this.fetchWeather(searchBox.value);
    },
};

searchBtn.addEventListener('click', () =>{
    weather.searchWeather();
    showInfo();
    searchBox.value = '';
})
searchBox.addEventListener("keyup", (e) =>{
    if(e.key == "Enter"){
        showInfo();
        weather.searchWeather();
        searchBox.value = '';
    }
})