import { Block } from '../../components/block'
import imgTmpl from '../../templates/image.html!text'

export class Image extends Block {
    set() {
        this.template = imgTmpl;
    }

    afterRender() {
        
    }
}
