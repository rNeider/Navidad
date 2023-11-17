let audioElement = new Audio('img_sund/MusicaNavideña.mp3')
function reproducirCancion() {
    audioElement.play();
}

function pausarCancion() {
    audioElement.pause();
}

function obtenerTiempoFaltante(fechaLimite) {
    let ahora = new Date();
    tiempoFaltante = (new Date(fechaLimite) - ahora + 1000) / 1000;
    segundosFaltantes = ('0' + Math.floor(tiempoFaltante % 60)).slice(-2);
    minutosFaltantes = ('0' + Math.floor(tiempoFaltante / 60 % 60)).slice(-2);
    horasFaltantes = ('0' + Math.floor(tiempoFaltante / 3600 % 24)).slice(-2);
    diasFaltantes = ('0' + Math.floor(tiempoFaltante / (3600 * 24))).slice(-2);

    return {
        segundosFaltantes,
        minutosFaltantes,
        horasFaltantes,
        diasFaltantes,
        tiempoFaltante,
    }
}

function cuentaRegresiva(tiempoFaltante, dias, horas, minutos, segundos, FelizNavidad, mensaje) {
    const d = document.getElementById(dias);
    const h = document.getElementById(horas);
    const m = document.getElementById(minutos);
    const s = document.getElementById(segundos);
    const e = document.getElementById(FelizNavidad);

    const tiempoActual = setInterval(() => {
        let t = obtenerTiempoFaltante(tiempoFaltante);

        if (t.tiempoFaltante > 0) {
            Inicio.disabled = true; //fenir la variable true la cual viene por defecto
            Pausa.disabled = true;
            e.innerHTML = "Dias Que Faltan Para navidad";
            d.querySelector('.tiempo .valor').innerHTML = `${t.diasFaltantes}`;//el .tiempo  el .valor sirven para que cuando el valor llegue a la fecha dicha no se borren las letras que definimos en el html
            h.querySelector('.tiempo .valor').innerHTML = `${t.horasFaltantes}`;
            m.querySelector('.tiempo .valor').innerHTML = `${t.minutosFaltantes}`;
            s.querySelector('.tiempo .valor').innerHTML = `${t.segundosFaltantes}`;    
            
        } else {
            e.innerHTML = mensaje;
            Inicio.disabled = false; //fenir la variable false la cual permitira que la musica pueda sonar
            Pausa.disabled = false;
            Inicio.classList.add('playing');//se agrega la clase para el cambio de los estilos tanto el play como en pausa
            Pausa.classList.add('playing');
            papanoelQuieto.classList.add("on");
            d.querySelector('.tiempo .valor').innerHTML = `00`;// se agrega para que queden en 0 el valor
            h.querySelector('.tiempo .valor').innerHTML = `00`;
            m.querySelector('.tiempo .valor').innerHTML = `00`;
            s.querySelector('.tiempo .valor').innerHTML = `00`;
        }

        if (t.tiempoFaltante < 0) {
            clearInterval(tiempoActual);// al llegar debajo de cero se clerea el tiempo
        }
    }, 1000);
}

cuentaRegresiva('Nov 10 2023 11:15:00', 'dia', 'hora', 'minuto', 'segundo', 'felizNavidad', '¡Feliz Navidad!');//estamos llamando a las ides definidas en la funcion    

document.getElementById('Inicio').addEventListener('click', function () {
    if (!this.disabled) { //   si this .disable es diferente a true ejecute la funcion el ! viene por defecto true 
        reproducirCancion();//si la variable es diferente a true va a ejecutar la funcion
    }
}); 

document.getElementById('Pausa').addEventListener('click', function () {
    if (!this.disabled) {
        pausarCancion();
    }
});