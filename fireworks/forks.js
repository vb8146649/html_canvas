const canvas = document.querySelector("canvas")
canvas.height=window.innerHeight-20;
canvas.width=window.innerWidth-20;
const c = canvas.getContext("2d")
const gravity =0.05 ;
const friction=0.99 ;
let array=[];

window.addEventListener('resize', () => {
    canvas.width = innerWidth-20;
    canvas.height = innerHeight-20;
})
class Fireworks{

    constructor(x,y,radius,color,velocity){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
        this.velocityx=velocity.x;
        this.velocityy=velocity.y;
        this.alpha=1;
    }

    draw(){
        c.save();
        c.beginPath();
        c.globalAlpha=this.alpha;
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.restore();
    }

    update(){
        this.draw() ;
        this.alpha-=0.005;
        this.velocityx*=friction ;
        this.velocityy+=gravity ;
        this.y+=this.velocityy ;
        this.x+=this.velocityx ;
    }

}

window.addEventListener("click",(event)=>{
    console.log(event);
    for(let i=0;i<300;i++){
        array.push(new Fireworks(event.clientX,event.clientY,3,`rgb(${150*Math.random()+104},${150*Math.random()+104},${150*Math.random()+104})`,{x : 6*Math.cos(i)*Math.random() , y : 6*Math.sin(i)*Math.random()}));
    }
})

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle="rgba(0,0,0,0.1)";
    c.fillRect(0,0,window.innerWidth,window.innerHeight);
    // c.clearRect(0,0,window.innerWidth,window.innerHeight);
    for(let i=0;i<array.length;i++){
        if(array[i].alpha<0){
            array.splice(i,1);
        }else{
            array[i].update();
        }
    }
}

animate();