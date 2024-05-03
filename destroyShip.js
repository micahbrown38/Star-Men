// Add this function to handle the destruction of the ship
function destroyShip(ship, asteroid, scene, ammo) {
    // Reset the ship's position
    ship.x = scene.cameras.main.width / 2;
    ship.y = scene.cameras.main.height / 2;

    // Reset the ship's velocity
    ship.body.setVelocity(0, 0);

    // Make the ship visible and active again
    ship.setVisible(true);
    ship.setActive(true);

    //reset ammo
    ammo+=100;
}

export { destroyShip };