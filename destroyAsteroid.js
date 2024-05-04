import Attributes from './Attributes.js';

function destroyAsteroid(bullet, asteroid, ship, collectIronCore, ammo, fuel, ammoText, fuelText) {
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
    this.physics.add.overlap(ship, ironCoreSprite, function(ship, ironCoreSprite) {
        collectIronCore(ship, ironCoreSprite, ammo, fuel, ammoText, fuelText);
    }, null, this);
    
    // When an asteroid is destroyed...
    this.ship.attributes = new Attributes(this);
    this.ship.attributes.addXP('shooting', 100);  // Add XP to the shooting attribute
    //console.log(this.ship.attributes.getXP('shooting'));  // Log the current XP for the shooting attribute
    //console.log(this.ship.attributes.getLevel('shooting'));

    asteroid.destroy();  // Destroy the asteroid
}

export { destroyAsteroid };