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
const apidbkey = (localStorage.getItem('api-db-key'));

const apiweatherkey = (localStorage.getItem('api-weather'));

if (!apidbkey) {
  localStorage.setItem("api-db-key", prompt("Enter your api-db-key",))
}

if (!apiweatherkey) {
  localStorage.setItem("api-weather", prompt("Enter your api-weather-key",))
}

const apiamakey = (localStorage.getItem('api-ama'));

if (!apiamakey) {
  localStorage.setItem("api-ama", prompt("Enter your api-ama-key",))
}

document.querySelector("#api-db-key").value = localStorage.getItem("api-db-key");
document.querySelector("#api-weather").value = localStorage.getItem("api-weather");
document.querySelector("#api-ama").value = localStorage.getItem("api-ama");

document.querySelector("#settings").style.display = "none";

function sparaKey() {
  localStorage.setItem("api-weather", document.querySelector("#api-weather").value);
  localStorage.setItem("api-ama", document.querySelector("#api-ama").value);
  localStorage.setItem("api-db-key", document.querySelector("#api-db-key").value);
}

function settingsPop() {
  document.querySelector("#settings").style.display = "block";
  document.querySelector("#opacity").style.opacity = 0.2;
}

function xtryck() {
  document.querySelector("#settings").style.display = "none";
  document.querySelector("#opacity").style.opacity = 1;
}

document.querySelector("#settings").style.display = "none"

async function väderAPI() {
  navigator.geolocation.getCurrentPosition(showPosition);
  async function showPosition(position) {
    const apiweather = localStorage.getItem("api-weather");
    const apiama = localStorage.getItem("api-ama");
    lat = position.coords.latitude;
    long = position.coords.longitude;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiweather}&units=metric`);
    const jsonData = await response.json();
    //console.log(jsonData);
    winddeg = document.querySelector("#weather1").innerHTML = toTextualDescription(jsonData.wind.deg);
    windspeed = Math.floor(jsonData.wind.speed);
    temp = Math.floor(jsonData.main.temp);
    document.querySelector("#weather1").innerHTML = `<p>Your Weather ${jsonData.name}</p><img id="icon1"><p>${temp}°C</p> <br> ${winddeg} ${windspeed} m/s   ${jsonData.weather[0].description}`;
    document.querySelector('#icon1').setAttribute("src", "https://openweathermap.org/img/wn/" + jsonData.weather[0].icon + "@2x.png");
  }
}
väderAPI();

async function cairoVäder() {
  const apiweather = localStorage.getItem("api-weather");
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=-33.865143&lon=151.209900&appid=${apiweather}&units=metric`);
  const jsonData = await response.json();
  //console.log(jsonData);
  winddeg = document.querySelector("#weather").innerHTML = toTextualDescription(jsonData.wind.deg);
  windspeed = Math.floor(jsonData.wind.speed);
  temp = Math.floor(jsonData.main.temp);
  document.querySelector("#weather").innerHTML = `<p>Weather ${jsonData.name}</p><img id="icon"> <p>${temp}°C</p> <br> ${winddeg} ${windspeed} m/s   ${jsonData.weather[0].description}`;
  document.querySelector('#icon').setAttribute("src", "https://openweathermap.org/img/wn/" + jsonData.weather[0].icon + "@2x.png");
}
cairoVäder();

async function newyorkVäder() {
  const apiweather = localStorage.getItem("api-weather");
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=40.730610&lon=-73.935242&appid=${apiweather}&units=metric`);
  const jsonData = await response.json();
  //console.log(jsonData);
  winddeg = document.querySelector("#weather2").innerHTML = toTextualDescription(jsonData.wind.deg);
  windspeed = Math.floor(jsonData.wind.speed);
  temp = Math.floor(jsonData.main.temp);
  document.querySelector("#weather2").innerHTML = `<p>Weather ${jsonData.name}</p><img id="icon2"> <p>${temp}°C</p> <br> ${winddeg} ${windspeed} m/s   ${jsonData.weather[0].description}`;
  document.querySelector('#icon2').setAttribute("src", "https://openweathermap.org/img/wn/" + jsonData.weather[0].icon + "@2x.png");
}
newyorkVäder();

// Activity API
async function getActivity(amount) {
  const url = "https://www.boredapi.com/api/activity/?participants="
  const resp = await fetch(url + amount);
  const text = await resp.json();
  document.querySelector('#apitest').innerHTML = text.activity;
}

document.querySelector('#btn1').addEventListener('click', getAmount);

function getAmount() {
  let amount = Number(document.querySelector('#amount1').value);
  //console.log(amount);
  if (!amount || amount < 0) {
    document.querySelector('#warning1').innerHTML = "Put in an amount and a positive number!"
  } else {
    //console.log(amount);
    document.querySelector('#warning1').innerHTML = `Amount of people participating: ${amount}`;
    getActivity(amount);
  }
}

// Chuck Norris joke api
async function getChuckNorrisJoke() {
  const resp = await fetch('https://api.chucknorris.io/jokes/random');
  //console.log(resp);
  const respJSON = await resp.json();
  //console.log(respJSON);
  document.querySelector('#joke').innerHTML = respJSON.value;
}
getChuckNorrisJoke();

// Valutaomvandlare
async function currencyExchange() {
  const url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json'
  const resp = await fetch(url);
  const respJSON = await resp.json();
  //console.log(respJSON);
  document.querySelector('#box2').innerHTML = `
              <p>Currency converter</p>
              <p class="margin">EUR: ${respJSON.eur.eur} €<br>
              USD: ${respJSON.eur.usd} $<br>
              JPY: ${respJSON.eur.jpy} ¥<br>
              GBP: ${respJSON.eur.gbp} £<br>
              RUB: ${respJSON.eur.rub} ₽</p>
  ` 
}
currencyExchange();

async function getPerson() {
    const resp = await fetch(`http://128.214.253.222:8173/person/2?api_key=${apidbkey}`);
    //          http://128.214.253.222:8002/guests/1?api_key=b6c090f9196687f9ff55c9208f2b1042
    const respJson = await resp.json();
    //console.log(respJson);
    document.querySelector("#jonnen").innerHTML = `${respJson.name}'s ToDo list`;
    
}
getPerson();

async function newTodo(orders) {
  
  //console.log(orders);
  const resp = await fetch(`http://128.214.253.222:8173/orders/1?api_key=${apidbkey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orders)
  });
  nullValues();
  getTodos();

  const respJSON = await resp.json();
    //console.log(respJSON);    
}

document.querySelector('#todo-post').addEventListener('click', () => {
    const todo = {
    category_id: document.querySelector('#getCategory').value,
    order_title: document.querySelector('#todo-title').value,
    due_at: document.querySelector('#due-at').value
  }
  //console.log(todo)
  newTodo(todo);
});

function nullValues() {
  document.querySelector('#todo-title').value = ""
  document.querySelector('#due-at').value = ""
}

async function getTodos() {

  const resp = await fetch(`http://128.214.253.222:8173/orders/1?api_key=${apidbkey}`);
  const respJson = await resp.json();
  
  const arr = respJson.orders;
  const todolist = document.querySelector('#todo-list');
  todolist.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    let complete = false;
    let disabled;
    if (arr[i].completed == null) {
      complete = false;
      disabled = "";
    } else {
      complete = true;
      disabled = "disabled"
    }
    document.querySelector("#todo-list").innerHTML += `
      <div class="todo-container todo-styling-items tododiv scrollbar completed${complete}" data-completed="${arr[i].completed}">
        <div>
          <p class="mainTitle${arr[i].id} todo-item-styling" data-title="${arr[i].order_title}">${arr[i].order_title} </p>
          <p class="inline-block">${arr[i].due_at}</p>
          <div class="textalign-right"> 
            <span class="block färg">${arr[i].category_name}</span>
            <button ${disabled} class="complete pen-icon data-completed="${arr[i].completed}" id="${arr[i].id}">&#9989;</button>
            <button ${disabled} class="edit pen-icon" id="${arr[i].id}">✏️</button>
            <button ${disabled} class="star pen-icon" id="${arr[i].id}">🗑️</button>
          </div>
        </div>
  
        <div class="editable nydiv editable${arr[i].id}">

          <input class="edit-styling newTitle${arr[i].id}" type="text" value="${arr[i].order_title}">
          <select class="edit-styling newCat${arr[i].id}">
            <option value="1">Home</option>
            <option value="2">Hobby</option>
            <option value="3">School</option>
            <option value="4">Work</option>
          </select>
            <input class="date-picker newDate${arr[i].id}" type="date" value="${arr[i].due_at}">
            <input class="edit-styling-block saveData" id="${arr[i].id}" type="button" value="Save">
        </div>
        

      </div>`;
  
    const arrFärg = ["", "#6E54A9", "#549CA9", "#A99954", "#AA5643"];
    const färgElements = document.querySelectorAll(".färg");
  
    if (arr[i].category_id >= 0 && arr[i].category_id < arrFärg.length) {
      färgElements[i].style.backgroundColor = arrFärg[arr[i].category_id];
    }
  }

  // Ta bårt notering
  document.querySelectorAll(".star").forEach((elem) => {
    elem.addEventListener('click', (evt) => {
      let id = Number(evt.target.id);
      let complete = evt.target.getAttribute('data-completed');
      //console.log(complete);
      //console.log(id);
      if (confirm('Är du säker att du vill ta bårt noteringen?') === true) {
        deleteToDo(id);
        document.querySelector('.completed')
      }
    });
  });
  // Markera todo som gjort
  document.querySelectorAll('.complete').forEach((elem) => {
    elem.addEventListener('click', (evt) => {
      let id = Number(evt.target.id);
      let complete = evt.target.getAttribute('data-completed');
      //console.log(complete);
      if (confirm('Är färdig med uppgiften?') === true) {
        completeToDo(id);
      }
    })
  })
  let click = false;
  // Trolla fram editerings verktygen
  document.querySelectorAll(".edit").forEach((elem) => {
    elem.addEventListener('click', (evt) => {
      let id = Number(evt.target.id);
      //console.log(id);
      const div = elem.nextElementSibling;
      let title = document.querySelector('.mainTitle'+id).getAttribute('data-title');
      document.querySelector('.newTitle'+id).value = title;
      //console.log(title);
      //console.log(div)
      if (click === false) {
        click = true;
        document.querySelector('.editable'+id).style.display = 'flex';
      } else if (click === true){
        click = false;
        document.querySelector('.editable'+id).style.display = 'none';
      }
    });
  });

  // Editera todo noteringar
  document.querySelectorAll('.saveData').forEach((elem) => {
    elem.addEventListener('click', (evt) => {
      let id = Number(evt.target.id);
      //console.log(id);
      const edit = {
        category_id: Number(document.querySelector('.newCat'+id).value),
        order_title: document.querySelector('.newTitle'+id).value,
        due_at: document.querySelector('.newDate'+id).value
      }
      //console.log(edit);
      if (confirm('Är du säker att du vill editera noteringen?') === true) {
        editToDo(edit, id);
        document.querySelector('.editable'+id).style.display = 'none';
      }
    })
  })
  document.querySelector('#filterTodo').addEventListener('change', () => {
    let showThing = document.querySelector('#filterTodo').value;
    console.log(showThing);
    if (showThing == "all") {
      document.querySelectorAll('.completedtrue').forEach((opt) => {
        opt.style.display = 'block';
      } )
      document.querySelectorAll('.completedfalse').forEach((div) => {
        div.style.display = 'block';
      })
    } else if (showThing == "notdone") {
      document.querySelectorAll('.completedtrue').forEach((opt) => {
        opt.style.display = 'none';
      } )
      document.querySelectorAll('.completedfalse').forEach((div) => {
        div.style.display = 'block';
      })
    } else if (showThing == "done") {
      document.querySelectorAll('.completedtrue').forEach((opt) => {
        opt.style.display = 'block';
      } )
      document.querySelectorAll('.completedfalse').forEach((div) => {
        div.style.display = 'none';
      })
    }
  })
}
getTodos();

// Delete
async function deleteToDo(id) {
  const resp = await fetch(`http://128.214.253.222:8173/delete/${id}?api_key=${apidbkey}`, {
    method: 'DELETE'
  })
  const respJSON = await resp.json();
  //console.log(respJSON)
  document.querySelector('#todo-list').innerHTML = '';
  getTodos();
}
// Complete
async function completeToDo(id) {
  const resp = await fetch(`http://128.214.253.222:8173/completed/${id}?api_key=${apidbkey}`, {
    method: 'PUT'
  })
  const respJSON = await resp.json();
  //console.log(respJSON);
  getTodos();
}
// Editera
async function editToDo(edits, id) {
  const resp = await fetch(`http://128.214.253.222:8173/edit/${id}?api_key=${apidbkey}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(edits)
  })
  const result = resp.json();
  //console.log(result);
  document.querySelector('#todo-list').innerHTML = '';
  getTodos();
}