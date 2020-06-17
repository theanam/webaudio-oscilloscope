import AudioOSC from "../index";
let osc = null;
function fancyGraph(ctx,width,height){
    let backstrokeStyle = ctx.strokeStyle;
    ctx.strokeStyle = "#444";
    ctx.fillRect(0,0,width,height);
    ctx.beginPath();
    for(let i=0; i<width; i+=10){
        ctx.moveTo(i,0);
        ctx.lineTo(i,height);
    }
    for(let j=0; j<height; j+=10){
        ctx.moveTo(0,j);
        ctx.lineTo(width,j);
    }
    ctx.stroke();
    ctx.strokeStyle = backstrokeStyle;
}
function init(){
    let ctx = new AudioContext();
    let cvs = document.querySelector(".cvs");
    navigator.mediaDevices.getUserMedia({audio: true, video: true})
        .then(stream=>{
            let _streamSrc = ctx.createMediaStreamSource(stream);
            osc            = new AudioOSC(ctx, cvs, _streamSrc,null,2048,null,fancyGraph);
            osc.start();
            document.querySelector(".btn.pause").addEventListener("click",osc.pause);
            document.querySelector(".btn.reset").addEventListener("click",osc.reset);
        });
}

document.querySelector(".btn.start").addEventListener("click",init);