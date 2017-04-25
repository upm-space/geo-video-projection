/**
 * Aquí están pequeños trozos de código con funcionalidades simples
 */

// Redimensionar el Renderer al tamaño de pantalla.

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}