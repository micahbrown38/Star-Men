class GameConfig {
    constructor() {
        this.config = {
            type: Phaser.AUTO, // Use WebGL if available, otherwise use Canvas
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 }
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };
    }

    getConfig() {
        return this.config;
    }
}

export default GameConfig;