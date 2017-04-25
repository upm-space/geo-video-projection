# Geo Video Proyection
## *En construcción*

Actualmente estamos trabajando en dos HTMLs: logProyectionAdaption.html y logReplay.html

##### Estructura de archivos en este repositorio
En la raiz podemos encontrar los HTML sobre los que estamos trabajando actualmente. \
Encontramos cuatro carpetas:
1. **Archivos de utilidad**: Compuesto por ejemplos sobre los que queremos basarnos. Ninguno de los archivos contenidos se utiliza.
2. **data**: Aquí se encuentran los ficheros de log y datos que utilizamos para la representación.
3. **js**: Dentro de esta carpeta está por un lado *usedLibraries* que contiene librerías JavaScript que estamos utilizando y fuera todo el código programado por nosotros.
4. **node_modules**: Aquí se encuentran los módulos de *Node.js*.

### logProyectionAdaption.html
Este HTML contiene scripts para:
1. Abrir el log y verificar el orden cronológico de los datos.
2. Reordenar el log si es necesario **(no está implementado)**.
3. Calcular la posición de los vértices de la imagen que obtiene una cámara con los datos de actitud del log.
4. Generar un nuevo .JSON con todos los datos combinados necesarios **(no está implementado)**.

### logReplay.html
Este HTML es el borrador de lo que será la interfaz de reproducción de logs de vuelo. En él la librería utilizada es Three.JS y todos los elementos están destinados a la generación de un entorno virtual en el que ir desarrollando las soluciones de reproducción que tendremos. Por ahora se han implementado:
1. Una escena que consta de dos cubos rotando y un triedro de referencia.
2. Un algoritmo para sincronizar la reproducción del log (tiempo transcurrido de renderizado equivalente al instante que se reproduce del log).