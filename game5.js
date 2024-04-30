/*import Phaser from 'phaser';
import GameConfig from './gameConfig.js';
import Ship from './ship.js';
import Bullet from './bullet.js';
import Asteroid from './asteroid.js';
import Star from './star.js';

class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.ship = null;
        this.bullets = null;
        this.asteroids = null;
        this.stars = null;
    }

    preload() {
        this.ship = new Ship(this);
        this.bullets = new Bullet(this);
        this.asteroids = new Asteroid(this);
        this.stars = new Star(this);

        this.ship.preload();
        this.bullets.preload();
        this.asteroids.preload();
        this.stars.preload();
    }

    create() {
        this.ship.create();
        this.bullets.create();
        this.asteroids.create();
        this.stars.create();
    }

    update() {
        this.ship.update();
        this.bullets.update();
        this.asteroids.update();
        this.stars.update();
    }
}

export default Game;
*/