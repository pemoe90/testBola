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
    var aux; //variable para guardar un numero aleatorio
    aux = Math.floor((Math.random()* 20) + 10);
    document.getElementById("Objetivo1").style.left = aux + "%";
    aux = Math.floor((Math.random()* 20) + 10);
    document.getElementById("Objetivo2").style.left = aux + "%";
}

//funcion para empezar la animacion de las bolas
function animacionBola(){
  var aux; //Variable para guardar el tiempo que tarda la animacion de forma aleatoria
  aux = Math.floor((Math.random()* 5) + 2);
  document.getElementById("Circulo1").style.webkitAnimationDuration = aux + "s";
  document.getElementById("Circulo1").style.webkitAnimationPlayState = "running";

  aux = Math.floor((Math.random()* 5) + 2);
  document.getElementById("Circulo2").style.webkitAnimationDuration = aux + "s";
  document.getElementById("Circulo2").style.webkitAnimationPlayState = "running";
}

function detenerBola1(){
  document.getElementById("Circulo1").style.webkitAnimationPlayState = "paused";
  document.getElementById("Circulo1").style.zIndex = 1;
}

function detenerBola2(){
  document.getElementById("Circulo2").style.webkitAnimationPlayState = "paused";
  document.getElementById("Circulo2").style.zIndex = 1;
}
