// import enableInlineVideo from 'iphone-inline-video';


let ctx;
let context;


let video = document.createElement("video");
video.setAttribute("loop", "");
video.volume = 0;
video.setAttribute("playsinline", "true");
// enableInlineVideo(video);

let source = document.createElement("source");
// source.src = url;

let dataURL;


addEventListener('message', e => {
    switch (e.data.topic) {
        case 'url':
            source.src = e.data.url;
            break;
        case 'play':
            video.play()
            break;
        case 'pause':
            video.pause()
            break;
        case 'update':
            ctx.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
            dataURL = canvas.toDataURL();
            self.postMessage({ topic: 'update', img: dataURL }, [dataURL])
            break;
        default:
            throw 'no aTopic on incoming message to ChromeWorker';
    }
});