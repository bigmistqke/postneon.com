import uniqid from 'uniqid'
class TweenManager {
    constructor({ app, threeManager }) {
        this.tweens = {};
        this.state = {
            isTweening: false,
        }
        this.delta = null;
    }

    add(duration, easingType) {
        const tweener = new Tweener(duration, easingType);
        const id = uniqid();
        this.tweens[id] = tweener;
        tweener.addEventListener('complete', () => {
            delete this.tweens[id];
            if (Object.keys(this.tweens) == 0) {
                this.state.isTweening = false;
            }
        })
        return tweener;
    }

    easings = {
        sine_in: (x) => 1 - Math.cos((x * Math.PI) / 2),
        linear: (x) => x
    }

    lerp(a, alpha) {
        return (1 - alpha) * a.now + alpha * a.next;
    }

    update(now) {
        let isTweening = false;
        let tween;
        let delta;
        for (let id in this.tweens) {
            tween = this.tweens[id];
            delta = (now - tween.state.start) / tween.state.duration;
            delta = this.easings[tween.state.easingType](delta);
            delta = Math.min(delta, 1);
            tween.update(delta);
            if (delta != 1) {
                isTweening = true;
                break
            }
            tween.complete();
            delete this.tweens[id];
        }

        this.state.isTweening = isTweening;
        return isTweening;
    }
}

class Tweener extends EventTarget {
    constructor(duration, easingType = 'linear') {
        super();
        this.events = {
            update: new CustomEvent("update", {}),
            complete: new CustomEvent("complete", {})
        }
        this.state = {
            start: performance.now(),
            duration: duration,
            easingType: easingType
        }
    }

    update = (delta) => {
        this.dispatchEvent(new CustomEvent("update", { detail: delta }));
    }
    complete = () => {
        this.dispatchEvent(this.events.complete);
    }
}

export default TweenManager