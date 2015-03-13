var Tween = require('tween');

// Internals
function deg2rad(angle) {
  return (angle / 180) * Math.PI;
}

// Exports

module.exports = {
  animate: function(object, position, rotation) {
    var current = {
      position: {
        x: object.position.x,
        y: object.position.y,
        z: object.position.z,
      },
      rotation: {
        x: object.rotation.x,
        y: object.rotation.y,
        z: object.rotation.z,
      }
    };

    var target = {};

    if(position) target.position = position;
    if(rotation) {
      target.rotation = {
        x: deg2rad(rotation.x),
        y: deg2rad(rotation.y),
        z: deg2rad(rotation.z)
      };
    }

    var tweenPos = new Tween.Tween(current.position)
      .to(target.position, 500)
      .onUpdate(function() {
        object.position.set(current.position.x, current.position.y, current.position.z);
      }).start();

      var tweenRot = new Tween.Tween(current.rotation)
      .to(target.rotation, 500)
      .onUpdate(function() {
        object.rotation.set(current.rotation.x, current.rotation.y, current.rotation.z);
      }).start();

  },

  update: function() {
    Tween.update();
  }
};
