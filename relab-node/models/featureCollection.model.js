module.exports = class FeatureCollection {
    constructor(index, geometry) {
        this.type = "FeatureCollection";
        this.features = [];
    }
}