import { Block } from '../../components/block'
import verticalSlideshowTmpl from '../../templates/vertical-slideshow.html!text'
import { getCumulativeOffset, debounce } from '../../components/helpers'

import bowser from '../../../../bower_components/bowser/bowser'

export class VerticalSlideshow extends Block {
    set() {
        this.template = verticalSlideshowTmpl;
        this.setScrollCount = 0;
        this.block.wrapperRandomId = Math.random().toString(36).substring(2, 7);

        this.block.images.map(function(image, i) {
            this.block.images[i].src = (image.src_path) ? image.src_path + "/" + this.sizes[0] + ".jpg" : false;
        }.bind(this));
        this.savedScrollLeft = 0;
    }

    afterRender() {
        this.images = this.block.images.map((image) => document.getElementById(image.id));
        this.wrapperEl = document.getElementById(this.block.wrapperRandomId);
        this.setScroll();
        this.tickEl = document.getElementById("tick-" + this.block.wrapperRandomId);
        this.toggleEl = document.getElementById("toggle-" + this.block.wrapperRandomId);

        this.toggleEl.addEventListener("click", this.toggleClick.bind(this));

        if(bowser.ios) {
            this.wrapperEl.addEventListener("touchend", this.touchEnd.bind(this));    
        } else {
            this.wrapperEl.addEventListener("scroll", debounce(this.touchEnd.bind(this), 150));
        } 
    }

    setScroll() {
        this.imageOffsets = this.images.map((image) => getCumulativeOffset(image).y);
        this.setScrollCount++;
    }

    sizeToUse(elWidth) {
        let toReturn = this.sizes.filter(function(size) { return size > elWidth });
        return toReturn[0];
    }

    touchEnd() {
        // let next = Math.round(this.wrapperEl.scrollLeft / window.innerWidth)*window.innerWidth;

        if(this.wrapperEl.scrollLeft > this.savedScrollLeft && this.wrapperEl.scrollLeft < this.images.length * window.innerWidth) {
            // this.wrapperEl.scrollLeft = this.savedScrollLeft + window.innerWidth;
            let scrollTo = (this.wrapperEl.scrollLeft > this.savedScrollLeft + window.innerWidth) ? Math.round(this.wrapperEl.scrollLeft / window.innerWidth)*window.innerWidth : this.savedScrollLeft + window.innerWidth;
            console.log(scrollTo);
            this.animateScrollMore(this.wrapperEl, scrollTo);
        } else if(this.wrapperEl.scrollLeft < this.savedScrollLeft && this.wrapperEl.scrollLeft > 0) {
            let scrollTo = (this.wrapperEl.scrollLeft < this.savedScrollLeft - window.innerWidth) ? Math.round(this.wrapperEl.scrollLeft / window.innerWidth)*window.innerWidth : this.savedScrollLeft - window.innerWidth;
            
            this.animateScrollLess(this.wrapperEl, scrollTo);
        }
    }

    scrollEnd() {
        let next = Math.round(this.wrapperEl.scrollLeft / window.innerWidth)*window.innerWidth;

        if(next > this.savedScrollLeft) {
            this.animateScrollMore(this.wrapperEl, next);
        } else if(next < this.savedScrollLeft) {
            this.animateScrollLess(this.wrapperEl, next);
        }
    }

    animateScrollMore(el,targetScroll) {
        let scrollAmount = (targetScroll - el.scrollLeft)*0.1;
        el.scrollLeft += (scrollAmount > 1) ? scrollAmount : 1;
        if(el.scrollLeft < targetScroll) {
            setTimeout(() => this.animateScrollMore(el, targetScroll));
        } else {
            this.savedScrollLeft = Math.round(this.wrapperEl.scrollLeft/window.innerWidth)*window.innerWidth; 
        }
    }

    animateScrollLess(el,targetScroll) {
        let scrollAmount = (el.scrollLeft - targetScroll)*0.1;
        el.scrollLeft -= (scrollAmount > 1) ? scrollAmount : 1;
        if(el.scrollLeft > targetScroll) {
            setTimeout(() => this.animateScrollLess(el, targetScroll));
        } else {
            this.savedScrollLeft = Math.round(this.wrapperEl.scrollLeft/window.innerWidth)*window.innerWidth;
        }
    }

    toggleClick() {
        if(!this.wrapperEl.classList.contains("int-contain")) {
            this.wrapperEl.classList.add("int-contain");
            this.toggleEl.classList.add("int-contain");
        } else {
            this.wrapperEl.classList.remove("int-contain");
            this.toggleEl.classList.remove("int-contain");
        }
    }

    onScroll(scrollY) {
        if(window.innerWidth > 600) {
            if(scrollY > 2500 && this.setScrollCount < 2) {
                this.setScroll();
            }
            if(this.imageOffsets[this.images.length - 1] > scrollY && this.imageOffsets[0] < scrollY) {
                this.wrapperEl.classList.add("int-images-fixed");
                this.tickEl.style.width = ((scrollY - this.imageOffsets[0]) * 100) / (this.imageOffsets[this.images.length - 1] - this.imageOffsets[0]) + "%";
            } else {
                this.wrapperEl.classList.remove("int-images-fixed");
            }

            this.imageOffsets.map((offset, i) => ((offset < scrollY + window.innerHeight / 2 && i !== 0) || (offset < scrollY && i === 0)) ? this.images[i].classList.add("int-fixed") : this.images[i].classList.remove("int-fixed"));
        }

        if(scrollY > this.imageOffsets[0] - window.innerHeight*2) {
            if(this.upgradeImages) { this.upgradeImages(); }
        }
    }

    upgradeImages() {
        let width = (bowser.mobile) ? this.images[0].clientWidth*2 : this.images[0].clientWidth;
        this.images.map((image, i) => this.images[i].style.backgroundImage = "url('" + this.block.images[i].src_path + "/" + this.sizeToUse(width) + ".jpg" + "')");
        this.upgradeImages = null;
    }

    onResize() {
        this.setScroll();
    }
}
