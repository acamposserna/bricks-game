# Juego de ladrillos

Versión simple del juego de los ladrillos con javascript.

> Este juego se ha diseñado con propositos de aprenizaje, no está optimizado para un uso profesional.

## Instalación

Para ejecutar el juego sólo es necesario un navegador web.

Descargad todos los ficheros en una carpeta de vuestro disco duro y abrir el fichero `index.html` en un navegador web (prefeiblemente Chrome).
## Instrucciones

El objetivo del juego es destruir todos los ladrillos con la pelota.

Si la pelota sale por el borde inferior de la pantalla, sin que sea devuelta por la requeta, se pierde el juego.

Las teclas de movimiento de la raqueta son las flecas derecha (&rarr;) e izquierda (&larr;).

## Mejoras

* El jugador tendrá tres intentos (vidas) para terminar.
* Cuando se destruyen todos los ladrillos se cambia de nivel:
  * Se pintan de nuevo los ladrillos.
  * Se mantien la puntuación.
  * Aumenta la dificultad (mayor velocidad de la pelota).
* Nuevo algorito de colisión entre la pelota y los ladrillos.
* Almacenar y mostrar el máximo absoluto de puntuación (record).
* Adaptación a dispositivos móviles.

## Notas

La fuente *Retro Gaming* ha sido diseñada por el usuario [Daymarius](https://www.dafont.com/es/daymarius.d7345)  y se ha obtenido del repositorio [dafont.com](https://www.dafont.com/es/retro-gaming.font)

## MIT License

Copyright (c) 2023 Antonio Campos Serna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.