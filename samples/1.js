var mesh = new THREE.Mesh(
  new THREE.BoxGeometry(100, 100, 100),
  new THREE.MeshBasicMaterial()
);

scene.add(mesh);

onRender = function() {
  mesh.rotation.y += Math.PI / 500;
  mesh.rotation.x += Math.PI / 500;
};
