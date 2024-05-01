var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 } // Set gravity to 0
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

var game = new Phaser.Game(config);
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


function preload() {
}

function createAsteroid(x, y, size) {
    // Create an array to hold the points of the polygon
    var points = [];

    // Create 8 points in a circular pattern
    for (let i = 0; i < 8; i++) {
        // Calculate the angle of the point
        let angle = i / 8 * Math.PI * 2;

        // Calculate a random distance from the center of the asteroid
        let distance = size / 2 + Phaser.Math.Between(-size / 8, size / 8);

        // Calculate the position of the point
        let pointX = size / 2 + Math.cos(angle) * distance;
        let pointY = size / 2 + Math.sin(angle) * distance;

        // Add the point to the array
        points.push(new Phaser.Geom.Point(pointX, pointY));
    }

    // Create a polygon from the points
    var polygon = new Phaser.Geom.Polygon(points);

    // Create a graphics object and draw the polygon
    var graphics = this.add.graphics({ x: x, y: y });
    graphics.lineStyle(2, 0xaaaaaa);  // Set line style: width 2, color 0xaaaaaa
    graphics.fillStyle(0xaaaaaa);  // Set fill style to the same color
    graphics.fillPoints(polygon.points, true);

    // Generate a unique texture for each asteroid
    var textureKey = 'asteroidTexture' + Date.now();
    graphics.generateTexture(textureKey, size, size);
    graphics.clear();

    const asteroid = this.physics.add.sprite(x, y, textureKey);
    asteroid.setOrigin(0.5, 0.5);
    return asteroid;
}

// Add this function to handle the destruction of the asteroid and the bullet
function destroyAsteroid(bullet, asteroid) {
    bullet.destroy();  // Destroy the bullet

    // Create an iron core at the position of the destroyed asteroid
    var ironCore = this.add.graphics({ x: asteroid.x, y: asteroid.y });
    ironCore.fillStyle(0x00ff00, 1);  // Set fill style: color 0xaaaaaa
    ironCore.fillCircle(0, 0, 15);  // Draw a circle: center (0, 0), radius 10

    // Generate a unique texture for each iron core
    var textureKey = 'ironCoreTexture' + Date.now();
    ironCore.generateTexture(textureKey, 20, 20);
    ironCore.clear();

    // Create a sprite for the iron core
    var ironCoreSprite = this.physics.add.sprite(asteroid.x, asteroid.y, textureKey);
    ironCoreSprite.setOrigin(0.5, 0.5);

    // Add a collision handler between the ship and the iron cores
    this.physics.add.overlap(ship, ironCoreSprite, collectIronCore, null, this);

    asteroid.destroy();  // Destroy the asteroid
}

// Add this function to handle the collection of iron cores
function collectIronCore(ship, ironCoreSprite) {
    ironCoreSprite.destroy();  // Destroy the iron core

    // Increase the ammo count
    ammo += 100;
    // Increase the fuel count
    fuel += 100;
    ammoText.setText('Smmo: ' + ammo);
    fuelText.setText('Fuel: ' + fuel);
}

// Add this function to handle the destruction of the ship
function destroyShip(ship, asteroid, scene) {
    // Reset the ship's position
    ship.x = scene.cameras.main.width / 2;
    ship.y = scene.cameras.main.height / 2;

    // Reset the ship's velocity
    ship.body.setVelocity(0, 0);

    // Reset the score and update the score text
    score = 0;
    scoreText.setText('score: ' + score);

    // Make the ship visible and active again
    ship.setVisible(true);
    ship.setActive(true);

    //reset ammo
    ammo+=100;
}

function createUI() {
    // Create a graphics object for the border
    var border = this.add.graphics({ lineStyle: { color: 0xffffff, width: 4 } });

    // Define the size and position of the border
    var borderX = -570; // Set to the left bound of the game world
    var borderY = -260; // Set to the top bound of the game world
    var borderWidth = window.innerWidth * 1.9; // Set to twice the width of the window
    var borderHeight = window.innerHeight * 1.9; // Set to twice the height of the window

    // Draw the border
    border.strokeRect(borderX, borderY, borderWidth, borderHeight);

    // Make sure it doesn't move with the camera
    border.setScrollFactor(0);
}

function create() {
    
    // Create a RenderTexture
var texture = this.textures.createCanvas('starfield', 6000, 6000);

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
this.add.image(0, 0, 'starfield').setOrigin(0);

   
// Create a graphics object for drawing
var graphics = this.add.graphics({ lineStyle: { color: 0xffffff, width: 2 } }); // Define line style

// Draw a complex shape for the ship
graphics.beginPath();
graphics.moveTo(400, 300 - 30); // Top point (nose)
graphics.lineTo(400 - 15, 300 + 15); // Bottom left
graphics.lineTo(400 - 10, 300 + 10); // Slightly up from bottom left
graphics.lineTo(400 - 5, 300 + 20); // Further down and to the right
graphics.lineTo(400 + 5, 300 + 20); // Further down and to the right
graphics.lineTo(400 + 10, 300 + 10); // Slightly up from bottom right
graphics.lineTo(400 + 15, 300 + 15); // Bottom right
graphics.closePath();
graphics.strokePath();

// Generate a texture from the graphics object
var textureKey = 'shipTexture';
graphics.generateTexture(textureKey, 800, 600);
graphics.clear();

// Add the ship sprite to the game using the generated texture
ship = this.physics.add.sprite(400, 300, textureKey);
ship.setOrigin(0.5, 0.5); // Center the origin for better rotation
ship.setCollideWorldBounds(true); 

// Enable physics for the ship
this.physics.world.enable(ship);
ship.body.setDrag(100); // Simulate space drag
ship.body.setMaxVelocity(200);

// Adjust the size of the physics body
var width = ship.width * 0.03;  // Adjust as needed
var height = ship.height * 0.06;  // Adjust as needed
ship.body.setSize(width, height);

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

// Create bullets physics group
bullets = this.physics.add.group({
    defaultKey: 'bullet',
    maxSize: 30  // Limit the number of bullets active at once
});

// Generate a simple bullet texture
var bulletGraphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
bulletGraphics.fillRect(0, 0, 2, 5);  // Small rectangle bullet
bulletGraphics.generateTexture('bullet', 2, 5);
bulletGraphics.clear();

    cursors = this.input.keyboard.createCursorKeys();
cursors.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  // Add space bar for shooting

    // Create several asteroids
this.asteroids = [];

// Define the number of clusters and the number of asteroids per cluster
let numClusters = 200;
let asteroidsPerCluster = 20;

for (let i = 0; i < numClusters; i++) {
    // Choose a random position for the center of the cluster
    let clusterX = Phaser.Math.Between(-270, 5750);
    let clusterY = Phaser.Math.Between(-171, 5750);

    for (let j = 0; j < asteroidsPerCluster; j++) {
        // Choose a random position near the center of the cluster for the asteroid
        let x = Phaser.Math.Between(clusterX - 100, clusterX + 100);
        let y = Phaser.Math.Between(clusterY - 100, clusterY + 100);

        // Check if the position is too close to the ship's starting position
        let distance = Phaser.Math.Distance.Between(x, y, ship.x, ship.y);
        if (distance < 100) {  // Adjust this value as needed
            continue;  // Skip this iteration and move on to the next one
        }

        // Choose a random size for the asteroid
        let size = Phaser.Math.Between(20, 40);

        // Create the asteroid and set its velocity and rotation
        const asteroid = createAsteroid.call(this, x, y, size);
        asteroid.setAngularVelocity(Phaser.Math.Between(-100, 100));  // Set random rotation

        this.asteroids.push(asteroid);
    }
}

    // Create the score text
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#00ff00' });
    scoreText.setScrollFactor(0);
    scoreText.setOrigin(1, 0);
    scoreText.setPosition(this.cameras.main.width + 200, - 150);

    // Create the ammo text
    ammoText = this.add.text(16, 16, ('Ammo:' + ammo), { fontSize: '32px', fill: '#00ff00' });
    ammoText.setScrollFactor(0);
    ammoText.setOrigin(1, 0);
    ammoText.setPosition(this.cameras.main.width + 200, - 100);

    // Create the ammo text
    fuelText = this.add.text(16, 16, ('Fuel:' + fuel), { fontSize: '32px', fill: '#00ff00' });
    fuelText.setScrollFactor(0);
    fuelText.setOrigin(1, 0);
    fuelText.setPosition(this.cameras.main.width + 200, - 50);

    // Add this after creating the asteroids in the create function
    this.physics.add.collider(bullets, this.asteroids, destroyAsteroid, null, this);

    //Destroy the ship when it collides with an asteroid
    this.physics.add.collider(ship, this.asteroids, (ship, asteroid) => destroyShip(ship, asteroid, this));


    // In your create function:
    this.leftButton = this.add.rectangle(50, 50, 80, 80, 0x000000).setInteractive();
    this.rightButton = this.add.rectangle(150, 50, 80, 80, 0x000000).setInteractive();
    this.forwardButton = this.add.rectangle(250, 50, 80, 80, 0x000000).setInteractive();
    this.shootButton = this.add.rectangle(350, 50, 80, 80, 0x000000).setInteractive();

    // Set a stroke color to the buttons
    this.leftButton.setStrokeStyle(4, 0xff0000); // Red
    this.rightButton.setStrokeStyle(4, 0x00ff00); // Green
    this.forwardButton.setStrokeStyle(4, 0x0000ff); // Blue
    this.shootButton.setStrokeStyle(4, 0xffff00); // Yellow

    // Add pointerdown and pointerup events to each button:
    this.leftButton.on('pointerdown', () => this.leftButton.isTouched = true);
    this.leftButton.on('pointerup', () => this.leftButton.isTouched = false);
    this.rightButton.on('pointerdown', () => this.rightButton.isTouched = true);
    this.rightButton.on('pointerup', () => this.rightButton.isTouched = false);
    this.forwardButton.on('pointerdown', () => this.forwardButton.isTouched = true);
    this.forwardButton.on('pointerup', () => this.forwardButton.isTouched = false);
    this.shootButton.on('pointerdown', () => this.shootButton.isTouched = true);
    this.shootButton.on('pointerup', () => this.shootButton.isTouched = false);



    let shipName = "The Stomper"; // Replace with your ship's name
    shipNameText = this.add.text(0, 0, shipName, { fontSize: '32px', fill: '#00ff00' });
    
    createUI.call(this);
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
        shootBullet();

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

    // In your update function:
    if (this.leftButton.isTouched) {
        ship.setAngularVelocity(-150); // Move left
    }
    if (this.rightButton.isTouched) {
        ship.setAngularVelocity(150); // Move right
    }
    if (this.forwardButton.isTouched && fuel > 0) {  // Check if there is fuel left
        this.physics.velocityFromRotation(ship.rotation - Math.PI / 2, 200, ship.body.velocity); // Move forward

        // Decrease fuel count
        fuel--;

        // Update the fuel text
        fuelText.setText('fuel: ' + fuel);
    }
    if (this.shootButton.isTouched) {
        shootBullet(); // Shoot
    }

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

function shootBullet() {
    const speed = 400;  // Speed of the bullet
    const offset = 30;  // Offset from the ship to the bullet
    const bulletX = this.ship.x;  // Get the ship's position
    const bulletY = this.ship.y;

    // If there is ammo left
    if (ammo > 0) {
        const bullet = this.bullets.get(bulletX, bulletY);  // Get a bullet from the pool and position it at the ship's position

        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            const adjustedRotation = this.ship.rotation - Math.PI / 2;  // Adjust the ship's rotation
            bullet.setVelocity(speed * Math.cos(adjustedRotation), speed * Math.sin(adjustedRotation));  // Set the bullet's velocity based on the adjusted rotation
            bullet.x += offset * Math.cos(adjustedRotation);  // Add the offset to the bullet's position after rotating it
            bullet.y += offset * Math.sin(adjustedRotation);

            bullet.distanceTraveled = 0; // Initialize distance traveled

            // Decrease ammo count
            ammo--;
        }
    }
    ammoText.setText('Ammo: ' + ammo);
}
