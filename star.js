class Star {
    constructor(game) {
        this.game = game;
        this.stars = null; // Group of stars
    }

    preload() {
        // Load star image or sprite here
        // this.game.load.image('star', 'path/to/star.png');
    }

    create() {
        this.stars = this.game.physics.add.group(); // Create a group of stars
    }

    createStar(x, y, size) {
        // Create a star at the given x and y position
        const star = this.stars.create(x, y, 'star');
        star.setScale(size); // Scale the star by the given size
        star.setVelocity(Phaser.Math.Between(-200, 200), 20); // Set a random velocity
        star.setBounce(1); // Make the star bounce off the world bounds
        star.setCollideWorldBounds(true); // Make the star collide with the world bounds
    }

    update() {
        // Update stars here if needed
    }
}

export default Star;