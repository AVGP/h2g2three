// Setup your scene here

World.getRenderer().shadowMapEnabled = true

var box = new THREE.Mesh(
  new THREE.BoxGeometry(100, 100, 100),
  new THREE.MeshLambertMaterial()
)
box.position.set(100, 0, 0)
box.receiveShadow = true
box.castShadow = true

var smallBox = new THREE.Mesh(
  new THREE.BoxGeometry(20, 20, 20),
  new THREE.MeshLambertMaterial()
);
smallBox.castShadow = true
smallBox.receiveShadow = true
smallBox.position.set(20, 0, 150)

scene.add(smallBox)

var light = new THREE.SpotLight(0xffffff,2)
light.position.set(0, 0, 200)
light.castShadow = true
scene.add(light)
scene.add(box)

onRender = function() {
  // Updates to the scene go here
  box.rotation.y += Math.PI / 200
};

// Alt+T toggles editor
// Alt+Return run the code
