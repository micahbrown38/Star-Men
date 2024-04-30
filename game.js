var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // No gravity in space
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var ship; // This will reference your ship

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
    asteroid.destroy();  // Destroy the asteroid
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

    // Draw a triangle for the ship, pointing upwards
    graphics.beginPath();
    graphics.moveTo(400, 300 - 30); // Top point (nose)
    graphics.lineTo(400 - 15, 300 + 15); // Bottom left
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

        // Choose a random size for the asteroid
        let size = Phaser.Math.Between(20, 40);

        // Create the asteroid and set its velocity and rotation
        const asteroid = createAsteroid.call(this, x, y, size);
        asteroid.setAngularVelocity(Phaser.Math.Between(-100, 100));  // Set random rotation

        this.asteroids.push(asteroid);
    }
}

    // Add this after creating the asteroids in the create function
    this.physics.add.collider(bullets, this.asteroids, destroyAsteroid, null, this);

    // In your create function:
    this.leftButton = this.add.rectangle(50, this.cameras.main.height - 50, 100, 100, 0x000000, 0.01).setInteractive();
    this.rightButton = this.add.rectangle(this.cameras.main.width - 50, this.cameras.main.height - 50, 100, 100, 0x000000, 0.01).setInteractive();
    this.forwardButton = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height - 50, 100, 100, 0x000000, 0.01).setInteractive();
    this.shootButton = this.add.rectangle(this.cameras.main.width / 2, 50, 100, 100, 0x000000, 0.01).setInteractive();


    // Add pointerdown and pointerup events to each button:
    this.leftButton.on('pointerdown', () => this.leftButton.isTouched = true);
    this.leftButton.on('pointerup', () => this.leftButton.isTouched = false);
    this.rightButton.on('pointerdown', () => this.rightButton.isTouched = true);
    this.rightButton.on('pointerup', () => this.rightButton.isTouched = false);
    this.forwardButton.on('pointerdown', () => this.forwardButton.isTouched = true);
    this.forwardButton.on('pointerup', () => this.forwardButton.isTouched = false);
    this.shootButton.on('pointerdown', () => this.shootButton.isTouched = true);
    this.shootButton.on('pointerup', () => this.shootButton.isTouched = false);
}

function update() {
    // Handle rotation
    if (cursors.left.isDown) {
        ship.setAngularVelocity(-150);
    } else if (cursors.right.isDown) {
        ship.setAngularVelocity(150);
    } else {
        ship.setAngularVelocity(0);
    }

    // Handle forward movement
    if (cursors.up.isDown) {
        this.physics.velocityFromRotation(ship.rotation - Math.PI / 2, 200, ship.body.velocity);
    } else {
        ship.setAcceleration(0);
    }

    // Shooting logic
    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {  // Check if the space bar was just pressed
        shootBullet();
    }

    // In your update function:
    if (this.leftButton.isTouched) {
        ship.setAngularVelocity(-150); // Move left
    }
    if (this.rightButton.isTouched) {
        ship.setAngularVelocity(150); // Move right
    }
    if (this.forwardButton.isTouched) {
        this.physics.velocityFromRotation(ship.rotation - Math.PI / 2, 200, ship.body.velocity); // Move forward
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
}
function shootBullet() {
    const speed = 400;  // Speed of the bullet
    const offset = 30;  // Offset from the ship to the bullet
    const bulletX = this.ship.x;  // Get the ship's position
    const bulletY = this.ship.y;
    const bullet = this.bullets.get(bulletX, bulletY);  // Get a bullet from the pool and position it at the ship's position

    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        const adjustedRotation = this.ship.rotation - Math.PI / 2;  // Adjust the ship's rotation
        bullet.setVelocity(speed * Math.cos(adjustedRotation), speed * Math.sin(adjustedRotation));  // Set the bullet's velocity based on the adjusted rotation
        bullet.x += offset * Math.cos(adjustedRotation);  // Add the offset to the bullet's position after rotating it
        bullet.y += offset * Math.sin(adjustedRotation);
    }
}
