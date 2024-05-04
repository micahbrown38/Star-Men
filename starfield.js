export function createStarfield(scene) {
    // Create a group for the stars
    var stars = scene.physics.add.group();

    // Create initial stars
    for (let i = 0; i < 1000; i++) {
        let x = Phaser.Math.Between(-1000, scene.cameras.main.width+1000);
        let y = Phaser.Math.Between(-1000, scene.cameras.main.height+1000);
        let star = scene.physics.add.sprite(x, y, 'star');
        stars.add(star);
    }

    // Update the starfield
    scene.events.on('update', function() {
        // Update the size of the starfield
        const width = scene.cameras.main.width;
        const height = scene.cameras.main.height;

        // Remove stars that have moved off the screen
        stars.getChildren().forEach(function(star) {
            if (star.x < 0) {
                star.destroy();
            }
        });

        // Add new stars at the right edge of the screen
        if (Phaser.Math.Between(0, 1) < 0.5) {
            let y = Phaser.Math.Between(0, height);
            let star = scene.physics.add.sprite(width, y, 'star');
            stars.add(star);
        }
    });
}