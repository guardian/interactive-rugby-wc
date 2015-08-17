import reqwest from 'reqwest'
import mustache from 'mustache'
import hammer from 'hammer'

import { cleanData } from './components/helpers'
import { testBandwidth } from './components/testBandwidth'

import { Block } from './components/block'
import { Copy } from './components/blocks/copy'
import { Header } from './components/blocks/header' 
import { Image } from './components/blocks/img' 
import { Video } from './components/blocks/video' 
import { PullByline } from './components/blocks/pullbyline'
import { ScrollGallery } from './components/blocks/scrollgallery'
import { VerticalSlideshow } from './components/blocks/verticalslideshow'
import { Audio } from './components/blocks/audio'

export function init(el, context, config, mediator) {
    reqwest({
        url: 'http://interactive.guim.co.uk/docsdata-test/1JPlb3Uk1y55UCCVA9OQU_iM1r6yb2XFRg3jbskd-2o8.json',
        type: 'json',
        crossOrigin: true,
        success: function(resp) {
            if (window.innerWidth > 600) {
                testBandwidth(app, el, resp);
            } else {
            	app("768k", el, resp);
            }
        }
    });
}


function app(format, el, resp) {
    var blocksData = cleanData(resp.blocks),
        components = {
            header: Header,
            pullByline: PullByline,
            copy: Copy,
            image: Image,
            slideshow: VerticalSlideshow,
            video: Video,
            "scroll-gallery": ScrollGallery,
            audio: Audio
        },
        blocks = [];

    blocksData.map(function(block, i) {
        blocks.push(new components[block.block](block, resp.config, format));
    });

    renderPage(el, blocks);
    initScroll(blocks);
    initResize(blocks);

}

function renderPage(el, blocks) {
    var toRender = "";

    blocks.map(function(block) {
        toRender += block.generate();
    });

    el.innerHTML = toRender;

    blocks.map(function(block) {
        block.afterRender();
    });
}

function initScroll(blocks) {
    window.onscroll = function() {
        let scrollY = window.scrollY;

        blocks.map(function(block) {
            if (block.onScroll) {
                block.onScroll(scrollY);
            }
        });
    };
}

function initResize(blocks) {
	window.onresize = function() {
        let width = window.width;

        blocks.map(function(block) {
            if (block.onResize) {
                block.onResize(width);
            }
        });
    };
}
