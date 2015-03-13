# three-livecoding-arena
A funky live coding environment for Three.js

## Using it
The easiest way to use it is [this online version](http://avgp.github.io/three-livecoding-arena).
Alternatively, you can clone the repository and open the `index.html` in your browser 
(or even better: [Use a static file server locally](https://gist.github.com/willurd/5720255))

The editor consists of a text field for your code and the WebGL scene in the background to display the result.
There's a few variables that are available for you to use:

1. `scene` - The scene that you'll be adding your objects to, if you want to display them.
2. `camera` - The camera that's gonna be your "eye" into the 3D scene.
3. `onRender` - A variable that you can a custom function to that will be called on every frame. Here's where the action will be.

### Example code

```javascript
// Setup your scene here
var box = new THREE.Mesh(
  new THREE.BoxGeometry(100, 100, 100),
  new THREE.MeshBasicMaterial()
);

scene.add(box);

onRender = function() {
  // Updates to the scene go here
  box.rotation.x += Math.PI / 100;
  box.rotation.y += Math.PI / 100;
  box.rotation.z += Math.PI / 100;
};
```

When you put that into the editor textbox and hit `ALT`+`Return`, the code will be run and you should see a spinning white cube.
You can also use `ALT+T` to toggle the editor and only see the scene.

## Hacking it
Clone the repository and run `npm install` to get all dependencies installed.
Then run `npm run dev` to have [watchify](https://github.com/substack/watchify) 
watch the `js/` folder and continuously bundle it as `app.js` when you change code.

Once you're done, you can use `npm run build` to get a minified build for deploying it somewhere.


## Contributing
You've found a bug? You're missing a feature? You think my code is horrible?
Neat! I'd be happy to discuss with you - don't hesitate to open an issue or create a pull request!

For pull requests, please fork the repository, create a new branch for your pull request, 
make your changes and create a pull request. I'm giving my best to quickly respond / review and merge your work.

Cheerio!

## License

This thingy is licenced under the ISC, dependencies might have different licenses.
