function configuracion(){
	var panel = document.getElementById("Configuracion");
	console.log(panel.style.display);
	if (panel.style.display == "" || panel.style.display == "inline"){
		panel.style.display = "none";
	}

	else{
		panel.style.display = "inline";
	}
	
}

function modificarTamBola(valor, idCirculo){
    var idCirculo = String(idCirculo.id);
    var circulo = document.getElementById(idCirculo);
    if(idCirculo == "Circulo1"){
        var rectangulo = document.getElementById("Rectangulo1");
        var objetivo = document.getElementById("Objetivo1");
    }
    else if(idCirculo == "Circulo2"){
        var rectangulo = document.getElementById("Rectangulo2");
        var objetivo = document.getElementById("Objetivo2");
    }
    var tam = Number(valor) + 10;
    circulo.style.height = tam + "vh";
    circulo.style.width = tam + "vh";
    rectangulo.style.height = tam + "vh";
    objetivo.style.height = tam + "vh";
}

function modificarTamRectangulo(valor, idRectangulo){
    var idRectangulo = String(idRectangulo.id);
    var rectangulo = document.getElementById(idRectangulo);
    var tam = Number(valor) + 35;
    rectangulo.style.width = tam + "vw";
}