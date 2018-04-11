var map;
function initMap() {

  //styled map
  var styledMapType = new google.maps.StyledMapType(
     [
       {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
       {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
       {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
       {
         featureType: 'administrative',
         elementType: 'geometry.stroke',
         stylers: [{color: '#c9b2a6'}]
       },
       {
         featureType: 'administrative.land_parcel',
         elementType: 'geometry.stroke',
         stylers: [{color: '#dcd2be'}]
       },
       {
         featureType: 'administrative.land_parcel',
         elementType: 'labels.text.fill',
         stylers: [{color: '#ae9e90'}]
       },
       {
         featureType: 'landscape.natural',
         elementType: 'geometry',
         stylers: [{color: '#dfd2ae'}]
       },
       {
         featureType: 'poi',
         elementType: 'geometry',
         stylers: [{color: '#dfd2ae'}]
       },
       {
         featureType: 'poi',
         elementType: 'labels.text.fill',
         stylers: [{color: '#93817c'}]
       },
       {
         featureType: 'poi.park',
         elementType: 'geometry.fill',
         stylers: [{color: '#a5b076'}]
       },
       {
         featureType: 'poi.park',
         elementType: 'labels.text.fill',
         stylers: [{color: '#447530'}]
       },
       {
         featureType: 'road',
         elementType: 'geometry',
         stylers: [{color: '#f5f1e6'}]
       },
       {
         featureType: 'road.arterial',
         elementType: 'geometry',
         stylers: [{color: '#fdfcf8'}]
       },
       {
         featureType: 'road.highway',
         elementType: 'geometry',
         stylers: [{color: '#f8c967'}]
       },
       {
         featureType: 'road.highway',
         elementType: 'geometry.stroke',
         stylers: [{color: '#e9bc62'}]
       },
       {
         featureType: 'road.highway.controlled_access',
         elementType: 'geometry',
         stylers: [{color: '#e98d58'}]
       },
       {
         featureType: 'road.highway.controlled_access',
         elementType: 'geometry.stroke',
         stylers: [{color: '#db8555'}]
       },
       {
         featureType: 'road.local',
         elementType: 'labels.text.fill',
         stylers: [{color: '#806b63'}]
       },
       {
         featureType: 'transit.line',
         elementType: 'geometry',
         stylers: [{color: '#dfd2ae'}]
       },
       {
         featureType: 'transit.line',
         elementType: 'labels.text.fill',
         stylers: [{color: '#8f7d77'}]
       },
       {
         featureType: 'transit.line',
         elementType: 'labels.text.stroke',
         stylers: [{color: '#ebe3cd'}]
       },
       {
         featureType: 'transit.station',
         elementType: 'geometry',
         stylers: [{color: '#dfd2ae'}]
       },
       {
         featureType: 'water',
         elementType: 'geometry.fill',
         stylers: [{color: '#b9d3c2'}]
       },
       {
         featureType: 'water',
         elementType: 'labels.text.fill',
         stylers: [{color: '#92998d'}]
       }
     ],
     {name: 'Styled Map'});

  var korea = new google.maps.LatLng(37.610066, 127.074884);
  var switzerland = new google.maps.LatLng(46.947553, 7.443813);

 var map = new google.maps.Map(document.getElementById('map'), {
   center: korea,
   zoom: 2.5,
   mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
              'styled_map']
    }
  });

//마커 누르면 화면 확대 및 애니메이션
 var marker = new google.maps.Marker({
    position: korea,
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    title: 'Click to zoom'

  });
  var marker_travel = new google.maps.Marker({
     position: switzerland,
     map: map,
     draggable: true,
    animation: google.maps.Animation.DROP,
     title: 'Click to zoom'
   });

 marker.addListener('click', function() {
     map.setZoom(12);
     map.setCenter(marker.getPosition());
     if (marker.getAnimation() !== null) {
     marker.setAnimation(null);
   } else {
     marker.setAnimation(google.maps.Animation.BOUNCE);
   }
 });

 marker_travel.addListener('click', function() {
     map.setZoom(12);
     map.setCenter(marker_travel.getPosition());
     if (marker_travel.getAnimation() !== null) {
     marker_travel.setAnimation(null);
   } else {
     marker_travel.setAnimation(google.maps.Animation.BOUNCE);
   }
 });

 //geocoding service
 var geocoder = new google.maps.Geocoder();

document.getElementById('submit').addEventListener('click', function() {
  geocodeAddress(geocoder, map);
});
map.mapTypes.set('styled_map', styledMapType);
       map.setMapTypeId('styled_map');
}


function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      resultsMap.setZoom(5);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
