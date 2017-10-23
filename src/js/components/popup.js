/**
 * Website's dot plugin scripts.
 *
 * @module Popup
 */


/** Import utils */
import {
  $window,
  throttle
} from '../modules/dev/helpers';
import Popup from 'vintage-popup';

export class windowPopup {
  /**
   * Cache data.
   */
  constructor() {
    this.$mediaImgUrls = $('.media__video-img-link');
    this.$mediaTextLinks = $('.media__video-text-link');
    this.$popupCloseBtn = $('.popup__close');
    this.$mediaImgUrls.popup({
      afterOpen: this.triggerPopup(),
      beforeClose: this.stopVideo()
    });
    this.$mediaTextLinks.popup({
      afterOpen: this.triggerPopup(),
      beforeClose: this.stopVideo()
    });
  }

  /**
   * Add image data-url value to the iframe when image was clicked
   *
   * @return {[type]} [description]
   */
  triggerPopup() {
    const _this = this;

    this.$mediaImgUrls.add(_this.$mediaTextLinks).on('click tap', function(e) {
      e.preventDefault();
      const $this = $(this);
      const url = $this.data('url');
      const target = $this.data('popup-target');
      const iframe = $this.closest('.media__video-wrapper').find(`[data-popup-id="${target}"]`).find('.media__video-popup-iframe');

      iframe.attr('src', url).delay(400).fadeIn(400);
    });
  }

  stopVideo() {
    this.$popupCloseBtn.on('click tap', function() {
      const $this = $(this);
      const target = $this.closest('.media__video-popup').data('popup-id');
      const iframe = $this.closest('.media__video-wrapper').find(`[data-popup-id="${target}"]`).find('.media__video-popup-iframe');

      iframe.attr('src', '').delay(400).fadeOut(400);
    });
  }


  /**
   * Initialize Popup scripts.
   *
   * @returns {Popup}
   */
  init() {

  }
}

/** Export initialized Popup script by default */
export default new windowPopup().init();
