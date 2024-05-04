export function createShip(scene, shipType) {
    // Create a graphics object for drawing
    var graphics = scene.add.graphics({ lineStyle: { color: 0xffffff, width: 2 } }); // Define line style

    // Draw a complex shape for the ship
    switch(shipType){
        case 'ship1':
            graphics.beginPath();
            graphics.moveTo(400, 300 - 30); // Top point (nose)
            graphics.lineTo(400 - 15, 300 + 15); // Bottom left
            graphics.lineTo(400 - 10, 300 + 10); // Slightly up from bottom left
            graphics.lineTo(400 - 5, 300 + 20); // Further down and to the right
            graphics.lineTo(400 + 5, 300 + 20); // Further down and to the right
            graphics.lineTo(400 + 10, 300 + 10); // Slightly up from bottom right
            graphics.lineTo(400 + 15, 300 + 15); // Bottom right
            graphics.closePath();
            break;
        case 'ship2':
            graphics.beginPath();
            graphics.moveTo(400, 300 - 30); // Top point (nose)
            graphics.lineTo(400 - 20, 300 + 20); // Bottom left
            graphics.lineTo(400 - 10, 300 + 10); // Slightly up from bottom left
            graphics.lineTo(400 - 5, 300 + 30); // Further down and to the right
            graphics.lineTo(400 + 5, 300 + 30); // Further down and to the right
            graphics.lineTo(400 + 10, 300 + 10); // Slightly up from bottom right
            graphics.lineTo(400 + 20, 300 + 20); // Bottom right
            graphics.closePath();
            break;
        case 'ship3':
            graphics.beginPath();
            graphics.moveTo(400, 300 - 40); // Top point (nose)
            graphics.lineTo(400 - 25, 300 + 20); // Left wing tip
            graphics.lineTo(400 - 15, 300); // Inner left wing
            graphics.lineTo(400 - 5, 300 + 30); // Left engine back
            graphics.lineTo(400 + 5, 300 + 30); // Right engine back
            graphics.lineTo(400 + 15, 300); // Inner right wing
            graphics.lineTo(400 + 25, 300 + 20); // Right wing tip
            graphics.closePath(); // Complete the path to close the shape
            break;
        case 'ship4':
            graphics.beginPath();
            graphics.moveTo(400, 300 - 35); // Top point (nose)
            graphics.lineTo(400 - 30, 300 + 10); // Left mid wing
            graphics.lineTo(400 - 20, 300 + 25); // Left back wing
            graphics.lineTo(400, 300 + 15); // Middle lower point
            graphics.lineTo(400 + 20, 300 + 25); // Right back wing
            graphics.lineTo(400 + 30, 300 + 10); // Right mid wing
            graphics.closePath(); // Complete the path to close the shape
            break;
        case 'ship5':
            graphics.beginPath();
            graphics.moveTo(400, 300 - 50); // Top point (nose)
            graphics.lineTo(400 - 10, 300 - 20); // Upper left body
            graphics.lineTo(400 - 20, 300); // Lower left body
            graphics.lineTo(400 - 30, 300 + 10); // Left wing start
            graphics.lineTo(400 - 50, 300 + 20); // Left wing tip
            graphics.lineTo(400 - 30, 300 + 30); // Left wing end
            graphics.lineTo(400 - 20, 300 + 20); // Lower left body
            graphics.lineTo(400 - 10, 300 + 30); // Left engine start
            graphics.lineTo(400 - 15, 300 + 40); // Left engine end
            graphics.lineTo(400 + 15, 300 + 40); // Right engine end
            graphics.lineTo(400 + 10, 300 + 30); // Right engine start
            graphics.lineTo(400 + 20, 300 + 20); // Lower right body
            graphics.lineTo(400 + 30, 300 + 30); // Right wing end
            graphics.lineTo(400 + 50, 300 + 20); // Right wing tip
            graphics.lineTo(400 + 30, 300 + 10); // Right wing start
            graphics.lineTo(400 + 20, 300); // Lower right body
            graphics.lineTo(400 + 10, 300 - 20); // Upper right body
            graphics.closePath(); // Complete the path to close the shape
            break;

    }

    graphics.strokePath();

    
    // Generate a texture from the graphics object
    var textureKey = 'shipTexture' + shipType + Math.random().toString(36).substring(2, 15);
    graphics.generateTexture(textureKey, 800, 600);
    graphics.clear();

    // Return the texture key instead of creating a sprite
    return textureKey;
}