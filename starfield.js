export function createStarfield(scene) {
    // Create a RenderTexture
    var texture = scene.textures.createCanvas('starfield', 6000, 6000);

    // Get a reference to the canvas context
    var ctx = texture.getContext();

    // Draw stars on the canvas
    for (let i = 0; i < 200000; i++) {
        let x = Phaser.Math.Between(0, 6000);  // Corrected range
        let y = Phaser.Math.Between(0, 6000);  // Corrected range
        let size = Phaser.Math.Between(1, 3);
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, size, size);
    }

    // Draw large stars on the canvas
    for (let i = 0; i < 500; i++) {
        let x = Phaser.Math.Between(0, 6000);  // Corrected range
        let y = Phaser.Math.Between(0, 6000);  // Corrected range
        let size = Phaser.Math.Between(10, 15);
        ctx.fillStyle = 'white';
        
        // Draw vertical line
        ctx.fillRect(x, y - size / 2, 2, size);
        // Draw horizontal line
        ctx.fillRect(x - size / 2, y, size, 2);
    }

    // Refresh the texture
    texture.refresh();

    // Add the texture to the scene
    scene.add.image(0, 0, 'starfield').setOrigin(0);
}