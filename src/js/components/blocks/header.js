import { Block } from '../../components/block'
import headerTmpl from '../../templates/header.html!text'

export class Header extends Block {
    set() {
        this.template = headerTmpl;
    }

    afterRender() {
        console.log(this);
    }
}
