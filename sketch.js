var cols,rows;
var w = 30;
var grid = [];

var current;
var song;


var stack = [];

function preload(){
  song = loadSound("sweetdreams.mp3");
}

function setup() {
  createCanvas(600, 600);
  song.play();

  
  cols = floor(width/w);
  rows = floor(height/w);
  frameRate(10);
  
  for (var j= 0; j< rows;j++) {
    for (var i = 0; i<cols;i++){
      var cell = new Cell(i,j);
      grid.push(cell);
    }
  }
  current = grid[0];     
       
}

function draw() {
  background(50);
  for (var i = 0; i < grid.length; i++){
    grid[i].show();
  }

   current.visited = true;
   current.highlight();
  // STEP 1
  var next = current.checkNeighbors();
  if (next){
    next.visited = true;
    
    //STEP 2
    stack.push(current);
    // STEP 3
    removeWalls(current,next);
    
    
    
    // STEP 4
  current = next;
  } else if   (stack.length > 0) {
      current = stack.pop();
  
    }
  

}
  
 function index (i,j){
   if (i < 0 || j < 0 || i > cols-1|| j > rows-1){
     return -1;
     
   }
   return i + j * cols;
   
 }




 function removeWalls(a,b){
   
   var y  = a.j - b.j;
   if (y == 1) {
     a.walls[0] = false;
     b.walls[2] = false;
     console.log(a);
   } else if ( y  === -1){
     a.walls[2] = false;
     b.walls[0] = false;
   }
 } 
 