var googlemap;
var jsondata;
var searchResult_marker;


var roswsdata=$.get("/data/travel.json");

var columnsdata=$.get("/data/travelColumn.json");

jQuery(function ($) {
    $('#travel_table').footable({
        // "paging": {
        //     "enabled": true
        // },
        // "filtering": {
        //     "enabled": true
        // },
        "sorting": {
            "enabled": true
        },
        "columns": [
			{
				"name": "Title",
				"title": "名稱",
			  },
			  {
				"name": "Date",
				"title": "日期"
			  },
			  {
				  "title":"行程",
				  "breakpoints": "xs",
				"type": "array",
				"style": {
					"width": 300,
					"maxWidth": 300
				  },
				"name": "TimeLine",
				"formatter": function(value){
					var divTag="";
					for(i=0;i<value.length;i++){
						var Time_string="<a>開始："+value[i].startTime+"</a><p>結束："+value[i].endTime+"</p>";
						var Plan_string="<a>計畫行程：</a><p>"+value[i].plan+"</p><a>------------------</a>"
					 var div="<div>"+Time_string+Plan_string+"</div>"
					 	divTag=divTag+div;
					}
				return divTag;
			}
			
		}],
        rows: roswsdata
    }); 
});



 function initMap() {
      googlemap = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
		center: {lat: 35.6889, lng: 139.7900},
		gestureHandling:"greedy",
		zoomControl: false,
		mapTypeControl: false,
		streetViewControl: true,
		fullscreenControl: true
      });

      var transitLayer = new google.maps.TransitLayer();
	  transitLayer.setMap(googlemap);
	  infoWindow = new google.maps.InfoWindow;

	 
	}



	function geolocation(){
		 // Try HTML5 geolocation.
		 if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
			  var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			  };
	
			  infoWindow.setPosition(pos);
			  infoWindow.setContent('Location found.');
			  infoWindow.open(googlemap);
			  googlemap.setCenter(pos);
			}, function() {
			  handleLocationError(true, infoWindow, googlemap.getCenter());
			});
		  } else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, googlemap.getCenter());
		  }
	}


	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	  infoWindow.setPosition(pos);
	  infoWindow.setContent(browserHasGeolocation ?
							'Error: The Geolocation service failed.' :
							'Error: Your browser doesn\'t support geolocation.');
	  infoWindow.open(googlemap);
	}
//search bar
function searchLocationByAddress(){
	if(searchResult_marker!=undefined){
		searchResult_marker.setMap(null);
	}
	var address=document.getElementById("searchAddress").value

	$.ajax({
		url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address+"&key=AIzaSyDVj7wInWLih5hYS136VxKAKYkO7M8cRpc",
		type: 'get',
		data: {},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.status + " " + thrownError + ". Cannot connect to /api/geocoding.");
		},
		success: function (response) {
			console.log(response)
			searchResult_marker = new google.maps.Marker({
				position: response.results[0].geometry.location,
				title:"Hello World!"
			});
			
			// To add the marker to the map, call setMap();
			searchResult_marker.setMap(googlemap);
			var pos = {
				lat: response.results[0].geometry.location.lat,
				lng: response.results[0].geometry.location.lng
			  };
	
			  infoWindow.setPosition(pos);
			  infoWindow.setContent("<p>Result:"+address+"</p><p>"+response.results[0].formatted_address+"</p>");
			  infoWindow.open(googlemap);

		}


	})
}





//開關table
$("#travel_plan").click(function(){
	if($("#travel_table").attr("class")=="table table-bordered on footable footable-1 breakpoint breakpoint-xs"){
		$("#travel_table").hide()
		$("#travel_table").attr("class","table table-bordered off footable footable-1 breakpoint breakpoint-xs");
	}
	else{
		$("#travel_table").show()
		$("#travel_table").attr("class","table table-bordered on footable footable-1 breakpoint breakpoint-xs");

	}
	

})