/**
 * Website's ajax request scripts.
 *
 * @module Subscribe
 */

export class Subscribe {
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

  /**
   * Validate form and send via ajax
   *
   * @param  {Obj} $form             Form element
   * @param  {Obj} $resultElement    Element for error handeling
   * @return {[type]}                [description]
   */
  ajaxMailChimpForm($form, $resultElement) {
    $form.on('submit', (e) => {
      e.preventDefault();
      var email = $form.find("input[type='email']").val();

      if ($.trim(email).length == 0 || !this.isValidEmail(email)) {
        $resultElement.addClass('invalid');
      }
      else {
        $resultElement.removeClass('invalid');
        $resultElement.val('');

        this.initSubscribePopup();

        // this.submitSubscribeForm($form, $resultElement);
      }
    });
  }

  // Validate email adress with regexp pattern
  isValidEmail(email) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    return filter.test(email);
  }

  // Init Popup on success news subscribe
  initSubscribePopup() {
    this.$subscribeFormBtn.popup({
      openOnClick: false
    });

    const popupInstance = this.$subscribePopup.data('popup');
    popupInstance.open();
  }

  // Submit the form with an ajax/jsonp request.
  // Based on http://stackoverflow.com/a/15120409/215821
  submitSubscribeForm($form, $resultElement) {
    $.ajax({
      type: $form.attr("method"),
      url: $form.attr("action"),
      data: $form.serialize(),
      cache: false,
      dataType: "jsonp",
      jsonp: "c", // trigger MailChimp to return a JSONP response
      contentType: "application/json; charset=utf-8",
      error: (error) => {
        alert("Could not connect to the registration server.");
      },
      success: (data) => {
        alert('success!');
      }
    });
  }

  // Close subscribe popup when user clicks on Thanks btn
  closeSubscribePopup() {
    const _this = this;

    this.$subscribePopupCloseBtn.on('click tap', function() {
      const popupInstance = _this.$subscribePopup.data('popup');
      popupInstance.close();
    });
  }


  /**
   * Initialize ajax scripts.
   *
   * @returns {Subscribe}
   */
  init() {
    this.ajaxMailChimpForm(this.$subscribeForm, this.$subscribeInput);
    this.closeSubscribePopup();
  }
}

/** Export initialized dot script by default */
export default new Subscribe().init();
