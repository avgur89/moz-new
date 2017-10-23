/**
 * Website's Online Helper plugin scripts.
 *
 * @module OnlineHelper
 */


/** Import utils */
import {
  $window,
  $document,
  winWidth
} from '../modules/dev/helpers';

export class OnlineHelper {
  /**
   * Cache data.
   */
  constructor() {
    this.$helperQA = $('.helper__QA');
    this.$renderNewsBlock = $('.helper__render');

    // STAGE variables
    this.$helperStage = $('.helper__quiz-stage');
    this.helperStageActive = 'helper__quiz-stage-active';
    this.$helperStageIndex = $('.helper__quiz-stage-index');
    this.helperStageIndexActive = 'helper__quiz-stage-index-active';

    // QUESTIONS variables
    this.$helperQuestion = $('.helper__QA-question');
    this.$helperStageAnswer = $('.helper__quiz-stage-answer');
    this.$helperNextBtn = $('.helper__QA-next');
    this.$helperPrevBtn = $('.helper__QA-prev');

    // DROPDOWN variables
    this.$helperDropdown = $('.helper__dropdown');
    this.$categoriesDropdown = $('.categories__dropdown');
    this.$helperDropdownItem = $('.helper__dropdown-item');
    this.$helperDropdownTitle = $('.helper__dropdown-title-text');
    this.$helperDropdownList = $('.helper__dropdown-list');
    this.$helperDropdownScrollDown = $('.helper__dropdown-scroll-down');
    this.$helperDropdownScrollUp = $('.helper__dropdown-scroll-up');
    this.$helperDropdownListHeight = '';
    this.newDropdownTitle = '';
    this.interval;
  }

  // Initialize scroll bar plugin for banners
  initScrollBar() {
    const _this = this;

      $(window).on("load", function() {
        _this.$helperDropdownList.mCustomScrollbar({
          theme: "dark-thin",
          mouseWheel:{ enable: true }
        });

        $('.categories__dropdown-list').mCustomScrollbar({
          theme: "dark-thin",
          mouseWheel:{ enable: true }
        });
      });
  }

  // Initialize dropdown
  initDropdown() {
    const _this = this;

    $(document).click(function (e) {
      e.stopPropagation();
      $(_this.$helperDropdown)
        .not($(_this.$helperDropdown).has($(e.target)))
        .removeClass('helper__dropdown-open');
    });

    // Toggle helper dropdown on click
    this.$helperDropdown.on('click tap', function(e) {
      e.preventDefault();

      $(this).toggleClass('helper__dropdown-open');

      if ($window.width() <= 1200) {
        _this.$helperDropdownScrollUp.fadeIn();
      }



      // Add list height value when dropdown has been shown
      _this.$helperDropdownListHeight = +_this.$helperDropdownList[0].scrollHeight - 200; // -200 max-height in styles

      // If dropdown closed hide scrollUp element and set scroll position to 0
      if (!$(this).hasClass('helper__dropdown-open')) {
        _this.$helperDropdownScrollUp.fadeOut();
        _this.$helperDropdownList.scrollTop(0);
        _this.$helperDropdownScrollDown.fadeIn();
      }

    });

    // Toggle helper dropdown on click
    this.$categoriesDropdown.on('click tap', function(e) {
      e.preventDefault();

      $(this).toggleClass('categories__dropdown-open');
    });

    // Remove onclick event on scrollDown and scrollUp buttons
    this.$helperDropdownScrollDown.add(this.$helperDropdownScrollUp).on('click', function() { return false; });

    // Scrolls to bottom dropdown list on hover
    this.$helperDropdownScrollDown.on('mouseenter tap', function(e) {
      e.stopPropagation(); e.preventDefault();

        return false;

      _this.scrollDown();
    });

    // Scrolls to top dropdown list on hover
    this.$helperDropdownScrollUp.on('mouseenter tap', function(e) {
      e.stopPropagation(); e.preventDefault();

        return false;

      _this.scrollUp();
    });

    // Stops scrolling down when mouseleave
    this.$helperDropdownScrollDown.on('mouseleave touchend', function(e) {
      e.stopPropagation(); e.preventDefault();
      clearInterval(_this.interval);
    });

    // Stops scrolling up when mouseleave
    this.$helperDropdownScrollUp.on('mouseleave touchend', function(e) {
      e.stopPropagation(); e.preventDefault();
      clearInterval(_this.interval);
    });
  }

  // Scrolls down on hover answers dropdown list
  scrollDown() {
    const _this = this;

    _this.interval = setInterval(function() {
      // Current position
      const pos = _this.$helperDropdownList.scrollTop();

      // Check if list scrolled to bottom hide scrollDown element
      if (pos >= _this.$helperDropdownListHeight) {
        _this.$helperDropdownScrollDown.fadeOut();
        _this.$helperDropdownScrollUp.fadeIn();
        clearInterval(_this.interval);
      }

      _this.$helperDropdownList.scrollTop(pos + 15);
    }, 60);
  }

  // Scrolls up on hover answers dropdown list
  scrollUp() {
    const _this = this;

    _this.interval = setInterval(function() {
      // Current position
      const pos = _this.$helperDropdownList.scrollTop();

      // Check if list scrolled to the top hide scrollUp element
      if (pos == 0) {
        _this.$helperDropdownScrollDown.fadeIn();
        _this.$helperDropdownScrollUp.fadeOut();
        clearInterval(_this.interval);
      }

      _this.$helperDropdownList.scrollTop(pos - 15);
    }, 60);
  }

  // Set first stage as a default stage
  defaultStage() {
    this.$helperQA.first().addClass('helper__QA-current');

    // Add styling classes to the current stage
    this.$helperStage.first().addClass(this.helperStageActive);
    this.$helperStageIndex.first().addClass(this.helperStageIndexActive);

    $.each(this.$helperStageIndex, function() {
      $(this).css('pointer-events', 'none');
    });
  }

  // Remove all active stages
  _disableAllStages() {
    const _this = this;

    $.each(this.$helperQA, function() {
      $(this).removeClass('helper__QA-current');
    });

    $.each(this.$helperStageIndex, function() {
      $(this).css('pointer-events', 'none');
      $(this).removeClass(_this.helperStageIndexActive);
    });

    $.each(this.$helperStage, function() {
      $(this).css('pointer-events', 'none');
      $(this).removeClass(_this.helperStageActive);
    });

    this.$helperDropdownTitle.text('Оберіть відповідь');
  }

  // Get current user answer
  getCurrentAnswer() {
    const _this = this;

    // Set current dropdown item text to the dropdown title
    this.$helperDropdownItem.on('click tap', '.helper__dropdown-link', function(e) {
      e.preventDefault();

      _this.newDropdownTitle = $(this).text();
      _this.$helperDropdownTitle.text(_this.newDropdownTitle);

      // Enable next stage button
      _this.$helperNextBtn.attr('disabled', false);
    });
  }

  // Next stage
  nextStage() {
    const _this = this;

    this.getCurrentAnswer();

    this.$helperNextBtn.on('click touchstart tap', function(e) {
      e.stopPropagation(); e.preventDefault();

      const currentStage = $(this).closest('.helper__QA').attr('id');
      const currentStageIndex = +currentStage.split('-').splice(1, 1);
      const nextStage = 'stage-' + (+currentStage.split('-').splice(1, 1) + 1);
      const currentQuestion = $(this).closest('.helper__QA').find('.helper__QA-question').text().split('?').splice(0, 1).join(' ');
      const currentAnswer = `${currentQuestion}: ${_this.newDropdownTitle.toLowerCase()}`;
      const prevStage = 'stage-' + (+currentStage.split('-').splice(1, 1) - 1);
      const prevStageIndex = +prevStage.split('-').splice(1, 1);
      var i = 0;

      // Add answer text to the current stage
      $('.helper__quiz-stages').find(`[data-stage-index='${currentStage}']`).find('.helper__quiz-stage-answer').text(currentAnswer);

      _this._disableAllStages();

      // Enable previous stage index click
      while(i <= currentStageIndex && currentStageIndex !== 0) {
        $('.helper__quiz-stages').find(`[data-index='stage-${i}']`).css('pointer-events', 'auto').addClass(_this.helperStageIndexActive);
        $('.helper__quiz-stages').find(`[data-stage-index='stage-${i}']`).css('pointer-events', 'auto').addClass(_this.helperStageActive);
        i++;
      }

      // Check if current stage not the first stage, then show prev button
      if (currentStage !== 'stage-final') {
        _this.$helperPrevBtn.fadeIn();
      }

      // Check if current stage is the final stage, then render news
      if (currentStageIndex == _this.$helperStage.length - 1) {
        // Add styles for final stage
        $('.helper__quiz-stages').find('[data-stage-index="stage-final"]').addClass(_this.helperStageActive);
        $('.helper__quiz-stages').find('[data-index="stage-final"]').addClass(_this.helperStageIndexActive);

        _this.renderNews();
      }

      // Show new stage
      $("#" + nextStage).addClass('helper__QA-current');

      // Add styles for new stage
      $('.helper__quiz-stages').find(`[data-stage-index='${nextStage}']`).addClass(_this.helperStageActive);
      $('.helper__quiz-stages').find(`[data-index='${nextStage}']`).addClass(_this.helperStageIndexActive);

      // Disable next stage button
      _this.$helperNextBtn.attr('disabled', true);
    });
  }

  // Previous stage
  prevStage() {
    const _this = this;

    this.$helperPrevBtn.on('click touchstart tap', function(e) {
      e.stopPropagation(); e.preventDefault();

      const currentStage = $(this).closest('.helper__QA').attr('id');
      const currentStageIndex = +currentStage.split('-').splice(1, 1);
      const prevStage = 'stage-' + (+currentStage.split('-').splice(1, 1) - 1);
      const nextStage = 'stage-' + (+currentStage.split('-').splice(1, 1) + 1);
      var i = 0;

      _this._disableAllStages();

      // Enable previous stage index click
      while(i <= currentStageIndex - 1 && currentStageIndex !== 0) {
        $('.helper__quiz-stages').find(`[data-index='stage-${i}']`).css('pointer-events', 'auto').addClass(_this.helperStageIndexActive);
        $('.helper__quiz-stages').find(`[data-stage-index='stage-${i}']`).css('pointer-events', 'auto').addClass(_this.helperStageActive);
        i++;
      }

      // Check if previous stage is the first stage, then hide prev button
      if (prevStage == 'stage-1') {
        _this.$helperPrevBtn.fadeOut();
      }

      // Show new stage
      $("#" + prevStage).addClass('helper__QA-current');

      // Add styles for new stage
      $('.helper__quiz-stages').find(`[data-stage-index='${prevStage}']`).addClass(_this.helperStageActive);
      $('.helper__quiz-stages').find(`[data-index='${prevStage}']`).addClass(_this.helperStageIndexActive);

      // Remove styles from prev stage
      $('.helper__quiz-stages').find(`[data-stage-index='${currentStage}']`).removeClass(_this.helperStageActive);
      $('.helper__quiz-stages').find(`[data-index='${currentStage}']`).removeClass(_this.helperStageIndexActive);

      // Add answer text to the current stage
      $('.helper__quiz-stages').find(`[data-stage-index='${prevStage}']`).find('.helper__quiz-stage-answer').text('');

      // Disable next stage button
      _this.$helperNextBtn.attr('disabled', true);
    });
  }

  // Click on current stage index
  handleStageIndex() {
    const _this = this;

    this.$helperStageIndex.on('click touchstart tap', function(e) {
      e.stopPropagation(); e.preventDefault();

      const thisIndex = $(this).attr('data-index');
      const currentStage = $(this).closest('.helper__quiz').find(`[data-qa-index='${thisIndex}']`);
      const currentStageIndex = 'stage-' + (+currentStage.attr('id').split('-').splice(1, 1));
      const currentIndex = +currentStageIndex.split('-').splice(1, 1);
      const nextStage = 'stage-' + (+currentStage.attr('id').split('-').splice(1, 1) + 1);
      const nextStageIndex = +nextStage.split('-').splice(1, 1);
      const prevStage = 'stage-' + (+currentStage.attr('id').split('-').splice(1, 1) - 1);
      const prevStageIndex = +prevStage.split('-').splice(1, 1);
      var i = 0;
      var j = +currentIndex;

      _this._disableAllStages();

      // Enable previous stage index click
      while(i <= prevStageIndex && prevStageIndex !== 0) {
        $('.helper__quiz-stages').find(`[data-index='stage-${i}']`).css('pointer-events', 'auto').addClass(_this.helperStageIndexActive);
        $('.helper__quiz-stages').find(`[data-stage-index='stage-${i}']`).css('pointer-events', 'auto').addClass(_this.helperStageActive);
        i++;
      }

      while(j <= _this.$helperStage.length - 1) {
        $('.helper__quiz-stages').find(`[data-stage-index='stage-${j}']`).find('.helper__quiz-stage-answer').text('');
        j++;
      }

      // Show new stage
      currentStage.addClass('helper__QA-current');

      // Hide previous button if current stage is stage-1
      if (currentStageIndex == 'stage-1') {
        _this.$helperPrevBtn.fadeOut();
      }

      // Hide render news when move back
      if (prevStage !== 'final-stage') {
        _this.$renderNewsBlock.fadeOut();
        // Remove styles from final stage
        $('.helper__quiz-stages').find("[data-stage-index='stage-final']").removeClass(_this.helperStageActive);
        $('.helper__quiz-stages').find("[data-index='stage-final']").removeClass(_this.helperStageIndexActive);
      }

      _this.$helperNextBtn.attr('disabled', true);

      // Add styles for new stage
      $('.helper__quiz-stages').find(`[data-stage-index='${thisIndex}']`).addClass(_this.helperStageActive);
      $('.helper__quiz-stages').find(`[data-index='${thisIndex}']`).addClass(_this.helperStageIndexActive);

      // Remove styles from prev stage
      $('.helper__quiz-stages').find(`[data-stage-index='${nextStage}']`).removeClass(_this.helperStageActive);
      $('.helper__quiz-stages').find(`[data-index='${nextStage}']`).removeClass(_this.helperStageIndexActive);

      // Add answer text to the current stage
      $('.helper__quiz-stages').find(`[data-stage-index='${thisIndex}']`).find('.helper__quiz-stage-answer').text('');
    });
  }

  // Render latest news accordingly to user QA
  renderNews() {
    this.$renderNewsBlock.fadeIn();
  }


  /**
   * Initialize Online Helper scripts.
   *
   * @returns {OnlineHelper}
   */
  init() {
    this.initDropdown();
    this.defaultStage();
    this.nextStage();
    this.prevStage();
    this.handleStageIndex();
    this.initScrollBar();
  }
}

/** Export initialized alphabet script by default */
export default new OnlineHelper().init();
