var THREE = require('three'),
    World = require('three-world'),
    CSS3D = require('./css3d'),
    Animation = require('./animation'),
    OBJLoader = require('./objloader'),
    OBJMTLLoader = require('./objmtlloader'),
    WebcamTexture = require('./webcam-texture');

var EDITOR_INITIAL_POS = new THREE.Vector3(0, 10, -50);

var cssRenderer = new CSS3D.Renderer(),
cssScene    = new THREE.Scene();

cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
document.body.appendChild(cssRenderer.domElement);

// Adding the editor
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

window.addEventListener('keyup', function(e) {
  if(!e.altKey) return;

  switch(e.keyCode) {
    case 13: // Return key
      clearScene();
      runCode();
      e.preventDefault();
      break;
    case 84: // "T"
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

editor3d.position.copy(EDITOR_INITIAL_POS);
editor3d.userData.enabled = true;
cssScene.add(editor3d);

function clearScene() {
  var scene = World.getScene();
  for(var i=0; i<scene.children.length;i++) scene.remove(scene.children[i]);
}

World.init({camDistance: 500, renderCallback: render});

//var loader = new OBJMTLLoader();

var onRender = null;

function runCode() {
  var scene  = World,
      camera = World.getCamera();

  clearScene();
  eval(editorElem.value);
}


function render() {
  cssRenderer.render(cssScene, World.getCamera());
  if(onRender) {
    onRender();
  }
  Animation.update();
}

World.start();
console.log("Ready");
