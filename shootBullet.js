function shootBullet(ship, bullets, ammo, ammoText) {
    const speed = 400;  // Speed of the bullet
    const offset = 30;  // Offset from the ship to the bullet
    const bulletX = ship.x;  // Get the ship's position
    const bulletY = ship.y;

    // If there is ammo left
    if (ammo > 0) {
        const bullet = bullets.get(bulletX, bulletY);  // Get a bullet from the pool and position it at the ship's position

        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            const adjustedRotation = ship.rotation - Math.PI / 2;  // Adjust the ship's rotation
            bullet.setVelocity(speed * Math.cos(adjustedRotation), speed * Math.sin(adjustedRotation));  // Set the bullet's velocity based on the adjusted rotation
            bullet.x += offset * Math.cos(adjustedRotation);  // Add the offset to the bullet's position after rotating it
            bullet.y += offset * Math.sin(adjustedRotation);

            bullet.distanceTraveled = 0; // Initialize distance traveled

            // Decrease ammo count
            ammo--;
        }
    }
    ammoText.setText('Ammo: ' + ammo);

    return ammo;  // Return the updated ammo count
}

export { shootBullet };