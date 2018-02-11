var puntos = {
	puntos1: 0,
	puntos2: 0,
};

//funcion prueba
function prueba() {
	document.getElementById("Circulo1").style.animationDuration = 15 + "s";
    document.getElementById("Circulo1").style.animationPlayState = "running";
}

function empezar() {
    moverObjetivos();
    animacionBola();
}

//funcion para mover a un lugar aleatorio los objetivos
function moverObjetivos() {
    //Math.floor(Math.random()*(max-min+1)+min);
    var aux = 0; //variable para guardar un numero aleatorio
    aux = Math.floor((Math.random() * 16) + 15); //entre 15 y 30
    document.getElementById("Objetivo1").style.left = aux + "%";
    aux = Math.floor((Math.random() * 16) + 15);
    document.getElementById("Objetivo2").style.left = aux + "%";
}


//funcion para parar las bolas con teclado:

function pararBolasTeclado(event) {
    var tecla = event.keyCode;
    if (tecla == 87 || tecla == 38) {
        detenerBola1();
    } else if (tecla == 83 || tecla == 40) {
        detenerBola2();
    }
}

//funcion para empezar la animacion de las bolas
function animacionBola() {
    var aux, aux1; //Variable para guardar el tiempo que tarda la animacion de forma aleatoria
    aux = Math.floor((Math.random() * 10) + 3);
    document.getElementById("Circulo1").style.webkitAnimationDuration = aux + "s";

    aux = Math.floor((Math.random() * 6) + 3);
    document.getElementById("Circulo2").style.webkitAnimationDuration = aux + "s";

    document.getElementById("Circulo2").style.webkitAnimationPlayState = "running";
    document.getElementById("Circulo1").style.webkitAnimationPlayState = "running";

    document.getElementById("BotonEmpezar").style.zIndex = -1;
    document.getElementById("BotonReiniciar").style.zIndex = 1;

    var boton = document.getElementById("BotonEmpezar");
    boton.parentNode.removeChild(boton);
}


function reiniciar() {
    window.location.reload();
}

function detenerBola1() {
    document.getElementById("Circulo1").style.webkitAnimationPlayState = "paused";
	document.getElementById("Circulo1").style.zIndex = 1;
	calcularPuntos1();
	sumaPuntos();
}

function detenerBola2() {
    var circulo = document.getElementById("Circulo2");
    circulo.style.webkitAnimationPlayState = "paused";
	circulo.style.zIndex = 1;
	calcularPuntos2();
	sumaPuntos();
}

function cambiarBola1(valor) {
    var circulo = document.getElementById("Circulo1");
    var rectangulo = document.getElementById("Rectangulo1");
    var objetivo = document.getElementById("Objetivo1");
    var tam = Number(valor) + 10;
    circulo.style.height = tam + "vh";
    circulo.style.width = tam + "vh";
    rectangulo.style.height = tam + "vh";
    objetivo.style.height = tam + "vh";
}

function calcularPuntos1(){
	var circulo = document.getElementById("Circulo1");
	var objetivo = document.getElementById("Objetivo1");
	var rectangulo = document.getElementById("Rectangulo1");
	var pivoteCirculo = circulo.offsetLeft + circulo.offsetWidth/2; //calcula el punto medio del circulo
	if(pivoteCirculo > rectangulo.offsetLeft && pivoteCirculo < rectangulo.offsetLeft + rectangulo.offsetWidth){ //si el ciculo esta dentro del rectangulo
		puntos.puntos1 = Math.abs(objetivo.offsetLeft -  pivoteCirculo);
		puntos.puntos1 = calcularTam (puntos.puntos1, rectangulo.offsetLeft + rectangulo.offsetWidth);
	}
}

function calcularPuntos2(){
	var circulo = document.getElementById("Circulo2");
	var objetivo = document.getElementById("Objetivo2");
	var rectangulo = document.getElementById("Rectangulo2");
	var pivoteCirculo = circulo.offsetLeft + circulo.offsetWidth/2; //calcula el punto medio del circulo
	if(pivoteCirculo > rectangulo.offsetLeft && pivoteCirculo < rectangulo.offsetLeft + rectangulo.offsetWidth){ //si el ciculo esta dentro del rectangulo
		puntos.puntos2 = Math.abs(objetivo.offsetLeft -  pivoteCirculo);
		puntos.puntos2 = calcularTam (puntos.puntos2, rectangulo.offsetLeft + rectangulo.offsetWidth);
	}
}

//funcion que calcula el % de los puntos respecto al tamaño del rectangulo
function calcularTam(puntos, tamRectangulo){
	var resultado = (puntos * 100)/tamRectangulo;
	resultado = parseInt(resultado);
	resultado = 100 - resultado;
	return resultado;
}

//funcion suma los puntos totales
function sumaPuntos(){
	if(document.getElementById("Circulo1").style.webkitAnimationPlayState == "paused" && document.getElementById("Circulo2").style.webkitAnimationPlayState == "paused"){
		console.log(puntos.puntos1 + puntos.puntos2);
		return (puntos.puntos1 + puntos.puntos2);
	}
}
