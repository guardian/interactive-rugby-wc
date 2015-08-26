import { Block } from '../../components/block'
import relatedTmpl from '../../templates/related.html!text'

export class Related extends Block {
	set() {
        this.template = relatedTmpl;
    }

    afterRender() {
        
    }
}
