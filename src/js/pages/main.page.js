/**
 * Main page scripts.
 *
 * @module Main
 */

/** Import utils */
import { Resp } from 'js/modules/dev/helpers';

export class Main {
  /**
   * Cache data.
   */
  constructor() {
    this.$subscribeForm = $('.subscribe__form');
    this.$subscribeInput = $('.subscribe__form-input');
    this.$subscribeFormBtn = $('.subscribe__form-btn');
    this.$subscribePopupCloseBtn = $('.subscribe__popup-close');
    this.$subscribePopup = $('[data-popup-id="subscribe"]');
  }

  // Init Popup on success news subscribe
  // initSubscribePopup() {
  //   this.$subscribeFormBtn.popup({
  //     openOnClick: false
  //   });
  //
  //   const popupInstance = this.$subscribePopup.data('popup');
  //   popupInstance.open();
  // }
  //
  // // Close subscribe popup when user clicks on Thanks btn
  // closeSubscribePopup() {
  //   const _this = this;
  //
  //   this.$subscribePopupCloseBtn.on('click tap', function() {
  //     const popupInstance = _this.$subscribePopup.data('popup');
  //     popupInstance.close();
  //   });
  // }

  /**
   * Initialize Home page scripts.
   */
  init() {
    // this.initSubscribePopup();
    // this.closeSubscribePopup();
  }
}

/** Export Main page class instance by default */
export default new Main();
