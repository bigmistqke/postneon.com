export default class RayCastManager {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.cursor = new THREE.Vector2();
    }
    getIntersects(point) {
        this.cursor.set((point.x * 2) - 1, -(point.y * 2) + 1);
        this.raycaster.setFromCamera(mouse, camera);
        return raycaster.intersectObjects(objects);
    }
}