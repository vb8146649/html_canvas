const canvas = document.querySelector("canvas")
canvas.height=window.innerHeight-20;
canvas.width=window.innerWidth-20;
const c = canvas.getContext("2d");
const gravity = 0.05;
let array=[];
let count=0;
let animationId;

class Bird{
    constructor(x,y,velocityy){
        this.velocityy=velocityy;
        this.x=x;
        this.y=y;
    }
    draw(){
        c.beginPath();
        c.rect(this.x-25,this.y-25,50,50);
        c.fillStyle="rgb(0,0,0)";
        c.fill();
        c.stroke();
    }

    jump(){
        this.velocityy-=this.velocityy+3;
    }

    update(){
        this.draw();
        this.velocityy+=gravity;
        this.y+=this.velocityy;
    }
}

class Pipe{
    constructor(x,y,width,size){
        this.x=x;
        this.y=y;
        this.size=size;
        this.width=width;
    }

    draw(){
        c.beginPath();
        c.fillRect(this.x,0,this.width,this.y-this.size);
        c.fillRect(this.x,this.y+this.size,this.width,canvas.height-(this.y+this.size));
        c.stroke();
    }

    update(){
        this.draw();
        this.x-=1;
    }
}

setInterval(()=>{
    array.push(new Pipe(canvas.width , canvas.height*Math.random(), 50 , 70));
    count++;
    // console.log(array.length);
},2000)

let bird = new Bird(200,canvas.height/2,0.1);
window.addEventListener("click",()=>{
    bird.jump();
})

function animate(){
    animationId=requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    bird.update();
    let collided = false;
    for(let i=0;i<array.length;i++){
        array[i].update();
        if(bird.x >= array[i].x && bird.x <=array[i].x + array[i].size){
            if(bird.y>= array[i].y-array[i].size && bird.y <= array[i].y+array[i].size){
                
            }else{
                // window.close();
                collided=true;
                console.log(collided);
                break;
            }
        }
    }
    if(collided){
        cancelAnimationFrame(animationId);
    }
    if( array.length > 9){
        array.splice(1,1);
    }
}

animate();
