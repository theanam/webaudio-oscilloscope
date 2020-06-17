import * as _ct from "./tools/canvas_tools";
export default class AudioOSC{
    #actx    = null;
    #cctx    = null;
    #anl     = null;
    #cvs     = null;
    #paused  = false;
    #WIDTH   = 300;
    #HEIGHT  = 150;
    #FFT     = 2048;
    #u8ar    = null;
    #init    = null;
    #primer  = null;
    constructor(ctx, cvs, source, dest = null, fft = 2048, init = _ct._initCvs, primer = _ct._primer){
        this.#actx   = ctx;
        this.#FFT    = fft;
        this.#cvs    = cvs;
        this.#init   = init;
        this.#primer = primer;
        this.#anl    = this.#actx.createAnalyser();
        // Configure Analyzer
        this.#anl.fftSize = this.#FFT;
        source.connect(this.#anl);
        if(dest) this.#anl.connect(dest);
        // Set up Canvas
        let {width = 300, height = 150} = this.#cvs;
        this.#WIDTH  = width;
        this.#HEIGHT = height;
        this.#u8ar = new Uint8Array(this.#FFT);
        this.#cctx = this.#cvs.getContext("2d");
        this.#init(this.#cctx,this.#WIDTH,this.#HEIGHT);
    }
    draw = () =>{
        if(!this.#paused) requestAnimationFrame(this.draw);
        this.#cctx.clearRect(0 , 0, this.#WIDTH, this.#HEIGHT);
        this.#primer(this.#cctx, this.#WIDTH, this.#HEIGHT);
        this.#anl.getByteTimeDomainData(this.#u8ar);
        _ct._drawRawOsc(this.#cctx, this.#u8ar, this.#WIDTH, this.#HEIGHT);
    }
    start = () => {
        this.#paused = false;
        this.draw();
    }
    pause = () =>{
        this.#paused = true;
    }
    reset = () =>{
        this.#u8ar = new Uint8Array().fill(0);
        this.#cctx.clearRect(0 , 0, this.#WIDTH, this.#HEIGHT);
        this.#primer(this.#cctx, this.#WIDTH, this.#HEIGHT);
        _ct._drawRawOsc(this.#cctx, this.#u8ar, this.#WIDTH, this.#HEIGHT);
    }
}