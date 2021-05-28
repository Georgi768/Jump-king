class Platform
{
    constructor(scene) {
        this._scene = scene.physics.add.staticGroup();
    }

    get scene() {
        return this._scene;
    }

    set scene(value) {
        this._scene = value;
    }
}