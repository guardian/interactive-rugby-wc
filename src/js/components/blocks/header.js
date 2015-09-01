import { Block } from '../../components/block'
import headerTmpl from '../../templates/header.html!text'
import { getCumulativeOffset } from '../../components/helpers'

export class Header extends Block {
    set() {
        this.template = headerTmpl;
        this.block.id = Math.random().toString(36).substring(2,7);
        this.setScrollCount = 0;
    }

    afterRender() {
        this.vidEl = document.getElementById(this.block.id + "-video");
        this.el = document.getElementById(this.block.id);
        this.setScroll();
        this.initTime = Date.now();
    }

    setScroll() {
        this.offset = getCumulativeOffset(this.el).y;
        this.setScrollCount++;
    }

    onScroll(scrollY) {
        if(!this.mobile && scrollY > 2500 && this.setScrollCount < 2 && Date.now() - this.initTime > 3000) {
            this.setScroll();
        }
        console.log(this.offset, scrollY, this.offset - window.innerHeight/2);
    	if(!this.mobile && this.offset - window.innerHeight/2 < scrollY && this.offset > scrollY - window.innerHeight/2) {
    		if(this.vidEl.paused) {
    			this.vidEl.play();
    		}
    	} else if (!this.mobile && !this.vidEl.paused) {
    		this.vidEl.pause();
    	}
    }
}
