/**
 * Website's disabilities scripts.
 *
 * @module Disabilities
 */


/** Import utils */

export class Disabilities {
  /**
   * Cache data.
   */
  constructor() {
    // jQuery objects
    this.imgArray = ['.banner__img', '.banner-secondary__img', '.banner-btn__img', '.article__banner-img', 'img', '.google-map'];
    this.$body = $('body');
    this.$disabilitiesItems = $('.disabilities__item');
    this.$disabilitiesContrast = $('.disabilities__item-contrast');
    this.$disabilitiesContrastDesc = $('.disabilities__desc-contrast');
    this.$disabilitiesBlack = $('.disabilities__item-black');
    this.$disabilitiesBlackDesc = $('.disabilities__desc-black');
    this.$disabilitiesText = $('.disabilities__item-text');
    this.$disabilitiesTextDesc = $('.disabilities__desc-text');
    this.$disabilitiesDesc = $('.disabilities__desc');
    this.$btnSwitch = $('.btn__switch');

    // jQuery classes
    //this.$allImg = document.querySelectorAll('img');
    this.disabilitiesItemsWrapper = '.disabilities__item-wrapper';
    this.disabilitiesDesc = '.disabilities__desc';
  }

  // Animate items on hover
  animateItems() {
    const _this = this;

    this.$disabilitiesItems.on('mouseenter', function() {
      //$(this).closest(_this.disabilitiesItemsWrapper).find(_this.disabilitiesDesc).removeClass('disabilities__desc-disabled');

      $(this).closest(_this.disabilitiesItemsWrapper).find(_this.disabilitiesDesc)
              .animate({ left: "0%" }, 300);
    });

    this.$disabilitiesItems.on('mouseleave', function() {
      const $that = $(this);

      $(this).closest(_this.disabilitiesItemsWrapper).find(_this.disabilitiesDesc)
              .animate({ left: "-100%" }, 300, function() {
                //$(this).addClass('disabilities__desc-disabled');
              });
    });
  }

  // grayscaleOn
  grayscaleOn() {
    if ( $('body').hasClass('switch-to-black') ){
        console.log('gray');
        let img = ['.banner__img', '.banner-secondary__img', '.banner-btn__img', '.article__banner-img', 'img', '.google-map']
        $.each( img, function(index, item) {
            $(item).each(function() {
                $(this).toggleClass('grayscale');
            });
        });
    }
  }
  // Toggle Black & White class when user clicks on drop icon
  toggleBlackWhite() {
    const _this = this;

    this.$disabilitiesBlack.add(this.$disabilitiesBlackDesc).on('click', function(e) {
      e.preventDefault();

      // Remove active class from all disability items
      _this.$disabilitiesItems.each(function() {
        $(this).removeClass('disabilities__item-current');
      });

      // Add active class to the current disability item
      $(this).addClass('disabilities__item-current');

      $.each(_this.imgArray, function(index, item) {
        $(item).each(function() {
          $(this).toggleClass('grayscale');
        });
      });

      _this.$body.removeClass('global_blue-white switch-to-blue global_big-font-size switch-to-big');
      _this.$body.toggleClass('global_black-white switch-to-black');

      // if ($('body').hasClass('switch-to-black')) {
      //   $('.header__social-logo-icon').each(function() {
      //     if (!$(this).attr('src').includes('black')) {
      //       const newIconSrc = $(this).attr('src').split('.')[0] + '-black.svg';
      //       $(this).attr('src', newIconSrc);
      //     }
      //   });
      // } else {
      //   $('.header__social-logo-icon').each(function() {
      //     const newIconSrc = $(this).attr('src').split('-black')[0] + '.svg';
      //     $(this).attr('src', newIconSrc);
      //   });
      // }

    });
  }

  // Toggle Blue & White class when user clicks on contrast icon
  toggleBlueWhite() {
    const _this = this;

    this.$disabilitiesContrast.add(this.$disabilitiesContrastDesc).on('click', function(e) {
      e.preventDefault();

      // Remove active class from all disability items
      _this.$disabilitiesItems.each(function() {
        $(this).removeClass('disabilities__item-current');
      });

      // Add active class to the current disability item
      $(this).addClass('disabilities__item-current');

      $.each(_this.imgArray, function(index, item) {
        $(item).each(function() {
          $(this).removeClass('grayscale');
        });
      });

      _this.$body.removeClass('global_black-white switch-to-black global_big-font-size switch-to-big');
      _this.$body.toggleClass('global_blue-white switch-to-blue');

      // if ($('body').hasClass('switch-to-blue')) {
      //   $('.header__social-logo-icon').each(function() {
      //     if (!$(this).attr('src').includes('black')) {
      //       const newIconSrc = $(this).attr('src').split('.')[0] + '-black.svg';
      //       $(this).attr('src', newIconSrc);
      //     }
      //   });
      // } else {
      //   $('.header__social-logo-icon').each(function() {
      //     const newIconSrc = $(this).attr('src').split('-black')[0] + '.svg';
      //     $(this).attr('src', newIconSrc);
      //   });
      // }
    });
  }

  // Toggle Big font size class when user clicks on text icon
  toggleBigFont() {
    const _this = this;

    this.$disabilitiesText.add(this.$btnSwitch).add(this.$disabilitiesTextDesc).on('click', function(e) {
      e.preventDefault();

      // Remove active class from all disability items
      _this.$disabilitiesItems.each(function() {
        $(this).removeClass('disabilities__item-current');
      });

      _this.$body.removeClass('global_black-white switch-to-black global_blue-white switch-to-blue');
      _this.$body.toggleClass('global_big-font-size switch-to-big');

      // if ($('body').hasClass('switch-to-big')) {
      //   $('.header__social-logo-icon').each(function() {
      //     if ($(this).attr('src').includes('black')) {
      //       const newIconSrc = $(this).attr('src').split('-black')[0] + '.svg';
      //       $(this).attr('src', newIconSrc);
      //     }
      //   });
      // }
    });
  }

  // Cross-browser grayscale img ie11+
  grayScale(imgObj) {
    var canvas = document.createElement('canvas');
    var canvasContext = canvas.getContext('2d');

    var imgW = imgObj.width;
    var imgH = imgObj.height;
    canvas.width = imgW;
    canvas.height = imgH;

    canvasContext.drawImage(imgObj, 0, 0);
    var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

    for(var y = 0; y < imgPixels.height; y++){
        for(var x = 0; x < imgPixels.width; x++){
            var i = (y * 4) * imgPixels.width + x * 4;
            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
            imgPixels.data[i] = avg;
            imgPixels.data[i + 1] = avg;
            imgPixels.data[i + 2] = avg;
        }
    }
    canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    return canvas.toDataURL();
  }

  // Initialize Cross-browser grayscale function
  // initGrayscale() {
  //   for (var i = 0; i < this.$allImg.length; i++) {
  //     this.$allImg[i].src = this.grayScale(this.$allImg[i]);
  //   }
  // }

  /**
   * Initialize disabilities scripts.
   *
   * @returns {Disabilities}
   */
  init() {
    this.animateItems();
    this.toggleBlackWhite();
    this.toggleBlueWhite();
    this.toggleBigFont();
    this.grayscaleOn();
  }
}

/** Export initialized dot script by default */
export default new Disabilities().init();
