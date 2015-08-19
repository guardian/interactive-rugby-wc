import { Block } from '../../components/block'
import headerTmpl from '../../templates/header.html!text'
import { getCumulativeOffset } from '../../components/helpers'

export class Header extends Block {
    set() {
        this.template = headerTmpl;
        this.block.id = Math.random().toString(36).substring(2,7);
    }

    afterRender() {
        this.el = document.getElementById(this.block.id);
    }

    onScroll(scrollY) {
    	if(!this.mobile && getCumulativeOffset(this.el).y - window.innerHeight/2 < scrollY && getCumulativeOffset(this.el).y > scrollY - window.innerHeight/2) {
    		if(this.el.paused) {
    			this.el.play();
    		}
    	} else if (!this.mobile && !this.el.paused) {
    		this.el.pause();
    	}
    }
}
