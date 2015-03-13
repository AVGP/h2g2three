var geometry   = new THREE.Geometry(),
    material   = new THREE.PointCloudMaterial({size: 5}),
    pointCloud = new THREE.PointCloud(geometry, material);

var NUM_PARTICLES = 10000;

pointCloud.sortParticles = true;

for(var i=0;i<NUM_PARTICLES;i++) {
  var vector = new THREE.Vector3(
    -500 + Math.random() * 1000,
    -250 + Math.random() * 500,
    -250 + Math.random() * 500
  );
  vector.velocity = {
    x: -1 + Math.random() * 2,
    y: -1 + Math.random() * 2,
    z: -1 + Math.random() * 2
  };
  geometry.vertices.push(vector);
}

scene.add(pointCloud);

onRender = function() {
  for(var i=0;i<NUM_PARTICLES;i++) {
    geometry.vertices[i].y += geometry.vertices[i].velocity.y;
    geometry.vertices[i].x += geometry.vertices[i].velocity.x;
    geometry.vertices[i].z += geometry.vertices[i].velocity.z;

    // check bounds & reset
    if(geometry.vertices[i].x < -500 || geometry.vertices[i].x > 500 ||
       geometry.vertices[i].y < -250 || geometry.vertices[i].y > 250 ||
       geometry.vertices[i].z < -250 || geometry.vertices[i].z > 250) {
         geometry.vertices[i].x = -500 + Math.random() * 1000;
         geometry.vertices[i].y = -250 + Math.random() * 500;
         geometry.vertices[i].z = -250 + Math.random() * 500;
         geometry.vertices[i].velocity.x = -1 + Math.random() * 2;
         geometry.vertices[i].velocity.y = -1 + Math.random() * 2;
         geometry.vertices[i].velocity.z = -1 + Math.random() * 2;
    }
  }
}
