var googlemap;
var jsondata;
var searchResult_marker;

//list table
var roswsdata=$.get("/data/travel_amy.json");

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
						var Time_string="<p>開始："+value[i].startTime+"</p><p>結束："+value[i].endTime+"</p>";
						var Plan_string="<p>計畫行程：</p><p>"+value[i].plan+"</p><a>------------------</a>"
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


//traffic table
var trafficdata=$.get("/data/traffic_data.json");
var trafficColumn=$.get("/data/trafficColumn.json");


jQuery(function ($) {
    $('#traffic_table').footable({
        // "paging": {
        //     "enabled": true
        // },
        // "filtering": {
        //     "enabled": true
        // },
        "sorting": {
            "enabled": true
        },
        "columns": trafficColumn,
        rows: trafficdata
    }); 
});

//shopping list
//traffic table
var itemdata=$.get("/get_item_list");
var itemColumn=$.get("/data/itemColumn.json");


jQuery(function ($) {
    $('#shopping_table').footable({
        // "paging": {
        //     "enabled": true
        // },
        // "filtering": {
        //     "enabled": true
        // },
        "sorting": {
            "enabled": true
        },
        "columns": itemColumn,
        rows: itemdata
    }); 
});

// delete function

function delete_item(id){
	$.ajax({
		url: "/delete_item/"+id,
		type: 'post',
		data: {},
		dataType: 'text',
		beforeSend: function () {
			//console.log("start to load town data");
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log("Error: Can't detelte this item.");
		},
		success: function (data) {
		alert("delete successful!")
		window.location.reload(true);
		}
	});
	
}

// [
// 	{
// 		"name": "Title",
// 		"title": "種類",
// 	  },
// 	  {
// 		  "title":"描述",
// 		  "breakpoints": "xs",
// 		"type": "object",
// 		"style": {
// 			"width": 300,
// 			"maxWidth": 300
// 		  },
// 		"name": "Description",
// 		"formatter": function(value){
// 			var divTag="";
// 				var htmlString=
// 				"<p>航班："+value.flight_no+"</p>"+
// 				"<p>出發："+value.from+"</p>"+
// 				"<p>抵達："+value.to+"</p>"+
// 				"<p>出發日期："+value.start_date+"</p>"+
// 				"<p>出發時間："+value.start_time+"</p>"+
// 				"<p>抵達時間："+value.end_time+"</p>"+
// 				"<p>飛行時間："+value.flight_time+"</p>"+
// 				"<p>報到時間："+value.check_time+"</p>"+
// 				"<p>fare Class："+value.fare_Class+"</p>"
// 			 var div="<div>"+htmlString+"</div>"
// 				 divTag=divTag+div;
			
// 		return divTag;
// 	}
	
// }]