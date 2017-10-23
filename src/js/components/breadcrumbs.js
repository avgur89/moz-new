/**
 * Breadcrumbs scripts.
 *
 * @module Accordion
 */

/** Import utils */
import {
  winWidth
} from '../modules/dev/helpers'

export class BreadcrumbsAdaptive {
  constructor () {
    this.$breadcrumbsItem = $('.breadcrumbs > li');
  }
  
  initBreadcrumbsItem() {
    const itemLength = this.$breadcrumbsItem.length;
    let textBuffer;
    
    if (winWidth < 768) {
      if (itemLength > 2) {
        this.$breadcrumbsItem.each((index, el) => {
          if (index === 1) {
            textBuffer = this.$breadcrumbsItem.eq(index).text();
            this.$breadcrumbsItem.eq(index).find('a').text('...');
          }
          if (index === 0 || index === 1 || index === itemLength - 1) {
            this.$breadcrumbsItem.eq(index).addClass('breadcrumbs__visible');
          }
        });
  
        this.$breadcrumbsItem.eq(1).on('click tap', function () {
          $(this).find('a').text(textBuffer)
          .closest('.breadcrumbs').addClass('breadcrumbs__visible-list');
        });
      } else {
        this.$breadcrumbsItem.each((index, el) => {
          this.$breadcrumbsItem.eq(index).addClass('breadcrumbs__visible');
        });
      }
    }
    
    return false;
  }
  
  /**
   * Initialize disabilities scripts.
   *
   * @returns {Disabilities}
   */
  init() {
    this.initBreadcrumbsItem();
  }
}

/** Export initialized dot script by default */
export default new BreadcrumbsAdaptive().init();
