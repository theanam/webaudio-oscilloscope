const DEFAULT_FILL   = "#2d3436";
const DEFAULT_STROKE = "#4cd137"; 
const HLINE_COLOR    = "#7f8c8d";
function _initCvs(ctx, width, height){
    ctx.fillStyle   = DEFAULT_FILL;
    ctx.strokeStyle = DEFAULT_STROKE;
}
function _primer(ctx, width, height){
    ctx.fillRect(0,0,width,height);
    ctx.strokeStyle = HLINE_COLOR;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.strokeStyle = DEFAULT_STROKE;
}
function _drawRawOsc(ctx,data,width,height){
    ctx.beginPath();
    for(let i=0; i < data.length; i++){
        let x = i * (width * 1.0 / data.length); // need to fix x
        let v = data[i] / 128.0;
        let y = v * height / 2;
        if(i === 0) ctx.moveTo(x,y);
        else ctx.lineTo(x,y);
    }
    ctx.stroke();
}
export {
    _initCvs,
    _primer,
    _drawRawOsc
}