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

export { createAsteroid };