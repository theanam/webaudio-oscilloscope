"use strict";
import * as _ct from "./tools/canvas_tools";
function Oscilloscope(audioContext, audioSource, canvasElement, audioDest = null, analyzerFFT = 2048, canvasInitFunction = null, drawingPrimerFunction = null){
        this.actx   = audioContext;
        this.FFT    = analyzerFFT;
        this.cvs    = canvasElement;
        this.init   = canvasInitFunction    || _ct._initCvs;
        this.primer = drawingPrimerFunction || _ct._primer;
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
        let {width = 300, height = 150} = this.cvs;
        this.WIDTH  = width;
        this.HEIGHT = height;
        this.u8ar = new Uint8Array(this.FFT);
        this.cctx = this.cvs.getContext("2d");
        this.init(this.cctx,this.WIDTH,this.HEIGHT);
        this.draw = () =>{
            if(!this.paused) requestAnimationFrame(this.draw);
            this.cctx.clearRect(0 , 0, this.WIDTH, this.HEIGHT);
            this.primer(this.cctx, this.WIDTH, this.HEIGHT);
            this.anl.getByteTimeDomainData(this.u8ar);
            _ct._drawRawOsc(this.cctx, this.u8ar, this.WIDTH, this.HEIGHT);
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
                this.cctx.clearRect(0 , 0, this.WIDTH, this.HEIGHT);
                this.primer(this.cctx, this.WIDTH, this.HEIGHT);
                _ct._drawRawOsc(this.cctx, this.u8ar, this.WIDTH, this.HEIGHT);
            });
        }
}

function createAudioContext(){
    return new (window.AudioContext || window.webkitAudioContext)();
}

function MediaStreamOscilloscope(mediaStream, canvasElement, audioDest = null, analyzerFFT = 2048, canvasInitFunction = null, drawingPrimerFunction = null){
    let ctx = createAudioContext();
    let src = ctx.createMediaStreamSource(mediaStream);
    return new Oscilloscope(ctx, src, canvasElement, audioDest, analyzerFFT, canvasInitFunction, drawingPrimerFunction);
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
    getUserMedia
}