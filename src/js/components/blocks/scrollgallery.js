import { Block } from '../../components/block'
import scrollGalleryTmpl from '../../templates/scroll-gallery.html!text'

export class ScrollGallery extends Block {
    set() {
        this.template = scrollGalleryTmpl;
    }

    afterRender() {
        
    }
}
