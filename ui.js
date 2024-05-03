export function createUI(scene) {
    // Create a graphics object for the border
    var border = scene.add.graphics({ lineStyle: { color: 0xffffff, width: 4 } });

    // Define the size and position of the border
    var borderX = -570; // Set to the left bound of the game world
    var borderY = -260; // Set to the top bound of the game world
    var borderWidth = window.innerWidth * 1.9; // Set to twice the width of the window
    var borderHeight = window.innerHeight * 1.9; // Set to twice the height of the window

    // Draw the border
    border.strokeRect(borderX, borderY, borderWidth, borderHeight);

    // Make sure it doesn't move with the camera
    border.setScrollFactor(0);
}