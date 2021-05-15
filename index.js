const canvas = document.getElementById("canvas") 
const ctx = canvas.getContext("2d")


let frames  = 0
let requestID;
let points = 0

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

        this.image = this.image1
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

        if(this.y >= 395 && !this.escalera){ //395es nivel de la plataforma
            this.userPull= 395
            this.y = 393} //es el rebote

        if(this.y >= 247 && this.x <= 70 && !this.escalera){ //247 es el nivel del escalon 35 es el eje x
            this.userPull= 247
            this.y =245 
        }  
        if(this.y <= 85 && !this.escalera){  //85 es el limite del techo
            this.userPull= 85
            this.y = 87}
   
         
       
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    collision(enemy){
        return(
            this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x  &&
            this.y < enemy.y + enemy.height &&
            this.y + this.height > enemy.y
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
        this.image.src = "/images/background.jpeg"
    }

    gameOver(){
        
        ctx.font ="80px Arial " 
        ctx.color="white"
        ctx.fillStyle = "red";
        ctx.fillText("Te Moriste!!!",250,200)
    }
    draw(){
        
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
       
    }
}
class Bomb{
    constructor(){
        this.y = 0; 
        this.x = 206;
        this.width = 80;
        this.height = 80;
        //imagen
        this.image = new Image();
        this.image.src = "/images/luz.jpeg" 
    }

    draw(){
        if(frames % 10 ) this.y += 1;


        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

}

class PinkBat{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 30
        this.height = 30
        this.image1 = new Image();
        this.image1.src = imgs[0];

        this.image2 = new Image();
        this.image2.src = imgs[1];

        this.image = this.image1
    }

    draw(){
        
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)

    }

    collision(enemy){
        return(
            this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x  &&
            this.y < enemy.y + enemy.height &&
            this.y + this.height > enemy.y
        ) 
    }
}
const vampiImgs = [
    "/images/output-onlinepngtools (2).png",
    "/images/output-onlinepngtools (3).png"
]

const batImgs = [
    "/images/bat1.png",
    "/images/bat2.png"
]

let bombs = []
let pinks = []


const vampire = new Vampire(2,570,120,120,vampiImgs)//punto de inicio y medidas del personaje
const back = new Background()
const pinki = new PinkBat(25,570,30,30,batImgs)
/*update!! es para mover todo lo que queramos y
 verlo reflejado en el ca
 nvas*/

function update(){
    frames ++;
    //limpiar el canvas es muy importante para que no se sobrepongas las anteriores capas
    ctx.clearRect(0,0,canvas.width,canvas.height)
    back.draw()

    vampire.draw()
    pinki.draw()
    console.log(vampire)
    generateBombs()
    drawBombs()

    ctx.font = "30px Arial"
    ctx.fillText(points,350,80)
    if(requestID){
       requestID =  requestAnimationFrame(update)
    }
    

}

function start(){
   requestID =  requestAnimationFrame(update)
}

function gameOver(){
    back.gameOver()
    requestID = undefined
}
//solo nos sirve para instanciar la clase enemi y subirla al arreglo 
function generateBombs(){
    const newBombs = getRandomBombs(100,200)
    if(frames % 100 === 0 || frames % 60 === 0 || frames % 170 ===  0){
        //esto es  ejemplo para cosas random
        let widthRan = Math.floor(Math.random() * 300 )

        let x = Math.floor(Math.random() * (canvas.width -400) + 400 )
       //
        const bomb = new Bomb(widthRan, x)
        //enemies.push(enemy)
        bombs = [...bombs,bomb]
        /* para hacer un math randon en un rango Math.floor(Math.random()*
        (rangomaximo  - rangominimo)+ rangominimo)*/ 
    }


}

function getRandomBombs(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}


function  generateBats(){
    const bullet = new PinkBat(vampire.x+vampire.width,vampire.y)
  
   // if(bullets < 3){
        console.log("mando bien")
        pinks = [...pinks,bullet]
   // }
}



//Dibujamos los enemigos del arreglo!!!

function drawBombs(){
    bombs.forEach((bomb,index_bomb)=>{
        bomb.draw()
        

      

    if(vampire.collision(bomb)){
        console.log("Me esta tocando!!!!!!")
        gameOver()
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
        vampire.y -= 60;
    }

    if(event.keyCode === 32){
        generateBats()
    }

    if(event.keyCode === 13){
        start()
    }
    

})