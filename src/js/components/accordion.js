/**
 * Accordion scripts.
 *
 * @module Accordion
 */

/** Import utils */
import {
  css,
  winWidth,
  $document,
  $window
} from '../modules/dev/helpers'

export class Accordion {
  constructor () {
    this.$accordionTitle = $('.accordion__title');
    this.$accordion = $('.accordion__wrapper');
  }

  showAccordionOnMobile () {
    $('.accordion__show-mobile').on('click tap', function () {
      $(this).toggleClass(css.active);
      $('.accordion').slideToggle();
    });
    return this;
  }

  /**
   * Initialize disabilities scripts.
   *
   * @returns {Disabilities}
   */
  init() {
    this.showAccordionOnMobile();
  }
}

/** Export initialized dot script by default */
export default new Accordion().init();
