const canvas = document.querySelector("canvas")
canvas.height=window.innerHeight-20;
canvas.width=window.innerWidth-20;
const c = canvas.getContext("2d");
let array=[];
let array1=[];
let array2=[];


class Player{
    constructor(x,y,framex,framey,size,img,velocity){
        this.x=x;
        this.img=img;
        this.framex=framex;
        this.framey=framey;
        this.size=size;
        this.velocity=velocity;
        this.y=y;
        this.keysPressed = {};
    }
    
    still(){
        this.framex=80;
    }

    moveleft(){
        this.x-=this.velocity;
    }
    
    moveright(){
        this.x+=this.velocity;
    }
    
    moveup(){
        this.y-=this.velocity;
        this.framex=0;
    }
    
    movedown(){
        this.y+=this.velocity;
        this.framex=160;
    }
    
    updateDirection() {
        // Check which direction keys are currently pressed
        if (this.keysPressed["ArrowLeft"]) {
            this.moveleft();
        }
        else if (this.keysPressed["ArrowRight"]) {
            this.moveright();
        }
        else if (this.keysPressed["ArrowUp"]) {
            this.moveup();
        }
        else if (this.keysPressed["ArrowDown"]) {
            this.movedown();
        }else{
            this.still();
        }
    }
    
    
    draw(){
        c.drawImage(this.img , this.framex ,this.framey , this.size , this.size , this.x-40, this.y-40 ,80,80);
    }
    
    update(){
        this.updateDirection();
        this.draw();
    }
}


let image=new Image();
image.src="spaceship/dftibl9-443f0373-e395-47cf-9486-2cbd3c914c55.png";
image.onload;
const player = new Player(200,500,80,80,80,image,1.5);

class Bullet{
    constructor(x,y,velocity,direction){
        this.x=x;
        this.y=y;
        this.velocity=velocity;
        this.direction=direction;
    }

    draw(){
        c.beginPath();
        c.arc(this.x,this.y,5,0,Math.PI*2,false);
        c.fillStyle="rgb(255,0,0)";
        c.fill();
        c.stroke();
    }

    update(){
        this.y-=this.velocity*this.direction;
        this.draw();
    }
}
setInterval(()=>{
    array.push(new Bullet(player.x,player.y-30,2,1));
},250)

class Alien{
    constructor(x,y,img,velocityx,velocityy){
        this.x=x;
        this.y=y;
        this.img=img;
        this.velocityx=velocityx;
        this.velocityy=velocityy;
    }

    draw(){
        // c.fillStyle="rgb(255,0,0)";
        // c.fillRect(this.x-10,this.y-10,20,20);
        // c.stroke();
        c.save();
        c.translate(0,80);
        c.scale(1,-1);
        c.drawImage(this.img, this.x-40, -this.y+40 ,80,80);
        c.restore();
    }
    
    // bounce(v){
    //     if(v>limit){
    //         v=-Math.abs(v);
    //     }
    // }

    update(){
        this.x+=this.velocityx;
        if(this.x>canvas.width || this.x<0){
            this.velocityx=-this.velocityx;
        }
        this.y+=this.velocityy;
        this.draw();
    }
}
let imageA=new Image();
imageA.src="spaceship/transparent_2024-03-22T12-09-06.png";
imageA.onload;

setInterval(()=>{
    array1.push(new Alien(canvas.width*Math.random(),0,imageA,0.1*Math.random()+0.1,0.1*Math.random()+0.1))
},1000)
setInterval(()=>{
    array1.forEach((alien)=>{
        array2.push(new Bullet(alien.x,alien.y,1,-1));
    })
},1000)

document.addEventListener("keydown", (event) => {
    player.keysPressed[event.key] = true; // Mark the pressed key in the keysPressed object
});

document.addEventListener("keyup", (event) => {
    delete player.keysPressed[event.key]; // Remove the released key from the keysPressed object
});


function animate(){
    let animeId=requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    c.fillStyle="rgb(0,0,0)";
    c.fillRect(0,0,window.innerWidth,window.innerHeight);
    player.update();
    for(let j=array1.length-1;j>=0;j--){
        array1[j].update();
        for (let i=array.length-1;i>=0;i--){
            if(array1[j]===undefined){
                break;
            }
            if(array1[j].y>canvas.height-20){
                cancelAnimationFrame(animeId);
            }
            if(40>Math.sqrt((array1[j].x-array[i].x)**2+(array1[j].y-array[i].y)**2)){
                array.splice(i,1);
                array1.splice(j,1);
            }
        }
    }
    // console.log(array1.length," ",array.length);
    for (let i=0;i<array.length;i++){
        array[i].update();
        if(array[i].y<0){
            array.splice(i,1);
        }
    }
    for (let i=0;i<array2.length;i++){
        array2[i].update();
        if(array2[i].y>canvas.height){
            array2.splice(i,1);
        }
        if(30>Math.sqrt((array2[i].x-player.x)**2+(array2[i].y-player.y)**2)){
            cancelAnimationFrame(animeId);
        }
    }
    console.log(array2.length);
    // console.log(player.frame);
    // console.log("work");

}

animate();
