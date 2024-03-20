const canvas = document.querySelector("canvas");
const c=canvas.getContext("2d");
canvas.height= window.innerHeight-20;
canvas.width= window.innerWidth-20;


const array=[];
for(let i=0;i<20;i++){
    const row=[];
    for(let j=0;j<20;j++){
        let record= new Box(i*10,j*10);
        row.push(record);
    }
    array.push(row);
}
// console.log(array);


function Box(x,y,size=10,value=0){
    this.x=x;
    this.y=y;
    this.size=size;
    this.value=value;
    this.draw=function(){
        c.beginPath();
        c.rect(this.x, this.y, this.size, this.size);
        if(this.value!=0){
            if(this.value==1){
                c.fillStyle="#ffff00";
            }
            else if(this.value==2){
                c.fillStyle="#0000ff";
            }
            else if(this.value==3){
                c.fillStyle="#00ff00";
            }
            else if(this.value==4){
                c.fillStyle="#ff0000";
            }
            else if(this.value==5){
                c.fillStyle="#ff00ff";
            }
            c.fill();
            // console.log("worked");
        }
        c.stroke();
    }
    this.update=function(){
        this.draw();
    }
}

canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - 6;
    const mouseY = event.clientY - rect.top - 6 ;
    
    // Check if the click occurred within any box
    for(let i=0;i<20;i++){
        for(let j=0;j<20;j++){
            if (mouseX >= array[i][j].x && mouseX <= array[i][j].x + array[i][j].size &&
                mouseY >= array[i][j].y && mouseY <= array[i][j].y + array[i][j].size) {
                // Change the color of the clicked box to black
                array[i][j].value = Math.floor(Math.random()*5 +1);
            }
        }
    }
    // console.log(rect);
});

// setInterval(() => {
function animate(){
    requestAnimationFrame(animate);
    for(let i=0;i<array[0].length;i++){
        for(let j=0;j<array.length;j++){
            array[i][j].update();
        }
    }
}
// }, 2000);

animate();