// define initial variables
// start scene
let intro = true;
let rcp26 = false;
let rcp45 = false;
let rcp85 = false;

// coral scenes
let margin = 30;
let year = 1985;
let cover = 29.0;

let numImage = 10;
let branch_alphas = Array(5).fill(255);
let mound_alphas = Array(5).fill(255);
let d_interval = 3.0;
let x = [];
let y = [];
let branchIndex = [];
let moundIndex = [];
let sandBumps = [];
let bubbles = [];
let spacingX, imageWidth, imageHeight, startX, startY, yoffset, coverChange;


// read coral images and csv of coral cover in each scenario
let rcp26_dat, rcp45_dat, rcp85_dat;
function preload() {
  // corals (branching reefs & mounding reefs)
  branch = loadImage('assets/branching.png');
  mound = loadImage('assets/mounding.png');
  
  // rcp scenarios
  rcp26_dat = loadTable('rcp/rcp26.csv', 'csv', 'header');
  rcp45_dat = loadTable('rcp/rcp45.csv', 'csv', 'header');
  rcp85_dat = loadTable('rcp/rcp85.csv', 'csv', 'header');
}


// main
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('sans-serif');
  
  // generate sand bumps
  createSandBumps(1000);
  
  // generate initial bubbles
  for (let i = 0; i < 80; i++) {
    createBubble();
  }


  // coral arrangements
  spacingX = width / (numImage + 2);
  imageWidth = branch.width * 1.2;
  imageHeight = imageWidth;
  
  startX = spacingX;
  startY = height / 2 + 250;
  yOffset = (width / 2 - 100) / 6;

  for (let i = 0; i < numImage; i++) {
    x[i] = startX + i * spacingX;
    y[i] = startY + (i % 2 === 0 ? -yOffset : yOffset);
  }

  // generate randomly branching & mounding images
  let numbers = Array.from({length: numImage}, (_, i) => i);
  numbers = shuffle(numbers);
  branchIndex = numbers.slice(0, 5);
  moundIndex = numbers.slice(5, 10);


  // increment year every 1 second
  setInterval(() => {
    if (rcp26 || rcp45 || rcp85) {
      change();
    }
  }, 1000);
}

function draw() {
    if (intro === true) {
        start();
    } else if (rcp26 === true) {
        coral();
        textStyle(BOLD);
        text('RCP2.6', width - 275, margin);
        textStyle(NORMAL);
    } else if (rcp45 === true) {
        coral();
        textStyle(BOLD);
        text('RCP4.5', width - 275, margin);
        textStyle(NORMAL);
    } else if (rcp85 === true) {
        coral();
        textStyle(BOLD);
        text('RCP8.5', width - 275, margin);
        textStyle(NORMAL);
    }
}


// year transition
function change(scenario) {
    if (year < 2070) {
        year++;
    } else {
        noLoop();  // stop the loop
    }

    // get percentage of coral cover in each scenario
    if (rcp26) {
        for (let r = 0; r < rcp26_dat.getRowCount(); r++) {
            if (int(rcp26_dat.getString(r, 'Year')) === year) {
                cover = float(rcp26_dat.getString(r, 'Cover'));
                break;
            }
        }
    } else if (rcp45) {
        for (let r = 0; r < rcp45_dat.getRowCount(); r++) {
            if (int(rcp45_dat.getString(r, 'Year')) === year) {
                cover = float(rcp45_dat.getString(r, 'Cover'));
                break;
            }
        }
    } else if (rcp85) {
        for (let r = 0; r < rcp85_dat.getRowCount(); r++) {
            if (int(rcp85_dat.getString(r, 'Year')) === year) {
                cover = float(rcp85_dat.getString(r, 'Cover'));
                break;
            }
        }
    }
}


// intro scene transition
function mousePressed() {
    if (intro == true) {
        if (mouseX < width / 3) {
            rcp26 = true;
        } else if (mouseX > width / 3 && mouseX < width / 3 * 2) {
            rcp45 = true;
        } else if (mouseX > width / 3 * 2) {
            rcp85 = true;
        }
        intro = false;
    }
}

function keyTyped() {
    if (key === 'b') {
        intro = true;
    }
    rcp26 = false;
    rcp45 = false;
    rcp85 = false;
}


// graphics for coral reefs
// sand bumps
function createSandBumps(numBumps) {
  for (let i = 0; i < numBumps; i++) {
    let x = random(width);
    let y = random(height / 2 + 105, height);
    sandBumps.push({x: x, y: y});
  }
}

// bubbles
function createBubble() {
  let bubble = {
    x: random(width),
    y: random(height / 2 - 80, height),
    size: random(3, 10),
    speed: random(1, 3),
    alpha: random(100, 200)
  };
  bubbles.push(bubble);
}


// UI improvement
// Draw gradient for sea
function drawSeaGradient(x, y, w, h) {
  let from = color(79, 220, 255);   // lighter blue near surface
  let to = color(0, 105, 148);      // darker blue at depth
  let steps = h*2;
  for (let i = 0; i <= steps; i++) {
    let inter = map(i, 0, steps, 0, 1);
    let c = lerpColor(from, to, inter);
    stroke(c);
    line(x, y + i * (h / steps), x + w, y + i * (h / steps));
  }
}

// Draw gradient for seafloor
function drawGradient(x, y, w, h) {
  let from = color(0, 105, 148);  // ocean blue
  let to = color(233, 202, 158);   // sand color
  let steps = h*10;
  for (let i = 0; i <= steps; i++) {
    let inter = map(i, 0, steps, 0, 1);
    let c = lerpColor(from, to, inter);
    stroke(c);
    line(x, y + i * (h / steps), x + w, y + i * (h / steps));
  }
}

// responsive design
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  draw();
}