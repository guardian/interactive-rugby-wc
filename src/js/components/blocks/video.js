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
        this.el.addEventListener("ended", this.onEnded.bind(this));
        this.wrapperEl.addEventListener("click", this.wrapperClick.bind(this));
    }

    onScroll(scrollY) {
    	if(getCumulativeOffset(this.el).y - window.innerHeight/2 < scrollY && getCumulativeOffset(this.el).y > scrollY - window.innerHeight/4 && !this.stopped) {
    		if(this.el.paused) {
    			this.el.play();
    			this.wrapperEl.setAttribute("playing", "");
    		}
    	} else if (!this.el.paused) {
    		this.el.pause();
    		this.wrapperEl.removeAttribute("playing", "");
    	}
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
    	} else {
    		this.stopped = true;
    		this.el.pause();
    		this.wrapperEl.removeAttribute("playing");
    	}
    }
}