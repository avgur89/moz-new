'use strict';

/**
 * App entry point.
 *
 * @module App
 */

/** Import general scripts */
import 'script-loader!jquery';
import 'script-loader!slick-carousel';
import 'script-loader!malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min';
import 'script-loader!./libs/jquery.selectric.min';
import './libs/jquery.gray';

/** Import initialized-by-default modules/libs */
import './function';
import './components/breadcrumbs';
import './components/popup';
import './components/slider';
import './components/disabilities';
import './components/ajax';
import './components/accordion';
import './components/alphabet_search';
import './components/online_helper';

/** Import page controllers */
import Main from 'js/pages/main.page';
import AboutMinistry from 'js/pages/about_ministry.page';
import Citizens from 'js/pages/citizens.page';
import Education from 'js/pages/education.page';
import PressCenter from 'js/pages/press_center.page';
import Register from 'js/pages/register.page';
import Contacts from 'js/pages/contacts.page';
import Calendar from 'js/pages/calendar.page';
import Dot from 'js/components/dotdotdot';
import Common from 'js/components/common';
import GoogleMap from 'js/components/gmap';

// const calendarData = {
//   buttonText: {
//     day: "Деньmmmm",
//     list: "Список",
//     month: "Місяць",
//     today: "Сьогодні",
//     week: "Тиждень"
//   },
//   events: [
//     {
//       end: '2017-07-28 14:28:00',
//       start: '2017-07-30 13:30:00',
//       title: 'Зустріч із М.М.М.',
//       url: 'http://google.com'
//     },
//     {
//       end: '2017-07-28 13:28:00',
//       start: '2017-07-28 13:28:00',
//       title: 'PRo',
//       url: 'http://front.moz.com.dev11.vintagedev.com.ua/kalendar'
//     },
//     {
//       end: '2017-09-12 11:12:00',
//       start: '2017-09-12 11:12:00',
//       title: 'Брифінг Лінча',
//       url: 'https://calendar.google.com/calendar/render#eventpage_6%7Ceid-NDdvYWlrNXE5Zm1yazE3bWE3N2tuNGU3MWwgbnI2bmVlcmszOGlqNmk4ZDVydXRoMzZyNnNAZw-1-0-'
//     },
//     {
//       end: '2017-09-16 16:16:00',
//       start: '2017-09-15 16:15:00',
//       title: 'Event',
//       url: 'http://admin.moz.dev/event/event/create'
//     }
//   ],
//   noEventsMessage: 'Немає подій'
// };

Dot.init();
Common.init();
Register.init();
AboutMinistry.init();
Citizens.init();
Education.init();
PressCenter.init();
Contacts.init();
Calendar.init();
//GoogleMap.init();
//Calendar.initFullCalendar(calendarData);

window.publicAPI = {
  Dot,
  Common,
  Main,
  AboutMinistry,
  Citizens,
  Education,
  PressCenter,
  Register,
  Contacts,
  Calendar,
  GoogleMap
};
