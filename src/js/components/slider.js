/**
 * Website's ajax request scripts.
 *
 * @module Sliders
 */


/** Import utils */
import {
  $window,
  throttle
} from '../modules/dev/helpers';

export class Sliders {
  /**
   * Cache data.
   */
  constructor() {
    this.$sliders = $('.slider');
    this.$slidersWithRow = $('.slider_row');
    this.$slidersWithTwoRows = $('.slider_two_rows');
    this.$slidersWithThreeRows = $('.slider_three_rows');
    this.$slidersWithFourRows = $('.slider_four_rows');
    this.$gallerySlider = $('.sl__gallery-main');
    this.$gallerySliderThumb = $('.sl__gallery-thumb');
  }

  /**
   * Initialize slider.
   *
   * @return {[type]} [description]
   */
  initSliders() {
    // no sliders found
    if (!this.$sliders.length) return this;

    // initialize each slider
    this.$sliders.each(function () {
      if ( $(this).is(".slider_row") ) {
        $(this).slick({
          rows: 2,
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          adaptiveHeight: true,
          responsive: [
            {
              breakpoint: 2400,
              settings: "unslick"
            },
            {
              breakpoint: 1200,
              settings: {
                rows:2,
                slidesToScroll: 1,
                slidesToShow: 1
              }
            },
            {
              breakpoint: 768,
              settings: {
                rows: 1,
                slidesToScroll: 1,
                slidesToShow: 1
              }
            }
          ]
        });
      } else if ( $(this).is(".slider_two_rows") ) {
        $(this).slick({
          rows: 2,
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          adaptiveHeight: true,
          responsive: [
            {
              breakpoint: 2400,
              settings: "unslick"
            },
            {
              breakpoint: 768,
              settings: {
                rows: 2,
                slidesToScroll: 1,
                slidesToShow: 1
              }
            }
          ]
        });
      } else if ( $(this).is(".slider_three_rows") ) {
        $(this).slick({
          rows: 2,
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          adaptiveHeight: true,
          responsive: [
            {
              breakpoint: 2400,
              settings: "unslick"
            },
            {
              breakpoint: 768,
              settings: {
                rows: 3,
                slidesToScroll: 1,
                slidesToShow: 1
              }
            }
          ]
        });
      } else if ( $(this).is(".slider_four_rows") ) {
        $(this).slick({
          rows: 2,
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          adaptiveHeight: true,
          responsive: [
            {
              breakpoint: 2400,
              settings: "unslick"
            },
            {
              breakpoint: 768,
              settings: {
                rows: 4,
                slidesToScroll: 1,
                slidesToShow: 1
              }
            }
          ]
        });
      } else {
        $(this).slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          adaptiveHeight: true,
          responsive: [
            {
              breakpoint: 2400,
              settings: "unslick"
            },
            {
              breakpoint: 768,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          ]
        });
      }
    });
  }

  onResize() {
    // reinit sliders
    const reinitSliders = throttle(() => {
      this.$sliders.each(function () {
        $(this).slick('resize');
      });
    }, 250, this);

    // reinit sliders on resize
    $(window).on('resize orientationchange', reinitSliders);
  }

  // Initialize Photogallery slider
  initGallerySlider() {
    const _this = this;

    const settings = {
      slidesToShow: 7,
      slidesToScroll: 1,
      centerMode: false,
      infinite: true,
      focusOnSelect: true,
      arrows: false,
      variableWidth: true,
      centerPadding: '40px',
      asNavFor: '.sl__gallery-main'
    };

    this.$gallerySlider.slick({
      asNavFor: '.sl__gallery-thumb',
      arrows: true
    });

    if ($('.sl__gallery-thumb-item').length <= settings.slidesToShow * 2) {
      settings.centerMode = false;
      this.$gallerySliderThumb.slick(settings);
    } else {
      this.$gallerySliderThumb.slick(settings);
    }
  }


  /**
   * Initialize Home page scripts.
   */
  init() {
    this.initSliders();
    this.onResize();
    this.initGallerySlider();
  }
}

/** Export initialized dot script by default */
export default new Sliders().init();
