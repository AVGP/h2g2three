var loader = new OBJMTLLoader();
var ship = undefined;

loader.load("models/FeisarShip.obj",
"models/FeisarShip.mtl", function(obj3d) {
  window.thing = obj3d;
  obj3d.scale.set(0.5, 0.5, 0.5);
  scene.add(obj3d);
  ship = obj3d;
});

var lightCenter = new THREE.PointLight(0xffffff);
lightCenter.position.set(0, 0, 200);
scene.add(lightCenter);

onRender = function() {
  if(ship) ship.rotation.y += Math.PI / 500;
}
