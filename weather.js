// air quality (co , no2) , humidity , temp , weather desc , windspeed , country , localtime , name/region , air pressure

let wDesc = document.querySelector('.w-desc')
let wRegion = document.querySelector('.w-region')
let wTemp = document.querySelector('.w-temp')
let wTime = document.querySelector('.w-time')
let wHumidity = document.querySelector('.w-humidity')
let wSpeed = document.querySelector('.w-speed')
let wPressure = document.querySelector('.w-pressure')
let wLocation = document.querySelector('.location-input')
let submitBtn = document.querySelector('.btn')
let wImg = document.querySelector('.weather-img')

submitBtn.addEventListener('click'  , ()=>{
    weather()
})

async function weather() {
    let query = wLocation.value
    if(!query) return
    // console.log(query)

    try{
        if (data.success === false) {
            alert("City not found. Please enter a valid location.");
        return;
        }
        
        let response = await fetch(`https://api.weatherstack.com/current?access_key=22a2c1496f81fb58a7c91cb7401097d3&query=${query}`)
        let data = await response.json()
        // console.log(data)
        // console.log(data.current.weather_descriptions)

        let rawDesc = data.current.weather_descriptions[0]
        let Desc = rawDesc.split(",")[0].trim()
        let weDesc = Desc.toLowerCase();
        // console.log(weDesc)
        
        let weName = data.location.name
        let weRegion = data.location.region
        let weTemp = data.current.temperature
        let weTime = data.location.localtime
        let weHummidity = data.current.humidity
        let weSpeed = data.current.wind_speed
        let wePressure = data.current.pressure
    
        wRegion.textContent = `${weName}, ${weRegion}`
        wDesc.textContent = `${weDesc}`
        wTemp.textContent = `${weTemp}° C`
        wTime.textContent = `${weTime}`
        wHumidity.textContent = `${weHummidity}%`
        wSpeed.textContent = `${weSpeed} km/h`
        wPressure.textContent = `${wePressure} mb`

        if(weDesc.includes("smoke") ||
            weDesc.includes("dust") ||
            weDesc.includes("sand") ||
            weDesc.includes("sleet") ||
            weDesc.includes("mist") ||
            weDesc.includes("fog") ||
            weDesc.includes("haze")){
            wImg.src = "./images/smoke.png"
        } else if(weDesc.includes("sunny") ||
            weDesc.includes("clear")){
            wImg.src = "./images/sunny.png"
        } else if(weDesc.includes("partly cloudy") ||
            weDesc.includes("cloudy") ||
            weDesc.includes("overcast")){
            wImg.src = "./images/cloudy.png"
        } else  if(weDesc.includes("rain") ||
            weDesc.includes("showers")){ 
            wImg.src = "./images/rainy.png"
        } else if(weDesc.includes("snow")){
            wImg.src = "./images/snow.png"
        } else if(weDesc.includes("thunder") ||
            weDesc.includes("storm") ||
            weDesc.includes("hail") ||
            weDesc.includes("blizzard")){
            wImg.src = "./images/storm.png"
        }

    } catch(error){
        console.log(error)
    }


}
