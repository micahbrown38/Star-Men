class Attributes {
    constructor(scene) {
        this.scene = scene;
        this.attributes = {
            shooting: {
                level: 0,
                xp: 0,
                xpToLevel: 300
            }
            // Add more attributes here...
        };
    }

    addXP(attributeName, amount) {
        let attribute = this.attributes[attributeName];
        if (attribute) {
            attribute.xp += amount;
            if (attribute.xp >= attribute.xpToLevel) {
                attribute.xp -= attribute.xpToLevel;
                attribute.level++;

                // Show level up text
                this.scene.showLevelUp(attributeName + ' leveled up!', this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2);
            } else {
                // Show XP gain text
                this.scene.showLevelUp('+' + amount + ' XP', this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2);
            }
        }
    }

    // ... rest of your code ...

    showLevelUp(text, x, y) {
        let levelUpText = this.add.text(x, y, text, { fontSize: '32px', fill: '#00ff00' });
        levelUpText.setScrollFactor(0);
        levelUpText.setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: levelUpText,
            y: y - 100,
            alpha: 0,
            duration: 2000,
            ease: 'Power2',
            onComplete: function () {
                levelUpText.destroy();
            }
        });
    }
}

export default Attributes; 