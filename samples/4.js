// Let's try this, shall we?
var meshes = [];

// First: naive
/*
for(var x = -400; x < 400; x+= 15) {
  for(y = -200; y < 200; y+= 15) {
    for(var z = -30; z < 0; z += 15) {
      var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshBasicMaterial()
      );
      mesh.position.set(x, y, z);
      scene.add(mesh);
      meshes.push(mesh);
    }
  }
}
*/

// Second: Sharing
/*
var geometry = new THREE.BoxGeometry(10, 10, 10),
    material = new THREE.MeshBasicMaterial();

for(var x = -400; x < 400; x+= 15) {
  for(y = -200; y < 200; y+= 15) {
    for(var z = -30; z < 0; z += 15) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      meshes.push(mesh);
    }
  }
}
/**/

// Third: Buffer geometries :)
// Note: This example is JUST showing how they work
// The primitive THREE.*Geometry constructors use Buffers internally (sorta)

/*
var geometry = new THREE.BufferGeometry(),
    material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});

var vertexPositions = [
  // Front, lower triangle
  [-5,  5, 5],
  [ 5,  5, 5],
  [ 5, -5, 5],
  // Front, upper triangle
  [-5,  5, 5],
  [ 5, -5, 5],
  [-5, -5, 5],

  // Back, lower triangle
  [-5,  5, -5],
  [ 5,  5, -5],
  [ 5, -5, -5],
  // Back, upper triangle
  [-5,  5, -5],
  [ 5, -5, -5],
  [-5, -5, -5],

  // Top, lower triangle
  [-5, -5,  5],
  [ 5, -5, -5],
  [-5, -5, -5],
  // Top, upper triangle
  [-5, -5,  5],
  [ 5, -5,  5],
  [ 5, -5, -5],

  // Bottom, lower triangle
  [-5, 5,  5],
  [ 5, 5, -5],
  [-5, 5, -5],
  // Bottom, upper triangle
  [-5, 5,  5],
  [ 5, 5,  5],
  [ 5, 5, -5],

  // Left side, lower triangle
  [-5, -5,  5],
  [-5, -5, -5],
  [-5,  5, -5],
  // Left side, upper triangle
  [-5, -5,  5],
  [-5,  5, -5],
  [-5,  5,  5],

  // Right side, lower triangle
  [5, -5,  5],
  [5, -5, -5],
  [5,  5, -5],
  // Right side, upper triangle
  [5, -5,  5],
  [5,  5, -5],
  [5,  5,  5]
];

var vertices = new Float32Array(vertexPositions.length * 3);
for(var i = 0; i < vertexPositions.length; i++)
{
  vertices[ i*3 + 0 ] = vertexPositions[i][0];
  vertices[ i*3 + 1 ] = vertexPositions[i][1];
  vertices[ i*3 + 2 ] = vertexPositions[i][2];
}
geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );


for(var x = -400; x < 400; x+= 15) {
  for(y = -200; y < 200; y+= 15) {
    for(var z = -30; z < 0; z += 15) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      meshes.push(mesh);
    }
  }
}
/**/

var lightCenter = new THREE.PointLight(0xffffff);
lightCenter.position.set(0, 0, 200);
scene.add(lightCenter);

onRender = function() {
  for(var i=0; i<meshes.length;i++) {
    meshes[i].rotation.y += Math.PI / 500;
    meshes[i].rotation.x += Math.PI / 500;
  }
};
