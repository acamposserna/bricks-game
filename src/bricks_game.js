/**
 * Juego de los ladrillos
 *
 * Este juego se ha diseñado con propositos de aprenizaje, no está optimizado para un uso profesional.
 *
 * @type {HTMLElement}
 * @author Antonio Campos Serna (https://github.com/acamposserna)
 * @version 0.0.1
 * @since 23/08/2023
 */

/**
 * CONSTANTES
 */

// Parámetros de la pelota
const radioPelota = 10;
const colorPelota = "#0095DD";
const velocidadMinima = 2;
const velocidadMaxima = 6;

// Parámetros de la raqueta
const altoRaqueta = 10;
const anchoRaqueta = 75;
const colorRaqueta = "#DD9500";
const velocidadRaquetaX = 7;  // La raqueta sólo se mueve en el eje X

// Parámetros de los ladrilos
const numFilas = 3;
const numColumnas = 5;
const altoLadrillo = 20;
const anchoLadrillo = 75;
const paddingLadrillo = 10;
const offsetTopLadrillo = 30;
const offsetIzqLadrillo = 30;
const colorLadrillo = "#720004";
const totalLadrillos = numFilas * numColumnas;

// Parametros de la puntuacion
const puntuacionX = 10;
const puntuacionY = 20;
const colorTexto = "#0095DD";

// Códigos de teclas
const leftKeyCode = 37;
const rightKeyCode = 39;

// Intervalo de ejecución de la rutina principal del juego
const ms = 20;

/**
 * VARIABLES
 */

// Pantalla del juego
var pantalla = document.getElementById("pantalla");
var ctx = pantalla.getContext("2d");

// Posición de la pelota
var pelotaX = pantalla.width / 2;
var pelotaY = pantalla.height - (altoRaqueta + radioPelota); // La posición inicial es en el centro de la raqueta

// Velocidad de la pelota
var velocidadPelotaX = 0;
var velocidadPelotaY = 0;

// Posición de la raqueta
var raquetaX = (pantalla.width - anchoRaqueta) / 2; // La posición inicial es en el centro de la pantalla

// Indicadores de si las teclas derecha/izquierda están presionadas
var clickDerecha = false;
var clickIzquierda = false;

// Matriz con los ladrillos
var ladrillos = [];

// Puntuación y ladrillos destruidos
var puntuacion = 0;
var ladrillosDestruidos = 0;

/**
 * FUNCIONES
 */

/**
 * Función que obtiene un valor al azar entre dos números, 'min' y 'max'.
 *
 * Se utiliza para calcular un valor aleatorio de la velocidadY de la pelota.
 *
 * @param {number} min El número obtenido no será menor que este valor.
 * @param {number} max El número obtenido nunca superará este valor.
 * @return {number}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Inicializa la matriz de ladrillos.
 */
function inicializaLadrillos() {
    ladrillos = [];

    for (col = 0; col < numColumnas; col++) {
        ladrillos[col] = [];
        for (fila = 0; fila < numFilas; fila++) {
            ladrillos[col][fila] = { x: 0, y: 0, visible: true };
        }
    }
}

/**
 * Actualiza las variables de posición y movimiento de los elementos a sus valores iniciales.
 */
function inicializaJuego() {
    // Posición de la pelota
    pelotaX = pantalla.width / 2;
    pelotaY = pantalla.height - (altoRaqueta + radioPelota); // La posición inicial es en el centro de la raqueta

    // Velocidad de la pelota. Se calcula de manera aleatoria para cada partida.
    velocidadPelotaX = getRandomInt(velocidadMinima, velocidadMaxima);
    velocidadPelotaY = -getRandomInt(velocidadMinima, velocidadMaxima);

    // Posición de la raqueta
    raquetaX = (pantalla.width - anchoRaqueta) / 2; // La posición inicial es en el centro de la pantalla

    // Indicadores de si las teclas derecha/izquierda están presionadas
    clickDerecha = false;
    clickIzquierda = false;

    // Inicializamos la matriz de ladrillos
    inicializaLadrillos();

    // Inicializamos la puntuación
    puntuacion = 0;
    ladrillosDestruidos = 0;
}

/**
 * Dibuja la pelota en las coordenadas (x,y) de la pantalla.
 *
 * @param {number} x
 * @param {number} y
 */
function dibujaPelota(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, radioPelota, 0, Math.PI*2);
    ctx.fillStyle = colorPelota;
    ctx.fill();
    ctx.closePath();
}

/**
 * Dibuja la raqueta en la coordenada x de la pantalla.
 *
 * @param {number} x
 */
function dibujaRaqueta(x) {
    ctx.beginPath();
    ctx.rect(x, pantalla.height - altoRaqueta, anchoRaqueta, altoRaqueta);
    ctx.fillStyle = colorRaqueta;
    ctx.fill();
    ctx.closePath();
}

/**
 * Dibuja los ladrillos.
 */
function dibujaLadrillos() {
    for (col = 0; col < numColumnas; col++) {
        for (fila = 0; fila < numFilas; fila++) {
            if (ladrillos[col][fila].visible) {
                // Calculamos la posición del ladrillo
                var ladrilloX = col * (anchoLadrillo + paddingLadrillo) + offsetIzqLadrillo;
                var ladrilloY = fila * (altoLadrillo + paddingLadrillo) + offsetTopLadrillo;

                // Guardamos las coordenadas del ladrillo en la matriz
                ladrillos[col][fila].x = ladrilloX;
                ladrillos[col][fila].y = ladrilloY;

                // Dibujamos el ladrillo
                ctx.beginPath();
                ctx.rect(ladrillos[col][fila].x, ladrillos[col][fila].y, anchoLadrillo, altoLadrillo);
                ctx.fillStyle = colorLadrillo;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

/**
 * Muestra la puntuación en pantalla.
 */
function muestraPuntuacion() {
    ctx.font = "16px Retro Gaming"
    ctx.fillStyle = colorTexto;
    ctx.fillText("Puntuación: " + puntuacion, puntuacionX, puntuacionY);
}

/**
 * Esta función detecta si la pelota ha colisionado con algún ladrillo.
 *
 * Para comprobarlo se recorre la matriz de ladrillos y se verifica si el centro (x,y) de la pelota está "dentro"
 * de alguno de los ladrillos que está visible en estos momentos.
 *
 * Esta no es la forma más elegante de hacerlo, pero este juego se está programando con fines de aprendizaje y esta
 * es la manera más sencilla de hacerlo.
 *
 * @return {(boolean|number)[]} true: ha colisionado con un ladrillo / false: no hay colisión con ningún ladrillo.
 *                              (x,y): Coordenadas del ladrillo colisionado
 */
function deteccionColision() {
    var ladrilloColision = [false, 0, 0];

    for (col = 0; col < numColumnas; col++) {
        for (fila = 0; fila < numFilas; fila++) {
            var ladrillo = ladrillos[col][fila];

            if (ladrillo.visible) {
                if (pelotaX > ladrillo.x && pelotaX < ladrillo.x + anchoLadrillo &&
                    pelotaY > ladrillo.y && pelotaY < ladrillo.y + altoLadrillo) {
                        ladrilloColision = [true, col, fila];
                        break;
                }
            }
        }
    }
    return ladrilloColision;
}

/**
 * Manejador de eventos cuando se presiona una tecla.
 *
 * Modifica el estado de los indicadores de las teclas derecha/izquierda presionadas.
 * @param {Event} ev
 */
function keyDownHandler(ev) {
    if (ev.keyCode === leftKeyCode) clickIzquierda = true;
    else if (ev.keyCode === rightKeyCode) clickDerecha = true;
}

/**
 * Manejador de eventos cuando se suelta una tecla.
 *
 * Modifica el estado de los indicadores de las teclas derecha/izquierda presionadas.
 * @param {Event} ev
 */
function keyUpHandler(ev) {
    if (ev.keyCode === leftKeyCode) clickIzquierda = false;
    else if (ev.keyCode === rightKeyCode) clickDerecha = false;
}

/**
 * Esta es la rutina principal del juego. Se ejecuta ciclicamenta cada 'ms' milisegundos.
 *
 * Borra el contenido de la pantalla.
 * Dibula los ladrillos visibles actualmente.
 * Dibuja la pelota en la posición actual.
 * Dibuja la raqueta en su posición actual.
 * Muestra la puntuación actual
 * Detecta si hay colisión de la pelota con algún ladrillo y, si es así, borra el ladrillo, modifica la dirección de la
 * velocidad de la pelota, suma la puntuación y validamos si hemos ganado (se han destruido todos los ladrillos).
 * Detecta si hay colisión de la pelota con los bordes y calcula la nueva dirección de la velocidad.
 * Calcula la nueva posición de la pelota.
 * Calcula la nueva posición de la raqueta.
 */
function main() {
    // Borra el contenido de la pantalla y dibuja todos los elementos en su posición actual
    ctx.clearRect(0, 0, pantalla.width, pantalla.height);
    dibujaLadrillos();
    dibujaPelota(pelotaX, pelotaY);
    dibujaRaqueta(raquetaX);
    muestraPuntuacion();

    // Detectamos si hay colisión de la pelota con algún ladrillo
    colision = deteccionColision();
    if (colision[0]) {
        velocidadPelotaY = -velocidadPelotaY;
        ladrillos[colision[1]][colision[2]].visible = false;
        ladrillosDestruidos++;
        puntuacion += (3-colision[2]);
        if (ladrillosDestruidos === totalLadrillos) {
            muestraPuntuacion();
            alert("HAS GANADO!!");
            inicializaJuego();
            document.location.reload();
        }
    }

    // Detecta la colisión de la pelota con los bordes y cambia la dirección de su velocidad
    // Si la pelota alcanza el borde inferior y no está en contacto con la raqueta, termina el juego
    if (pelotaX+velocidadPelotaX < radioPelota || pelotaX+velocidadPelotaX > pantalla.width-radioPelota) velocidadPelotaX = -velocidadPelotaX;
    if (pelotaY+velocidadPelotaY < radioPelota) {
        velocidadPelotaY = -velocidadPelotaY;
    }
    else if (pelotaY+velocidadPelotaY > pantalla.height-radioPelota) { // Comprueba si la pelota ha llegado al borde inferior
        if (pelotaX > raquetaX && pelotaX < (raquetaX + anchoRaqueta)) { // Comprueba si la pelota ha rebotado con la raqueta
            velocidadPelotaY = -velocidadPelotaY;
        }
        else { // La pelota ha salido por el borde inferior de la pantalla --> GAME OVER
            alert("GAME OVER!");
            inicializaJuego();
            document.location.reload();
        }
    }

    // Calcula la nueva posición de la pelota
    pelotaX += velocidadPelotaX;
    pelotaY += velocidadPelotaY;

    // Calcula la nueva posición de la raqueta
    if(clickDerecha && raquetaX < pantalla.width-anchoRaqueta) raquetaX += velocidadRaquetaX;
    else if(clickIzquierda && raquetaX > 0) raquetaX -= velocidadRaquetaX;
}

// Añadimos los manejadores de eventos para detectar la presión sobre las teclas derecha/izquierda
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Inicializamos las variables del juego
inicializaJuego();

// Ejecutamos la rutina principal del juego cada 'ms' milisegundos
setInterval(main, ms);