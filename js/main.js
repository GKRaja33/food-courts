function loadJson(file,callback){
  var xhr=new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET",file,true);
  xhr.onreadystatechange=function(){
    if(xhr.readyState===4 && xhr.status=="200"){
      callback(xhr.responseText);
    }
  }
  xhr.send(null);
}
loadJson("data/data.json", function(text){
  let data=JSON.parse(text);
  console.log(data);
  foods(data.food);
});
var mainDiv=document.getElementById('main');
function foods(foodItems) {
  for (var i = 0; i < foodItems.length; i++) {

  var subDiv=document.createElement("div");
  subDiv.classList.add("subdiv");
  mainDiv.appendChild(subDiv);
  var img=document.createElement("img");
  img.src=foodItems[i].image;
  img.alt=("image");
  subDiv.appendChild(img);
  var h1=document.createElement("h1");
  h1.textContent=foodItems[i].name;
  subDiv.appendChild(h1);
  var p=document.createElement("p");
  p.textContent=foodItems[i].description;
  subDiv.appendChild(p);
  var link=document.createElement("a");
  link.href="item.html?id="+foodItems[i].id;
  link.textContent="View Profile";
  subDiv.appendChild(link);

  }
}
