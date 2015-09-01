import { Block } from '../../components/block'
import audioTmpl from '../../templates/audio.html!text'
import { prettifyTime } from '../../components/helpers'

export class Audio extends Block {
    set() {
        this.template = audioTmpl;
        this.block.id = Math.random().toString(36).substring(2,7);
    }

    afterRender() {
        this.el = document.getElementById(this.block.id);
        this.playButton = document.getElementById("play-" + this.block.id);
        this.el.addEventListener("ended", this.onEnded.bind(this));
        this.playButton.addEventListener("click", this.playClick.bind(this));

        this.timerEl = document.getElementById("timer-" + this.block.id);
        this.el.addEventListener("loadeddata", this.updateTime.bind(this));

        this.el.addEventListener("timeupdate", this.updateTime.bind(this));

        this.moveAudio();
    }

    onEnded() {
    	this.wrapperEl.setAttribute("ended", "");
    	this.wrapperEl.removeAttribute("playing"); 
    }

    updateTime() {
        let secondsRemaining = this.el.duration - this.el.currentTime;

        this.timerEl.innerHTML = prettifyTime(secondsRemaining);
    }

    playClick() {
        if(this.el.paused) {
        	this.el.play();
            this.el.setAttribute("playing","");
        } else {
            this.el.pause();
            this.el.removeAttribute("playing","");
        } 
    }
}