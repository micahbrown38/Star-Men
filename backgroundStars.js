class BackgroundStars {
    constructor(scene) {
        this.scene = scene;
        this.stars = [];
        this.largerStars = [];
    }

    create() {
        const width = this.scene.cameras.main.width;
        const height = this.scene.cameras.main.height;
    
        this.graphics = this.scene.add.graphics();
    
        for (let i = 0; i < 1000; i++) {
            let x = Phaser.Math.Between(0, width);
            let y = Phaser.Math.Between(0, height);
            let alpha = Phaser.Math.FloatBetween(0.5, 1); // Add an alpha value for each star
            this.stars.push({ x, y, alpha });
        }
        for (let i = 0; i < 50; i++) {
            let x = Phaser.Math.Between(0, width);
            let y = Phaser.Math.Between(0, height);
            let alpha = Phaser.Math.FloatBetween(0.5, 1); // Add an alpha value for each star
            this.largerStars.push({ x, y, alpha });
        }
    
        this.drawStars();
    }

    update(shipSpeed) {
        const camera = this.scene.cameras.main;
        const width = camera.width;
        const height = camera.height;

        // Update position of existing stars
        this.stars.forEach(star => {
            star.x -= shipSpeed;
            if (star.x < camera.scrollX) {
                star.x += width;
                star.y = Phaser.Math.Between(camera.scrollY, camera.scrollY + height);
            }
        });

        // Update position of larger stars
        this.largerStars.forEach(star => {
            star.x -= shipSpeed;
            if (star.x < camera.scrollX) {
                star.x += width;
                star.y = Phaser.Math.Between(camera.scrollY, camera.scrollY + height);
            }
    });

    this.drawStars();
}

    resize() {
        const width = this.scene.cameras.main.width;
        const height = this.scene.cameras.main.height;

        this.stars.forEach(star => {
            star.x = Phaser.Math.Between(0, width);
            star.y = Phaser.Math.Between(0, height);
        });

        this.drawStars();
    }

    drawStars() {
    this.graphics.clear();
    this.stars.forEach(star => {
        this.graphics.fillStyle(0xffffff, star.alpha); // Use the alpha value when drawing the star
        this.graphics.fillPoint(star.x, star.y, 1);
    });
    this.largerStars.forEach(star => {
        this.graphics.fillStyle(0xffffff, star.alpha); // Use the alpha value when drawing the star
        this.graphics.fillRect(star.x + 1, star.y - 1, 1, 4); // Draw a vertical line to form a cross
        this.graphics.fillRect(star.x - 1, star.y + 1, 4, 1); 
    });
    }
}

export default BackgroundStars;