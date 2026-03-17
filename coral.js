function coral() {
    drawSeaGradient(0, 0, width, height / 2 + 25); // ocean gradient
  
    // draw gradient between ocean and sands
    drawGradient(0, height / 2 + 25, width, height / 2 + 100);
    
    
    // seafloor
    noStroke();
    fill(233, 202, 158);
    rectMode(CORNERS);
    rect(0, height / 2 + 100, width, height);
    
    // draw sand bumps
    fill(186, 158, 116);
    for (let bump of sandBumps) {
        ellipse(bump.x, bump.y, 3, 2);
    }
    
    
    // draw bubbles
    for (let i = bubbles.length - 1; i >= 0; i--) {
        let bubble = bubbles[i];
        bubble.y -= bubble.speed;
        fill(220, bubble.alpha);
        noStroke();
        ellipse(bubble.x, bubble.y, bubble.size);
        
        // Remove bubble if it goes off-screen
        if (bubble.y < 0) {
        bubbles.splice(i, 1);
        createBubble(); // Create a new bubble
        }
    }
    
    
    // display yearly coral cover
    fill(15, 35, 80);
    textSize(22);
    text('< Back: B or Reload', margin, margin);
    textSize(28);
    textAlign(LEFT, TOP);
    text('Year: ' + year, width - 275, margin * 2);
    text('Coral Cover: ' + cover + '%', width - 275, margin * 3);
    
    
    // coral degradation
    coverChange = 30.0 - cover;
    // b*2 > m*1 > b*2 > m*1 > b*1 > b*3
    if (coverChange < d_interval) {
        let alphaChange = coverChange / 0.1 * 8.5;
        branch_alphas[0] = 255 - alphaChange;
    } else if (coverChange < d_interval * 2) {
        branch_alphas[0] = 0;
        let alphaChange = (coverChange - d_interval * 1) / 0.1 * 8.5;
        branch_alphas[1] = 255 - alphaChange;
    } else if (coverChange < d_interval * 3) {
        branch_alphas[0] = 0;
        branch_alphas[1] = 0;
        let alphaChange = (coverChange - d_interval * 2) / 0.1 * 8.5;
        mound_alphas[0] = 255 - alphaChange;
    } else if (coverChange < d_interval * 4) {
        branch_alphas[0] = 0;
        branch_alphas[1] = 0;
        mound_alphas[0] = 0;
        let alphaChange = (coverChange - d_interval * 3) / 0.1 * 8.5;
        branch_alphas[2] = 255 - alphaChange;
    } else if (coverChange < d_interval * 5) {
        branch_alphas[0] = 0;
        branch_alphas[1] = 0;
        branch_alphas[2] = 0;
        mound_alphas[0] = 0;
        let alphaChange = (coverChange - d_interval * 4) / 0.1 * 8.5;
        branch_alphas[3] = 255 - alphaChange;
    } else if (coverChange < d_interval * 6) {
        branch_alphas[0] = 0;
        branch_alphas[1] = 0;
        branch_alphas[2] = 0;
        branch_alphas[3] = 0;
        mound_alphas[0] = 0;
        let alphaChange = (coverChange - d_interval * 5) / 0.1 * 8.5;
        mound_alphas[1] = 255 - alphaChange;
    } else if (coverChange < d_interval * 7) {
        branch_alphas[0] = 0;
        branch_alphas[1] = 0;
        branch_alphas[2] = 0;
        branch_alphas[3] = 0;
        mound_alphas[0] = 0;
        mound_alphas[1] = 0;
        let alphaChange = (coverChange - d_interval * 6) / 0.1 * 8.5;
        branch_alphas[4] = 255 - alphaChange;
    } else if (coverChange < d_interval * 8) {
        branch_alphas[0] = 0;
        branch_alphas[1] = 0;
        branch_alphas[2] = 0;
        branch_alphas[3] = 0;
        branch_alphas[4] = 0;
        mound_alphas[0] = 0;
        mound_alphas[1] = 0;
        let alphaChange = (coverChange - d_interval * 7) / 0.1 * 8.5;
        mound_alphas[2] = 255 - alphaChange;
    } else if (coverChange < d_interval * 9) {
        branch_alphas[0] = 0;
        branch_alphas[1] = 0;
        branch_alphas[2] = 0;
        branch_alphas[3] = 0;
        branch_alphas[4] = 0;
        mound_alphas[0] = 0;
        mound_alphas[1] = 0;
        mound_alphas[2] = 0;
        let alphaChange = (coverChange - d_interval * 8) / 0.1 * 8.5;
        mound_alphas[3] = 255 - alphaChange;
    } else if (coverChange < d_interval * 10) {
        branch_alphas[0] = 0;
        branch_alphas[1] = 0;
        branch_alphas[2] = 0;
        branch_alphas[3] = 0;
        branch_alphas[4] = 0;
        mound_alphas[0] = 0;
        mound_alphas[1] = 0;
        mound_alphas[2] = 0;
        mound_alphas[3] = 0;
        let alphaChange = (coverChange - d_interval * 9) / 0.1 * 8.5;
        mound_alphas[4] = 255 - alphaChange;
    }

    // draw 5 of each branching & mounding
    tint(255, branch_alphas[0]);
    image(branch, x[branchIndex[0]], y[branchIndex[0]] - imageHeight / 2, imageWidth, imageHeight);
    tint(255, branch_alphas[1]);
    image(branch, x[branchIndex[1]], y[branchIndex[1]] - imageHeight / 2, imageWidth, imageHeight);
    tint(255, branch_alphas[2]);
    image(branch, x[branchIndex[2]], y[branchIndex[2]] - imageHeight / 2, imageWidth, imageHeight);
    tint(255, branch_alphas[3]);
    image(branch, x[branchIndex[3]], y[branchIndex[3]] - imageHeight / 2, imageWidth, imageHeight);
    tint(255, branch_alphas[4]);
    image(branch, x[branchIndex[4]], y[branchIndex[4]] - imageHeight / 2, imageWidth, imageHeight);
    tint(255, mound_alphas[0]);
    image(mound, x[moundIndex[0]], y[moundIndex[0]] - (imageHeight * 0.8) / 2, imageWidth * 0.8, imageHeight * 0.8);
    tint(255, mound_alphas[1]);
    image(mound, x[moundIndex[1]], y[moundIndex[1]] - (imageHeight * 0.8) / 2, imageWidth * 0.8, imageHeight * 0.8);
    tint(255, mound_alphas[2]);
    image(mound, x[moundIndex[2]], y[moundIndex[2]] - (imageHeight * 0.8) / 2, imageWidth * 0.8, imageHeight * 0.8);
    tint(255, mound_alphas[3]);
    image(mound, x[moundIndex[3]], y[moundIndex[3]] - (imageHeight * 0.8) / 2, imageWidth * 0.8, imageHeight * 0.8);
    tint(255, mound_alphas[4]);
    image(mound, x[moundIndex[4]], y[moundIndex[4]] - (imageHeight * 0.8) / 2, imageWidth * 0.8, imageHeight * 0.8);
}