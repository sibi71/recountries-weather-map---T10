const conutries = document.querySelector("#cards");

const weathercontents = document.querySelector("#weather")

const name = document.querySelector("#names");

async function getcountries(){
    const URL= await fetch("https://restcountries.com/v3.1/all");
    const res = await URL.json();  
    res.forEach(e => {
        showcountry(e)
    });   
//     weatherAPIdata(res[0].latlng[1],res[0].latlng[1])
}
getcountries();

function showcountry(data){
   
   
    const country=document.createElement("div");
    country.setAttribute("class" ,"country")
    country.innerHTML=
    `<div class="card" style="width: 18rem;">
    <img src="${data.flags.png}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title" id ="names">${data.name.official}</h5>
      <p class="card-title">Capital :  ${data.capital}</p>
      <p class="card-title latlng">Latlng  :  ${data.latlng}</p>
      <p class="card-title">Region  :   ${data.region}</p>
      <p class="card-title">Country codes :  ${data.cioc}</p>

      <button class="btn btn-outline-secondary " onclick="btn(${data.latlng[0]},${data.latlng[1]})">Click for weather</button>
    </div>
  </div>`;
    conutries.appendChild(country)
  
}

function btn(lat,lon){
    
    conutries.style.display="none";
    weathercontents.style.display="flex";
   
    getweatherdata(lat,lon);

 

  }

function getweatherdata(lat,lon){

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f3a419ab7ab02bcafdccf93381e74575`)
  .then((response)=>response.json())
  .then((get)=>{

    console.log(get);
    const div = document.createElement("div");
    div.setAttribute("class","weatherdata");
    div.innerHTML=`  <div class="card" style="width: 18rem;">
    <div class="card-header bg-danger">
      <h1>${get.name}</h1>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Temp         : ${get.main.temp} &#8451; </li>
      <li class="list-group-item">Min-Temp     : ${get.main.temp_min} &#8451;</li>
      <li class="list-group-item">Max-Temp     : ${get.main.temp_max} &#8451;</li>
      <li class="list-group-item">Pressure     : ${get.main.pressure} &#9660;</li>
      <li class="list-group-item">Deg          : ${get.wind.deg} &#xB0;</li>
      <li class="list-group-item">Description  : ${get.weather[0].description} &#9728;</li>
    </ul>
  </div>`
    weathercontents.appendChild(div)  
  })

  .catch((err)=>{
    console.log(err);
    })
  

}