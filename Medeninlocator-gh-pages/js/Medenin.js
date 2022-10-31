
window.onload = () => {
  
}




var map;
var markers = [];
var infoWindow;


function initMap() {
    var Delhi = 
    {
        lat:  28.644800,
        lng:  77.216721
    };
    var iconBase =
      'https://developers.google.com/maps/documentation/javascript/examples/full/images/';

      map = new google.maps.Map(document.getElementById('map'), {
      center: Delhi,
      zoom: 20 ,
      mapTypeId: 'roadmap',
      streetViewControl: false,






      
      

      styles:[
        {elementType: 'geometry', stylers: [{color: '#D3D3D3'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{color: '#c9b2a6'}]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
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
      mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}

      

    });
    infoWindow = new google.maps.InfoWindow();
    searchStores();
  } 

 function searchStores(){
   var foundStores= [];
   var zipCode = document.getElementById('zip-code').value;
   var input = document.getElementById('zip-code');
       input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("yo").click();
  }
});
  
   if(zipCode){
    for(var store of stores){
      var postal= store['address']['postalCode'].substring(0,6);
      if(postal==zipCode){
            foundStores.push(store);
          }
    }
  }  
  else{
      foundStores= stores;
    }
   clearLocations();
   displayStores(foundStores);
   showStoresMarkers(foundStores);
   setOnclickListener();
    
 }

 function clearLocations(){
   infoWindow.close();
   for (var i = 0; i< markers.length ; i++) {
     markers[i].setMap(null);
   }
   markers.length= 0;
 }




  function setOnclickListener(){
    var storeElements = document.querySelectorAll(".stores-name");
    storeElements.forEach(function(elem, index){
      elem.addEventListener('click',function(){
        new google.maps.event.trigger(markers[index], 'click');
      })
    })
  }







  function displayStores(stores){
    var storesHtml='';
    for(var [index,store] of stores.entries()){
      var address = store[`addressLines`];
      var phone = store[`phoneNumber`];
      
    
      storesHtml += `
    
      <div class="store-container-background">
      <div class="stores-name">
      
       Medenin centre -<span class="dot1">${index+1}</span>
       <div class="stores-address">
          ${address[0]}
          ${address[1]}
       </div>
       <div class="stores-phone">
       Ph- ${phone}
       </div>
       <hr>
      </div> 
      </div>
  
    `
    document.querySelector('.store-list').innerHTML = storesHtml;
}
}


function showStoresMarkers(stores){


  var bounds = new google.maps.LatLngBounds();
  for(var [index,store] of stores.entries()){
  var latlng = new google.maps.LatLng(
    store["coordinates"]["latitude"],
    store["coordinates"]["longitude"]);
 var name =store["name"];
 var address=store["addressLines"][0];
 var phone= store["phoneNumber"];

 

 bounds.extend(latlng);
  createMarker(latlng, name,address, phone, index+1)
  }
  map.fitBounds(bounds);
}

function createMarker(latlng, name, address, phone, index){
  
  
  var html = `
  <div class="store-info-window">
   <div class="store-info-name">
    ${name}
    </div>
    <div class="store-info-address">
     <div class="circle">
    <i class="fas fa-location-arrow"></i>
     </div>
    ${address}
    </div>
    <div class="store-info-phone">
    <div class="circle">
    <i class="fas fa-phone-alt"></i>
    </div>
    ${phone}
    </div>
  </div>
  `
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    icon: "icon/MN1.ico"
    //label: index.toString()
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
   infoWindow.open(map, marker);
  });
  markers.push(marker);
}

