import mustache from 'mustache'
import copyTmpl from '../templates/copy.html!text'

export class Block {
    constructor(block, config) {
        this.block = block;
        this.config = config;
        this.template = copyTmpl;
        this.set();
    } 

    set() {}

    generate() {
        return mustache.render(this.template, {block: this.block});
    }
}
