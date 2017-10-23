/**
 * Website's dropdown module.
 *
 * @module Dropdown
 */

/** Import utils */
import {
  $body
} from '../modules/dev/helpers';

export default class Dropdown {
  constructor(config) {
    this._dropdownClass = config.dropdownClass;
    this._dropdown = config.$dropdown;
    this._open = this._dropdown.find(config.open);

    this._active = 'dropdown_open';

    this._openOnClick();
    this._closeOnItemClick();
    this._closeOnBody();
  }

  _openOnClick() {
    this._open.click(() => {
      if (this._dropdown.hasClass(this._active)) {
        this.close();
        return;
      } else {
        this.close();
      }

      this._dropdown.addClass(this._active);
    });
  }

  _closeOnItemClick() {
    this._dropdown.find('li').click(() => {
      this.close();
    });
  }

  _closeOnBody() {
    $body.click((e) => {
      if (!$(e.target).closest(this._dropdownClass).length) this.close();
    });
  }

  close() {
    $(this._dropdownClass).removeClass(this._active);
  }
}
