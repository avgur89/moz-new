/**
 * Website's common scripts.
 *
 * @module Common
 */

/** Import utils */
import {
    Resp,
    $body,
    $window,
    throttle,
    $document,
    css
} from '../modules/dev/helpers';
import Dropdown from './dropdown';
import objectFitImages from 'object-fit-images';
import Popup from 'vintage-popup';
import '../libs/jquery.selectric.min';

export class Common {
    /**
     * Cache data.
     */
    constructor() {
        // jQuery objects
        this.$getDropdowns = () => $('.dropdown');
        this.$menuFlex = () => $('.menu-flex');
        this.$menuFlexWrapper = () => $('.menu-flex-wrapper');
        this.$banner = $('.banner');
        this.$bannerSecondary = $('.banner-secondary');
        this.$bannerSecondaryWrapper = $('.banner-secondary__desc-wrapper');
        this.$bannerWithButton = $('.banner-btn__desc-wrapper');
        this.$search = $('.search');
        this.$searchBtn = $('.header__row_top').find('.btn__search');
        this.$searchCloseBtn = $('.header__search-close');
        this.$subscribeHint = $('.subscribe__hint');
        this.$headerHamburger = $('.header__hamburger');
        this.$headerOverlay = $('.header__overlay');
        this.$headerOverlayCloseBtn = $('.header__overlay-close');
        this.$topHeader = $('.header__row_top');
        this.$header = $('.header');
        this.$tableMask = $('.hidden-table');
        this.$flexImages = document.querySelectorAll('img.obj-fit');

        // jQuery classes
        this.subscribeHintClose = '.subscribe__hint-close';
        this.subscribeEmail = '.subscribe__email';
        this.subscribeHintPopup = '.subscribe__hint-popup';
        this.subscribeHintIconActive = 'subscribe__hint-active';
    }

    /**
     * Detect touch devices.
     *
     * @returns {Common}
     */
    detectTouchDevices() {
        if (!Resp.isTouch) $body.addClass(css.noTouch);

        return this;
    }

    /**
     * Initialize (expose) popup module.
     *
     * @returns {Common}
     */
    initPopup() {
        Popup.expose($);

        return this;
    }

    /**
     * Initialize dropdowns.
     *
     * @returns {Common}
     */
    initDropdowns() {
        // get dropdowns dynamically
        const $dropdowns = this.$getDropdowns();

        $dropdowns.each(function () {
            new Dropdown({
                $dropdown: $(this),
                dropdownClass: '.dropdown',
                open: '.js-dropdown-open'
            });
        });

        return this;
    }

    // select plugin
    initSelect() {
        const arrowIcon = `
      <div class="select__icon">
        <i class="select__icon-svg fill_gray">
          <svg class="icon icon__arrow_small">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon__arrow_small"></use>
          </svg>
        </i>
      </div>
    `;

        $('.select').each(function () {
            $(this).selectric({
                onInit: function (e) {
                    $(this).parent().next().find("b.button").html(arrowIcon);
                },
                onOpen: function () {
                    $(this).closest('.selectric-wrapper').find('.select__icon').css("transform", "rotate(-180deg)");
                    $(this).closest('.selectric-wrapper').find('.select__icon-svg').addClass('select__icon-svg-active');
                },
                onClose: function () {
                    $(this).closest('.selectric-wrapper').find('.select__icon').css("transform", "rotate(0)");
                    $(this).closest('.selectric-wrapper').find('.select__icon-svg').removeClass('select__icon-svg-active');
                }
            });
        });
    }

    // Show hide table mask
    tableScroll() {
        const _this = this;

        $('.table-wrapper').on('scroll touchstart', function () {
            _this.$tableMask.fadeOut();
        });

        $('.editor-table').on('scroll touchstart', function () {
            $(this).find('div').fadeOut();
        });
    }

    /**
     * Initialize banner (close / open).
     *
     * @returns {Common}
     */
    initBanner() {
        // Close banner
        $document.on('click', '.banner__close', function () {
            const $banner = $(this).closest('.banner');

            $banner.find('.banner__cnt').fadeOut(() => {
                $banner.addClass('banner_closed');
                $banner.toggleClass('no-padding');
                $banner.find('.banner__open-wrap').css('z-index', '1');
            });
        });

        // Open banner
        $document.on('click', '.banner__open', function () {
            const $banner = $(this).closest('.banner');

            $banner.find('.banner__open-wrap').css('z-index', '-1');
            $banner.removeClass('banner_closed');
            $banner.toggleClass('no-padding');
            $banner.find('.banner__cnt').fadeIn();
        });

        return this;
    }

    // Initialize scroll bar plugin for banners
    initScrollBanner() {
        const _this = this;

        $(window).on("load", function () {
            $('.banner-secondary__desc-scroll').add(_this.$bannerWithButton).mCustomScrollbar({
                theme: "light-thick",
                mouseWheel: {enable: true}
            });
        });
    }

    /**
     * Initialize seacrh (close / open).
     *
     * @returns {Common}
     */
    initSearch() {
        const _this = this;

        $(document).on('click tap', function (e) {
            e.stopPropagation();
            $(_this.$search)
                .not($(_this.$search).has($(e.target)))
                .slideUp('slow');
            _this.$searchCloseBtn.fadeOut(400, function () {
                _this.$searchBtn.fadeIn();
            });
        });

        // Open search
        this.$searchBtn.on('click tap touchstart', function (e) {
            e.stopPropagation();
            e.preventDefault();

            const _$this = $(this);
            const body = $("html, body");

            // show close button
            _$this.fadeOut(400, function () {
                _this.$searchCloseBtn.fadeIn();
            });

            $(this).closest('body').find(_this.$search).slideDown('slow');
        });

        // Close search
        this.$searchCloseBtn.on('click tap touchstart', function (e) {
            e.stopPropagation();
            e.preventDefault();

            // show search button
            $(this).fadeOut(400, function () {
                _this.$searchBtn.fadeIn();
            });

            // check if we have banner elements in DOM
            if (_this.$banner.length || _this.$bannerSecondary.length) {
                _this.$search.slideUp('slow', function () {
                    _this.$banner.add(_this.$bannerSecondary).fadeIn('slow');
                });
            } else {
                $(this).closest('body').find(_this.$search).slideUp('slow');
            }
        });
    }

    /**
     * Initialize navigation (close / open).
     *
     * @returns {Common}
     */
    initNav() {
        const _this = this;

        this.$headerHamburger.add(this.$headerOverlayCloseBtn).on('click tap touchstart', function (e) {
            e.stopPropagation();
            e.preventDefault();

            _this.$headerOverlay.toggleClass('header__overlay-open');
        });
    }

    /**
     * On click toogle popup hint in subscribe section
     *
     * @return {Common}
     */
    toggleSubscribeHint() {
        const _this = this;

        this.$subscribeHint.add(_this.subscribeHintClose).on('click tap touchstart', function (e) {
            e.stopPropagation();
            e.preventDefault();
            const hint = $(this).closest(_this.subscribeEmail).find(_this.subscribeHintPopup);

            _this.$subscribeHint.toggleClass(_this.subscribeHintIconActive);
            hint.fadeToggle();
        });
    }

    /**
     * Initialize object fit polyfill for images
     *
     * @returns {Common}
     */
    initObjectFit() {
        objectFitImages(this.$flexImages);
    }

    initLinkOverflow() {
        const _this = $(this);

        this.$menuFlexWrapper().each(function () {
            const $this = $(this);
            const parentWidth = $this.closest($this.data('parent')).width();
            const itemsLen = $this.find('.links__item').length;

            if (itemsLen === 1 || ($this.width() < parentWidth)) {
                $this.find('.menu-flex').addClass('hidden');
            }

            $this.find('.menu-flex').css({
                'max-width': parentWidth,
                'width': '100%',
                'display': 'inline-flex'
            });

            // hot fix
            $this.find('.menu-flex_fix').css({
                'max-width': parentWidth - 100,
                'width': '100%',
                'display': 'inline-flex'
            });
        });
    }

    hideLinks() {
        this.$menuFlex().each(function () {
            const $this = $(this);

            $this.css({
                'display': 'none'
            });
        })
    }

    onResizeLinks() {
        // reinit links
        const reinitLinks = throttle(() => {
            this.hideLinks();
            this.initLinkOverflow();
        }, 250, this);

        // reinit links on resize
        $window.on('resize orientationchange', reinitLinks);
    }

    hideUnitsPseudo() {
        $('.units').each(function () {
            const len = $(this).find('.unit').length;
            if (len === 1) {
                $(this).addClass('hidden');
            }
        });
        $('.advisors').each(function () {
            const len = $(this).find('.advisors__wrap').length;
            if (len === 1) {
                $(this).addClass('hidden');
            }
        });
        $('.register__units').each(function () {
            const len = $(this).find('.register__unit').length;
            if (len === 1) {
                $(this).addClass('hidden');
            }
        });
    }

    hidePseudoNav() {
        $('.nav__item-active').prev('.nav__item').addClass('hidden');
    }


    /**
     * Initialize common scripts.
     *
     * @returns {Common}
     */
    init() {
        this.initPopup();
        this.detectTouchDevices();
        this.initDropdowns();
        this.initBanner();
        this.initScrollBanner();
        this.toggleSubscribeHint();
        this.initNav();
        this.initSearch();
        this.tableScroll();
        this.initObjectFit();
        this.initLinkOverflow();
        this.onResizeLinks();
        this.initSelect();
        this.hideUnitsPseudo();
        this.hidePseudoNav();
    }
}

/** Export initialized common scripts by default */
export default new Common();
