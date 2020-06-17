# Web Audio Oscilloscope

A highly customizable oscilloscope for web Audio that supports any source supported by the browser, and renders on a HTML5 canvas. 

[Try it yourself](https://theanam.github.io/webaudio-oscilloscope/)

### Installation
```bash
yarn add webaudio-oscilloscope
```

or Include the JavaScript file from: 

```html
<script src="https://unpkg.com/webaudio-oscilloscope@1.3.3/dist/index.js"></script>
```

### Example use: 
First create a canvas element in your page: 
```html
<canvas class="osc" width="120px" height="80px">
<button class="start">Start</button>
```
In your JavaScript File:

```js
import Oscilloscope from "webaudio-oscilloscope"
    function startOsc(){
        /* wrap the whole thing in Try catch so that all the
        errors, failure, unsupported API can be handled once.
        */
        try{
            let ctx = new AudioContext();
            let cvs = document.querySelector(".osc");
            navigator.mediaDevices.getUserMedia({audio: true})
                .then(stream=>{
                    // Works with any supported source
                    let src = ctx.createMediaStreamSource(stream);
                    let osc = new Oscilloscope(ctx, cvs, src);
                    osc.start();
                });
            }
        catch(e){
            console.log("Could not initialize Oscilloscope");
        }
    }
    /* Do not start oscilloscope before any user interaction.
    It will fail*/
    document.querySelector(".start").addEventListener("click",startOsc);
```

## Reference: 

Constructor: 

```js
 new Oscilloscope(AudioContext, Canvas, AudioSource, AudioDestination, [fft, init,primer])
```

Argument | Required | Default | Description |
---------|----------| --------|-------------|
audioContext | true | null    | The Audio Context to use. [See MDN](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)|
Canvas | true | null | The canvas to render the Oscilloscope in|
AudioSource | true | null | The Audio Source to listen to. [See MDN](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)|
Audio Destination | false | null | The Node to pass the output to. e.g destination or any additional node|
fft | false | 2048 | The fft size for the AnalyserNode. The larger the number the smoother the graph the more resource it will consume|
init | false | null | Function to run on the canvas before starting to draw. Gets called only once before starting the drawing Cycle. See below for details|
primer | false | null | The function that gets caled before every render cycle. Useful for stying the Output| 

### Oscilloscope Methods: 

#### start(): 
Starts the oscilloscope. Does not take any arguments. 

#### pause(): 
Pauses the Oscilloscope on the last frame. Paused Oscilloscope can be started using the `start()` method. Does not take any arguments.

#### reset():
Resets the oscilloscope canvas. Does not take any arguments. Reset oscilloscope can be started using the `start()` function.


### Changing the look and feel: 

This directly relate to the *highly customizable* claim in the title. If you know your way around [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), You'll feel at home. 

The Oscilloscope can be customized by using, the `init` and `primer` arguments in the constructor. If you need one of the two, just pass `null` for the other one. It will be ignored.

#### init() [Function]: 
You can create a function like the one below and pass it in the constructor. In fact this is the default init function. You can do stuff like setting the default fill and stroke colors,setting line width etc. For example, to set the fill and stroke style of the canvas: 

```js
function init(context, width, height){
    ctx.fillStyle   = "#000";
    ctx.strokeStyle = "#0f0";
}
```

#### primer() [Function]:
This function gets called before every render. If you need to draw anything (a graph or maybe some values), you can do it here. For example: the default primer function fills the background with the default fill color(black):

```js
function primer(ctx, width, height){
    ctx.fillRect(0,0,width,height);
}
```

both The function exacly gets 3 arguments, `context` (The canvas rendering context), `width` (the canvas width), `height` (the canvas height). You don't need to worry where these values will come from, just assume that they will be available in the function context.

## Plugins

You can write plugin for this using the `init` and `primer` functions. 

## Contributing:

Feel free to contribute by creating custom plugins for oscilloscopes (init and primer duo) or contribute by creating new styles of Oscilloscopes. 

Made with 🖤 and JS.