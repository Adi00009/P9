// declare variables central sprite, four mode selection buttons and diamond for hide and seek
var sprite;
var paintButton, colourfulButton, greyscaleButton, hideAndSeekButton;
var diamond;

// declare and set variable for x and y positions of diamond to 350 each
var x = 350;
var y = 350;

// declare variables for r, g and b proportions of a random colour
var r, g, b;

// set colour name for colourful mode to "black"
var colorName = "black";

// set colour number for a shade between black and white at mid-way
var colorNo = 255/2;

// set boolean of sprite touching diamond to false
var touching = false;
var reset = false;

// create variable count and time to store time in seconds
var count = 0;
var time = 0;

// set default mode to "paint"
var mode = "paint";

// set four colour variables for colourful mode to null by default
var color1 = null;
var color2 = null;
var color3 = null;
var color4 = null;

function colourful(spriteName)
{
// set r, g and b proportions to random
r = Math.random()*255;
g = Math.random()*255;
b = 255 - (r+g);

// set sprite colour to r, g and b
spriteName.shapeColor = color(r,g,b);
}

function colorSelection()
{
  // check if colours are selected
  if (color1 == null) {
  // ask for four colours and convert them all to lower case
  color1 = prompt("Please type in the name of your favourite colour.");
  color1 = color1.toLowerCase();
  color2 = prompt("And which is your your second-best colour?");
  color2 = color2.toLowerCase();
  color3 = prompt("State your third favourite colour here.");
  color3 = color3.toLowerCase();
  color4 = prompt("And another, last colour...");
  color4 = color4.toLowerCase();
  }
}

function slip()
{
  // set diamond's colour to random
  diamond.shapeColor = color(r,g,b);
  
  // check if sprite has not touched diamond and one second has gone by
  if (touching == false && time%1.5 == 0 && reset == false)
  {
    reset = true;
    // set x and y to random
    x = Math.floor(Math.random()*400);
    y = Math.floor(Math.random()*400);
    
    // if diamond is too close to sprite, reset it
    if (x - sprite.position.x <= 50 + time){ x = Math.floor(Math.random()*400); }
    if (sprite.position.x - x <= 50 + time){ x = Math.floor(Math.random()*400); }
    if (y - sprite.position.y <= 50 + time){ y= Math.floor(Math.random()*400); }
    if (sprite.position.y - y <= 50 + time){ y = Math.floor(Math.random()*400); }
    
    // check if mode is hideAndSeek
    if (mode == "hideAndSeek")
    {
      // set diamond to the random x and y co-ordinates
      diamond.position.x = x;
      diamond.position.y = y;
    }
  }

  if (reset == true){ reset = false }
}

function setup()
{
  // create a 400*400 canvas
  createCanvas(400,400);

  // create the central sprite at canvas centre and set colour to "white"
  sprite = createSprite(200,200,5,5);
  sprite.shapeColor = "white";
  
  // create 4 mode selection buttons at the top
  paintButton = createSprite(80,50,20,20);
  colourfulButton = createSprite(160,50,20,20);
  greyscaleButton = createSprite(240,50,20,20);
  hideAndSeekButton = createSprite(320,50,20,20);
  
  // create diamond at x, y and make it invisible
  diamond = createSprite(x,y,20,20);
  diamond.visible = false;

  // use jQuery's append method and HTML's <h1> tag to add an instuction heading to the 
  // html DOM structure's body element
  $("body").append("<h1> Click on a button to choose a mode and begin. </h1>");
  // use jQuery's fadeIn method to animate the heading
  $("h1").fadeIn(1000);

  // set background to "black" at beginning
  background("black");
  
  // center align text and help user select a mode
  textAlign(CENTER,CENTER);
  text("Painting",80,75);
  text("Colourful",160,75);
  text("Greyscale",240,75);
  text("Hide and Seek",320,75);
  text("Click on a button to choose one of the 4 modes and begin.",200,43.75/2);
}

// colour blink paint button every 0.2 seconds
setInterval(colourful(paintButton), 200);

function draw()
{
  // increment count once for every iteration of draw function, i.e., 
  // frame rate of 30 times per seconds
  count += 1;
  // set time to count/30, i.e., time in seconds
  time = count/30;

  // if any button clicked, set mode accordingly
  if (mousePressedOver(paintButton)){ mode = "paint"; }
  if (mousePressedOver(colourfulButton)){ mode = "colourful";}
  if (mousePressedOver(greyscaleButton)){ mode = "greyscale"; }
  if (mousePressedOver(hideAndSeekButton)){ mode = "hideAndSeek"; }

  // check if mode is "paint"
  if (mode == "paint")
  {
    // make paintButton colour blink every 0.2 seconds
    setInterval(colourful(paintButton), 200);
    // set sprite colour to grey
    sprite.shapeColor = "grey";
    // display instruction text
    text("Painting mode. Arrow keys to move brush and space key to clear canvas.",200,350);
    // if space key pressed, clear canvas
    if (keyDown("SPACE")){ background("black"); }
  }
  
  // check if mode is "colourful"
  if (mode == "colourful")
  { 
    // make colourfulButton colour blink every 0.2 seconds
    setInterval(colourful(colourfulButton), 200);
    // set background to colourName (this depends on which arrow key is pressed)
    background(colorName);
    // decrease text size and show instruction
    textSize(10);
    text("You have to use the arrow keys to switch the background to four colours of your choice.",200,350);
    // use interactive programming's setTimeout function to show colour selection prompt after set no. of seconds
    setTimeout(colorSelection, 2500);
  }
  
  // check if mode is "greyscale"
  if (mode == "greyscale")
  {
    // make greyscale colour blink every 0.2 seconds
    setInterval(colourful(greyscaleButton), 200);
    // set white-black shade to background (colour no can be changed using left-right arrow keys)
    background(colorNo);
    // set sprite and button colours in contrast to background colour
    sprite.shapeColor = color(255-colorNo);
    paintButton.shapeColor = color(255-colorNo); 
    colourfulButton.shapeColor = color(255-colorNo); 
    greyscaleButton.shapeColor = color(255-colorNo);
    hideAndSeekButton.shapeColor = color(255-colorNo); 
    // set colour to "white" and text size to 10, then display instruction text
    fill("white");
    textSize(10);
    text("Use the left and right keys to change the greyscale value of the background colour.",200,350);
  }

  // check if mode is "hideAndSeek"
  if (mode == "hideAndSeek")
  {
    // make hideAndSeek button colour blink every 0.2 seconds  
    setInterval(colourful(hideAndSeekButton), 200);
    // set background to black
    background("black");  // display instruction text and time in seconds
    textSize(10);
    text("Welcome to the treasure hunt! You, Alex the thief, have to steal the precious diamond before it is taken away!",200,350);
    text(Math.floor(time),200,375);
    // call slip function to colour blink diamond and make it move across the canvas
    slip();
    // make diamond visible
    diamond.visible = true;
    // check if sprite touched diamond
    if (sprite.isTouching(diamond))
    { 
    // display congratulatory message
    text("Hurray, you stole the precious diamond, clever thief !!",200,175); 
    // set boolean "touching" to true (this stops diamond moving across the screen)
    touching = true;
    }
  } 
  // if mode is not "hideAndSeek", make diamond invisible
  else { diamond.visible = false; }

  // check if left arrow key pressed
  if (keyDown("LEFT_ARROW"))
  {
    // make sprite move to the right
    sprite.position.x -= 2.5;
    // if mode is "colourful", set colourName to the first colour given by user
    if (mode == "colourful"){ colorName = color1; }
    // if mode is "greyscale", increment colorNo by 4.25 (this lightens bgcolor)
    if (mode == "greyscale"){ colorNo += 4.25; }
  }
  
  // check if right arrow key pressed
  if (keyDown("RIGHT_ARROW"))
  {
    // make sprite move to the left
    sprite.position.x += 2.5;
    // if mode is "colourful", set colourName to the second colour given by user
    if (mode == "colourful"){ colorName = color2; }
    // if mode is "greyscale", decrement colorNo by 4.25 (this darkens bgcolor)
    if (mode == "greyscale"){ colorNo -= 4.25; }
  } 
  
  // check if up arrow key pressed
  if (keyDown("UP_ARROW"))
  {
    // make sprite move upwards
    sprite.position.y -= 2.5;
    // if mode is "colourful", set colourName to the third colour given by user
    if (mode == "colourful"){ colorName = color3; }
  }  
  
  // check if down arrow key pressed
  if (keyDown("DOWN_ARROW"))
  {
    // make sprite move downwards
    sprite.position.y += 2.5;
    // if mode is "colourful", set colourName to the fourth colour given by user
    if (mode == "colourful"){ colorName = color4; }
  }

  // draw sprites
  drawSprites();
}

