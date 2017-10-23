/**
 * Calendar page scripts.
 *
 * @module Calendar
 */

/** Import utils */
import {
  $window,
  throttle
} from '../modules/dev/helpers';
import 'jquery-ui/ui/widgets/datepicker';
import 'moment/moment';
import 'fullcalendar/dist/fullcalendar.min';
import 'fullcalendar/dist/locale-all';

export class Calendar {
  /**
   * Cache data.
   */
  constructor () {
    // jQuery objects
    this.$fc = $('#fullcalendar')
    this.settings = {
      locale: $('html').attr('lang'),
      eventLimit: true,
      minTime: '09:00:00',
      displayEventTime: true,
      displayEventEnd: true,
      allDaySlot: true,
      contentHeight: 300,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
      views: {
        agendaDay: { // name of view
          titleFormat: 'MMMM D, YYYY',
          columnFormat: 'dddd',
          timeFormat: 'HH:mm'
        },
        agendaWeek: { // name of view
          titleFormat: 'MMMM D, YYYY',
          columnFormat: 'ddd M/D',
          timeFormat: 'HH:mm'
        },
        month: { // name of view
          titleFormat: 'MMMM YYYY',
          columnFormat: 'dd',
          displayEventTime: false
        },
        listWeek: { // name of view
          titleFormat: 'MMMM D, YYYY',
          listDayAltFormat: 'dddd D, YYYY',
          timeFormat: 'HH:mm'
        }
      },
      eventAfterAllRender: function () {
        $('.fc-day-number').each(function () {
          let day = $(this).html() //get the contents of the td
          // for any fields where the content is one character long, add a leading zero
          if (day.length == 1) {
            $(this).html('0' + day)
          }
        })

        $('.fc-axis span').each(function () {
          let date = $(this).html() // get the contents of the td
          // for any fields where the content is one character long, add a leading zero
          if (date.length <= 2) {
            $(this).html(date + ':00')
          }
        })
      },
      eventClick: function (event) {
        if (event.url) {
          window.open(event.url);
          return false;
        }
      }
    }
    // jQuery classes
  }

  // Change color of the calendar icon on focus
  toggleCalendarImg () {
    $('.datepicker__item').on('focus', function () {
      $(this).addClass('datepicker__item-active')
    })
    $('.datepicker__item').on('blur change', function () {
      let data = $(this).datepicker('getDate')
      if (data != null) {
        $(this).addClass('datepicker__item-active')
      } else {
        $(this).removeClass('datepicker__item-active')
        $(this).closest('.form-group').removeClass('has-error')
      }
    })
  }

  // Initialize jquery datepicker plugin
  initDatepicker () {
    $('#datepicker-from').add('#datepicker-to').datepicker({
      beforeShow: function () {
        setTimeout(function () {
          $('.ui-datepicker').css('z-index', 999)
        }, 0)
      },
      monthNames: ['Сiчень', 'Лютий', 'Березень', 'Квiтень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
      dayNamesMin: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
      dayNames: ['Понедiлок', 'Вiвторок', 'Середа', 'Четвер', 'П`ятниця', 'Субота', 'Недiля'],
      dateFormat: 'mm/dd/yy',
      showOtherMonths: true,
      selectOtherMonths: true,
      nextText: 'Вперед',
      prevText: 'Назад',
      changeYear: true,
      changeMonth: true
      //yearRange:'2000:2017'
    })
  }

  // Initialize fullcalendar.io plugin
  initFullCalendar (data) {
    this.settings.buttonText = data.buttonText;
    this.settings.events = data.events;
    this.settings.noEventsMessage = data.noEventsMessage;

    this.$fc.fullCalendar(this.settings);
  }

  // Rerender fullcalendar according to window width
  recreateFullCalendar (screenWidth) {
    if (screenWidth < 751) {
      this.settings.views.agendaWeek = {
        titleFormat: 'MMMM D, YYYY',
        columnFormat: 'ddd',
        timeFormat: 'HH:mm'
      }
      this.settings.header = {
        left: 'prev,next today',
        center: 'month,agendaWeek,agendaDay,listWeek',
        right: 'title'
      }
    } else if ((screenWidth > 751) && (screenWidth < 1183)) {
      this.settings.header = {
        left: 'prev,next today',
        center: 'month,agendaWeek,agendaDay,listWeek',
        right: 'title'
      }
    } else {
      this.settings.header = {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      }
      this.settings.views.agendaWeek = {
        titleFormat: 'MMMM D, YYYY',
        columnFormat: 'ddd M/D',
        timeFormat: 'HH:mm'
      }
    }

    this.$fc.fullCalendar('destroy');
    this.$fc.fullCalendar(this.settings);
  }

  // Call recreateFullCalendar() with current window width parameter each time when window resize
  onResize () {
    // reinit recreateFullCalendar
    const reinitFC = throttle(() => {
      this.recreateFullCalendar($window.width())
    }, 100, this)

    // reinit dotdotdot on resize
    $window.on('load resize orientationchange', reinitFC)
  }

  /**
   * Initialize Calendar page scripts.
   */
  init () {
    this.initDatepicker()
    this.toggleCalendarImg()
    //this.initFullCalendar()
    //this.recreateFullCalendar($window.width())
    this.onResize()
  }
}

/** Export Calendar page class instance by default */
export default new Calendar()
