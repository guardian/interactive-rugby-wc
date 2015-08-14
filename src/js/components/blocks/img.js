import { Block } from '../../components/block'
import imgTmpl from '../../templates/image.html!text'
import { getCumulativeOffset } from '../../components/helpers'

export class Image extends Block {
    set() {
        this.template = imgTmpl;
        this.block.randomId = Math.random().toString(36).substring(2,7);
        this.block.src = (typeof this.block.src === "string") ? this.block.src.split(this.block.randomId) : this.block.src;
    }

    afterRender() {
        this.el = document.getElementById(this.block.randomId);
        this.images = this.el.getElementsByTagName("img");
        this.offsets = [];

        for(var i = 0; i < this.images.length; i++) {
            this.offsets.push(getCumulativeOffset(this.images[i]).y);
        }
    }

    onScroll(scrollY) {
        for(var i = 0; i < this.offsets.length; i++) {
            if(this.offsets[i] < scrollY + 2*window.innerHeight) {
                this.images[i].setAttribute("src", this.block.src[i] + "2000.jpg");
                this.onScroll = null;
            }
        }
    }
}
