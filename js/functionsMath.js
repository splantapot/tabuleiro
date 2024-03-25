function toDeg(rad) {
    rad *= 180/Math.PI;
    return rad;
}

function toRad(deg) {
    deg *= Math.PI/180;
    return deg;
}

function rngNum(interval) {
    interval *= Math.random();
    return (Math.floor(interval))
}