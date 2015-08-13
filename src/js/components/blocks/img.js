import { Block } from '../../components/block'
import imgTmpl from '../../templates/image.html!text'
import { getCumulativeOffset } from '../../components/helpers'

export class Image extends Block {
    set() {
        this.template = imgTmpl;
        this.block.randomId = Math.random().toString(36).substring(2,7);
    }

    afterRender() {
        this.el = document.getElementById(this.block.randomId);
        this.offset = getCumulativeOffset(this.el).y;
    }

    onScroll(scrollY) {
    	if(this.offset < scrollY + 2*window.innerHeight) {
    		this.el.setAttribute("src", this.block.src + "2000.jpg");
    		this.onScroll = null;
    	}
    }
}
