/**
 * Contacts page scripts.
 *
 * @module Contacts
 */

/** Import utils */
import GoogleMapsLoader from 'google-maps';

export class Contacts {
  /**
   * Cache data.
   */
  constructor() {
    this.markers = [
      {
        lat: "50.447481",
        lng: "30.540269"
      },
      {
        lat: "50.448670",
        lng: "30.526950"
      },
      {
        lat: "50.452906",
        lng: "30.519269"
      },
      {
        lat: "50.451311",
        lng: "30.531038"
      },
      {
        lat: "50.447769",
        lng: "30.516093"
      },
      {
        lat: "50.449928",
        lng: "30.537465"
      }
    ];
    // jQuery objects

    // jQuery classes
  }

  initMap () {
    const _this = this;

    GoogleMapsLoader.KEY = 'AIzaSyCMeu_HVgZmMTnRLECYkjxLqNF7HIMDs2I'
    GoogleMapsLoader.load(function (google) {
      if ($('.google-map').length > 0) {
        let settings = {
          center: {lat: 50.447481, lng: 30.540269},
          zoom: 13,
          styles: [
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
            },
            {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [{"color": "#dedede"}, {"lightness": 21}]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
            },
            {
              "elementType": "labels.icon",
              "stylers": [{"visibility": "off"}]
            },
            {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
            }
          ]
        };
        let infoWindow = new google.maps.InfoWindow({
          content:'<div class="unit__hint-desc bg_white-to-dark-blue"><div class="unit__hint-text-wrapper"><p class="unit__hint-tel regular font_black">тел.: <a class="unit__hint-phone regular font_black" href="tel:+380443000000">+380 (44) 300-00-00</a></p><p class="unit__hint-adress regular font_black">адреса: вул. Богдана Хмельницького, 50, будинок 3, офiс 102</p><a class="unit__hint-link regular font_blue-light-to-black font_contrast_blue-light-to-black" href="#">www.department.name.com.ua</a></div><div class="unit__hint-stripe-wrapper"><span class="unit__hint-stripe bg_blue-to-black"></span><span class="unit__hint-stripe bg_yellow-to-gray bg_contrast_yellow-to-white"></span></div></div>'
        });
        let map = new google.maps.Map(document.getElementsByClassName('google-map')[0], settings);

        $.each(_this.markers, function (i, item) {
          let marker = new google.maps.Marker({
            position: {
              lat: +item.lat,
              lng: +item.lng
            },
            icon: 'static/img/marker-1.png',
            map: map
          });

          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.close();
            infoWindow.open(map, marker);
          });
        });
      }
    })
  };

  /**
   * Initialize Contacts page scripts.
   */
  init() {
    //this.initMap();
  }
}

/** Export Contacts page class instance by default */
export default new Contacts();
