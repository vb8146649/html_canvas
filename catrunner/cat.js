const canvas = document.querySelector("canvas");
const c= canvas.getContext("2d");
canvas.width=window.innerWidth-16;
canvas.height=window.innerHeight-16;
var array=[];
var array2=[];
for(let i=0;i<5;i++){
    let x= Math.random()*(window.innerWidth);
    let y= Math.random()*(window.innerHeight/2);
    array2.push(new Alien(x,y));
}

function Alien(x,y){
    this.y=y;
    this.x=x;
    this.draw=function(){
        c.beginPath();
        c.rect(this.x,this.y,30,30);
        c.stroke();
    }
    this.update=function(){
        this.draw();
    }
}
function Bullet(dx=1,dy=1){
    this.x=(window.innerWidth-16)/2;
    this.y=(window.innerHeight-16);
    this.dx=dx;
    this.dy=dy;
    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,10,0,Math.PI * 2 , false);
        c.stroke();
    }
    this.update=function(){
        
        this.x=this.x+this.dx;
        this.y=this.y+this.dy;
        this.draw();
    }
}
canvas.addEventListener("mousedown",function(event){
    const mouseX=event.clientX;
    const mouseY=event.clientY;
    // console.log(mouseX);
    const dx = (mouseX-window.innerWidth/2)/(Math.sqrt((mouseX-window.innerWidth/2)**2+(mouseY-window.innerHeight)**2));
    const dy = (mouseY-window.innerHeight)/(Math.sqrt((mouseX-window.innerWidth/2)**2+(mouseY-window.innerHeight)**2));
    array.push(new Bullet(dx*4,dy*4));
})



function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight)
    for(let i=0;i<array.length;i++){
        array[i].update();
        array2=array2.filter((e)=>!(Math.abs(e.x-array[i].x)<=30 && Math.abs(e.y-array[i].y)<=30))
    }
    for(let i=0;i<array2.length;i++){
        array2[i].update();
    }
    if(array2.length<5){
        let x= Math.random()*(window.innerWidth);
        let y= Math.random()*(window.innerHeight/2);
        array2.push(new Alien(x,y));
    }
    array = array.filter((e)=> (e.x >= 0) && (e.y >= 0) );
    // console.log(array.length);
}
animate();