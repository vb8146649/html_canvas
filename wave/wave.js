const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.height= window.innerHeight-20;
canvas.width= window.innerWidth-20;
function Wave(){
    this.x=x;
    this.y=y;
}
let frequency =0;
let height =0;
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle="rgba(255,255,255,0.05";
    c.fillRect(0,0,window.innerWidth,window.innerHeight);
    c.beginPath();
    c.moveTo(0,canvas.height/2);
    for(let i=0;i<canvas.width;i+=3){
        c.lineTo(i,canvas.height/2+Math.sin(i/40 +frequency)*(Math.cos(height)*100));
    }
    c.strokeStyle='rgb(255,0,0)';
    c.stroke();
    frequency+=0.1;
    height+=0.05;
}

animate();