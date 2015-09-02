import { Block } from '../../components/block'
import imgTmpl from '../../templates/image.html!text'
import { getCumulativeOffset } from '../../components/helpers'
import { prettifyTime } from '../../components/helpers'
import bonzo from 'ded/bonzo'

export class Image extends Block {
    set() {
        this.template = imgTmpl;
        this.block.randomId = Math.random().toString(36).substring(2,7);
        if(this.block.audio) { this.block.audio.randomId = this.block.randomId; } 
        if(!this.block.from_s3 && this.block.from_s3 !== "TRUE") {
            this.block.src = (this.block.src_path) ? this.block.src_path + "/" + this.sizes[0] + ".jpg" : false;
        } else {
            this.block.src = this.block.src_path;
        }
        this.setScrollCount = 0;
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

    setScroll() {
        this.calcOffsets();
        this.setScrollCount++;
    }

    initAudio() {
        this.playButton = document.getElementById("play-" + this.block.randomId);
        this.timerEl = document.getElementById("timer-" + this.block.randomId);
        this.audioTagEl = document.getElementById("audio-" + this.block.randomId);

        this.el.addEventListener("click", this.playClick.bind(this));

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
        bonzo(this.playButton).removeClass("int-playing");
    }

    playClick() {
        if(this.audioTagEl.paused) {
            this.audioTagEl.play();
            this.audioTagEl.setAttribute("playing","");
            bonzo(this.playButton).addClass("int-playing");
        } else {
            this.audioTagEl.pause();
            this.audioTagEl.removeAttribute("playing","");
            bonzo(this.playButton).removeClass("int-playing");
        } 
    }

    sizeToUse(elWidth) {
        let toReturn = this.sizes.filter(function(size) { return size > elWidth });
        return toReturn[0];
    }

    onScroll(scrollY) {
        if(!this.block.from_s3) {
            if(scrollY > 2500 && this.setScrollCount < 2) {
                this.setScroll();
            }
            
            for(var i = 0; i < this.offsets.length; i++) {
                if(this.offsets[i] < scrollY + 2*window.innerHeight) {
                    this.images[i].setAttribute("src", this.block.src_path + "/" + this.sizeToUse(this.images[i].clientWidth) + ".jpg");
                    this.onScroll = null;
                }
            }
        }
    }

    onResize(width) {
        this.calcOffsets;
    }
}
