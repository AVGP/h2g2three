new WebVRPolyfill();

var vrEffect   = new VREffect(renderer),
    vrControls = new VRControls(),
    vrManager  = new WebVRManager(vrEffect);

var canvas = renderer.domElement;
vrEffect.setSize(canvas.width, canvas.height);

var box = new THREE.Mesh(
  new THREE.BoxGeometry(100, 100, 100),
  new THREE.MeshBasicMaterial()
);
scene.add(box);

onRender = function() {
  box.rotation.y += Math.PI / 200;
  if(vrManager.isVRMode()) {
    vrControls.update();
    vrEffect.render(scene, camera);
    return false;
  }
};
