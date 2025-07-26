
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
        
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=62b0b4750883455ead4154159252607&q=${query}`)
        let data = await response.json()
        // console.log(data)
        // console.log(data.current.weather_descriptions)

        let rawDesc = data.current.condition.text
        let weDesc = rawDesc.toLowerCase()
        // console.log(weDesc)

        let weTemp = data.current.temp_c
        let weHummidity = data.current.humidity
        let weSpeed = data.current.wind_kph
        let wePressure = data.current.pressure_mb
        let weTime = data.location.localtime
        let weName = data.location.name
        let weRegion = data.location.region

    
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
