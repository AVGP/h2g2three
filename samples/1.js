var mesh = new THREE.Mesh(
  new THREE.BoxGeometry(100, 100, 100),
  new THREE.MeshBasicMaterial()
);

scene.add(mesh);

var lightLeft = new THREE.PointLight(0xff0000);
lightLeft.position.set(-100, 0, 0);
scene.add(lightLeft);

var lightRight = new THREE.PointLight(0x00ff00);
lightRight.position.set(100, 0, 0);
scene.add(lightRight);

var lightCenter = new THREE.PointLight(0xffffff);
lightCenter.position.set(0, 0, 200);
scene.add(lightCenter);

var lightTop = new THREE.PointLight(0x0000ff);
lightTop.position.set(0, 100, 0);
scene.add(lightTop);

var lightBottom = new THREE.PointLight(0xffff00);
lightBottom.position.set(0, -100, 0);
scene.add(lightBottom);


onRender = function() {
  mesh.rotation.y += Math.PI / 500;
  mesh.rotation.x += Math.PI / 500;
};
