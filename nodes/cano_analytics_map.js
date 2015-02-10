/*
 * Copyright 2015 SimpleThings, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function CanoAnalyticsMapNode(params) {
    var self=this,
        $me,
        mapInitialized = false,
        mapDevices,
        map=null
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    this.refresh = function() {

    }

    // mapDevicesIn is list of Device objects
    this.setMapDevices = function(mapDevicesIn) {
        mapDevices = mapDevicesIn;
    }

    this.show = function() {
        $me.show();
        if (!mapInitialized) {
            self.drawMap();
            mapInitialized = true;
        }
    }

    this.jumpTo = function(lat, lng) {
        map.panTo(new google.maps.LatLng(lat, lng));
    }

    this.drawMap = function() {
        var mapOptions = {
            center: { lat: 37.708333, lng: -122.280278},
            zoom: 10,
            streetViewControl: false
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // Add markers:
        var i;
        for (i = 0; i < mapDevices.length; i++) {
            var lat = mapDevices[i].Vars().Var("latitude").Value();
            var lng = mapDevices[i].Vars().Var("longitude").Value();
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: map,
                title: mapDevices[i].FriendlyName()
            });

            // Add path
            mapDevices[i].Vars().Var("latitude").FetchHistoricData({
                onSuccess: function(device) {
                    return function(latData) {
                        if (latData.samples.length < 3)
                            return;

                        device.Vars().Var("longitude").FetchHistoricData( {
                            onSuccess: function(lngData) {
                                var i;
                                path = [];
                                console.log(latData);
                                console.log(lngData);
                                for (i = 0; i < lngData.samples.length; i++) {
                                    if (latData.samples[i])
                                        path.push(new google.maps.LatLng(latData.samples[i].v, lngData.samples[i].v));
                                }
                                myPath = new google.maps.Polyline({
                                    path: path,
                                    geodesic: true,
                                    strokeColor: "#3060b0",
                                    strokeOpacity: 0.8,
                                    strokeWeight: 2,
                                });
                                myPath.setMap(map);
                                
                            }
                        });
                    }
                }(mapDevices[i]),
            })
        }
    }
    $me = $("<div id=map-canvas style='position: absolute; bottom: 0px; top: 85px; border: 1px solid #c0c0c0; right: 0px; left: 260px;'></div>");
}
