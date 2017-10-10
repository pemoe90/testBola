//funcion prueba
function myFunction() {
  alert("Hola");
}

function empezar(){
  moverObjetivos();
  animacionBola();
}

//funcion para mover a un lugar aleatorio los objetivos
function moverObjetivos() {
    //Math.floor(Math.random()*(max-min+1)+min);
    var aux = 0; //variable para guardar un numero aleatorio
    aux = Math.floor((Math.random()* 16) + 15);//entre 15 y 30
    document.getElementById("Objetivo1").style.left = aux + "%";
    aux = Math.floor((Math.random()* 16) + 15);
    document.getElementById("Objetivo2").style.left = aux + "%";
}


//funcion para parar las bolas con teclado:

function pararBolasTeclado(event){
  var tecla = event.keyCode;
  if (tecla == 87 || tecla == 38) {
    detenerBola1();
  }

  else if (tecla == 83 || tecla == 40) {
    detenerBola2();
  }
}

//funcion para empezar la animacion de las bolas
function animacionBola(){
  var aux, aux1; //Variable para guardar el tiempo que tarda la animacion de forma aleatoria
  aux = Math.floor((Math.random()* 10) + 3);
  document.getElementById("Circulo1").style.webkitAnimationDuration = aux + "s";

  aux = Math.floor((Math.random()* 6) + 3);
  document.getElementById("Circulo2").style.webkitAnimationDuration = aux + "s";

  document.getElementById("Circulo2").style.webkitAnimationPlayState = "running";
  document.getElementById("Circulo1").style.webkitAnimationPlayState = "running";

  document.getElementById("BotonEmpezar").style.zIndex = -1;
  document.getElementById("BotonReiniciar").style.zIndex = 1;

  var boton = document.getElementById("BotonEmpezar");
  boton.parentNode.removeChild(boton);
}


function reiniciar(){
  window.location.reload();
}
function detenerBola1(){
  document.getElementById("Circulo1").style.webkitAnimationPlayState = "paused";
  document.getElementById("Circulo1").style.zIndex = 1;
}

function detenerBola2(){
  document.getElementById("Circulo2").style.webkitAnimationPlayState = "paused";
  document.getElementById("Circulo2").style.zIndex = 1;
}
