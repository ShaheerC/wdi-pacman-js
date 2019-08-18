// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellet = 4;


// Define your ghosts here
const inky = {
  menuOption: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

const blinky = {
  menuOption: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

const pinky = {
  menuOption: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

const clyde = {
  menuOption: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

let ghosts = [inky, blinky, pinky, clyde];

// replace this comment with your four ghosts setup as objects


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives}     Power Pellets: ${powerPellet}`) ;
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(p) Eat Power Pellet');
  console.log(`(1) Eat Inky - Edible: ${ghosts[0].edible}`);
  console.log(`(2) Eat Blinky - Edible: ${ghosts[1].edible}`);
  console.log(`(3) Eat Pinky - Edible: ${ghosts[2].edible}`);
  console.log(`(4) Eat Clyde - Edible: ${ghosts[3].edible}`);
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {
  if(ghost.edible) {
    console.log(`\nPacman ate ${ghost.character} ${ghost.name}.`);
    ghost.edible = false;
    score += 200;
  } else {
    console.log(`\nOh no disaster! Pacman died trying to eat ${ghost.colour} ${ghost.name}.`);
      if (lives >=2) { 
        lives -= 1
      } else {
        lives -= 1
        process.exit()
      }
  }
}

function eatPowerPellet() {
  if (powerPellet >=1) {
    console.log('Pacman eats a power pellet! UNSTOPPABLE!');
    score += 50;
    powerPellet --;
    for (let i = 0; i < ghosts.length; i++) {
      ghosts[i]['edible'] = true;
    }
  } else {
    console.log('\nThere are no more power pellets left to eat!');
  }
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      eatPowerPellet();
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
