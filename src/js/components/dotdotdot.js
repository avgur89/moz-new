/**
 * Website's dot plugin scripts.
 *
 * @module Dot
 */


/** Import utils */
import {
  $window,
  throttle
} from '../modules/dev/helpers';
import 'dotdotdot';

export class Dot {
  /**
   * Cache data.
   */
  constructor() {
    this.$dotElements = () => $('.dot');
    this.$noImgParagraph = () => $('.no-img').find('p');
    this.$noImgHeading = () => $('.no-img__cnt-active-wrapper').find('h5').find('a');
  }

  /**
   * Initialize dotdotdot plugin.
   *
   * @returns {Dot}
   */
  initDot() {
    this.$dotElements().each(function() {
      const $this = $(this);
      const height = +$this.data('height');

      $this.dotdotdot({ height, watch: true });
    });
  }

  // Initialize dotdotdot plugin for editor elements
  initDotEditor() {
    const noImgParagraphHeight = 100;
    const noImgHeadingHeight = 80;

    $('.calendar__cnt-desc p').each(function() {
      $(this).dotdotdot({ height: 100, watch: true });
    });

    this.$noImgParagraph().each(function() {
      $(this).dotdotdot({ height: noImgParagraphHeight, watch: true });
    });
    this.$noImgHeading().each(function() {
      $(this).dotdotdot({ height: noImgHeadingHeight, watch: true });
    });
  }

  onResize() {
    // reinit dotdotdot
    const reinitDot = throttle(() => {
      this.initDot();
      this.initDotEditor();
    }, 250, this);

    // reinit dotdotdot on resize
    $window.on('resize orientationchange', reinitDot);
  }

  /**
   * Initialize common scripts.
   *
   * @returns {Dot}
   */
  init() {
    $window.on('load', () => {
      this.initDot();
      this.initDotEditor();
      this.onResize();
    });
  }

}

/** Export initialized dot script by default */
export default new Dot();
