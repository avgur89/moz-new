/**
 * Register page scripts.
 *
 * @module Register
 */

/** Import utils */

export class Register {
  /**
   * Cache data.
   */
  constructor() {
    // jQuery objects
    this.$registerUnitText = $('.register__unit-text');
    this.$upload = $(".appeals__form-upload-input");

    // jQuery classes
    this.registerUnit = '.register__unit';
    this.registerUnitIcon = '.register__unit-icon';
    this.filesArray = [];
  }

  // upload files
  uploadFiles() {
    const $this = this;

    this.$upload.on('change', function(event) {
      const _this = $(this);
      const files = event.originalEvent.target.files;

      $.each(files, function(index, file) {
        let filename = file['name'];

        if ($this.filesArray.indexOf(filename) === -1) {
           $this.filesArray.push(file);
        }
      });

      $('.appeals__form-upload-list').empty();

      $.each($this.filesArray, function(index, file) {
        let content = `
          <div class="appeals__form-download" data-file=${file.name}>
            <a class="appeals__form-download-link" href="#!" targer="_blank">
              <i class="appeals__form-download-link-icon fill_blue-light-to-black fill_contrast_blue-light-to-black">
                <svg class="icon icon__document">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon__document"></use>
                </svg>
              </i>
              <div class="appeals__form-download-link-desc regular font_blue-light-to-black font_contrast_blue-light-to-black">${file.name}</div>
            </a>
            <div class="appeals__form-download-close bg_blue-light-to-black bg_contrast_blue-light-to-black">
              <i class="appeals__form-download-close-icon fill_white">
                <svg class="icon icon__close">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon__close"></use>
                </svg>
              </i>
            </div>
          </div>`;

        $('.appeals__form-upload-list').append(content);
      });

      $('.appeals__form-download-close').on('click tap', function(e) {
        e.preventDefault();
        let dataAttr = $(this).closest('.appeals__form-download').attr('data-file');

        $.each($this.filesArray, function(index, file) {
          if (file.name.includes(dataAttr)) {
            $this.filesArray.splice(index, 1);
          }
        });

        $(this).closest('.appeals__form-download').remove();
      });
      
      console.log($this.filesArray);
    });
  }

  // Add first unit item letter to the icon block
  unitIconLetter() {
    const _this = this;

    $(window).on('load', function() {
      _this.$registerUnitText.each(function() {
        const itemLetter = $(this).text().slice(0, 1);

        $(this).closest(_this.registerUnit).find(_this.registerUnitIcon).text(itemLetter);
      });
    });
  }

  // Resize textarea according to the content
  resizeTextarea() {
    $.each($('.textarea'), function () {
      let resizeTextarea = function (el) {
        if (el.scrollHeight > 76) {
          $(el).css('height', '').css('height', el.scrollHeight);
          if (!el.value) {
            $(el).css('height', '76');
          }
        }
      };

      resizeTextarea(this);
      $(this).on('keyup input', function () { resizeTextarea(this); });
    });
  }

  // Toggle input field on checkbox
  showMoreCheckbox() {
    $('.checkbox__more span').on('click tap', function() {
      const parentEl = $(this).closest('.checkbox__more');
      const inputEl = parentEl.find('.checkbox__more-input');

      parentEl.toggleClass('show');

      if (parentEl.hasClass('show')) {
        inputEl.fadeIn(100, function() {
          parentEl.addClass('is-active');
          parentEl.find('.form-label').show();
        });
      } else {
        parentEl.removeClass('is-active');
        setTimeout(function() {
          inputEl.hide();
        }, 500);
        parentEl.find('.form-label').hide();
      }


      // if (parentEl.hasClass('is-active')) {
      //   inputEl.slideDown(400);
      // } else {
      //   inputEl.slideUp(400);
      // }
    });
  }

  /**
   * Initialize Register page scripts.
   */
  init() {
    this.unitIconLetter();
    //this.uploadFiles();
    this.resizeTextarea();
    this.showMoreCheckbox();
  }
}

/** Export Register page class instance by default */
export default new Register();
