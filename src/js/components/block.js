import mustache from 'mustache'
import copyTmpl from '../templates/copy.html!text'

export class Block {
    constructor(block, config, format) {
        this.block = block;
        this.config = config;
        this.template = copyTmpl;
        this.format = format;
        this.set();
    } 

    set() {}

    generate() {
        return mustache.render(this.template, {block: this.block, format: this.format});
    }
}
