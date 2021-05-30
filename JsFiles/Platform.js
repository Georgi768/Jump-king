class Platform {
    constructor(scene) {
        this._scene = scene.physics.add.staticGroup();
        this._width = 0;
        this._hight = 0;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._hight;
    }

    set height(value) {
        this._hight = value;
    }

    get scene() {
        return this._scene;
    }

    set scene(value) {
        this._scene = value;
    }


}