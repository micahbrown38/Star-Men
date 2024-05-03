import { createStarfield } from './starfield.js';
import { createUI } from './ui.js';
import getConfig from './config.js';
import { createAsteroid } from './createAsteroid.js';
import { destroyAsteroid } from './destroyAsteroid.js';
import { collectIronCore } from './collectIronCore.js';
import { destroyShip } from './destroyShip.js';
import { shootBullet } from './shootBullet.js';
import { createShip } from './createShip.js';
import { createAsteroidClusters } from './createAsteroidClusters.js';

// calling the config code from config.js
var game = new Phaser.Game(getConfig(preload, create, update));
var ship; // This will reference your ship
var score = 0;
var scoreText;
var ammo = 1000; // Initialize ammo count
var ammoText; // Text object to display ammo count
var fireRate = 200; // Time between shots in milliseconds
var lastFired = 0; // Time when the last bullet was fired
var bulletDistance = 500; // Maximum distance a bullet can travel
var fuel = 10000;  // Initialize fuel count
var fuelText;  // Text object to display fuel count
let cursors;
let bullets;
let shipNameText;

function preload() {
}

function create() {
    
    createStarfield(this);  // Create the starfield background

    ship = createShip(this);  // Create the ship

    createUI(this);

    // In your create function
    fuelText = this.add.text(16, 112, 'fuel: ' + fuel, { fontSize: '32px', fill: '#000' });  // Initialize the fuel text

    // Set world bounds
    this.physics.world.setBounds(-370, -271, 6750, 6750); // Set the world bounds to be 60000 units wide and tall

    // Camera setup to follow the ship
    this.cameras.main.startFollow(ship, true);
    this.cameras.main.setBounds(0, 0, 6000, 6000);
    this.cameras.main.setZoom(0.5); // Zoom out to see more of the world
    
    // Setup keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
    cursors.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  // Add space bar for shooting

    // Create bullets physics group
    bullets = this.physics.add.group({
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
    ammoText = this.add.text(16, 16, ('Ammo:' + ammo), { fontSize: '32px', fill: '#00ff00' });
    ammoText.setScrollFactor(0);
    ammoText.setOrigin(1, 0);
    ammoText.setPosition(this.cameras.main.width + 200, - 100);

    // Create the fuel text
    fuelText = this.add.text(16, 16, ('Fuel:' + fuel), { fontSize: '32px', fill: '#00ff00' });
    fuelText.setScrollFactor(0);
    fuelText.setOrigin(1, 0);
    fuelText.setPosition(this.cameras.main.width + 200, - 50);

    // Add this after creating the asteroids in the create function
    this.physics.add.collider(bullets, this.asteroids, function(bullet, asteroid) {
        destroyAsteroid.call(this, bullet, asteroid, ship, collectIronCore, ammo, fuel, ammoText, fuelText);
    }, null, this);

    //Destroy the ship when it collides with an asteroid
    this.physics.add.collider(ship, this.asteroids, (ship, asteroid) => destroyShip(ship, asteroid, this, score, scoreText, ammo));

    let shipName = "The Stomper"; // Replace with your ship's name
    shipNameText = this.add.text(0, 0, shipName, { fontSize: '32px', fill: '#00ff00' });
}

function update(time, delta) {
    // Handle rotation
    if (cursors.left.isDown) {
        ship.setAngularVelocity(-150);
    } else if (cursors.right.isDown) {
        ship.setAngularVelocity(150);
    } else {
        ship.setAngularVelocity(0);
    }

    // Handle forward movement
    if (cursors.up.isDown && fuel > 0) {  // Check if there is fuel left
        this.physics.velocityFromRotation(ship.rotation - Math.PI / 2, 200, ship.body.velocity);

        // Decrease fuel count
        fuel--;

        // Update the fuel text
        fuelText.setText('fuel: ' + fuel);
    } else {
        ship.setAcceleration(0);
    }

    // If the shooting button is down and enough time has passed since the last shot
    if (cursors.space.isDown && time > lastFired && ammo > 0) {
        // Shoot a bullet
        ammo = shootBullet(ship, bullets, ammo, ammoText);

        // Update the time when the last bullet was fired
        lastFired = time + fireRate;
    }

    // For each bullet
    bullets.children.each(function(bullet) {
        // Increase the distance traveled
        bullet.distanceTraveled += Math.sqrt(Math.pow(bullet.body.velocity.x, 2) + Math.pow(bullet.body.velocity.y, 2)) * delta / 1000;

        // If the bullet has traveled more than the maximum distance
        if (bullet.distanceTraveled > bulletDistance) {
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

    shipNameText.x = ship.x - 100;
    shipNameText.y = ship.y + 30;
}