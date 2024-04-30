class Ship {
    constructor(game) {
        this.game = game;
        this.ship = null; // The ship
    }

    preload() {
        // Load ship image or sprite here
        // this.game.load.image('ship', 'path/to/ship.png');
    }

    create() {
        this.ship = this.game.physics.add.sprite(400, 300, 'ship'); // Create the ship at the center of the screen
        this.ship.setDamping(true); // Enable damping (friction)
        this.ship.setDrag(0.99); // Set the amount of drag (resistance)
        this.ship.setMaxVelocity(200); // Set the maximum velocity
    }

    update() {
        // Update the ship's movement based on input
        if (this.game.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.LEFT)) {
            this.ship.setAngularVelocity(-300);
        } else if (this.game.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.RIGHT)) {
            this.ship.setAngularVelocity(300);
        } else {
            this.ship.setAngularVelocity(0);
        }

        if (this.game.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.UP)) {
            this.game.physics.velocityFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
        } else {
            this.ship.setAcceleration(0);
        }
    }
}

export default Ship;