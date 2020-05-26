export class Animation {
    constructor(loader) {
        this.loader = loader
        this.grid = loader.mesh.grid
    }

    createNoise() {
        this.grid.geometry.vertices.forEach(vertice => {
            vertice.z += (Math.floor(Math.random() * 201) - 100) / 2000
        });
        this.grid.geometry.verticesNeedUpdate = true;
    }

    update = () => {
        this.createNoise()
        this.grid.rotation.y += 0.01
    }
}