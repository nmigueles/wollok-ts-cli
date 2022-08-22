
let urlsImages = ['../../test/blanco.jpg','../../test/negro.jpg'];
let images = [];
let positions = [[1,1],[100,1]]
var positionPersonaje = { ejex : 10, ejey: 10 }
var rebotin = { x : 50, y: 250 , d: 1}
var cuadrado = {x : 100, y : 100 }

function preload() {
    for (var i=0; i < urlsImages.length; i++){
        var img = loadImage(urlsImages[i]);
        images.push(img);
    };
}
  
function setup() {
  createCanvas(770, 570); 
}

function draw(){

  pintarComoAjedrez()

  fill(255, 204, 0);
  ellipse(positionPersonaje.ejex, positionPersonaje.ejey, 30, 30);

  mover()
  rebotar()
  fill(220, 0, 0)
  ellipse(rebotin.x, rebotin.y, 50, 50)

  fill('blue')
  rect(cuadrado.x, cuadrado.y, 50, 50)


}

function mover() {
  rebotin.x += 2 * rebotin.d
  // rebotin.y += 2 * rebotin.d
}
function rebotar() {
  if (rebotin.x > 500) {
    rebotin.d *= -1
  } else if (rebotin.x < 50) {
    rebotin.d *= -1
  }
}

function mousePressed() {
  cuadrado.y = cuadrado.y + 10
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) { positionPersonaje.ejex = positionPersonaje.ejex -10 }
  if (keyCode === RIGHT_ARROW) { positionPersonaje.ejex = positionPersonaje.ejex +10}  
  if (keyCode === UP_ARROW) { positionPersonaje.ejey = positionPersonaje.ejey -10}
  if (keyCode === DOWN_ARROW) { positionPersonaje.ejey = positionPersonaje.ejey +10}
}

function pintarComoAjedrez(){
  var ancho_celda = width/8;
  var alto_celda = height/8;
  var imagePar = images[0]
  var imageImpar = images[1]

  for (var j=0; j<8; j++) {

    // Determinamos los colores de la fila
    var imagePar;
    var imageImpar;
    if (j%2 == 0) {
      // Si la fila es par 
      imagePar = images[0];
      imageImpar = images[1];
    } else {
      // Si la fila es impar 
      imagePar = images[1];
      imageImpar = images[0];
    }

    // Dibujamos una fila
    for (var i=0; i<8; i++) {
      if (i%2 == 0) {
        image(imagePar, i*ancho_celda,j*alto_celda, ancho_celda, alto_celda);
      } else {
        image(imageImpar, i*ancho_celda,j*alto_celda, ancho_celda, alto_celda);
      }
     
    }

  }
}