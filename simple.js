var puntos = {
	puntos1: 0,
	puntos2: 0,
};

var controlador ={
	estado: false, // false si el juego no ha empezado, true si ha comenzado a moverse
};

function empezar(){
	cambiarEstado();
	moverObjetivos();
	eliminarEmpezar();
	emitirSonido();
	animacionBola("Circulo1");
	animacionBola("Circulo2");
}

function emitirSonido(){
	var audio = new Audio("start.ogg");
	audio.play();
}

function cambiarEstado(){
	controlador.estado = true;
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
        detenerBola("Circulo1");
    } else if (tecla == 83 || tecla == 40) {
        detenerBola("Circulo2");
    }
}

function animacionBola(idCirculo){
	
	var aux = Math.floor((Math.random() * 10) + 3);
	var circulo = document.getElementById(idCirculo);
	
	circulo.style.webkitAnimationDuration  = aux + "s";

	circulo.style.webkitAnimationPlayState = "running";
	
}

//Elimina el boton empezar 
function eliminarEmpezar(){
	document.getElementById("BotonEmpezar").style.zIndex = -1;
    document.getElementById("BotonReiniciar").style.zIndex = 1;

	var boton = document.getElementById("BotonEmpezar");
    boton.parentNode.removeChild(boton);
}

function reiniciar(){
	window.location.reload();
}

function detenerBola(idCirculo){
	var idCirculo = String(idCirculo.id);
	console.log("Parado");
	var circulo = document.getElementById(idCirculo);
	if(controlador.estado){
		console.log("Movimiento");
		circulo.style.webkitAnimationPlayState = "paused";
		circulo.style.zIndex = 1;
		if(idCirculo == "Circulo1"){
			calcularPuntos("Circulo1", "Rectangulo1" , "Objetivo1");
		}
	
		else if(idCirculo == "Circulo2"){
			calcularPuntos("Circulo2", "Rectangulo2", "Objetivo2");
		}
		sumaPuntos();
	}
	
}

function calcularPuntos(idCirculo, idRectangulo, idObjetivo){
	var circulo = document.getElementById(idCirculo);
	var objetivo = document.getElementById(idObjetivo);
	var rectangulo = document.getElementById(idRectangulo);
	var pivoteCirculo = circulo.offsetLeft + circulo.offsetWidth/2; //calcula el punto medio del circulo
	if(pivoteCirculo > rectangulo.offsetLeft && pivoteCirculo < rectangulo.offsetLeft + rectangulo.offsetWidth){ //si el ciculo esta dentro del rectangulo
		if(idCirculo == "Circulo1"){
			puntos.puntos1 = Math.abs(objetivo.offsetLeft -  pivoteCirculo);
			puntos.puntos1 = calcularTam (puntos.puntos1, rectangulo.offsetLeft + rectangulo.offsetWidth);
		}

		if(idCirculo == "Circulo2"){
			puntos.puntos2 = Math.abs(objetivo.offsetLeft -  pivoteCirculo);
			puntos.puntos2 = calcularTam (puntos.puntos2, rectangulo.offsetLeft + rectangulo.offsetWidth);
		}
	}
}

function calcularTam(puntos, tamRectangulo){
	var resultado = (puntos * 100)/tamRectangulo;
	resultado = parseInt(resultado);
	resultado = 100 - resultado;
	return resultado;
}

function sumaPuntos(){
	if(document.getElementById("Circulo1").style.webkitAnimationPlayState == "paused" && document.getElementById("Circulo2").style.webkitAnimationPlayState == "paused"){
		console.log("puntos1: " + puntos.puntos1);
		console.log("puntos2: " + puntos.puntos2);
		return (puntos.puntos1 + puntos.puntos2);
	}
}


