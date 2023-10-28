const btn = document.getElementById('searchBtn');
const input = document.getElementById('search');
const citySpan = document.getElementById('citySpan');
const weatherSpan = document.getElementById('weatherSpan')
const tempSpan = document.getElementById('tempSpan');
const humidSpan = document.getElementById('humidSpan');
const windSpan = document.getElementById('windSpan');

function addData(cityName, weatherDesc, temp, humid, wind){
    citySpan.innerText = cityName;
    weatherSpan.innerText = weatherDesc;
    tempSpan.innerText = temp;
    humidSpan.innerText = humid;
    windSpan.innerText = wind;
}


async function weatherData(cityName){
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e9c44eb0babc917ffdb50893a643f17f`);

    if(!response.ok){
        addData(response.name, "Invalid", "Invalid", "Invalid", "Invalid")
    }
    let data = await response.json();
    return data;
}   
async function getName(){
    let test = await weatherData(input.value).then((response) =>{
        let obj = {
            "cityName": response.name,
            "weatherDescription": response.weather[0].description,
            "temperature" : response.main.temp,
            "humidity": response.main.humidity,
            "windSpeed": response.wind.speed
        }
        addData(obj.cityName, obj.weatherDescription, obj.temperature, obj.humidity, obj.windSpeed);
        return obj;
    });
    return test;
} 


btn.addEventListener('click', () => {
    getName().then((value) => {
        console.log(value.cityName)
    }).catch((error) => {
        console.log(error)
    })
}); 
window.addEventListener("load", () => {
    getName().then((value) => {
        console.log(value.cityName)
    }).catch((error) => {
        console.log(error)
    })
});
