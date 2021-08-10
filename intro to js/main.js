/*
let sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let slowCount = async function() {
  i = 0;
  while (true) {
    await sleep(2000);
    console.log(i);
    i++
  }
}

slowCount();*/

let canvas = document.getElementById("app");
let ctx = canvas.getContext("2d");

// Draws a neko from nekos.life after some time. 
async function drawNeko() {
  let result = await new Promise(resolve => {
    // Try going to this website and see what's 
    // the response format. 
    const nekoUrl = "https://www.nekos.life/api/v2/img/neko";
    
    const xmlHttp = new XMLHttpRequest();
    // OnReadyStateChange is a subscriber that 
    // fires whenever the readyState changes from 
    // 0 to 4, where 4 means completed. 
    xmlHttp.onreadystatechange = function() {
      // Print to show that we are working with an 
      // async, event-based function. 
      console.log(xmlHttp.readyState);
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
        // The promise waits for the XMLHttpRequest 
        // thing to finish its work. When the event 
        // is fired, you can complete the promise 
        // and return the JSON text out. 
        resolve(xmlHttp.responseText);
    }
    
    // Oh yeah, and we haven't actually fetched 
    // anything yet. Now we're getting to it. 
    xmlHttp.open("GET", nekoUrl, true); 
    xmlHttp.send(null);
  });
  // So now result has been obtained by awaiting the Promise
  let imageUrl = JSON.parse(result).url;
  let image = new Image();
  // image.onload is once again, another event listener. 
  image.onload = function() {
    ctx.drawImage(image, 0, 0, 500, 500);
  };
  image.src = imageUrl;
}
drawNeko();

/*
class Circle {
  constructor(radius, name) {
    this.radius = radius;
    this.name = name;
  }
  area() {
    return 3.14 * this.radius ** 2;
  }
}

for (i = 0; i < 5; i++) {
  console.log(i);
}

for (i in [2, 4, 6, 8, 10]) {
  console.log(i);
}
// 
 
for (i of [2, 4, 6, 8, 10]) {
  console.log(i);
}

my_circles = []
for (i = 0; i < 5; i++) {
  my_circles.push(new Circle(i, "Circle"));
}*/