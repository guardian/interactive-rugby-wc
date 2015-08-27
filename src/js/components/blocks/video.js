import { Block } from '../../components/block'
import videoTmpl from '../../templates/video.html!text'
import { getCumulativeOffset } from '../../components/helpers'

export class Video extends Block {
    set() {
        this.template = videoTmpl;
        this.block.id = Math.random().toString(36).substring(2,7);
        this.stopped = false;
    }

    afterRender() {
        this.el = document.getElementById(this.block.id);
        this.wrapperEl = document.getElementById(this.block.id + "-wrapper");
        this.unmuteEl = document.getElementById(this.block.id + "-unmute");
        this.el.addEventListener("ended", this.onEnded.bind(this));
        this.wrapperEl.addEventListener("click", this.wrapperClick.bind(this));
        this.unmuteEl.addEventListener("click", this.unmute.bind(this));
        this.tickEl = document.getElementById("tick-" + this.block.id);
        this.el.addEventListener("timeupdate", this.updateTime.bind(this));
        this.autoplay = !this.wrapperEl.parentNode.classList.contains("supporting");
        
        this.el.muted = true;
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

    unmute() {
        event.stopPropagation();
        this.el.muted = false;
        this.wrapperEl.setAttribute("unmuted", "");
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

    wrapperClick() {
    	if(this.el.paused) {
    		this.el.play();
    		this.stopped = false;
    		this.wrapperEl.removeAttribute("ended");
    		this.wrapperEl.setAttribute("playing", "");
            this.wrapperEl.setAttribute("active", "");
            this.unmute();
    	} else {
    		this.stopped = true;
    		this.el.pause();
    		this.wrapperEl.removeAttribute("playing");
            this.unmute();
    	}
    }
}