import { createAsteroid } from './createAsteroid.js';    
    
    function createAsteroidClusters(x, y, size) {  
    // Create several asteroids
    this.asteroids = [];

    // Define the number of clusters and the number of asteroids per cluster
    let numClusters = 200;
    let asteroidsPerCluster = 20;

    for (let i = 0; i < numClusters; i++) {
        // Choose a random position for the center of the cluster
        let clusterX = Phaser.Math.Between(-270, 5750);
        let clusterY = Phaser.Math.Between(-171, 5750);

        for (let j = 0; j < asteroidsPerCluster; j++) {
            // Choose a random position near the center of the cluster for the asteroid
            let x = Phaser.Math.Between(clusterX - 100, clusterX + 100);
            let y = Phaser.Math.Between(clusterY - 100, clusterY + 100);

            // Check if the position is too close to the ship's starting position
            //let distance = Phaser.Math.Distance.Between(x, y, ship.x, ship.y);
           // if (distance < 100) {  // Adjust this value as needed
            //    continue;  // Skip this iteration and move on to the next one
            //}

            // Choose a random size for the asteroid
            let size = Phaser.Math.Between(20, 40);

            // Create the asteroid and set its velocity and rotation
            const asteroid = createAsteroid.call(this, x, y, size);
            asteroid.setAngularVelocity(Phaser.Math.Between(-100, 100));  // Set random rotation

            this.asteroids.push(asteroid);
        }
    }
}

export { createAsteroidClusters };