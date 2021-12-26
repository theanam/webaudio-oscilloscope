"use strict";
import {Renderer} from "./tools/canvas_tools";

function Oscilloscope(audioContext, audioSource, renderer, audioDest = null, analyzerFFT = 2048){
        this.actx   = audioContext;
        this.FFT    = analyzerFFT;
        this.renderer = renderer;
        this.paused = false;
        this.anl    = this.actx.createAnalyser();
        this.ctx    = audioContext;
        this.src    = audioSource;
        this.dest   = audioDest;
        // Configure Analyzer
        this.anl.fftSize = this.FFT;
        this.src.connect(this.anl);
        if(this.dest) this.anl.connect(this.dest);
        // Set up Canvas
        this.u8ar = new Uint8Array(this.FFT);
        this.renderer.init();
        this.draw = () =>{
            if(!this.paused) requestAnimationFrame(this.draw);
            this.renderer.reset();
            this.renderer.primer();
            this.anl.getByteTimeDomainData(this.u8ar);
            this.renderer.osc(this.u8ar);
        }
        this.start = () => {
            this.paused = false;
            this.draw();
        }
        this.pause = () =>{
            this.paused = true;
        }
        this.reset = () =>{
            this.paused = true;
            requestAnimationFrame(()=>{
                this.u8ar = new Uint8Array(this.FFT).fill(0);
                this.renderer.reset();
                this.renderer.primer();
                this.renderer.osc(this.u8ar);
            });
        }
}

function createAudioContext(){
    return new (window.AudioContext || window.webkitAudioContext)();
}

function MediaStreamOscilloscope(mediaStream, renderer, audioDest = null, analyzerFFT = 2048){
    let ctx = createAudioContext();
    let src = ctx.createMediaStreamSource(mediaStream);
    return new Oscilloscope(ctx, src, renderer, audioDest, analyzerFFT, renderer);
}

function getUserMedia(constraints){
    return new Promise((resolve)=>{
        if(navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia(constraints).then(resolve).catch(()=>resolve(null));
        }
        else if(navigator.getUserMedia){
            navigator.getUserMedia(constraints, resolve, ()=>resolve(null));
        }
        else if(navigator.webkitGetUserMedia){
            navigator.webkitGetUserMedia(constraints, resolve, ()=>resolve(null));
        }
        else if(navigator.mozGetUserMedia){
            navigator.mozGetUserMedia(constraints, resolve, ()=>resolve(null));
        }
        else resolve(null);
    });
}
export {
    Oscilloscope,
    MediaStreamOscilloscope,
    createAudioContext,
    getUserMedia,
    Renderer
}
