var puntosTotales = {
	puntos1: 0,
	puntos2: 0,
};

var controlador ={
	estado: false, // false si el juego no ha empezado, true si ha comenzado a moverse
};


function empezar(){
	cambiarEstado();
	animacionBola("Circulo1");
	animacionBola("Circulo2");
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
	cronometro();
}

//funcion para parar las bolas con teclado:
function pararBolasTeclado(event) {
	var tecla = event.keyCode;
	if(controlador.estado){
		if (tecla == 87 || tecla == 38) {
			detenerBola(Circulo1);
		} else if (tecla == 83 || tecla == 40) {
			detenerBola(Circulo2);
		}
	}
}

function animacionBola(idCirculo){
	var circulo = document.getElementById(idCirculo);
	var tiempo = Math.floor((Math.random() * 10) + 3);
	//1229 son los px donde se encuentra el circulo en tamaño completo a 1080p de resolucion

	//se toma como estandar la velocidad de la bola y se ajusta el tiempo para que tenga la misma velocidad con la nueva distancia
	console.log("Tiempo1 " + tiempo);
	var vel = 1229/tiempo; //px/s que recorre la bola a la resolucion estandar
	tiempo = circulo.offsetLeft/vel; //calculamos el nuevo tiempo teniendo en cuenta la velocidad estandar y la nueva distancia
	console.log("tiempo2 " + tiempo);	

	circulo.style.webkitAnimationDuration  = tiempo + "s";
	circulo.style.animationDuration = tiempo + "s";

	circulo.style.webkitAnimationPlayState = "running";
	circulo.style.animationPlayState = "running";
}

//Elimina el boton empezar 
function eliminarEmpezar(){

	var boton = document.getElementById("BotonEmpezar");
    boton.parentNode.removeChild(boton);
}

function detenerBola(idCirculo){
	var idCirculo = String(idCirculo.id);
	var circulo = document.getElementById(idCirculo);
	if(controlador.estado){
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
	var puntos = 0;
	var coordenadasRectangulo = rectangulo.getBoundingClientRect(); //guarda las coordenadas del rectangulo
	if(pivoteCirculo > rectangulo.offsetLeft && pivoteCirculo < coordenadasRectangulo.right){ //si el ciculo esta dentro del rectangulo
		// el circulo esta justo en el objetivo
		if(pivoteCirculo == objetivo.offsetLeft){
			puntos = 100;
		}
		
		//el circulo esta a la derecha del objetivo
		else if(pivoteCirculo > objetivo.offsetLeft){
			//se pasan como argumentos:
			// Distancia que queda entre el objetivo y el punto medio del circulo
			// Distancia que hay entre el objetivo y la parte derecha del rectangulo
			puntos = calcularTam(pivoteCirculo - objetivo.offsetLeft, coordenadasRectangulo.right - objetivo.offsetLeft);
		}

		//el circulo esta a la izquierda del objetivo
		else if(pivoteCirculo < objetivo.offsetLeft){
			puntos = calcularTam(objetivo.offsetLeft - pivoteCirculo, objetivo.offsetLeft - coordenadasRectangulo.left); 
		}
		


		if(idCirculo == "Circulo1"){
			puntosTotales.puntos1 = puntos; 
		}

		else if(idCirculo == "Circulo2"){
			 puntosTotales.puntos2 = puntos;
		}
	}
}


function calcularTam(distancia, tamRectangulo){
	var resultado = (distancia * 100)/tamRectangulo;
	resultado = parseInt(resultado);
	resultado = 100 - resultado;
	return resultado;
}

function sumaPuntos(){
	if(document.getElementById("Circulo1").style.webkitAnimationPlayState == "paused" && document.getElementById("Circulo2").style.webkitAnimationPlayState == "paused"){
		crearReiniciar();
		
		console.log("puntos1: " + puntosTotales.puntos1);
		console.log("puntos2: " + puntosTotales.puntos2);
		return (puntosTotales.puntos1 + puntosTotales.puntos2);
	}
}

//Crea el boton reiniciar con sus atributos
function crearReiniciar(){
	if(!document.getElementById("botonReiniciar")){
		var boton = document.createElement("button");
		boton.type = "button";
		boton.id = "botonReiniciar";
		boton.style.position = "absolute";
		boton.style.top = "50%";
		boton.style.left = "50%";
		boton.textContent = "Reiniciar";
		boton.onclick = function() {
			window.location.reload();
		}

		document.body.appendChild(boton);
	}
	
}

var tiempo = 3;

function cronometro(){
	var imagen = document.getElementById("imagenCronometro");
	var audio = new Audio("start.mp3");
	
	if(tiempo == 3){
		eliminarEmpezar();
		imagen.src = "3.png";
		audio.play();
	}

	else if(tiempo == 2){
		imagen.src = "2.png";
		audio.play();
	}
	
	else if (tiempo == 1){
		imagen.src = "1.png";
		audio.play();
	}

	tiempo--;
	
	if(tiempo >= 0){
		setTimeout(cronometro, 1000);
	}

	if(tiempo == -1){
		audio.play();
		imagen.parentNode.removeChild(imagen);
		empezar();
	}
}
