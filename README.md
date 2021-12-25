# Web Audio Oscilloscope

A highly customizable oscilloscope for web Audio that supports any source supported by the browser,
with a provided renderer drawing on a HTML5 canvas. 

![Imgur](https://i.imgur.com/df8zx4v.gif)


## ✨[Try The Live Demo](https://theanam.github.io/webaudio-oscilloscope/)

> If you are using v3 or older and planning to move to v4, the
> constructor changes significantly.
> There also was a little bit of change to the constructor from v1 to
> v2.

### Installation
```bash
yarn add webaudio-oscilloscope
```

Or you can link this file in your HTML:

```html
<script src="https://unpkg.com/webaudio-oscilloscope@3.2.1/dist/index.js"></script>
```
If you include the script in your HTML file, you'll get a global object called `_osc`. You can acces the functionalities like: `_osc.Oscilloscope`.

### Example use: 
First create a canvas element in your page: 
```html
<canvas class="osc" width="120px" height="80px">
<button class="start">Start</button>
```
In your JavaScript File:

```js
import {
    Oscilloscope, createAudioContext, getUserMedia, Renderer
} from "webaudio-oscilloscope";
function startOsc(){
    let ctx = createAudioContext();
    let cvs = document.querySelector(".osc");
    let renderer = Renderer(cvs);
    getUserMedia({audio: true})
        .then(stream=>{
            // Works with any supported source
            let src = ctx.createMediaStreamSource(stream);
            let osc = new Oscilloscope(ctx, src, renderer);
            osc.start();
        });
}
document.querySelector(".start").addEventListener("click",startOsc);
```

*This package has an utility function, `createAudioContext` to create an audio context (to avoid dealing with `createAudioContext` and `webkitCreateAudioContext` variations)*

> This package also has an utility function `getUSerMedia` that resolves with a Media stream, or resolves with a `null`. This deals with the different variations and prefixed versions of the `getUserMedia` API. 

#### Since Creating *Oscilloscope from `mediaStream`*  is a very common user case, There's a shorthand function for this.The above code can also be written like:

```js
import {MediaStreamOscilloscope, Renderer} from "webaudio-oscilloscope";
function startOsc(){
    let cvs = document.querySelector(".osc");
    let renderer = Renderer(cvs);
    navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream=>{
            let osc = new MediaStreamOscilloscope(stream, renderer);
            osc.start();
        });
}
document.querySelector(".start").addEventListener("click",startOsc);
```

## Reference: 

### Constructor: 

```js
import {Oscilloscope} from "webaudio-oscilloscope";
 new Oscilloscope(AudioContext, AudioSource, Renderer, [AudioDestination, fft]);
```

Argument | Required | Default | Description |
---------|----------| --------|-------------|
audioContext | true | null    | The Audio Context to use. [See MDN](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)|
AudioSource | true | null | The Audio Source to listen to. [See MDN](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)|
Renderer | true | null | Renderer for the Oscilloscope, e. g. to render it in a HTML5 canvas|
Audio Destination | false | null | The Node to pass the output to. e.g destination or any additional node|
fft | false | 2048 | The fft size for the AnalyserNode. The larger the number the smoother the graph the more resource it will consume|
init | false | null | Function to run on the canvas before starting to draw. Gets called only once before starting the drawing Cycle. See below for details|
primer | false | null | The function that gets caled before every render cycle. Useful for stying the Output| 

### Oscilloscope from Media Stream:
It's a common use case to create Oscilloscope from Media Stream, Hence, there's a short form.
```js
import {MediaStreamOscilloscope} from "webaudio-oscilloscope";
new MediaStreamOscilloscope(mediaStream, Renderer, [AudioDestination, fft]);
```
This function takes a `mediaStream` object instead of an `audioContext` and `audioSource`, the rest of the parameters are the same. This also produces an `Oscilloscope` instance.

### Oscilloscope Methods: 

#### start(): 
Starts the oscilloscope. Does not take any arguments. Running start on an already running Oscilloscope does not have any effect.

#### pause(): 
Pauses the Oscilloscope on the last frame. Paused Oscilloscope can be started using the `start()` method. Does not take any arguments. This does not affect the media source. Just pauses the Oscilloscope.

#### reset():
Resets the oscilloscope canvas. Does not take any arguments. Reset oscilloscope can be started using the `start()` function. Does not affect the media source.

### Changing the look and feel: 

This directly relate to the *highly customizable* claim in the title. If you know your way around [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), You'll feel at home. 

The Oscilloscope can be customized by either
* extending the provided `Renderer` and customizing the `init`, `primer`
  and `osc` methods or
* writing your own renderer from scratch (you aren’t even required to
  use a HTML5 Canvas in that case).

#### Renderer constructor:

The provided renderer class is constructed with just one argument:

Argument | Required | Default | Description |
---------|----------| --------|-------------|
CanvasElement | true | null | The HTML5 canvas element to render the Oscilloscope in|

#### init() [Function]: 

> If you need to do some initialization at the end of the Oscilloscope
> instantiation (just once), you can provide a custom `init` method.
> Oscilloscope background is filled with the `fillStyle` property of the
> canvas 2d context, and `strokeStyle` property affects the graph color.

You can create a custom renderer like the one below and pass it in the
constructor.
You can do stuff like setting the default fill and stroke colors,setting line width etc. For example, to set the fill and stroke style of the canvas:

```js
class CustomRenderer extends Renderer{
    init(){
        this.fillStyle   = "#000";
        this.strokeStyle = "#0f0";
    }
}
// Then Initiate the Oscilloscope like this:
const customRenderer = new CustomRenderer(cvs);
new Oscilloscope(AudioContext, AudioSource, customRenderer, AudioDestination, 2042);
```

For this simple task you can of course likewise just set those
attributes:

```js
class CustomRenderer extends Renderer{
    fillStyle   = "#000"
    strokeStyle = "#0f0"
}
```

#### primer() [Function]:
This function gets called before every render. If you need to draw anything (a graph or maybe some values), you can do it here. For example: the default primer function fills the background with the default fill color(black):

```js
class CustomRenderer extends Renderer{
    primer(){
        self.cctx.fillRect(0,0,width,height);
    }
}
```
For example: If you want to render your oscilloscope on a graph, try this primer function: 
```js
class FancyGraphRenderer extends Renderer{
    primer(){
        this.cctx.strokeStyle = "#444";
        this.cctx.fillRect(0,0,this.width,this.height);
        this.cctx.beginPath();
        for(let i=0; i<this.width; i+=10){
            this.cctx.moveTo(i,0);
            this.cctx.lineTo(i,this.height);
        }
        for(let j=0; j<this.height; j+=10){
            this.cctx.moveTo(0,j);
            this.cctx.lineTo(this.width,j);
        }
        this.cctx.stroke();
        this.cctx.strokeStyle = this.strokeStyle;
    }
}
```
Both functions can access the renderer attributes, `cctx` (The canvas rendering context), `width` (the canvas width), `height` (the canvas height). You don't need to worry where these values will come from, just assume that they will be available in the function context.

## Contributing:
This package is released under the MIT license Feel free to contribute.

Made with 🖤 and JS.