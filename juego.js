//function audio(){
var sonido1, sonido2, reproducir;
reproducir=false;

sonido1=new Audio();
sonido1.src='salto.mp3';

sonido2=new Audio();
sonido2.src='gameOver.mp3';
//}
//evento
///////////////////////////////////////////////////////////
document.addEventListener('keydown', function(evento){
  if(evento.keyCode == 32){//captura la entrada por teclado

      if(nivel.muerto==false){
            saltar();//ejecuta el movimiento de salto del personaje
            sonido1.play();
          }
          else {
            //vuelve a empezar la partida
            nivel.velocidad=9;
            fondo.velocidad=5;
            obstaculo.x=ancho+100;
            nivel.puntuacion=0;
            nivel.muerto=false;

          }
  }
});



///declaracion de las imagenes
///////////////////////////////////////////////////////////
var imgDoggy, imgObstaculo, imgFondo, imgSuelo, imgFondo;

function cargarImagenes(){
  imgDoggy=  new Image();
  imgDoggy.src='img/doggy1.png';

  imgObstaculo= new Image();
  imgObstaculo.src='img/imgObstaculo.png';

  imgFondo=new Image();
  imgFondo.src ='img/imgFondo.png';

  imgSuelo= new Image();
  imgSuelo.src='img/imgSuelo.png';

  imgFondo=new Image();
  imgFondo.src='img/imgFondo.png';

}

var ancho=700;
var alto=300;
var canvas,ctx;


///////////////////////////////////////////////////////////
///inicializo canvas
function inicializa(){
  canvas= document.getElementById('canvas');
  ctx=canvas.getContext('2d');
  cargarImagenes();

}
//reanuda los valores del canvas
function borrarCanvas(){
  canvas.width= ancho;
  canvas.height= alto;
}


//declaración los objetos con sus atributos
///////////////////////////////////////////////////////////
var suelo= 200;
var doggy= { y: suelo, vy:0, gravedad:2, salto: 28 , vymax:9, saltando:false};
var nivel= {velocidad:9, puntuacion:0 , muerto:false, level:1 };
var obstaculo={x:ancho+100, y:suelo-25}
var fondo={x:0, y:0, velocidad:5};


//declaro sus funciones dibujar
///////////////////////////////////////////////////////////
function dibujarFondo(){
  ctx.drawImage(imgFondo,0 ,0 ,624,313,fondo.x,fondo.y,1400,300);
}

function dibujarDoggy(){
  ctx.drawImage(imgDoggy,0,0,3550,2950,100,doggy.y,80,60);

}

function dibujaObstaculo() {
  ctx.drawImage(imgObstaculo,0,0,96,93,obstaculo.x,obstaculo.y,38,75);

}


//declaración de funciones lógicas
///////////////////////////////////////////////////////////

function logicaObstaculo(){
  if(obstaculo.x-nivel.velocidad<-100){
    obstaculo.x=ancho+100;
    nivel.puntuacion++;
  }else {
    obstaculo.x-=nivel.velocidad;
  }
}

function logicaFondo() {
  if(fondo.x-nivel.velocidad<-700){
    fondo.x+=ancho-100;
  }
  else {
    fondo.x-=fondo.velocidad;
  }

}

function saltar(){
  doggy.saltando=true;
  doggy.vy=doggy.salto;
}

function gravedad(){
  if(doggy.saltando==true){
    if(doggy.y - doggy.vy-doggy.gravedad>suelo){
      doggy.saltando=false;
      doggy.vy=0;
      doggy.y=suelo;
    }
    else{

  doggy.vy-=doggy.gravedad;
  doggy.y -=doggy.vy;
  }
  }
}
//Detección de colisiones , visualización de puntos y cambio de nivel
///////////////////////////////////////////////////////////
function colision(){

  if(obstaculo.x>=100 && obstaculo.x<=180){
    if(doggy.y>=suelo-25){
      nivel.muerto=true;
      reproducir=true;
      nivel.velocidad=0;
      fondo.velocidad=0;

    }
  }
}
  function puntuacion(){
    ctx.font="30px impact";
    ctx.fillStyle='#d52424';
    ctx.fillText('Score: '+`${nivel.puntuacion}`, 500, 50);
    ctx.fillText('Level: '+`${nivel.level}`, 400, 50);

    if(nivel.muerto ==true){
      ctx.font="60px impact";
      ctx.fillText('GAME OVER',240,150);

    }

  }
  function niveles(){
    if(nivel.puntuacion>=20){
      nivel.level=2;
      nivel.velocidad+2;
    }
    if(nivel.puntuacion>=40){
      nivel.level=3;
      nivel.velocidad+3;
    }
    else if (nivel.puntuacion>=60) {
      nivel.lavel=4;
      nivel.velocidad+4;
    }
  }


//bucle principal
///////////////////////////////////////////////////////////
var FPS=50;
setInterval(function(){
  pricipal();

},1000/FPS);

function pricipal(){
  borrarCanvas();
  gravedad();
  colision();
  dibujarFondo();
  logicaFondo();
  logicaObstaculo();
  dibujaObstaculo();
  dibujarDoggy();
  puntuacion();
  niveles();


}
