import { createShip } from './createShip.js';
import { createUI } from './ui.js';
import { createAsteroidClusters } from './createAsteroidClusters.js';
import { createStarfield } from './starfield.js';
import { destroyShip } from './destroyShip.js';
import { shootBullet } from './shootBullet.js';
import { destroyAsteroid } from './destroyAsteroid.js';
import { collectIronCore } from './collectIronCore.js';
import BackgroundStars from './backgroundStars.js';
import Attributes from './Attributes.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
            // Initialize your properties here
            this.ship = null;
            this.score = 0;
            this.scoreText = null;
            this.ammo = 1000;
            this.ammoText = null;
            this.fireRate = 200;
            this.lastFired = 0;
            this.bulletDistance = 500;
            this.fuel = 10000;
            this.fuelText = null;
            this.cursors = null;
            this.bullets = null;
            this.shipNameText = null;
            this.backgroundStars = new BackgroundStars(this);
    }

    preload() {
        // Load your assets here
    }

    create() {
        let shipName = this.sys.settings.data.shipName || 'Ship Undefined';

        let selectedShip = this.sys.settings.data.selectedShip || 'ship4'; // Use 'ship4' as a default
        let shipTexture = createShip(this, selectedShip);
        this.ship = this.physics.add.image(100, 100, shipTexture);
        this.ship.body.setDrag(100); // Add drag to make the ship slow down over time
        this.ship.attributes = new Attributes(); // Add attributes to the ship

        // Scale the ship to half its original size
        this.ship.setScale(0.5);

        // Initialize this.shipNameText
        this.shipNameText = this.add.text(10, 10, shipName, { fontSize: '32px', fill: '#0f0' });
        this.shipNameText.setScrollFactor(1); // Make the text fixed on the screen

        // Adjust the size of the physics body
        this.ship.body.setSize(40, 40);

        // In your create function
        this.fuelText = this.add.text(16, 112, 'fuel: ' + this.fuel, { fontSize: '32px', fill: '#000' });  // Initialize the fuel text

        // Set world bounds
        this.physics.world.setBounds(-370, -271, 6750, 6750); // Set the world bounds to be 60000 units wide and tall

        // Camera setup to follow the ship
        this.cameras.main.startFollow(this.ship, true);
        this.cameras.main.setBounds(0, 0, 6000, 6000);
        this.cameras.main.setZoom(1); // Zoom out to see more of the world
        
        // Setup keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  // Add space bar for shooting

        // Create bullets physics group
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 100  // Limit the number of bullets active at once
        });

        // Generate a simple bullet texture
        var bulletGraphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
        bulletGraphics.fillRect(0, 0, 2, 5);  // Small rectangle bullet
        bulletGraphics.generateTexture('bullet', 2, 5);
        bulletGraphics.clear();

        // Create several asteroids
        createAsteroidClusters.call(this, 0, 0, 20);

        // Create the ammo text
        this.ammoText = this.add.text(16, 16, ('Ammo:' + this.ammo), { fontSize: '32px', fill: '#00ff00' });
        this.ammoText.setScrollFactor(0);
        this.ammoText.setOrigin(1, 0);
        this.ammoText.setPosition(this.cameras.main.width - 50, + 20);

        // Create the fuel text
        this.fuelText = this.add.text(16, 16, ('Fuel:' + this.fuel), { fontSize: '32px', fill: '#00ff00' });
        this.fuelText.setScrollFactor(0);
        this.fuelText.setOrigin(1, 0);
        this.fuelText.setPosition(this.cameras.main.width - 50, + 45);

        // Add this after creating the asteroids in the create function
        this.physics.add.collider(this.bullets, this.asteroids, function(bullet, asteroid) {
            destroyAsteroid.call(this, bullet, asteroid, this.ship, collectIronCore, this.ammo, this.fuel, this.ammoText, this.fuelText);
        }, null, this);

        //Destroy the ship when it collides with an asteroid
        this.physics.add.collider(this.ship, this.asteroids, (ship, asteroid) => destroyShip(ship, asteroid, this, this.score, this.scoreText, this.ammo));

        //createStarfield(this);  // Create the starfield background
        this.backgroundStars.create();
        

        
}


showLevelUp(text, x, y) {
    let levelUpText = this.add.text(x, y, text, { fontSize: '32px', fill: '#00ff00' });
    levelUpText.setScrollFactor(0);
    levelUpText.setOrigin(0.5, 0.5);

    this.tweens.add({
        targets: levelUpText,
        y: y - 100,
        alpha: 0,
        duration: 2000,
        ease: 'Power2',
        onComplete: function () {
            levelUpText.destroy();
        }
    });
}

    update(time, delta) {
        // Handle rotation
        if (this.cursors.left.isDown) {
            this.ship.setAngularVelocity(-150);
        } else if (this.cursors.right.isDown) {
            this.ship.setAngularVelocity(150);
        } else {
            this.ship.setAngularVelocity(0);
        }

        // Handle forward movement
        if (this.cursors.up.isDown && this.fuel > 0) {  // Check if there is fuel left
            this.physics.velocityFromRotation(this.ship.rotation - Math.PI / 2, 200, this.ship.body.velocity);

            // Decrease fuel count
            this.fuel--;

            // Update the fuel text
            this.fuelText.setText('fuel: ' + this.fuel);
        } else {
            this.ship.setAcceleration(0);
        }

        // If the shooting button is down and enough time has passed since the last shot
        if (this.cursors.space.isDown && time > this.lastFired && this.ammo > 0) {
            // Shoot a bullet
            this.ammo = shootBullet(this.ship, this.bullets, this.ammo, this.ammoText);

            // Update the time when the last bullet was fired
            this.lastFired = time + this.fireRate;
        }

        // For each bullet
        this.bullets.children.each(function(bullet) {
            // Increase the distance traveled
            bullet.distanceTraveled += Math.sqrt(Math.pow(bullet.body.velocity.x, 2) + Math.pow(bullet.body.velocity.y, 2)) * delta / 1000;

            // If the bullet has traveled more than the maximum distance
            if (bullet.distanceTraveled > this.bulletDistance) {
                // Destroy the bullet
                bullet.destroy();
            }
        }, this);

        this.asteroids.forEach(asteroid => {
            // Wrap around world bounds
            if (asteroid.x < 0) {
                asteroid.x = 6000;
            } else if (asteroid.x > 6000) {
                asteroid.x = 0;
            }
            if (asteroid.y < 0) {
                asteroid.y = 6000;
            } else if (asteroid.y > 6000) {
                asteroid.y = 0;
            }
        });

        let shipSpeed = 0;
        this.backgroundStars.update(shipSpeed);
        if (this.shipNameText) {
            // Update the position of the text to the position of the ship
            this.shipNameText.x = this.ship.x - 60;
            this.shipNameText.y = this.ship.y + 50;}
    }
}