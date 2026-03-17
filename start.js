function start() {
    background(222, 240, 247);
    drawWaves();

    textAlign(CENTER);

    textSize(60);
    textFont('Baloo 2');
    textStyle(BOLD);
    textWithShadow("Transitions of Great Barrier Reef", width / 2, height / 5);
    textWithShadow("under Climate Change", width / 2, height / 5 * 1.4);

    textSize(50);
    textStyle(NORMAL);
    textWithShadow("Choose a Scenario!", width / 2, height / 2);

    textSize(width / 20);
    drawButton("RCP2.6", width / 6, height - height / 3.5);
    drawButton("RCP4.5", width / 2, height - height / 3.5);
    drawButton("RCP8.5", width / 6 * 5, height - height / 3.5);
}

function drawWaves() {
    noFill();
    stroke(76, 186, 173);
    strokeWeight(3);

    let waveHeight = 10; // 波の高さ
    let waveLength = width / 5; // 波の長さ
    let stepSize = 5; // ステップサイズ

    for (let y = height / 2; y < height; y += waveHeight * 2) {
        beginShape();
        for (let x = 0; x <= width; x += stepSize) {
            let yOffset = waveHeight * sin(TWO_PI * x / waveLength + frameCount * 0.02);
            vertex(x, y + yOffset);
        }
        endShape();
    }
}

function textWithShadow(txt, x, y) {
    stroke(178, 204, 227);
    text(txt, x + 2, y + 2);
    fill(15, 35, 80);
    text(txt, x, y);
}

function drawButton(label, x, y) {
    fill(227, 230, 227, 200);
    noStroke();
    rectMode(CENTER);
    rect(x, y - textSize() / 3, textWidth(label) * 1.2, textSize() * 1.5, 10);
    fill(15, 35, 80);
    text(label, x, y);
}