const canvas = document.querySelector("canvas");
const c= canvas.getContext("2d");
canvas.width=window.innerWidth-16;
canvas.height=window.innerHeight-16;
let mousex=undefined;
let mousey=undefined;
let end=false;
let array=[];

class Alien{
    constructor(x,y,velocity,size){
        this.x=x;
        this.y=y;        
        this.velocity=velocity;        
        this.size=size;
    }

    draw(){
        c.beginPath();
        c.fillRect(this.x-this.size/2,this.y-this.size/2,this.size,this.size);
        c.stroke();
    }

    update(){
        this.draw();
        if(mousex!==undefined){
            this.x+=((mousex-this.x)/Math.sqrt((mousex-this.x)**2+(mousey-this.y)**2))*(this.velocity);
        }
        if(mousey!==undefined){
            this.y+=((mousey-this.y)/Math.sqrt((mousex-this.x)**2+(mousey-this.y)**2))*(this.velocity);
        }
    }
}

addEventListener("mousemove",(e)=>{
    mousex=e.clientX;
    mousey=e.clientY;
})

setInterval(()=>{
    array.push(new Alien(canvas.width*Math.random(),canvas.height*Math.random(),0.1*Math.random()+1,6*Math.random()+20));
},1000)


function animate(){
    let animeId = requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    for(let i=0;i<array.length;i++){
        array[i].update();
        if(Math.abs(mousex-array[i].x)<= array[i].size/2 && Math.abs(mousey-array[i].y)<= array[i].size/2){
            end=true;
        }
    }
    if(end){
        cancelAnimationFrame(animeId);
    }
}

animate();