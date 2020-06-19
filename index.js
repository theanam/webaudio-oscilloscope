"use strict";
import * as _ct from "./tools/canvas_tools";
export default function(ctx, cvs, source, dest = null, fft = 2048, init = null, primer = null){
        this.actx   = ctx;
        this.FFT    = fft;
        this.cvs    = cvs;
        this.init   = init   || _ct._initCvs;
        this.primer = primer || _ct._primer;
        this.paused = false;
        this.anl    = this.actx.createAnalyser();
        // Configure Analyzer
        this.anl.fftSize = this.FFT;
        source.connect(this.anl);
        if(dest) this.anl.connect(dest);
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