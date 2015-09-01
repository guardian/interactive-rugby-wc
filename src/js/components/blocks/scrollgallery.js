import { Block } from '../../components/block'
import scrollGalleryTmpl from '../../templates/scroll-gallery.html!text'
import { getCumulativeOffset } from '../../components/helpers'

export class ScrollGallery extends Block {
    set() {
        this.template = scrollGalleryTmpl;
        this.block.id = Math.random().toString(36).substring(2,7);
        this.block.images.map(function(image, i) {
            this.block.images[i].src = (image.src_path) ? image.src_path + "/" + this.sizes[0] + ".jpg" : false;
        }.bind(this));
        this.setScrollCount = 0;
        this.upgraded = false;
    }

    afterRender() {
    	this.el = document.getElementById(this.block.id);
        this.images = Array.prototype.slice.call(this.el.querySelectorAll(".int-scroll-gallery__image"));
        this.setScroll();
    }

    sizeToUse(elWidth) {
        let toReturn = this.sizes.filter(function(size) { return size > elWidth });
        return toReturn[0];
    }

    setScroll() {
        this.offset = getCumulativeOffset(this.images[0]).y;
        this.setScrollCount++;
    }

    onScroll(scrollY) {
        if(scrollY > 2500 && this.setScrollCount < 2) {
            this.setScroll();
        }
        if(scrollY > this.offset - window.innerHeight*2 && this.upgraded !== true) {
            this.images.map((image, i) => this.images[i].style.backgroundImage = "url('" + this.block.images[i].src_path + "/" + this.sizeToUse(this.images[i].clientWidth) + ".jpg" + "')");
            this.upgraded = true;
        }
    }
}
