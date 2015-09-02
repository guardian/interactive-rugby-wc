import reqwest from 'reqwest'
import mustache from 'mustache'
import bowser from '../../bower_components/bowser/bowser'
import bonzo from 'ded/bonzo'
import viewport from '../../bower_components/viewport-units-buggyfill/viewport-units-buggyfill'

import { cleanData } from './components/helpers'
import { testBandwidth } from './components/testBandwidth'
import { renderPage, initScroll, initResize } from './components/render'

import { Block } from './components/block'
import { Copy } from './components/blocks/copy'
import { Header } from './components/blocks/header' 
import { Image } from './components/blocks/img' 
import { Video } from './components/blocks/video' 
import { PullByline } from './components/blocks/pullbyline'
import { ScrollGallery } from './components/blocks/scrollgallery'
import { VerticalSlideshow } from './components/blocks/verticalslideshow'
import { Audio } from './components/blocks/audio'
import { Related } from './components/blocks/related'

export function init(el, context, config, mediator) {
    reqwest({
        url: 'http://interactive.guim.co.uk/docsdata-test/1JPlb3Uk1y55UCCVA9OQU_iM1r6yb2XFRg3jbskd-2o8.json',
        type: 'json',
        crossOrigin: true,
        success: function(resp) {
            if (window.innerWidth > 600) {
                testBandwidth(app, el, resp);
            } else {
            	app("500", el, resp);
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
            audio: Audio,
            related: Related
        },
        blocks = [],
        bodyEl = document.getElementsByTagName("body")[0],
        isMobile = (bowser.mobile || bowser.tablet || bodyEl.clientWidth < 600) ? true : false,
        config = resp.config;

    if(isMobile) {
        bonzo(bodyEl).addClass("is-mobile");
    }

    config.sponsorship = (config.sponsorship === "TRUE") ? true : false;

    blocksData.map(function(block, i) {
        blocks.push(new components[block.block](block, resp.config, format, isMobile));
    });

    renderPage(el, blocks);
    initScroll(blocks);
    initResize(blocks);
    viewport.init();
}
