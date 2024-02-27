//import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://shopping-b3e6f-default-rtdb.asia-southeast1.firebasedatabase.app/",
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")

//DOM Input
const inputFieldEl = document.getElementById("user-input")
const addButtonEl = document.getElementById("add-btn")
const list = document.getElementById("list")

//UserInput to DB
addButtonEl.addEventListener("click", function () {
  addObjectToDb(inputFieldEl.value);
  console.log("still works");
})

function addObjectToDb(input) {
  if (input != "") push(itemsInDB, input);
  inputFieldEl.value = "";
}

//fetching Database
onValue(itemsInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsObject = snapshot.val();
    list.innerHTML = "";
    console.log(itemsObject);
    renderObject(itemsObject);
  } else {
    list.innerHTML = "<p>..add Items</p>";
  }
});

function renderObject(object) {
  Object.entries(object).forEach(([key, value]) => {
    list.innerHTML += `<li data-key=${key} id="${key}">${value}</li>`;
  });
}
//remove Item from DB
list.addEventListener("dblclick", (e) => {
  remove(ref(database, `items/${e.target.dataset.key}`));
});
