import NavigationManager from "./NavigationManager"
import KeyManager from "./KeyManager"


export default class InteractionManager {
    constructor({ app, threeManager }) {
        this.app = app;
        this.threeManager = threeManager;

        this.init();
        this.navigationManager = new NavigationManager({ app, threeManager });
        this.keyManager = new KeyManager({ app, threeManager });

    }
    init() {
        this.initResize();
        // this.initKey();
    }
    initResize() {
        window.addEventListener("resize", () => { this.threeManager.resizeCanvas() }, 125);
    }


    toggleFullScreen() {
        g.fullscreen = true;
        var doc = window.document;
        var docEl = doc.documentElement;
        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        cancelFullScreen.call(doc);
        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            requestFullScreen.call(docEl);
        }
    }

    update(state) {
        this.navigationManager.update(state);
    }

}

