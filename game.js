import StartScene from './StartScene.js';
import ShipSelectionScene from './ShipSelectionScene.js';
import GameScene from './GameScene.js';
import getConfig from './config.js';

// calling the config code from config.js
var game = new Phaser.Game(getConfig(StartScene, ShipSelectionScene, GameScene));

function preload() {
}

function create() {
}

function update() {
}