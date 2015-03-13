var geo = new THREE.BoxGeometry(100, 100, 100);
var mesh1 = new THREE.Mesh(geo, new THREE.MeshBasicMaterial());
mesh1.position.set(-150, 0, 0);

var mesh2 = new THREE.Mesh(geo, new THREE.MeshLambertMaterial());

var mesh3 = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
  shininess: 100,
  metal: true
}));
mesh3.position.set(150, 0, 0);

scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);

var lightLeft = new THREE.PointLight(0xff0000);
lightLeft.position.set(-150, 0, 200);
scene.add(lightLeft);

var lightRight = new THREE.PointLight(0x00ff00);
lightRight.position.set(150, 0, 200);
scene.add(lightRight);

var lightCenter = new THREE.PointLight(0xffffff);
lightCenter.position.set(0, 0, 200);
scene.add(lightCenter);

onRender = function() {
  mesh1.rotation.y += Math.PI / 500;
  mesh2.rotation.y += Math.PI / 500;
  mesh3.rotation.y += Math.PI / 500;
};
