import GoogleMapsLoader from 'google-maps';
import '../libs/cluster';

/** Import utils */
let mapStyle = [
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
];
let mapData = [
  {
    "id": 1,
    "region": "Вінницька",
    "city": "Вінниця",
    "label": " ЦПМСД №1222",
    "post_index": "21011",
    "address": " Вінницька обл., м. Вінниця,    вул. Пархоменко,13",
    "phone": "(0432) 66-80-16",
    "fax": "(0432)56-40-18",
    "email": "cpmsd1-vn@ukr.net ",
    "url": "",
    "longitude": 28.515851,
    "latitude": 49.239432,
    "zoom": 14,
    "created_at": 1504123712,
    "updated_at": 1504123792
  },
  {
    "id": 2,
    "region": "Вінницька",
    "city": "Бар",
    "label": " ЦПМСД №2",
    "post_index": "21050",
    "address": " м. Вінниця, вул. Першотравнева, б.44",
    "phone": "(0432) 67-06-81",
    "fax": "(0432) 67-06-81",
    "email": "kz.cpmsd2@ukr.net",
    "url": "",
    "longitude": 28.470509,
    "latitude": 49.236922,
    "zoom": 13,
    "created_at": 1504123712,
    "updated_at": 1504132117
  },
  {
    "id": 3,
    "region": "Вінницька",
    "city": "Вишгород",
    "label": " ЦПМСД №3",
    "post_index": "21029",
    "address": " м. Вінниця, вул. Хмельницьке шосе, 96",
    "phone": "(0432) 46-74-19",
    "fax": "(0432) 46-74-19",
    "email": "vincpmsd3@ukr.net",
    "url": "",
    "longitude": 28.413353,
    "latitude": 49.236745,
    "zoom": 13,
    "created_at": 1504123712,
    "updated_at": 1504132128
  },
  {
    "id": 4,
    "region": "Вінницька",
    "city": null,
    "label": "ЦПМСД №4",
    "post_index": "21009",
    "address": "м.Вінниця,  вул. 50 р. Перемоги, 18",
    "phone": "(0432) 55-21-33",
    "fax": "(0432) 27-17-45",
    "email": "mpmv3@vinnitsa.com",
    "url": null,
    "longitude": 28.493901,
    "latitude": 49.242388,
    "zoom": 13,
    "created_at": 1504123712,
    "updated_at": 1504123712
  },
  {
    "id": 5,
    "region": "Вінницька",
    "city": null,
    "label": "ЦПМСД №5",
    "post_index": "21001",
    "address": " м. Вінниця вул. 50 - річчя Перемоги, 49",
    "phone": "(0432) 27-58-76",
    "fax": "(0432) 27-58-76",
    "email": "cpmsd5vin@ukr.net",
    "url": null,
    "longitude": 28.495062,
    "latitude": 49.234109,
    "zoom": 13,
    "created_at": 1504123712,
    "updated_at": 1504123712
  }
];

export class GoogleMap {
  constructor () {
    this.$map = $('.google-map');
  }

  /**
   * Test method.
   */
  initMap (className, data, infoWindow) {
    if (this.$map.length) {
      let mapSettings = [];
      let clsName = className || 'google-map';
      let infoWin = infoWindow || false;
      let dataJSON = data || mapData;
      let lang = $('html').attr('lang') || 'uk';

      mapSettings.styles = mapStyle;

      $.each(dataJSON, function (i, item) {
        mapSettings.center = {lat: +item.latitude, lng: +item.longitude};
        mapSettings.zoom = +item.zoom;
      });

      GoogleMapsLoader.KEY = `AIzaSyAltkGUYQHsiMT4n6N4jSTfw2mDxP2i_6g&language=${lang}`;
      GoogleMapsLoader.load(function (google) {
        let map = new google.maps.Map(document.getElementsByClassName(clsName)[0], mapSettings);
        let LatLngList = [];

        let markersArray = [];

        $.each(dataJSON, function (i, item) {
          let markerCoord = new google.maps.LatLng (+item.latitude, +item.longitude);
          LatLngList.push(markerCoord);

          let marker = new google.maps.Marker({
            position: {
              lat: +item.latitude,
              lng: +item.longitude
            },
            icon: 'static/img/marker-1.png',
            map: map
          });

          markersArray.push(marker);

          if (infoWin) {
            let hint = new google.maps.InfoWindow({
              content:`<div class="unit__hint-desc bg_white-to-dark-blue">
                      <div class="unit__hint-text-wrapper">
                      <p class="unit__hint-adress regular font_black">${item.label}</p>
                      <p class="unit__hint-tel regular font_black">тел.: 
                          <a class="unit__hint-phone regular font_black" href='tel:${item.phone}'>${item.phone}</a>
                      </p>
                      <p class="unit__hint-tel regular font_black">факс.: 
                          <a class="unit__hint-phone regular font_black" href='tel:${item.fax}'>${item.fax}</a>
                      </p>
                      <p class="unit__hint-adress regular font_black">${item.address}</p>
                      <a class="unit__hint-link regular font_blue-light-to-black font_contrast_blue-light-to-black" href='mailto:${item.email}'>${item.email}</a>
                    </div>
                    <div class="unit__hint-stripe-wrapper"><span class="unit__hint-stripe bg_blue-to-black"></span><span class="unit__hint-stripe bg_yellow-to-gray bg_contrast_yellow-to-white"></span></div></div>`
            });

            google.maps.event.addListener(marker, 'click', function() {
              hint.close();
              hint.open(map, marker);
            });
          }
        });

        let markerCluster = new MarkerClusterer(map, markersArray, {imagePath: '/img/map/m', url: '/static/img/marker-1.png'});

        if (LatLngList.length > 1) {
          let latlngbounds = new google.maps.LatLngBounds();

          LatLngList.forEach(function(latLng){
            latlngbounds.extend(latLng);
          });

          map.setCenter(latlngbounds.getCenter());
          map.fitBounds(latlngbounds);
        }
      })
    }
  };

  /**
   * Initialize Main page scripts.
   */
  init (className, data, infoWindow) {
    this.initMap(className, data, infoWindow)
  }
}

/** Export new header class instance by default */
export default new GoogleMap();
