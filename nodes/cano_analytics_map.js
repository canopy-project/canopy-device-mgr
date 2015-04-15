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
            params.user.devices().get(mapDevices[i].id()
            ).onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    alert("Error fetching device");
                    return;
                }
                var dev2 = data.device;
                var latVar = dev2.varByName("latitude");
                var lngVar = dev2.varByName("longitude");
                var lat = latVar.value();
                var lng = lngVar.value();
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: map,
                    title: dev2.name()
                });

                // Add path
                _tmp = function(_latVar, _lngVar) {
                    _latVar.historicData().onDone(function(result, latData) {
                        if (result != CANOPY_SUCCESS) {
                            return;
                        }
                        if (latData.samples.length < 2) {
                            return;
                        }

                        _lngVar.historicData().onDone(function(result, lngData) {
                            if (result != CANOPY_SUCCESS) {
                                return
                            }
                            var i;
                            path = [];
                            console.log(latData);
                            console.log(lngData);
                            for (i = 0; i < lngData.samples.length; i++) {
                                if (latData.samples[i])
                                    path.push(new google.maps.LatLng(latData.samples[i].v, lngData.samples[i].v));
                            }
                            path.push(new google.maps.LatLng(_latVar.value(), lngVar.value()));
                            myPath = new google.maps.Polyline({
                                path: path,
                                geodesic: true,
                                strokeColor: "#3060b0",
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                            });
                            myPath.setMap(map);
                        });
                    });
                }(latVar, lngVar);
            });
        }
    }
    $me = $("<div id=map-canvas style='position: absolute; bottom: 0px; top: 85px; border: 1px solid #c0c0c0; right: 0px; left: 260px;'></div>");
}
