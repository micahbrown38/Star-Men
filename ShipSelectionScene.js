import { createShip } from './createShip.js';
import BackgroundStars from './backgroundStars.js';

export default class ShipSelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ShipSelectionScene' });
            this.backgroundStars = new BackgroundStars(this);
    }

    preload() {
    }

    init(data) {
        // Retrieve the ship name from the data
        this.shipName = data.shipName;
    }

    create() {
        this.backgroundStars.create(); // Create the background stars
        this.cameras.main.setZoom(1);
        // Create an array to store the ships
        let ships = [];

        // Create a ship of each type
        ships.push({ name: 'ship1', texture: createShip(this, 'ship1') });
        ships.push({ name: 'ship2', texture: createShip(this, 'ship2') });
        ships.push({ name: 'ship3', texture: createShip(this, 'ship3') });
        ships.push({ name: 'ship4', texture: createShip(this, 'ship4') });
        ships.push({ name: 'ship5', texture: createShip(this, 'ship5') });

        // Display the ships and their names
        for (let i = 0; i < ships.length; i++) {
            let x = 100 + i * 200; // Adjust as needed
            let y = this.game.canvas.height / 2 - 50; // Adjust as needed

            // Create a sprite for the ship using the texture from the corresponding ship in the array
            let ship = this.physics.add.sprite(x, y, ships[i].texture);

            // Store the name of the ship in the sprite
            ship.name = ships[i].name;

            // Create a button for the ship
            let button = this.add.text(x-25, y + ship.height / 7, ship.name, { fill: '#0f0' });
            button.setInteractive();

            // Add an event listener for the pointerdown event
            button.on('pointerdown', () => {
                this.scene.start('GameScene', { selectedShip: ship.name, shipName: this.shipName });
            });
        }
        
            // Create a text box at the top of the scene
            let title = this.add.text(this.cameras.main.centerX, 50, 'Select Your Ship', { 
                fontSize: '32px', 
                fill: '#fff',
                align: 'center'
            });
            title.setOrigin(0.5, 0.5); // This will center the text
    }
}