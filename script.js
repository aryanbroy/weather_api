const btn = document.getElementById('searchBtn');
const input = document.getElementById('search');
const citySpan = document.getElementById('citySpan');
const weatherSpan = document.getElementById('weatherSpan')
const tempSpan = document.getElementById('tempSpan');
const humidSpan = document.getElementById('humidSpan');
const windSpan = document.getElementById('windSpan');
const dateId = document.getElementById('date');
const timeId = document.getElementById('time');
const weatherImg = document.getElementById('weatherImg');

function addData(cityName, weatherDesc, temp, humid, wind){
    citySpan.innerText = cityName;
    weatherSpan.innerText = weatherDesc;
    tempSpan.innerHTML = temp + `°<span id="celcius">c</span>`;
    humidSpan.innerText = humid;
    windSpan.innerText = wind;
}


async function weatherData(cityName){
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e9c44eb0babc917ffdb50893a643f17f`);

    if(!response.ok){
        addData("Invalid", "Invalid", "Invalid", "Invalid", "Invalid")
    }
    let data = await response.json();
    return data;
}   
async function getName(){
    let test = await weatherData(input.value).then((response) =>{
        // console.log(response)
        let obj = {
            "cityName": response.name,
            "weatherDescription": response.weather[0].main,
            "temperature" : (response.main.temp - 273).toFixed(1),
            "humidity": response.main.humidity,
            "windSpeed": response.wind.speed.toFixed(1)
        }
        addData(obj.cityName, obj.weatherDescription, obj.temperature, obj.humidity, obj.windSpeed);
        return obj;
    });
    
    return test;
} 


btn.addEventListener('click', () => {
    getName().then((value) => {
        console.log(value.weatherDescription)
        if(value.weatherDescription === "Clear"){
            weatherImg.src = "./ images/clear.png";
        }
        else if(value.weatherDescription === "Clouds"){
            weatherImg.src = "./ images/clouds.png";
        }
        else if(value.weatherDescription === "Drizzle"){
            weatherImg.src = "./ images/drizzle.png";
        }
        else if(value.weatherDescription === "Mist" ||value.weatherDescription === "Fog"){
            weatherImg.src = "./ images/clouds.png";
        }
        else if(value.weatherDescription === "Haze"){
            weatherImg.src = "./ images/haze.png";
            weatherImg.id = "thisHaze";
        }
        else if(value.weatherDescription === "Rain"){
            weatherImg.src = "./ images/rain.png";
        }
        else if(value.weatherDescription === "Snow"){
            weatherImg.src = "./ images/snow.png";
        }
        else{
            alert("I dont have the required image for this weather, sorry :)")
        }
    }).catch((error) => {
        console.log(error)
    })
}); 
window.addEventListener("load", () => {
    getName().then((value) => {
        console.log(value.weatherDescription)
        if(value.weatherDescription === "Clear"){
            weatherImg.src = "./ images/clear.png";
        }
        else if(value.weatherDescription === "Clouds"){
            weatherImg.src = "./ images/clouds.png";
        }
        else if(value.weatherDescription === "Drizzle"){
            weatherImg.src = "./ images/drizzle.png";
        }
        else if(value.weatherDescription === "Mist" ||value.weatherDescription === "Fog" || value.weatherDescription === "Haze"){
            weatherImg.src = "./ images/clouds.png";
        }
        else if(value.weatherDescription === "Haze"){
            weatherImg.src = "./ images/haze.png";
            weatherImg.id = "thisHaze";
        }
        else if(value.weatherDescription === "Rain"){
            weatherImg.src = "./ images/rain.png";
        }
        else if(value.weatherDescription === "Snow"){
            weatherImg.src = "./ images/snow.png";
        }
        else{
            alert("I dont have the required image for this weather, sorry :)")
        }
    }).catch((error) => {
        console.log(error)
    })
});

(function dayDate(){
    const date = new Date();
    let day = date.getDay();
    let hour = date.getHours();
    let min = date.getMinutes();
    console.log(day)
    
    switch (day) {
        case 0:
            dateId.innerText = "Sunday";
            break;
        case 1:
            dateId.innerText = "Monday";
            break;
        case 2:
            dateId.innerText = "Tuesday";
            break;
        case 3:
            dateId.innerText = "Wednesday";
            break;
        case 4:
            dateId.innerText = "Thursday";
            break;
        case 5:
            dateId.innerText = "Friday";
            break;
        case 6:
            dateId.innerText = "Saturday";
            break;
        default:
            dateId.innerText = "Sorry forgot this case";
            break;
    }
    

    function getlength(number) {
        return number.toString().length;
    }
    if(getlength(min) === 1){
        timeId.innerText = `${hour}:0${min}`;
    }
    else{
        timeId.innerText = `${hour}:${min}`;
    }
})();
