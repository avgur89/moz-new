/**
 * About Ministry page scripts.
 *
 * @module AboutMinistry
 */

/** Import utils */
import {
  $document, $window, winWidth
} from 'js/modules/dev/helpers';

export class AboutMinistry {
  /**
   * Cache data.
   */
  constructor() {
    // jQuery objects
    this.$vacancyFormInput = $('.top_vacancy__form-input');
    this.$vacancyFormSubmit = $('.top_vacancy__form-submit');
    this.$accordionWrapper = $('.accordion__wrapper');
    this.$unitItemText = $('.unit__text');
    this.$unitHints = $('.unit__hint');
    this.$unitIcons = $('.unit__icon');
    this.$unitTexts = $('.unit__text');
    this.$unitHintCLose = $('.unit__hint-close');
    this.$careerDropdown = $('.career__filter-dropdown');
    this.$accordionTitle = $('.accordion__qa-title');
    this.$vacancyFormSubmitButton = $('.top_vacancy__form-submit-control');

    // jQuery classes
    this.vacancyForm = '.top_vacancy__form';
    this.vacancyFormInput = '.top_vacancy__form-input';
    this.vacancyFormSubmitButton = '.top_vacancy__form-submit-control';
    this.vacancyFormSubmitActive = 'top_vacancy__form-submit-active';
    this.unitContent = '.unit__cnt';
    this.unitIcon = '.unit__icon';
    this.unitHint = '.unit__hint';
    this.unitText = '.unit__text';
    this.accordionItem = '.accordion__qa-item';
    this.accordionPanel = '.accordion__qa-panel';
    this.accordionActive = 'accordion__qa-title-active';
  }

  // Animate input on search button click
  animateForm() {
    const _this = this;

    if ($(window).width() <= 1200) {
      console.log($(window).width())
      // change input type to submit
      this.$vacancyFormSubmitButton.prop('type', 'submit');
      // add active styling class to submit button
      this.$vacancyFormSubmit.addClass(this.vacancyFormSubmitActive);
    }

    this.$vacancyFormSubmit.on('click tap', function() {
      // animate input field
      $(this).closest(_this.vacancyForm).find(_this.vacancyFormInput)
              .animate({ right: "0" }, 300);

      // change input type to submit
      $(this).find(_this.vacancyFormSubmitButton).prop('type', 'submit');
      // add active styling class to submit button
      _this.$vacancyFormSubmit.addClass(_this.vacancyFormSubmitActive);
    });
  }

  // Add first unit item letter to the icon block
  unitIconLetter() {
    const _this = this;

    $(window).on('load', function() {
      _this.$unitItemText.each(function() {
        const itemLetter = $(this).text().slice(0, 1);

        $(this).closest(_this.unitContent).find(_this.unitIcon).text(itemLetter);
      });
    });
  }

  // Toggle unit hint on click
  toggleUnitHint() {
    const _this = this;

    this.$unitItemText.add(_this.$unitHintCLose).on('click tap touchstart', function(e) {
      e.stopPropagation(); e.preventDefault();

      const unitCnt = $(this).closest(_this.unitContent);
      const currentHint = unitCnt.find(_this.unitHint);
      const currentUnitIcon = unitCnt.find(_this.unitIcon);
      const currentUnitText = unitCnt.find(_this.unitText);
      const linkId = currentHint.attr('id');

      // hide all hints
      _this.$unitHints.not(currentHint).fadeOut();
      // remove all active classes
      _this.$unitIcons.not(currentUnitIcon).removeClass('unit__icon-active');
      _this.$unitTexts.not(currentUnitText).removeClass('unit__text-active');

      // show current hint
      currentHint.fadeToggle();
      // toggle active styles for hint icon and text
      unitCnt.find(_this.unitIcon).toggleClass('unit__icon-active');
      unitCnt.find(_this.unitText).toggleClass('unit__text-active');

      // add href according to the popup-id
      $(this).attr('href', `#${linkId}`);
      window.location.hash = `#!${linkId}`;
    });
  }

  // Check if current location has popup id and open it
  checkHashLocation() {
    const _this = this;
    const currentId = window.location.href.split('popup-')[1];

    if (currentId !== undefined) {
      const currentHint = $(`#popup-${currentId}`);

      currentHint.fadeIn();
      currentHint.closest(_this.unitContent).find(_this.unitIcon).addClass('unit__icon-active');
      currentHint.closest(_this.unitContent).find(_this.unitText).addClass('unit__text-active');
    }
  }

  // Initialize dropdown
  initDropdown() {
    // Toggle dropdown on click
    this.$careerDropdown.on('click touchstart tap', function(e) {
      e.preventDefault();

      $(this).toggleClass('career__filter-dropdown-open');
    });
  }

  // Initialize accordion
  initAccordion() {
    const _this = this;

    this.$accordionTitle.on('click', function() {
      const panel = $(this).closest(_this.accordionItem).find(_this.accordionPanel);

      $(this).toggleClass(_this.accordionActive);
      panel.slideToggle(300);
    });
  }


  /**
   * Initialize About Ministry page scripts.
   */
  init() {
    this.animateForm();
    this.unitIconLetter();
    this.toggleUnitHint();
    this.initDropdown();
    this.initAccordion();
    this.checkHashLocation();
  }
}

/** Export AboutMinistry page class instance by default */
export default new AboutMinistry();
