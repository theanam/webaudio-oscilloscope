import {MediaStreamOscilloscope} from "../dist/index";
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
function startOsc(){
    let cvs = document.querySelector(".cvs");
    navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream=>{
            let osc = new MediaStreamOscilloscope(stream, cvs, null, 2048, null, fancyGraph);
            osc.start();
            document.querySelector(".btn.pause").addEventListener("click",osc.pause);
            document.querySelector(".btn.reset").addEventListener("click",osc.reset);
        });
}
document.querySelector(".start").addEventListener("click",startOsc);