let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click",(e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';
});

const getWeather = async (city)=>
{
    console.log(city)
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=23d914f5bd58fbff4e9d22354648804e`,
        {mode: 'cors'}
        );
        console.log(response)
        const weatherData = await response.json();
        console.log(weatherData);
        const{name} = weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent = main;
        climate.textContent = main;
        tempvalue.textContent=Math.round(feels_like-273);

        if(id<300 && id>200)
        {
            tempicon.src="./icons/Thunderstorm.png";
        }
        else if(id<400 && id>300)
        {
            tempicon.src="./icons/Cloud.png";
        }
        else if(id<600 && id>500)
        {
            tempicon.src="./icons/Rain.png";
        }
        else if(id<800 && id>700)
        {
            tempicon.src="./icons/Atmosphere.png";
        }
        else if(id==800)
        {
            tempicon.src="./icons/Clear.png";
        }
    }
    catch(error)
    {
        alert('City not found');
    }
};
window.addEventListener("load", ()=>{
    console.log('weather app is loading')
    let long;
    let lat;
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/https://cors-anywhere.herokuapp.com/";

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=23d914f5bd58fbff4e9d22354648804e`;
            fetch(api).then((response)=>{
                return response.json();
            })
            .then (data =>
                {
                    const{name}=data;
                    const{feels_like}=data.main;
                    const{id,main}=data.weather[0];

                    loc.textContent=name;
                    climate.textContent=main;
                    tempvalue.textContent=Math.round(feels_like-273);
                    if(id<300 && id>200)
                    {
                        tempicon.src="./icons/Thunderstorm.png";
                    }
                    else if(id<400 && id>300)
                    {
                        tempicon.src="./icons/Cloud.png";
                    }
                    else if(id<600 && id>500)
                    {
                        tempicon.src="./icons/Rain.png";
                    }
                    else if(id<800 && id>700)
                    {
                        tempicon.src="./icons/Atmosphere.png";
                    }
                    else if(id==800)
                    {
                        tempicon.src="./icons/Clear.png";
                    }
                    console.log(data);
                })

        })
    }
})