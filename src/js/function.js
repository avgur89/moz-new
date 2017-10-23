/**
 * Function page scripts.
 *
 * @module Function
 */

/** Import utils */
import {
  $document, winWidth
} from 'js/modules/dev/helpers';

export class Function {
  /**
   * Cache data
   */
  constructor() {
    // jQuery objects
    this.$formInput = $(".form-input");
    this.$upload = $(".upload__input");

    // jQuery classes
    this.formGroup = '.form-group';
    this.formLabel = '.form-label';
  }

  // Fixed header scroll on desktop
  headerFixed () {
    const $headerHeight = $('.header');
    const $headerTop = $('.header__row_top');

    $document.on('scroll', function() {
      if ($(this).scrollTop() > $headerTop.outerHeight()) {
        $headerHeight.addClass('header__fixed');
      } else {
        $headerHeight.removeClass('header__fixed');
      }
    });

    return this;
  }

  // show error on form inputs
  formErorr() {
    const _this = this;

    this.$formInput.on('input', function() {
      if ($(this).val() !== '') {
        $(this).closest(_this.formGroup).find(_this.formLabel).hide();
      } else {
        $(this).closest(_this.formGroup).find(_this.formLabel).show();
      }
    });
  }

  // upload files
  uploadFiles() {
    let filesArray = [];

    this.$upload.on('change', function() {
      const _this = $(this);

      $.each($(this).prop('files'), function(index, file) {
        let filename = file['name'];

        if (filesArray.indexOf(filename) === -1) {
          filesArray.push(filename);
        }
      });

      $('.upload__list').empty();

      $.each(filesArray, function(index, file) {
        let content = `
          <div class="download" data-file=${file}>
            <a class="download__link" href="#!" targer="_blank">
              <i class="download__link-icon fill_blue-light-to-black fill_contrast_blue-light-to-black">
                <svg class="icon icon__document">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon__document"></use>
                </svg>
              </i>
              <div class="download__link-desc regular font_blue-light-to-black font_contrast_blue-light-to-black">${file}</div>
            </a>
            <div class="download__close bg_blue-light-to-black bg_contrast_blue-light-to-black">
              <i class="download__close-icon fill_white">
                <svg class="icon icon__close">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon__close"></use>
                </svg>
              </i>
            </div>
          </div>`;

          $('.upload__list').append(content);

          $('.download__close').on('click tap', function(e) {
            e.preventDefault();
            let dataAttr = $(this).closest('.download').attr('data-file');

            filesArray.splice($.inArray(dataAttr, filesArray), 1);
            $(this).closest('.download').remove();
          });
      });
    });
  }

  showForm() {
    $('.vacancy-respond__btn').add($('.vacancy__form-close')).on('click tap', function(e) {
      e.preventDefault();

      $('.vacancy-respond__btn').toggleClass('vacancy-respond__btn-active');
      $('.vacancy__form-wrapper').slideToggle('slow');
    });
  }


  /**
   * Initialize Function page scripts.
   */
  init() {
    this.headerFixed();
    this.formErorr();
    //this.uploadFiles();
    this.showForm();
  }
}


/** Export Function page class instance by default */
export default new Function().init();
