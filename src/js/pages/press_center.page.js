/**
 * Press center page scripts.
 *
 * @module PressCenter
 */

/** Import utils */

export class PressCenter {
  /**
   * Cache data.
   */
  constructor() {
    // jQuery objects
    this.$pressSubscribeForm = $('.press__subscribe-form');
    this.$pressSubscribeInput = $('.press__subscribe-form-input');
    this.$pressSubscribeFormBtn = $('.press__subscribe-form-btn');
    this.$pressSubscribePopupCloseBtn = $('.press__subscribe-popup-close');
    this.$pressSubscribePopup = $('[data-popup-id="press__subscribe"]');
    this.$pressSubscribeHint = $('.press__subscribe-hint-icon');
    this.$material = $('.material');
    this.$materialPopup = $('.material__popup');
    this.$usefulBlock = $('.useful');
    this.$usefulQABlock = $('.useful__qa');
    this.$usefulSubmitBlock = $('.useful__submit');
    this.$usefulYesBtn = $('.useful__btn-yes');
    this.$usefulNoBtn = $('.useful__btn-no');
    this.$usefulNextBtn = $('.useful__qa-btn');
    this.$uesefulSubmitBtn = $('.useful__submit-btn');
    this.$usefulPopup = $('[data-popup-id="useful__popup"]');
    this.$pressVideoPopup = $('[data-popup-id="press-video"]');
    this.$licencePopup = $('[data-popup-id="licence-popup"]');
    this.$licenceLink = $('.photo__licence-link');
    this.$usefulPopupCloseBtn = $('.material__popup-close');
    this.$licencePopupContent = $('.photo__licence-popup-content');
    this.$photogalleryPopup = $('[data-popup-id="photogallery-popup"]');
    this.$photogalleryItem = $('.photogallery__img');
    this.$pressVideoItems = $('.press__video-item-img-link');
    this.$pressVideoPopupClose = $('.press__video-popup-close');

    // jQuery classes
    this.pressSubscribeHintClose = '.press__subscribe-hint-close-icon';
    this.pressSubscribeEmail = '.press__subscribe-email';
    this.pressSubscribeHintPopup = '.press__subscribe-hint-popup';
    this.pressSubscribeHintIconActive = 'press__subscribe-hint-active';
    this.pressVideoWrapper = '.press__video-wrapper';
    this.pressVideoIframe = '.press__video-popup-iframe';
    this.pressVideoPopup = '.press__video-popup';
    this.pressVideoItem = '.press__video-item-img-link';

    this.$pressVideoItems.popup({
      afterOpen: this.triggerVideoPopup(),
      beforeClose: this.stopVideoPopup()
    });
  }

  // Check if current location has popup id and open it
  checkHashLocation() {
    const _this = this;
    const currentId = window.location.href.split('popup-')[1];

    if (currentId !== undefined) {
      const currentItem = $(`#popup-${currentId}`);
      const popupInstance = this.$pressVideoPopup.data('popup');
      const url = currentItem.find(_this.pressVideoItem).data('url');
      const target = currentItem.find(_this.pressVideoItem).data('popup-target');
      const iframe = currentItem.closest(_this.pressVideoWrapper).find(`[data-popup-id="${target}"]`).find(_this.pressVideoIframe);

      // Open popup
      popupInstance.open();

      // Add video to the popup from data attribute
      iframe.attr('src', url);
      iframe.fadeIn();
    }
  }

  // Init video popup
  triggerVideoPopup() {
    const _this = this;

    this.$pressVideoItems.on('click tap', function(e) {
      e.preventDefault();

      const $this = $(this);
      const url = $this.data('url');
      const target = $this.data('popup-target');
      const iframe = $this.closest(_this.pressVideoWrapper).find(`[data-popup-id="${target}"]`).find(_this.pressVideoIframe);

      iframe.attr('src', url).delay(400).fadeIn(400);

      // add href according to the popup-id
      const linkId = $this.closest('.press__video-item').attr('id');
      window.location.hash = `#!${linkId}`;
    });
  }

  // Stop video and close popup
  stopVideoPopup() {
    const _this = this;

    this.$pressVideoPopupClose.on('click tap', function() {
      const $this = $(this);
      const target = $this.closest(_this.pressVideoPopup).data('popup-id');
      const iframe = $this.closest(_this.pressVideoWrapper).find(`[data-popup-id="${target}"]`).find(_this.pressVideoIframe);

      iframe.attr('src', '').delay(400).fadeOut(400);
    });
  }

  // Init Popup on success subscribe
  initPressSubscribePopup() {
    const _this = this;

    this.$pressSubscribeFormBtn.popup({
      openOnClick: false
    });

    this.$pressSubscribeFormBtn.on('click tap', function(e) {
      e.preventDefault();
      const popupInstance = _this.$pressSubscribePopup.data('popup');
      popupInstance.open();
    });
  }

  // Close subscribe popup when user clicks on Thanks btn
  closePressSubscribePopup() {
    const _this = this;

    this.$pressSubscribePopupCloseBtn.on('click tap', function() {
      const popupInstance = _this.$pressSubscribePopup.data('popup');
      popupInstance.close();
    });
  }

  // On click toogle popup hint in press subscribe section
  togglePressSubscribeHint() {
    const _this = this;

    this.$pressSubscribeHint.add(_this.pressSubscribeHintClose).on('click tap', function() {
      const hint = $(this).closest(_this.pressSubscribeEmail).find(_this.pressSubscribeHintPopup);

      _this.$pressSubscribeHint.toggleClass(_this.pressSubscribeHintIconActive);

      hint.fadeToggle();
    });
  }

  // Initialize material section
  initMaterialSection() {
    const _this = this;

    this.$usefulNoBtn.on('click tap', function(e) {
      e.preventDefault();

      $(this).closest(_this.$usefulBlock).fadeOut(400, function() {
        _this.$usefulQABlock.slideDown(400);
      });
    });

    this.$usefulNextBtn.on('click tap', function(e) {
      e.preventDefault();

      $(this).closest(_this.$usefulQABlock).fadeOut(400, function() {
        _this.$usefulSubmitBlock.slideDown(400);
      });
    });
  }

  // Init thanks Popup
  initMaterialPopup() {
    const _this = this;

    this.$uesefulSubmitBtn.add(_this.$usefulYesBtn).popup({
      openOnClick: false
    });

    this.$uesefulSubmitBtn.add(_this.$usefulYesBtn).on('click tap', function(e) {
      e.preventDefault();

      const popupInstance = _this.$usefulPopup.data('popup');
      popupInstance.open();
    });
  }

  // Close thanks popup when user clicks on close btn
  closeMaterialPopup() {
    const _this = this;

    this.$usefulPopupCloseBtn.add(_this.$materialPopup).on('click tap', function(e) {
      e.preventDefault();

      const popupInstance = _this.$usefulPopup.data('popup');
      popupInstance.close();

      _this.$usefulSubmitBlock.hide();
      _this.$material.hide();
    });
  }

  // Init thanks Popup
  initLicencePopup() {
    const _this = this;

    this.$licenceLink.popup({
      openOnClick: false
    });

    this.$licenceLink.on('click tap', function(e) {
      e.preventDefault();

      const popupInstance = _this.$licencePopup.data('popup');
      popupInstance.open();
    });
  }

  // Initialize scroll bar plugin for banners
  initScrollLicencePopup() {
    const _this = this;

    $(window).on("load", function() {
      _this.$licencePopupContent.mCustomScrollbar({
        theme: "dark-thin",
        mouseWheel:{ enable: true }
      });
    });
  }

  // Init Photogallery Popup
  initPhotogalleryPopup() {
    const _this = this;

    this.$photogalleryItem.popup({
      openOnClick: false
    });

    this.$photogalleryItem.on('click tap', function() {
      const popupInstance = _this.$photogalleryPopup.data('popup');
      popupInstance.open();
    });
  }

  // Resize textarea according to the content
  resizeTextarea() {
    $.each($('.material__textarea'), function () {
      let resizeTextarea = function (el) {
        if (el.scrollHeight > 45) {
          $(el).css('height', '').css('height', el.scrollHeight);
          if (!el.value) {
            $(el).css('height', '45');
          }
        }
      };

      resizeTextarea(this);
      $(this).on('keyup input', function () { resizeTextarea(this); });
    });
  }


  /**
   * Initialize PressCenter page scripts.
   */
  init() {
    this.initPressSubscribePopup();
    this.closePressSubscribePopup();
    this.togglePressSubscribeHint();
    this.initMaterialSection();
    this.initMaterialPopup();
    this.closeMaterialPopup();
    this.initLicencePopup();
    this.initScrollLicencePopup();
    this.initPhotogalleryPopup();
    this.checkHashLocation();
    this.resizeTextarea();
  }
}

/** Export PressCenter page class instance by default */
export default new PressCenter();
