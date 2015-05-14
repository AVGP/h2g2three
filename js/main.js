var THREE = require('three'),
    World = require('three-world'),
    CSS3D = require('./css3d'),
    Animation = require('./animation'),
    OBJLoader = require('./objloader'),
    OBJMTLLoader = require('./objmtlloader'),
    WebcamTexture = require('./webcam-texture');

// Allow cross-origin texture loading
THREE.ImageUtils.crossOrigin = '';

var EDITOR_INITIAL_POS = new THREE.Vector3(0, 10, -50);

var cssRenderer = new CSS3D.Renderer(),
    cssScene    = new THREE.Scene(),
    onRender    = null;

cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
document.body.appendChild(cssRenderer.domElement);

// Editor

var editorElem = document.createElement("textarea"),
    editor3d = new CSS3D.Object3D(editorElem);

editorElem.id = "editor";
if(window.location.search != "") {
  var sample = window.location.search;
  if(sample.slice(-1) == '/') {
    sample = sample.slice(0, -1);
  }

  var xhr = new XMLHttpRequest();
  xhr.onload = function() { editorElem.textContent = this.responseText; };
  xhr.open("get", "samples/" + sample.substr(1) + ".js", true);
  xhr.send();
} else {
  editorElem.textContent = "// Setup your scene here\n\nonRender = function() {\n  // Updates to the scene go here\n};\n\n// Alt+T toggles editor\n// Alt+Return run the code";
}
editorElem.style.backgroundColor = "white";
editorElem.style.width  = "500px";
editorElem.style.height = "300px";
editorElem.style.opacity = "0.8";

editor3d.position.copy(EDITOR_INITIAL_POS);
editor3d.userData.enabled = true;
cssScene.add(editor3d);

// Stats

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

// Events

window.addEventListener('keydown', function(e) {
  if(!e.altKey) return;

  switch(e.keyCode) {
    case 13: // Return key
      clearScene();
      runCode();
      e.preventDefault();
      break;
    case 84: // "T"
    case 32: // space bar
      if(e.ctrlKey) {
        Animation.animate(editor3d, editor3d.position, {x: 0, y: 0, z: 0});
        break;
      }

      if(editor3d.userData.enabled) {
        Animation.animate(editor3d, {x: -400, y: -15, z: -50}, {x: 0, y: 115, z: 0});
      } else {
        Animation.animate(editor3d, EDITOR_INITIAL_POS, {x: 0, y: 0, z: 0});
      }
      editor3d.userData.enabled = !editor3d.userData.enabled;
      e.preventDefault();
      break;
  }
});

// Auxilliary

function clearScene() {
  var scene = World.getScene();
  for(var i=0; i<scene.children.length;i++) scene.remove(scene.children[i]);
}

function runCode() {
  var scene  = World,
  camera = World.getCamera();

  clearScene();
  eval(editorElem.value);
}

window.runCode = runCode;

function render() {
  stats.begin();
  cssRenderer.render(cssScene, World.getCamera());
  if(onRender) {
    onRender();
  }
  Animation.update();
  stats.end();
}

// Starting the world

World.init({camDistance: 500, renderCallback: render});
World.start();
console.log("Ready");
