import { createStarfield } from './starfield.js';
import ShipSelectionScene from './ShipSelectionScene.js';
import BackgroundStars from './backgroundStars.js';

class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
            this.backgroundStars = new BackgroundStars(this);
    }

    create() {
        this.game.data = new Phaser.Data.DataManager(this); // Create a new DataManager
        //this.cameras.main.setBackgroundColor('#008000'); // Set background color to green

        this.backgroundStars.create(); // Create the background stars
        //createStarfield(this);  // Create the starfield background

        this.cameras.main.setZoom(1); // Zoom out to see more of the world
            // Create an HTML input element
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'text';
    this.inputElement.placeholder = 'Name Your Ship...';
    this.inputElement.style.position = 'absolute';
    this.inputElement.style.top = '50%';
    this.inputElement.style.left = '50%';
    this.inputElement.style.transform = 'translate(-50%, -50%)';
    this.inputElement.style.border = '2px solid green'; // Set border color to green
    this.inputElement.style.backgroundColor = 'transparent'; // Set background color to transparent
    this.inputElement.style.padding = '0'; // Remove padding
    this.inputElement.style.outline = 'none'; // Remove outline
    this.inputElement.style.boxShadow = 'none'; // Remove box shadow
    this.inputElement.style.color = 'white'; // Set text color to white
    document.body.appendChild(this.inputElement);

    this.inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            let shipName = this.inputElement.value;

            this.inputElement.remove();
            this.buttonElement.remove();
            // Start the ShipSelectionScene and pass the ship name as data
            this.scene.start('ShipSelectionScene', { shipName: shipName });
        }
    });

    // Change the border color back to green when the input box loses focus
    this.inputElement.addEventListener('blur', () => {
        this.inputElement.style.border = '2px solid green'; // Change border color back to green
    });

        // Create an HTML button element
        this.buttonElement = document.createElement('button');
        this.buttonElement.textContent = 'Continue?';
        this.buttonElement.style.position = 'absolute';
        this.buttonElement.style.top = '53.6%'; // Position it below the input box
        this.buttonElement.style.left = '50%';
        this.buttonElement.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(this.buttonElement);

            // Start the game when the button is clicked
        this.buttonElement.addEventListener('click', () => {
            let shipName = this.inputElement.value;

            console.log(shipName);
            // Remove the input field and the button from the DOM
            this.inputElement.remove();
            this.buttonElement.remove();
            this.scene.start('ShipSelectionScene', { shipName: shipName });
        });

    }

    // Remove the input element when the scene is shut down
    shutdown() {
        this.inputElement.remove();
        this.buttonElement.remove();
        this.inputElement.remove();
        this.buttonElement.remove();
    }
}

export default StartScene;