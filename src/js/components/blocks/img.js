import { Block } from '../../components/block'
import imgTmpl from '../../templates/image.html!text'
import { getCumulativeOffset } from '../../components/helpers'
import { prettifyTime } from '../../components/helpers'

export class Image extends Block {
    set() {
        this.template = imgTmpl;
        this.block.randomId = Math.random().toString(36).substring(2,7);
        if(this.block.audio) { this.block.audio.randomId = this.block.randomId; } 
        // // this.block.src = (typeof this.block.src === "string") ? this.block.src.split(this.block.randomId) : this.block.src;

        // console.log(this.sizes, this.block.src, this.block.src_path);

        this.block.src = (this.block.src_path) ? this.block.src_path + "/" + this.sizes[0] + ".jpg" : false;
    }

    afterRender() {
        this.el = document.getElementById(this.block.randomId);
        this.images = this.el.getElementsByTagName("img");
        
        this.calcOffsets();

        if(this.block.audio) {
            this.initAudio();
        }
    }

    calcOffsets() {
        this.offsets = [];
        for(var i = 0; i < this.images.length; i++) {
            this.offsets.push(getCumulativeOffset(this.images[i]).y);
        }
    }

    initAudio() {
        this.playButton = document.getElementById("play-" + this.block.randomId);
        this.timerEl = document.getElementById("timer-" + this.block.randomId);
        this.audioTagEl = document.getElementById("audio-" + this.block.randomId);

        this.playButton.addEventListener("click", this.playClick.bind(this));
        console.log(this.playButton);

        this.audioTagEl.addEventListener("loadeddata", this.updateTime.bind(this));
        this.audioTagEl.addEventListener("ended", this.onEnded.bind(this));
        this.audioTagEl.addEventListener("timeupdate", this.updateTime.bind(this));
    }

    updateTime() {
        let secondsRemaining = this.audioTagEl.duration - this.audioTagEl.currentTime;

        this.timerEl.innerHTML = prettifyTime(secondsRemaining);
    }

    onEnded() {
        this.audioTagEl.setAttribute("ended", "");
        this.audioTagEl.removeAttribute("playing"); 
        this.playButton.classList.remove("int-playing");
    }

    playClick() {
        if(this.audioTagEl.paused) {
            this.audioTagEl.play();
            this.audioTagEl.setAttribute("playing","");
            this.playButton.classList.add("int-playing");
        } else {
            this.audioTagEl.pause();
            this.audioTagEl.removeAttribute("playing","");
            this.playButton.classList.remove("int-playing");
        } 
    }

    sizeToUse(elWidth) {
        let toReturn = this.sizes.filter(function(size) { return size > elWidth });
        return toReturn[0];
    }

    onScroll(scrollY) {
        for(var i = 0; i < this.offsets.length; i++) {
            if(this.offsets[i] < scrollY + 2*window.innerHeight) {
                this.images[i].setAttribute("src", this.block.src_path + "/" + this.sizeToUse(this.images[i].clientWidth) + ".jpg");
                this.onScroll = null;
            }
        }
    }

    onResize(width) {
        this.calcOffsets;
    }
}
