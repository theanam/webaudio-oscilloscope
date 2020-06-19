import Oscilloscope from "../index";
function startOsc(){
    let ctx = new AudioContext();
    let cvs = document.querySelector(".cvs");
    navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream=>{
            let src = ctx.createMediaStreamSource(stream);
            let osc = new Oscilloscope(ctx, cvs, src, null, 2048);
            osc.start();
            document.querySelector(".btn.pause").addEventListener("click",osc.pause);
            document.querySelector(".btn.reset").addEventListener("click",osc.reset);
        });
}
document.querySelector(".start").addEventListener("click",startOsc);