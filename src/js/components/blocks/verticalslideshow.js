import { Block } from '../../components/block'
import verticalSlideshowTmpl from '../../templates/vertical-slideshow.html!text'
import { getCumulativeOffset } from '../../components/helpers'

export class VerticalSlideshow extends Block {
    set() {
        this.template = verticalSlideshowTmpl;
        this.setScrollCount = 0;
        this.block.wrapperRandomId = Math.random().toString(36).substring(2, 7);

        this.block.images.map(function(image, i) {
            this.block.images[i].src = (image.src_path) ? image.src_path + "/" + this.sizes[0] + ".jpg" : false;
        }.bind(this));
    }

    afterRender() {
        this.images = this.block.images.map((image) => document.getElementById(image.id));
        this.wrapperEl = document.getElementById(this.block.wrapperRandomId);
        this.setScroll();
        this.tickEl = document.getElementById("tick-" + this.block.wrapperRandomId);
    }

    setScroll() {
        this.imageOffsets = this.images.map((image) => getCumulativeOffset(image).y);
        this.setScrollCount++;
    }

    sizeToUse(elWidth) {
        let toReturn = this.sizes.filter(function(size) { return size > elWidth });
        return toReturn[0];
    }

    onScroll(scrollY) {
        if (scrollY > 2500 && this.setScrollCount < 2) {
            this.setScroll();
        }
        if (this.imageOffsets[this.images.length - 1] > scrollY && this.imageOffsets[0] < scrollY) {
            this.wrapperEl.classList.add("int-images-fixed");
            this.tickEl.style.width = ((scrollY - this.imageOffsets[0]) * 100) / (this.imageOffsets[this.images.length - 1] - this.imageOffsets[0]) + "%";
        } else {
            this.wrapperEl.classList.remove("int-images-fixed");
        }

        if(scrollY > this.imageOffsets[0] - window.innerHeight*2) {
            this.images.map((image, i) => this.images[i].style.backgroundImage = "url('" + this.block.images[i].src_path + "/" + this.sizeToUse(this.images[0].clientWidth) + ".jpg" + "')");
        }

        this.imageOffsets.map((offset, i) => ((offset < scrollY + window.innerHeight / 2 && i !== 0) || (offset < scrollY && i === 0)) ? this.images[i].classList.add("int-fixed") : this.images[i].classList.remove("int-fixed"));
    }

    onResize() {
        this.setScroll();
    }
}
