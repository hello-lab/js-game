const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
import pic from "./pic.png";
canvas.width = innerWidth;
canvas.height = innerHeight;
import ske from "./sky.jpeg"
import girl from "./hand.png"

function rand(x,y) {
	return 	Math.floor(Math.random() * y) + x;

}
const Img= new Image()
Img.src= girl
class woman {
  constructor(Img) {
    this.position = {
      x: 0,
      y: 0
    };
    this.gravity = 1;
		
    this.width = 30;
    this.height = 10*3;
    this.velocity = {
      x: 0,
      y: 0
			
    };
		this.image=Img
  }

  draw() {
		c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
      }

  update() {
    this.draw();
    
      this.position.x += this.velocity.x;
		
    this.position.y += this.velocity.y;
    if (
      this.position.y + this.height + this.velocity.y + this.gravity <=
      canvas.height
    )
      this.velocity.y += this.gravity;
			
    else this.velocity.y = 0;
   
  }

	
}

class Platform{
	constructor({x,y,image}){
		this.position = {
			x,
			y,
		};
		this.width = 100;
		this.height = 300;
		this.image = image;
	}
	draw(){
		c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
	}
}

class key{
	constructor(){
		this.
			left={
				pressed: false
			}
		this.
			right={
				pressed: false
			}
		this.
			up={
			pressed:false
			}
		this.
			down={
			pressed:false
			}
		
	}
}

class sky{
	constructor({image}){
		this.position = {
			x:0,
			y:0,
		};
		this.width = canvas.width;
		this.height = canvas.height;
		this.image = image;
		this.speed = 2;
	}
	draw(){
		c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
	}
	update(){
		this.x-=this.speed;
	}
}





const image = new Image();
image.src = pic;

const skyimage = new Image();
skyimage.src = ske;
const woman1 = new woman(Img);


const keys = new key();

const skie= new sky({image:skyimage});

let scrollOffset = 0
const x1 = rand(0, 900)
const x2 = rand(0, 900)
const x3 = rand(0, 900)
const y1 = rand(0, 470)
const y2 = rand(0, 470)
const y3 = rand(0, 470)
let platforms = [new Platform({ x:  x1, y: y1, image })]
let cn = 1
let score = 0
let incr = 1
function animate() {

	document.getElementById("Instruction").style.display="none"


	cn+=1
	let sp = 5
	if (woman1.position.x < 0) {
		sp = 0
		incr = 0
		document.getElementById("ovr").style.display="flex"
	}
	if (platforms.length > 30) {
		platforms= platforms.slice(10)
	}

	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

	scrollOffset -= 5
	platforms.forEach((platform) =>
		platform.position.x -= sp)
	if (scrollOffset % 100 == 0) {
		let j = 0
		while (j == 0) {
			let a = rand(100, 500)
			let b = rand(0, canvas.height - 10)
			const l = platforms.length
			const pl = platforms[l - 1]
			const pos = pl.position
			if (a != pos.x  && b != pos.y  ) {

				platforms.push(new Platform({ x: canvas.width + a, y: b, image }))
				j=1
			}
		}
}

	//skie.draw();
	//skie.update();
	//console.log(woman1.position.y)
	woman1.update();
	//console.log(platforms)
	platforms.forEach((platform) => {
		platform.draw()
	}) 
	//console.log((scrollOffset*-1)+canvas.width)

	


	if (keys.up.pressed && woman1.position.y + woman1.height < 0) {
		console.log(true)
		woman1.position.y = 0
	}
if(keys.right.pressed && woman1.position.x  < 900){

	woman1.velocity.x = 5
}
	
else if(keys.left.pressed && woman1.position.x  > 10){
	woman1.velocity.x = -5
}
else {
	woman1.velocity.x = 0	
	

}
	

	platforms.forEach((platform) => {
		if (woman1.position.x >= platform.position.x && woman1.position.x <= platform.position.x + platform.width + woman1.width && woman1.position.y >= platform.position.y && woman1.position.y <= platform.position.y + platform.width + woman1.height) {
			woman1.velocity.x = -50
		}
if(woman1.position.y + woman1.height <= (platform.position.y )&& woman1.position.y+woman1.height+woman1.velocity.y >= platform.position.y && woman1.position.x + woman1.width >= platform.position.x && woman1.position.x && woman1.position.x <= platform.position.x + platform.width)
{
	woman1.velocity.y=+5
}}
)
	
	if (cn % 61 == 0)
		score += incr

	document.getElementById("score").innerHTML=score


}

addEventListener("keydown", function ({ keyCode }) {
	if (keyCode == 32)
	animate()
  switch (keyCode) {
    case 65:
    case 97:
			
      console.log("left");
			keys.left.pressed = true
      break;
    case 83:
    case 115:
      
      console.log("down");
			keys.down.pressed = true;
      break;
    case 87:
    case 119:
			woman1.velocity.y -= 20;
      console.log(woman1.velocity.y);
			keys.up.pressed = true;
      break;
    case 68:
    case 100:
      console.log("right");
			keys.right.pressed = true;
      break;
  }
});
addEventListener("keyup", function ({ keyCode }) {
  switch (keyCode) {
    case 65:
    case 97:
      woman1.velocity.x = 0;
      console.log("left");
			keys.left.pressed = false;
      break;
    case 83:
    case 115:
      woman1.velocity.y = 0;
      console.log("down");
			keys.down.pressed = false;
      break;
    case 87:
    case 119:
      woman1.velocity.y = 0;
      console.log("up");
			keys.up.pressed = false;
      break;
    case 68:
    case 100:
      woman1.velocity.x = 0;
      console.log("right");
			keys.right.pressed = false;
      break;
  }
});
