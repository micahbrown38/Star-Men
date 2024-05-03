function createShip(scene) {
    // Create a graphics object for drawing
    var graphics = scene.add.graphics({ lineStyle: { color: 0xffffff, width: 2 } }); // Define line style

    // Draw a complex shape for the ship
    graphics.beginPath();
    graphics.moveTo(400, 300 - 30); // Top point (nose)
    graphics.lineTo(400 - 15, 300 + 15); // Bottom left
    graphics.lineTo(400 - 10, 300 + 10); // Slightly up from bottom left
    graphics.lineTo(400 - 5, 300 + 20); // Further down and to the right
    graphics.lineTo(400 + 5, 300 + 20); // Further down and to the right
    graphics.lineTo(400 + 10, 300 + 10); // Slightly up from bottom right
    graphics.lineTo(400 + 15, 300 + 15); // Bottom right
    graphics.closePath();
    graphics.strokePath();

    // Generate a texture from the graphics object
    var textureKey = 'shipTexture';
    graphics.generateTexture(textureKey, 800, 600);
    graphics.clear();

    // Add the ship sprite to the game using the generated texture
    var ship = scene.physics.add.sprite(400, 300, textureKey);
    ship.setOrigin(0.5, 0.5); // Center the origin for better rotation
    ship.setCollideWorldBounds(true); 

    // Enable physics for the ship
    scene.physics.world.enable(ship);
    ship.body.setDrag(100); // Simulate space drag
    ship.body.setMaxVelocity(200);

    // Adjust the size of the physics body
    var width = ship.width * 0.03;  // Adjust as needed
    var height = ship.height * 0.06;  // Adjust as needed
    ship.body.setSize(width, height);

    return ship;
}

export { createShip };