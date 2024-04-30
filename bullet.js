class Bullet {
    constructor(game) {
        this.game = game;
        this.bullets = null; // Group of bullets
    }

    preload() {
        // Load bullet image or sprite here
        // this.game.load.image('bullet', 'path/to/bullet.png');
    }

    create() {
        this.bullets = this.game.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            maxSize: 30,
            runChildUpdate: true
        }); // Create a group of bullets
    }

    shootBullet(x, y, rotation) {
        const speed = 400;  // Speed of the bullet
        const offset = 30;  // Offset from the ship to the bullet
        const bullet = this.bullets.get(x, y);  // Get a bullet from the pool and position it at the ship's position

        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.rotation = rotation;
            this.game.physics.velocityFromRotation(rotation, speed, bullet.body.velocity);
            bullet.x += offset * Math.cos(rotation);  // Add the offset to the bullet's position after rotating it
            bullet.y += offset * Math.sin(rotation);
        }
    }

    update() {
        // Update bullets here if needed
    }
}

export default Bullet;