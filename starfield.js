export function createStarfield(scene) {
    // Set the size of the starfield
    const width = scene.game.canvas.width;
    const height = scene.game.canvas.height;

    // Remove the existing texture if it exists
    if (scene.textures.exists('starfield')) {
        scene.textures.remove('starfield');
    }

    // Create a RenderTexture
    var texture = scene.textures.createCanvas('starfield', width, height);

    // Get a reference to the canvas context
    var ctx = texture.getContext();

    // Draw stars on the canvas
    for (let i = 0; i < 1000; i++) {
        let x = Phaser.Math.Between(0, width);
        let y = Phaser.Math.Between(0, height);
        let size = Phaser.Math.Between(1, 3);
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, size, size);
    }

    // Draw large stars on the canvas
    for (let i = 0; i < 50; i++) {
        let x = Phaser.Math.Between(0, width);
        let y = Phaser.Math.Between(0, height);
        let size = Phaser.Math.Between(10, 15);
        ctx.fillStyle = 'white';
        // Draw vertical line
        ctx.fillRect(x, y - size / 2, 2, size);
        // Draw horizontal line
        ctx.fillRect(x - size / 2, y, size, 2);
    }

    // Refresh the texture
    texture.refresh();

    // Add the texture to the scene as a TileSprite
    var starfield = scene.add.tileSprite(0, 0, scene.game.canvas.width, scene.game.canvas.height, 'starfield').setOrigin(0, 0);
    starfield.setSize(scene.game.canvas.width, scene.game.canvas.height);
    scene.game.canvas.style.border = "3px solid green";

    // Resize the TileSprite whenever the game canvas is resized
    scene.scale.on('resize', function(gameSize) {
        starfield.setSize(gameSize.width, gameSize.height);
    });

    scene.scale.refresh();
}