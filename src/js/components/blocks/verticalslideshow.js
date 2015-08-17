import { Block } from '../../components/block'
import verticalSlideshowTmpl from '../../templates/vertical-slideshow.html!text'
import { getCumulativeOffset } from '../../components/helpers'

export class VerticalSlideshow extends Block {
    set() {
        this.template = verticalSlideshowTmpl;
        this.setScrollCount = 0;
        this.block.wrapperRandomId = Math.random().toString(36).substring(2,7);
    }

    afterRender() {
        this.images = this.block.images.map((image) => document.getElementById(image.id));
        this.wrapperEl = document.getElementById(this.block.wrapperRandomId);
        this.setScroll();
        this.tickEl = document.getElementById("tick-" + this.block.wrapperRandomId);
        console.log(this.wrapperEl, this.tickEl);
    }

    setScroll() {
        this.imageOffsets = this.images.map((image) => getCumulativeOffset(image).y);
        this.setScrollCount++;
    }

    onScroll(scrollY) {
    	if(scrollY > 2500 && this.setScrollCount < 2) {
    		this.setScroll();
    	}
   		if(this.imageOffsets[this.images.length-1] > scrollY && this.imageOffsets[0] < scrollY) {
   			this.wrapperEl.classList.add("int-images-fixed");
   			this.tickEl.style.width = ((scrollY - this.imageOffsets[0])*100) / (this.imageOffsets[this.images.length-1] - this.imageOffsets[0]) + "%";
   		} else {
   			this.wrapperEl.classList.remove("int-images-fixed");
   		} 

   		this.imageOffsets.map((offset, i) => ((offset < scrollY + window.innerHeight/2 && i !== 0) || (offset < scrollY && i === 0))
        ? this.images[i].classList.add("int-fixed") 
        : this.images[i].classList.remove("int-fixed"));
    }

    onResize() {
      this.setScroll();
    }
}
