import mustache from 'mustache'
import copyTmpl from '../templates/copy.html!text'

export class Block {
    constructor(block, config, format, isMobile) {
        this.block = block;
        this.mobile = isMobile;
        if(this.block.src_sizes) {
            this.sizes = this.block.src_sizes.slice(1,-1).split(",");
        }
        if(this.block.images && this.block.images[0].src_sizes) {
            this.sizes = this.block.images[0].src_sizes.slice(1,-1).split(",");
        }
        this.config = config;
        this.template = copyTmpl;
        this.format = format;
        this.set();
    } 

    set() {}

    generate() {
        return mustache.render(this.template, {block: this.block, config: this.config, format: this.format, isMobile: this.mobile});
    }
}
