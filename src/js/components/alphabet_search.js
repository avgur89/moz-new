/**
 * Website's Alphabet plugin scripts.
 *
 * @module Alphabet
 */


/** Import utils */
import {
  $window,
  $document
} from '../modules/dev/helpers';

export class Alphabet {
  /**
   * Cache data.
   */
  constructor() {
    this.$alphabet = $('.alphabet');
    this.$helper = $('.helper');
    this.$alphabetSwitchBtn = $('.online-helper__form-switch-btn');
    this.$tabs = $('.alphabet__tab');
    this.$tabsMobile = $('.alphabet__tab-mobile');
    this.$currentTabMobile = $('.alphabet__current-tab-mobile');
    this.$tabContent = $('.alphabet__tab-content');
    this.$alphabetCloseIcon = $('.alphabet__close-icon');
    this.$alphabetChooseLetter = $('.alphabet__choose-letter');
    this.$popupAlphabet = $('[data-popup-id="alphabet"]');
    this.$popupCloseBtn = $('.popup__close-alphabet');

    this._disableAllTabs = this._disableAllTabs.bind(this);
    this.defaultTab = this.defaultTab.bind(this);
  }

  // Show or Hide alphabet block on button click
  toggleAlphabet() {
    const _this = this;

    this.$alphabetSwitchBtn.add(this.$alphabetCloseIcon).on('click tap touchstart', function(e) {
      e.stopPropagation(); e.preventDefault();

      _this.$helper.fadeToggle();
      _this.$alphabet.fadeToggle();
      _this.$alphabetSwitchBtn.toggleClass('online-helper__form-switch-btn--active');
    });
  }

  // Remove all active classes for all tabs
  _disableAllTabs() {
    // Hide all elements with tab content and remove active class styling
    $.each(this.$tabs, function() {
      $(this).removeClass('alphabet__tab-current');
    });

    $.each(this.$tabContent, function() {
      $(this).removeClass('alphabet__tab-content-current');
    });
  }

  // Set first tab as a default tab to be opened
  defaultTab() {
    const currentTabMobileLetter = this.$tabsMobile.first().attr('data-letter');

    this.$currentTabMobile.text(currentTabMobileLetter);
    this.$tabs.first().addClass('alphabet__tab-current');
    this.$tabContent.first().addClass('alphabet__tab-content-current');
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  activeTab() {
    const _this = this;

    this.$tabs.on('click touchstart tap', function(e) {
      e.stopPropagation(); e.preventDefault();

      const tabId = $(this).attr('data-tab');

      _this._disableAllTabs();

      $(this).addClass('alphabet__tab-current');
      $("#" + tabId).addClass('alphabet__tab-content-current');
    });

    this.$alphabetChooseLetter.on('click touchstart tap', (e) => {
      e.stopPropagation(); e.preventDefault();

      this.openAlphabetPopup();
    });

    this.$popupCloseBtn.on('click touchstart tap', function(e) {
      e.stopPropagation(); e.preventDefault();

      _this.closeAlphabetPopup();
    });

    this.$tabsMobile.on('click touchstart tap', function(e) {
      e.stopPropagation(); e.preventDefault();

      const tabId = $(this).attr('data-tab');
      const letter = $(this).attr('data-letter');

      _this._disableAllTabs();
      _this.closeAlphabetPopup();
      _this.$currentTabMobile.text(letter);
      $("#" + tabId).addClass('alphabet__tab-content-current');
    });
  }

  // Open Popup when user clicks on 'Choose another letter' block on mobile
  openAlphabetPopup() {
    this.$alphabetChooseLetter.popup({
      openOnClick: false
    });

    const popupInstance = this.$popupAlphabet.data('popup');

    popupInstance.open();
  }

  // Close Popup when user clicks on letter
  closeAlphabetPopup() {
    const popupInstance = this.$popupAlphabet.data('popup');

    popupInstance.close();
  }

  // Initialize scroll bar plugin
  initScrollBar() {
    $(window).on("load", function(){
      $(".alphabet__tab-content").mCustomScrollbar({
        theme: "dark-thin",
        mouseWheel:{ enable: true }
      });
    });
  }

  /**
   * Initialize Alphabet scripts.
   *
   * @returns {Alphabet}
   */
  init() {
    this.defaultTab();
    this.activeTab();
    this.toggleAlphabet();
    this.initScrollBar();
  }

}

/** Export initialized alphabet script by default */
export default new Alphabet().init();
