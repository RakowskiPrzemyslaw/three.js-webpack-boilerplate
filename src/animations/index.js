export class Animation {
    constructor(loader) {
        this.grid = loader.mesh.grid
        this.cube = loader.mesh.cube
    }

    createNoise() {
        this.grid.geometry.vertices.forEach(vertice => {
            vertice.z += (Math.floor(Math.random() * 201) - 100) / 2000
        });
        this.grid.geometry.verticesNeedUpdate = true;
    }

    update = () => {
        this.cube.material.uniforms.u_time.value += 0.05;

        this.createNoise()
        this.grid.rotation.y += 0.01
    }
}