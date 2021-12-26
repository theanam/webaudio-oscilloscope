const DEFAULT_FILL   = "#111111";
const DEFAULT_STROKE = "#11ff11"; 
const HLINE_COLOR    = "#555555";
class Renderer{
    fillStyle = DEFAULT_FILL
    strokeStyle = DEFAULT_STROKE
    hlineColor = HLINE_COLOR
    constructor(canvasElement){
        this.cvs = canvasElement;
        let {width = 300, height = 150} = this.cvs;
        this.width = width;
        this.height = height;
        this.cctx = this.cvs.getContext("2d");
    }
    init(){
    }
    primer(){
        this.cctx.fillRect(0,0,this.width,this.height);
        this.cctx.strokeStyle = this.hlineColor;
        this.cctx.beginPath();
        this.cctx.moveTo(0, this.height / 2);
        this.cctx.lineTo(this.width, this.height / 2);
        this.cctx.stroke();
        this.cctx.strokeStyle = this.strokeStyle;
    }
    osc(data){
        this.cctx.beginPath();
        for(let i=0; i < data.length; i++){
            let x = i * (this.width * 1.0 / data.length); // need to fix x
            let v = data[i] / 128.0;
            let y = v * this.height / 2;
            if(i === 0) this.cctx.moveTo(x,y);
            else this.cctx.lineTo(x,y);
        }
        this.cctx.stroke();
    }
    reset(){
        this.cctx.clearRect(0 , 0, this.width, this.height);
    }
}
export {
    Renderer
}
