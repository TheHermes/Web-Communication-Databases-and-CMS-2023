// Nyhets api
// Fungerar inte på domus, får en 426 error i requesten på domus
// Kan köras på liveserver
const tetep = '5bba8124be724fcd852b966367b1ce86';
async function getNews() {
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=" + tetep);
  const jsonData = await response.json();
  console.log(jsonData);
  const url = jsonData.articles[0].url;
  const url2 = jsonData.articles[1].url;
  const url3 = jsonData.articles[2].url;
  document.querySelector("#box1").innerHTML = `<p class="fw-bolder">Todays News</p> <hr>${jsonData.articles[0].title}<a class="text-light mt-4 text-end" href="${url}" target="_blank">Link to article...</a>
    <hr>${jsonData.articles[1].title} <a class="text-light mt-4 text-end" href="${url2}" target="_blank">Link to article...</a>
    <hr>${jsonData.articles[2].title} <a class="text-light mt-4 text-end" href="${url3}" target="_blank">Link to article...</a>`;
}
// Ta bort kommentaren för att köra och kommentera bårt getUselessFact så att dom inte får konflikt
//getNews(); 
// En onödig fakta api(istället för nyhetsapi)
async function getUselessFact() {
  try {
    const url = "https://uselessfacts.jsph.pl/api/v2/facts/random";
    const resp = await fetch(url);
    const respJSON = await resp.json();
    console.log(respJSON);
    document.querySelector('#box1').innerHTML = `
            <h3>Useless Fact</h3><br>
            ${respJSON.text}
    `;
  } catch (error) {
    document.querySelector('#box1').innerHTML = error.message;
  }

}
getUselessFact();

function toTextualDescription(degree) {
  const sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  degree += 22.5;
  if (degree < 0)
    degree = 360 - Math.abs(degree) % 360;
  else
    degree = degree % 360;
  let which = parseInt(degree / 45);
  return sectors[which];
}

// Localstorage för API nycklar
const itemSet = (localStorage.getItem('api-weather') == null);
if (itemSet) {
  localStorage.setItem("api-weather", prompt("Enter your api-weather-key",))
}
const itemSet2 = (localStorage.getItem('api-ama') == null);
if (itemSet) {
  localStorage.setItem("api-ama", prompt("Enter your api-ama-key",))
}

document.querySelector("#api-weather").value = localStorage.getItem("api-weather");
document.querySelector("#api-ama").value = localStorage.getItem("api-ama");
document.querySelector("#settings").style.display = "none";

function sparaKey() {
  localStorage.setItem("api-weather", document.querySelector("#api-weather").value);
  document.querySelector("#api-weather").innerHTML = localStorage.getItem("api-weather");
  localStorage.setItem("api-ama", document.querySelector("#api-ama").value);
  document.querySelector("#api-ama").innerHTML = localStorage.getItem("api-ama");
}

function settingsPop() {
  document.querySelector("#settings").style.display = "block";
  document.querySelector("#opacity").style.opacity = 0.2;
}

function xtryck() {
  document.querySelector("#settings").style.display = "none";
  document.querySelector("#opacity").style.opacity = 1;
}

async function väderAPI() {
  navigator.geolocation.getCurrentPosition(showPosition);
  async function showPosition(position) {
    const apiweather = localStorage.getItem("api-weather");
    if (!apiweather || apiweather === null) {
      document.querySelector('#weather1').innerHTML = "Your API key is not set or incorrect";
    } else {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiweather}&units=metric`);
      const jsonData = await response.json();
      winddeg = document.querySelector("#weather1").innerHTML = toTextualDescription(jsonData.wind.deg);
      windspeed = Math.floor(jsonData.wind.speed);
      temp = Math.floor(jsonData.main.temp);
      document.querySelector("#weather1").innerHTML = `<p class="fs-italic fw-bolder">Weather ${jsonData.name}</p><hr><img class="w-25" id="icon1"> <p class="fs-2">${temp}°C</p> <br> ${winddeg} ${windspeed} m/s   ${jsonData.weather[0].description}`;
      document.querySelector('#icon1').setAttribute("src", "https://openweathermap.org/img/wn/" + jsonData.weather[0].icon + "@2x.png");
    }
  }
}
väderAPI();

async function cairoVäder() {
  const apiweather = localStorage.getItem("api-weather");
  if (!apiweather || apiweather === null) {
    document.querySelector('#weather').innerHTML = "Your API key is not set or incorrect";
  } else {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=30.033333&lon=31.233334&appid=${apiweather}&units=metric`);
    const jsonData = await response.json();
    winddeg = document.querySelector("#weather").innerHTML = toTextualDescription(jsonData.wind.deg);
    windspeed = Math.floor(jsonData.wind.speed);
    temp = Math.floor(jsonData.main.temp);
    document.querySelector("#weather").innerHTML = `<p class="fs-italic fw-bolder">Weather ${jsonData.name}</p><hr><img class="w-25" id="icon"> <p class="fs-2">${temp}°C</p> <br> ${winddeg} ${windspeed} m/s   ${jsonData.weather[0].description}`;
    document.querySelector('#icon').setAttribute("src", "https://openweathermap.org/img/wn/" + jsonData.weather[0].icon + "@2x.png");
  }
}
cairoVäder();

async function newyorkVäder() {
  const apiweather = localStorage.getItem("api-weather");
  if (!apiweather || apiweather === null) {
    document.querySelector('#weather2').innerHTML = "Your API key is not set or incorrect";
  } else {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=40.730610&lon=-73.935242&appid=${apiweather}&units=metric`);
    const jsonData = await response.json();
    winddeg = document.querySelector("#weather2").innerHTML = toTextualDescription(jsonData.wind.deg);
    windspeed = Math.floor(jsonData.wind.speed);
    temp = Math.floor(jsonData.main.temp);
    document.querySelector("#weather2").innerHTML = `<p class="fs-italic fw-bolder">Weather ${jsonData.name}</p><hr><img class="w-25" id="icon2"> <p class="fs-2">${temp}°C</p> <br> ${winddeg} ${windspeed} m/s   ${jsonData.weather[0].description}`;
    document.querySelector('#icon2').setAttribute("src", "https://openweathermap.org/img/wn/" + jsonData.weather[0].icon + "@2x.png");
  }
}
newyorkVäder();

// Activity API
async function getActivity(amount) {
  try {
    const url = "https://www.boredapi.com/api/activity/?participants="
    const resp = await fetch(url + amount);
    const text = await resp.json();
    document.querySelector('#apitest').innerHTML = text.activity;
  } catch (error) {
    document.querySelector('#apitest').innerHTML = error.message;
  }

}

document.querySelector('#btn1').addEventListener('click', getAmount);
// Får andelen av deltagare för getActivity
function getAmount() {
  let amount = Number(document.querySelector('#amount1').value);
  console.log(amount);
  if (!amount || amount < 0) {
    document.querySelector('#warning1').innerHTML = "Put in an amount and a positive number!"
  } else {
    document.querySelector('#warning1').innerHTML = `Amount of people participating: ${amount}`;
    getActivity(amount);
  }
}

// Chuck Norris joke api
async function getChuckNorrisJoke() {
  try {
    const resp = await fetch('https://api.chucknorris.io/jokes/random');
    const respJSON = await resp.json();
    document.querySelector('#joke').innerHTML = respJSON.value;
  } catch (err) {
    document.querySelector('#joke').innerHTML = err.message;
  }
}
getChuckNorrisJoke();

// Valutaomvandlare
async function currencyExchange() {
  try {
    const url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json'
    const resp = await fetch(url);
    const respJSON = await resp.json();
    document.querySelector('#box2').innerHTML = `
              <h3>Currency converter</h3>
              EUR: ${respJSON.eur.eur} €<br>
              USD: ${respJSON.eur.usd} $<br>
              JPY: ${respJSON.eur.jpy} ¥<br>
              GBP: ${respJSON.eur.gbp} £<br>
              RUB: ${respJSON.eur.rub} ₽
  `
  } catch (err) {
    document.querySelector('#box2').innerHTML = err.message;
  }

}
currencyExchange();