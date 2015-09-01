import { Block } from '../../components/block'
import videoTmpl from '../../templates/video.html!text'
import { getCumulativeOffset } from '../../components/helpers'
import bonzo from 'ded/bonzo'

export class Video extends Block {
    set() {
        this.template = videoTmpl;
        this.block.id = Math.random().toString(36).substring(2,7);
        this.stopped = false;
    }

    afterRender() {
        this.el = document.getElementById(this.block.id);
        this.wrapperEl = document.getElementById(this.block.id + "-wrapper");
        this.replayEl = document.getElementById(this.block.id + "-unmute");
        this.el.addEventListener("ended", this.onEnded.bind(this));
        this.wrapperEl.addEventListener("click", function(event) { 
            this.wrapperClick(event) }.bind(this));
        this.replayEl.addEventListener("click", function(event) {
            this.replay(event) }.bind(this));
        this.tickEl = document.getElementById("tick-" + this.block.id);
        this.progressEl = document.getElementById("progress-" + this.block.id);
        this.el.addEventListener("timeupdate", this.updateTime.bind(this));
        this.autoplay = !(bonzo(this.wrapperEl.parentNode).hasClass("supporting"));
        
        this.el.muted = true;
        this.wrapperWidth = this.wrapperEl.clientWidth;

        this.initProgressClick();
    }

    onScroll(scrollY) {
    	if(!this.mobile && getCumulativeOffset(this.el).y - window.innerHeight/2 < scrollY && getCumulativeOffset(this.el).y > scrollY - window.innerHeight/4 && !this.stopped && this.autoplay) {
    		if(this.el.paused) {
    			this.el.play();
    			this.wrapperEl.setAttribute("playing", "");
                this.wrapperEl.setAttribute("active", "");
    		}
    	} else if (!this.mobile && !this.el.paused && this.autoplay) {
    		this.el.pause();
    		this.wrapperEl.removeAttribute("playing", "");
    	}
    }

    unmute(event) {
        event.stopPropagation();
        this.el.muted = false;
        this.wrapperEl.setAttribute("unmuted", "");
    }

    replay(event) {
        this.unmute(event);
        this.el.currentTime = 0;
    }

    updateTime() {
        this.tickEl.style.width = this.genProgressWidth() + "%";
    }

    genProgressWidth() {
        return (this.el.currentTime/this.el.duration)*100;
    }

    onEnded() {
    	this.wrapperEl.setAttribute("ended", "");
    	this.wrapperEl.removeAttribute("playing"); 
    	this.stopped = true;
    }

    wrapperClick(event) {
    	if(this.el.paused) {
    		this.el.play();
    		this.stopped = false;
    		this.wrapperEl.removeAttribute("ended");
    		this.wrapperEl.setAttribute("playing", "");
            this.wrapperEl.setAttribute("active", "");
            this.unmute(event);
    	} else {
    		this.stopped = true;
    		this.el.pause();
    		this.wrapperEl.removeAttribute("playing");
            this.unmute(event);
    	}
    }

    initProgressClick() {
        this.progressEl.addEventListener("click", function(event) {
            event.stopPropagation();
            this.el.currentTime = this.el.duration * (event.layerX / this.wrapperWidth);

            if(this.wrapperWidth !== this.wrapperEl.clientWidth) {
                this.el.currentTime = this.el.duration * (event.layerX / this.wrapperEl.clientWidth);
            }
        }.bind(this));
    }
}