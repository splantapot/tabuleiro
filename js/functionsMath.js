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

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};
  
Array.prototype.min = function() {
    return Math.min.apply(null, this);
};
