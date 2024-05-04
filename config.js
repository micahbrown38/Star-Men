export default function getConfig(StartScene, ShipSelectionScene, GameScene) {
    return {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 } // Set gravity to 0
            //debug: true // Enable debug mode
        }
    },
    scene: [StartScene, ShipSelectionScene, GameScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};
}