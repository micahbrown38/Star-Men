function collectIronCore(ship, ironCoreSprite, ammo, fuel, ammoText, fuelText) {
    ironCoreSprite.destroy();  // Destroy the iron core

    // Increase the ammo count
    ammo += 100;
    // Increase the fuel count
    fuel += 100;
    ammoText.setText('Smmo: ' + ammo);
    fuelText.setText('Fuel: ' + fuel);
}

export { collectIronCore };