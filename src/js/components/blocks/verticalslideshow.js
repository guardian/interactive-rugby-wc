import { Block } from '../../components/block'
import verticalSlideshowTmpl from '../../templates/vertical-slideshow.html!text'
import { getCumulativeOffset } from '../../components/helpers'

export class VerticalSlideshow extends Block {
    set() {
        this.template = verticalSlideshowTmpl;
        this.setScrollCount = 0;
    }

    afterRender() {
        this.images = this.block.images.map(function(image) {
        	return document.getElementById(image.id);
        });

        this.setScroll();
    }

    setScroll() {
        this.imageOffsets = this.images.map(function(image) {
        	return getCumulativeOffset(image).y;
        });

        this.setScrollCount++;
    }

    onScroll(scrollY) {
    	let self = this;
    	if(scrollY > 1000 && this.setScrollCount < 2) {
    		this.setScroll();
    	}

    	if(this.imageOffsets[this.images.length-1] < scrollY) {
    		this.images.map(function(image, i) {
    			image.classList.remove("img-fixed");
    			if(i === self.imageOffsets.length-1) {
    				image.classList.add("img-past")
    			}
    		});
    	} else {
    		this.images.map(function(image, i) {
    			if(self.imageOffsets[i] < scrollY || (i !== 0 && self.imageOffsets[i] < scrollY + window.innerHeight/2)) {
    				image.classList.add("img-fixed");
    			} else {
    				image.classList.remove("img-fixed");
    			}
    		});
    	}
    }
}
