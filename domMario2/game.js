// 0 - empty
// 1 - mario
// 2 - corn
// 3 - bug
var score     = 0;
// If the game is saved
if(localStorage.getItem('score')){
    score = +localStorage.getItem('score');
       }

if(localStorage.getItem('saved map')){
  game_map = JSON.parse(localStorage.getItem('saved map'));
   for(i = 0; i < game_map.length; i++){
    for(n = 0; n < game_map.length; n++){
     if(game_map[i][n] == 1){
        mario_row = i;
        mario_col = n;
      }
    }
  }

}
//If the game is not saved
else{
  var mario_row = Math.floor(Math.random() * 10);
  var mario_col = Math.floor(Math.random() * 10);

var game_map = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];

 game_map[mario_row][mario_col] = 1;


for(i = 0; i < 7; i++){
  var mario_cornRow = Math.floor(Math.random() * 10);
  var mario_cornCol = Math.floor(Math.random() * 10);
    if(mario_cornRow != mario_row || mario_cornCol != mario_col){
      game_map[mario_cornRow][mario_cornCol] = 2;
    }
   }

for(n = 0; n < 5; n++){
  var mario_bugRow = Math.floor(Math.random() * 10);
  var mario_bugCol = Math.floor(Math.random() * 10);
    if(mario_bugRow != mario_row || mario_bugCol != mario_col){
      game_map[mario_bugRow][mario_bugCol] = 3;
    }
   }
}
//Map processing
function showMap(){
  var div_map = document.getElementById("map");
  var div_score = document.getElementById("score");
  div_score.innerHTML =  score;
  div_map.innerHTML = '';

  for(var row = 0; row <= 9; row++){
    for(var col = 0; col <= 9; col++){
      switch(game_map[row][col]){
        case 0: div_map.appendChild(createDiv('empty')); break;
        case 1: div_map.appendChild(createDiv('mario')); break;
        case 2: div_map.appendChild(createDiv('corn')); break;
        case 3: div_map.appendChild(createDiv('bug')); break;
      }
    }
  }
}

function createDiv(class_name){
   var div = document.createElement('div');
   div.className = class_name;
   return div;
}

function gameOver(){
  var gameOver = document.getElementById('map');
  gameOver.id = 'gameover';
}

// Checking className
function isCorn(){
  if(game_map[mario_row][mario_col] == 2){
    score += 5;
  }
}

function isBug(){
  if(game_map[mario_row][mario_col] == 3){
    score -= 7;
  }
}

// Mario mobility opportunities
function move(e){
  //RIGHT
   switch(e.keyCode){
     case 39:
     if(mario_col < 9){
         game_map[mario_row][mario_col] = 0;
         mario_col++;
          }
          else if(mario_row < 9){
            game_map[mario_row][mario_col] = 0;
            mario_col = 0;
            mario_row+= 1;
          }
          else{
            game_map[mario_row][mario_col] = 0;
            mario_col = 0;
            mario_row = 0;
          };
          if(isCorn()){};
          if(isBug()){};
          game_map[mario_row][mario_col] = 1;
      break;
      //LEFT
      case 37:
      if(mario_col > 0){
          game_map[mario_row][mario_col] = 0;
          mario_col--;
         }
         else if(mario_row > 0){
           game_map[mario_row][mario_col] = 0;
           mario_col = 9;
           mario_row-= 1;
         }
         else{
           game_map[mario_row][mario_col] = 0;
           mario_col = 9;
           mario_row = 9;
         };
         if(isCorn()){};
         if(isBug()){};
         game_map[mario_row][mario_col] = 1;
       break;
        //UP
       case 38:
        if(mario_row > 0){
           game_map[mario_row][mario_col] = 0;
           mario_row--;
            }
            else{
              game_map[mario_row][mario_col] = 0;
              mario_row = 9;
            }
            if(isCorn()){};
            if(isBug()){};
            game_map[mario_row][mario_col] = 1;
        break;
          //DOWN
        case 40:
         if(mario_row < 9){
            game_map[mario_row][mario_col] = 0;
            mario_row++;
             }
             else{
               game_map[mario_row][mario_col] = 0;
               mario_row = 0;
             }
             if(isCorn()){};
             if(isBug()){};
             game_map[mario_row][mario_col] = 1;
         break;
   }
   if(score < 0){
  gameOver();
   }
   else{
   showMap();
    }
}

function save(){
  localStorage.setItem('score', score);
  map_saved = JSON.stringify(game_map);
  localStorage.setItem('saved map', map_saved);
}
var button = document.getElementsByTagName('button')[0];
button.addEventListener('click', save);
document.body.onload = showMap;
document.body.onkeydown = move;

//dz сделать защиту по краям, чтобы не двигался
//сделать рандомное положение марио  randovCreate(mario,1); Одного марио
