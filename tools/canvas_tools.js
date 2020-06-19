function _initCvs(ctx, width, height){
    ctx.fillStyle   = "#000";
    ctx.strokeStyle = "#0f0";
}
function _primer(ctx, width, height){
    ctx.fillRect(0,0,width,height);
    let backupStroke = ctx.strokeStyle;
    ctx.strokeStyle = "#777";
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.strokeStyle = backupStroke;
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