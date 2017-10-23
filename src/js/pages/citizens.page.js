/**
 * Citizens page scripts.
 *
 * @module Citizens
 */

/** Import utils */

export class Citizens {
    /**
     * Cache data.
     */
    constructor() {
        // jQuery objects
        this.$healthCategoryMobile = $('.health__categories-mobile');
        this.$healthCategoryList = $('.health__categories-list');

        // jQuery classes
        this.healthCategoriesMobileActive = 'health__categories-mobile-active';
    }

    // Dropdown menu for tablet and mobile
    toggleCategories() {
        $('.categories__mobile').on('click tap', function () {
            $('.categories__list').slideToggle();
            $(this).toggleClass('categories__mobile-active');
        });
        $(this.$healthCategoryMobile).on('click tap', function () {
            $('.health__categories-list').slideToggle();
            $(this).toggleClass('categories__mobile-active');
        });
    }

    // Initialize scroll bar plugin for banners
    initScrollBar() {
        const _this = this;

        $(window).on("load", function () {
            _this.$healthCategoryList.mCustomScrollbar({
                theme: "dark-thin",
                mouseWheel: {enable: true}
            });
            $('.categories__list').mCustomScrollbar({
                theme: "dark-thin",
                mouseWheel: {enable: true}
            });
        });
    }


    /**
     * Initialize Citizens page scripts.
     */
    init() {
        this.toggleCategories();
        this.initScrollBar();
    }
}

/** Export Citizens page class instance by default */
export default new Citizens();
