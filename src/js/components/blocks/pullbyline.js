import { Block } from '../../components/block'
import pullBylineTmpl from '../../templates/pullbyline.html!text'

export class PullByline extends Block {
    set() {
        this.template = pullBylineTmpl;
    }

    afterRender() {
        
    }
}
