import bonzo from 'ded/bonzo'
import bowser from '../../../bower_components/bowser/bowser'

export function renderPage(el, blocks) {
    var toRender = "";

    blocks.map(function(block) {
        toRender += block.generate();
    });

    el.innerHTML = toRender;

    blocks.map(function(block) {
        block.afterRender();
    });
}

export function initScroll(blocks) {
    window.onscroll = function() {
        let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

        blocks.map(function(block) {
            if (block.onScroll) {
                block.onScroll(scrollY);
            }
        });
    };
}

export function initResize(blocks) {
	window.onresize = function() {
        let width = window.width,
            bodyEl = document.getElementsByTagName("body")[0];

        if(bowser.mobile || bowser.tablet || bodyEl.clientWidth < 600) {
            bonzo(bodyEl).addClass("is-mobile");
        } else {
            bonzo(bodyEl).removeClass("is-mobile");
        }

        blocks.map(function(block) {
            if (block.onResize) {
                block.onResize(width);
            }
        });
    };
}