const canvas = document.querySelector("canvas")
canvas.height=window.innerHeight-20;
canvas.width=window.innerWidth-20;
const c = canvas.getContext("2d");
let reverse=true;
let direction=1;

const imgP=new Image();
const imgT=new Image();
imgT.src="rpg/pngwing.com.png";
imgP.src="rpg/pngwing.com (1).png";


class Player{
    constructor(x,y,posx,posy,frame,size){
        this.x=x;
        this.y=y;
        this.frame=frame;
        this.size=size;
        this.posx=posx;
        this.posy=posy;
    }

    default(){
        this.size=Math.abs(this.size);
        this.frame=0;
    }

    draw(){
        c.save();
        if (direction === -1) {
            // Flip the player image horizontally if moving left
            c.translate(200,0);
            c.scale(-1, 1);
        }
        c.drawImage(imgP,this.posx+this.frame,this.posy,Math.abs(this.size),Math.abs(this.size),this.x,this.y,200,200);
        c.restore();
        // console.log(this.frame);
    }

    fist(){
        this.posx=1024/3;
        this.posy=683*3 /6;
        this.default();
    }

    kamehame(){
        this.posx=1024/3;
        this.posy=683*1/6;
        this.default();
    }
    
    
    jump(){
        
    }
    
    moveleft(){
        this.moveright();
    }
    moveright(){
        this.posx=1024*2/3;
        this.posy=0;
        this.default();
        
    }
    
    attack(){
        this.posx=1024/3;
        this.posy=0;
        this.default();
      
    }


    fpm(){
        this.frame+=this.size;
        if(reverse===true){
            if (this.frame >= 220 || this.frame < Math.abs(this.size)) {
                this.size = -this.size;
            }
        }else{
            if(this.frame>=300){
                this.frame=0;
                this.posx=0;
                this.posy=0;

            }
        }
        console.log(this.posx+this.frame);
    }

    update(){
        this.draw();
    }
}

addEventListener("keypress",(event)=>{
    if(event.key===" "){
        player.attack();
        reverse=false;
    }
    if(event.key==="f"){
        player.fist();
        reverse=false;
    }
    if(event.key==="k"){
        player.kamehame();
        reverse=false;
    }
    if(event.key==="d"){
        player.moveright();
        direction=1;
        reverse=true;
    }
    if(event.key==="a"){
        direction=-1;
        player.moveleft();
        reverse=true;
    }
})



let player = new Player(0,0,0,0,0,Math.ceil(1024/9));

setInterval(()=>{
    player.fpm();
},250)

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    player.update();
}

imgP.onload=()=>{
    animate();
}