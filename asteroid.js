class Asteroid {
    constructor(game) {
        this.game = game;
        this.asteroids = null; // Group of asteroids
    }

    preload() {
        // Load asteroid image or sprite here
        // this.game.load.image('asteroid', 'path/to/asteroid.png');
    }

    create() {
        this.asteroids = this.game.physics.add.group(); // Create a group of asteroids
    }

    createAsteroid(x, y, size) {
        // Create an asteroid at the given x and y position
        const asteroid = this.asteroids.create(x, y, 'asteroid');
        asteroid.setScale(size); // Scale the asteroid by the given size
        asteroid.setVelocity(Phaser.Math.Between(-200, 200), 20); // Set a random velocity
        asteroid.setBounce(1); // Make the asteroid bounce off the world bounds
        asteroid.setCollideWorldBounds(true); // Make the asteroid collide with the world bounds
    }

    update() {
        // Update asteroids here if needed
    }
}

export default Asteroid;