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
    var graphics = this.add.graphics({ fillStyle: { color: 0xaaaaaa } });
    const points = [];
    const complexity = Phaser.Math.Between(5, 10); // More or fewer vertices
    for (let i = 0; i < complexity; i++) {
        const angle = (i / complexity) * 2 * Math.PI;
        const radius = size * Phaser.Math.FloatBetween(0.5, 1.5);
        points.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
    }
    graphics.beginPath();
    graphics.moveTo(points[0].x, points[0].y);
    points.forEach(point => graphics.lineTo(point.x, point.y));
    graphics.closePath();
    graphics.fillPath();
    
    // Instead of generating a new texture for each asteroid, we use a common texture key and update it
    var textureKey = 'asteroidTexture';
    graphics.generateTexture(textureKey, size * 2, size * 2);
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
    // Draw small stars
    var graphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
    for (let i = 0; i < 20000; i++) { // Draw 100 stars
        let x = Phaser.Math.Between(-400, 2400);
        let y = Phaser.Math.Between(-300, 1800);
        graphics.fillPoint(x, y, 2); // Draw a small dot
    }

    //draw larger stars
    var graphics = this.add.graphics({ lineStyle: { color: 0xffffff, width: 1 } }); for (let i = 0; i < 500; i++)
    {
    let x = Phaser.Math.Between(-400, 2400);
    let y = Phaser.Math.Between(-300, 1800);
    let size = Phaser.Math.Between(1, 6); // Random size for slight variation

    // Draw a vertical line
    graphics.lineBetween(x, y - size, x, y + size);
    // Draw a horizontal line
    graphics.lineBetween(x - size, y, x + size, y);
    }

   
    // Create a graphics object for drawing
    var graphics = this.add.graphics({ fillStyle: { color: 0xffffff } });

    // Draw a triangle for the ship, pointing upwards
    graphics.beginPath();
    graphics.moveTo(400, 300 - 30); // Top point (nose)
    graphics.lineTo(400 - 15, 300 + 15); // Bottom left
    graphics.lineTo(400 + 15, 300 + 15); // Bottom right
    graphics.closePath();
    graphics.fillPath();

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
    this.physics.world.setBounds(-400, -300, 2400, 1800);

    // Camera setup to follow the ship
    this.cameras.main.startFollow(ship, true);
    this.cameras.main.setBounds(0, 0, 1600, 1200);

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

    for (let i = 0; i < 50; i++) {
        let x = Phaser.Math.Between(0, 1600);
        let y = Phaser.Math.Between(0, 1200);
        let size = Phaser.Math.Between(10, 40);
        const asteroid = createAsteroid.call(this, x, y, size);
        asteroid.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
        this.asteroids.push(asteroid);
    }

    // Add this after creating the asteroids in the create function
    this.physics.add.collider(bullets, this.asteroids, destroyAsteroid, null, this);
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


    this.asteroids.forEach(asteroid => {
        // Wrap around world bounds
        if (asteroid.x < 0) {
            asteroid.x = 1600;
        } else if (asteroid.x > 1600) {
            asteroid.x = 0;
        }
        if (asteroid.y < 0) {
            asteroid.y = 1200;
        } else if (asteroid.y > 1200) {
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
