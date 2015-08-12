import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import mustache from 'mustache'
import { cleanData } from './components/helpers'
import mainHTML from './templates/main.html!text'
import headerTmpl from './templates/header.html!text'
import copyTmpl from './templates/copy.html!text'
import imgTmpl from './templates/image.html!text'
import pullBylineTmpl from './templates/pullByline.html!text'
import videoTmpl from './templates/video.html!text'
import scrollGalleryTmpl from './templates/scroll-gallery.html!text'

export function init(el, context, config, mediator) {
    iframeMessenger.enableAutoResize();

	reqwest({
	    url: 'http://interactive.guim.co.uk/docsdata-test/1JPlb3Uk1y55UCCVA9OQU_iM1r6yb2XFRg3jbskd-2o8.json',
	    type: 'json',
	    crossOrigin: true,
	    success: (resp) => app(resp, el)
	});
}

function app(resp, el) {
	var blocks = cleanData(resp.blocks),
		toRender = "",
		templates = {
			header: headerTmpl,
			pullByline: pullBylineTmpl,
			copy: copyTmpl,
			image: imgTmpl,
			slideshow: mainHTML,
			video: videoTmpl,
			"scroll-gallery": scrollGalleryTmpl
		};

	blocks.map(function(block) {
		toRender += mustache.render(templates[block.block], {block: block, config: resp.config});
	});

	el.innerHTML = toRender;
}