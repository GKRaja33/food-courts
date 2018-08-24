function fetchJson(file){
	return new Promise((resolve,reject)=>{
		return fetch(file).then(response=>{
			if(response.ok){
				resolve(response.json());
			} else {
				reject(new Error('error'));
			}
		})
	})
}

// var storeDb;
var data;
var fetchedData=fetchJson("data/data.json");
fetchedData.then(data=>{
	console.log(data);
	products(data.food);
})


function products(d){

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

var open = indexedDB.open("MyDatabase", 1);

open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    // var index = store.createIndex("NameIndex", ["data.name"]);
};

open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");
    // var index = store.index("NameIndex");

    for(var i=0; i<d.length; i++){

    store.put({id:d[i].id, name :d[i].name, image: d[i].image, description:d[i].description});
    // store.put({id: 67890, name: {first: "Bob", last: "Smith"}, age: 35});
    }

    function getAllItems(callback) {
    var trans = db.transaction("MyObjectStore", IDBTransaction.READ_ONLY);
    var store = trans.objectStore("MyObjectStore");
    var items = [];

    trans.oncomplete = function(evt) {
        callback(items);
    };

    var cursorRequest = store.openCursor();

    cursorRequest.onerror = function(error) {
        console.log(error);
    };

    cursorRequest.onsuccess = function(evt) {
        var cursor = evt.target.result;
        if (cursor) {
            items.push(cursor.value);
            cursor.continue();
        }
    };
}

var maindiv1=document.querySelector("#main")

getAllItems(function (items) {
    var len = items.length;
for (var i = 0; i < len; i++) {
var subDiv=document.createElement("div");
subDiv.classList.add("subdiv");
//console.log(maindiv1);
maindiv1.appendChild(subDiv);
var img=document.createElement("img");
img.src=items[i].image;
img.alt=("image");
subDiv.appendChild(img);
var h1=document.createElement("h2");
h1.textContent=items[i].name;
subDiv.appendChild(h1);
var p=document.createElement("p");
p.textContent=items[i].description;
subDiv.appendChild(p);
var link=document.createElement("a");
link.href="item.html?id="+items[i].id;
link.textContent="View REVIEW";
subDiv.appendChild(link);

}
});
  tx.oncomplete = function() {
        db.close();
    };
}

}
