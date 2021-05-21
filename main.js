const front = document.querySelector('.front');

document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
        front.classList.add('display-none');
    }, 5000)
} )



const canvas = document.getElementById("canvas") 
const ctx = canvas.getContext("2d")




let frames  = 0
let requestID;
let points = 0

//audio 
const audio = new Audio();
audio.src = "/audio/Lord Mavras.ogg";
audio.loop = true

const audio2 = new Audio();
audio2.src = "/audio/game-over.mp3";
audio2.loop = true

const audio3 = new Audio();
audio3.src = "/audio/win.ogg";
audio3.loop = true


//clases, contructor y atributos
class Vampire {
    constructor(x,y,w,h,imgs){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.escalera = false;
        //sprites vampiro
        this.image1 = new Image();
        this.image1.src = imgs[0];

        this.image2 = new Image();
        this.image2.src = imgs[1];
        this.lifes = 3
        this.image = this.image1
        //caminando atras
        this.image3 = new Image();
                this.image3.src = imgs[2];
                this.image4 = new Image();
                this.image4.src = imgs[3];
                

                this.image6 = this.image3
    }
 //metodo

    draw(){
        if(this.y <= 500 && !this.escalera ) this.y += 2 //posicion inicial en y del vampiro
        if(frames % 35 === 0){//35 es la velocidad con que se mueve

           
            if(this.image === this.image1){
                this.image = this.image2
            }else {
                this.image = this.image1
            }
        }
            //caminar atras
        /*if(this.y <= 130){
                    if(event.keyCode === 65){
                if(this.image === this.image3){
                    this.image = this.image4
                
    
                }else {
                    this.image = this.image3
                }
            }
            
            
        
        }*/
        
        

        if(this.y >= 395 && !this.escalera){ //395es nivel de la plataforma
            this.userPull= 395
            this.y = 393} //es el rebote

        if(this.y >= 247 && this.x <= 70 && !this.escalera){ //247 es el nivel del escalon 35 es el eje x
            this.userPull= 247
            this.y =245 
        }  

        if(this.y <= 190 && this.x <= 70 && !this.escalera){ //190 techo sobre escalon eje x
            this.userPull= 190
            this.y =192 
        } 

       

        
        if(this.y <= 85 && !this.escalera){  //85 es el limite del techo
            this.userPull= 85
            this.y = 87}
   
         
       
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    collision(bomb){
        return(
            this.x < bomb.x + bomb.width &&
            this.x + this.width > bomb.x  &&
            this.y < bomb.y + bomb.height &&
            this.y + this.height > bomb.y
        ) 
    }


}

class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image ()
        this.image.src = "./images/background.jpeg";
    }

   

    gameOver(){
        
        ctx.font ="80px Creepster " 
        ctx.color="white"
        ctx.fillStyle = "red";
        ctx.fillText("you are dead!!!",400,200)
    }
    draw(){
        
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        
    }

    winGame(){
        
        ctx.font ="80px Creepster " 
        ctx.color="white"
        ctx.fillStyle = "red";
        ctx.fillText("you win!!!",450,200)
    }
    draw(){
        
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        
    }

            
    
}

class Face1{
    constructor(){
        this.x = 850;
        this.y = 30;
        this.width = 60;
        this.height = 60;
        this.image = new Image ()
        this.image.src = "./images/face1.png";
}
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}


class Face2{
    constructor(){
        this.x = 920;
        this.y = 30;
        this.width = 60;
        this.height = 60;
        this.image = new Image ()
        this.image.src = "/images/face2.png";
}
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Face3{
    constructor(){
        this.x = 990;
        this.y = 30;
        this.width = 60;
        this.height = 60;
        this.image = new Image ()
        this.image.src = "./images/face3.png";
}
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}


class Baty{
    constructor(){
        this.x = 80;
        this.y = 30;
        this.width = 50;
        this.height = 50;
        this.image = new Image ()
        this.image.src = "./images/baty.png";
    }
    draw(){
        
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        
    }
}

class Bomb{
    constructor(x){
        this.y = 0; 
        this.x = Math.floor(Math.random() * (800-106) + 106)
        this.width = 80;
        this.height = 80;
        //imagen
        this.image = new Image();
        this.image.src = "/images/cruz.png" ;
    }

    draw(){
        if(frames % 10 ) this.y += 3.5; //3 representa la velocidad en que caen las t


        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

}

class PinkBat{
    constructor(x,imgs){
        this.x = x;
        this.y = Math.floor(Math.random() * (500-100) + 100)
        this.width = 30
        this.height = 30
        this.image1 = new Image();
        this.image1.src = imgs[0];

        this.image2 = new Image();
        this.image2.src = imgs[1];

        this.image = this.image1
    }

    draw(){

        this.x -=3
        if(frames % 10 === 0 ){
            this.image = this.image === this.image1 ? this.image2 : this.image1
        }

        
        
         
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)

    }

    

   
}
const vampiImgs = [
    "./images/vamp1.png",
    "./images/vamp2.png",
    "./images/vamp3.png",
    "./images/vamp4.png"
]

const batImgs = [
    "./images/bat1.png",
    "./images/bat2.png"
]

let bombs = []
let pinks = []




const vampire = new Vampire(2,570,80,110,vampiImgs)//punto de inicio y medidas del personaje
const back = new Background()
const batBaty = new Baty()
const face1 = new Face1()
const face2 = new Face2()
const face3 = new Face3()


/*update!! es para mover todo lo que queramos y
 verlo reflejado en el ca
 nvas*/



function update(){
    frames ++;

    //limpiar el canvas es muy importante para que no se sobrepongas las anteriores capas
    ctx.clearRect(0,0,canvas.width,canvas.height)
    
    back.draw()
    //back2.draw()
    batBaty.draw()
    face1.draw()
    vampire.draw()
    generateBats()
    console.log(vampire)
    generateBombs()
    drawBombs()
    drawvamps()
    ctx.font = "30px Creepster"
    ctx.fillStyle = "#78288C";
    ctx.fillText(points,50,60)

    if(vampire.lifes>=3){
        face3.draw()
    }

    if(vampire.lifes>=2){
        face2.draw()
    }

    
    if(requestID){
       requestID =  requestAnimationFrame(update)
    }
    
    if (!(vampire.x + vampire.width >= 960 && vampire.x + canvas.width)){
        vampire.escalera = false
    }

}

function start(){
   requestID =  requestAnimationFrame(update)
   audio.play()
   audio2.pause()
   audio3.pause()
}

function gameOver(){
    audio.pause()
    audio2.play()
    back.gameOver()
    requestID = undefined
}

function winGame(){
    audio.pause()
    audio3.play()
    back.winGame()
    requestID = undefined
}
//solo nos sirve para instanciar la clase enemi y subirla al arreglo 
function generateBombs(){
    
    if(!(frames % 350 == 0 ))return //condicion para generar vengalas
    
        
        

       
        const bomb = new Bomb()
        //enemies.push(enemy)
        bombs = [...bombs,bomb]
        /* para hacer un math randon en un rango Math.floor(Math.random()*
        (rangomaximo  - rangominimo)+ rangominimo)*/ 
    


}



function  generateBats(){

    if(!(frames % 380 == 0))return //condicion para generar bats
    const arr = new PinkBat(canvas.width, batImgs)
    
        pinks = [...pinks,arr]
   
}


function drawvamps(){
    pinks.forEach((arr,index_arr)=>{
        arr.draw()
        
   


if(vampire.collision(arr)){
    pinks.splice(index_arr,1)
    points+=1
    if(points>=5){
        winGame()
    }
}

   if(arr.x+arr.width<=0){
       pinks.splice(index_arr,1)
   }

    })
}


//Dibujamos los enemigos del arreglo!!!

function drawBombs(){
    bombs.forEach((bomb,index_bomb)=>{
        bomb.draw()
        

    if(vampire.collision(bomb)){
        vampire.lifes -=1 
        bombs.splice(index_bomb,1)
        if(vampire.lifes<=0){

            gameOver()
        }
        
    }

    

    })
}
//mover vampiro




addEventListener("keydown", (event)=>{
    //izq
    if(event.keyCode === 65){
        vampire.x -= 20;
        if (vampire.x + vampire.width >= 960 && vampire.x + vampire.width <= 1100){ 
            vampire.escalera = true;
            vampire.y +=20
        }

       
    }
    //de
    if(event.keyCode === 68){
        vampire.x += 20
        if (vampire.x + vampire.width >= 960 && vampire.x + vampire.width <= 1100){ 
            vampire.escalera = true;
            vampire.y -=20
        }

        
    }
    //salto
    if(event.keyCode === 87){
       
        if (!(vampire.x + vampire.width >= 960 && vampire.x + canvas.width)){
            vampire.y -= 60;
        }
    }

    if(event.keyCode === 32){
        generateBats()
    }

    if(event.keyCode === 13){
        start()
    }

    if(event.keyCode === 50){
        winGame()
        
    }
    
    if(event.keyCode === 49){
        gameOver()
        
    }

})