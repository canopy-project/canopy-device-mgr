/*
 * Copyright 2015 Canopy Services, Inc.
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

/*
 * Maps screen for Canopy Device Manager
 *
 *  PARAMS:
 *      params.user
 *
 *  METHODS:
 *
 *      .setMapDevices(deviceList)
 *      .jumpTo(lat, lng)
 *
 */
function DmMapsScreen(params) {
    cuiInitNode(this);

    var map;
    var deviceList = [];
    var initialized = false;
    var sidebar;

    this.jumpTo = function(lat, lng) {
        map.jumpTo(lat, lng);
    }

    // List may contain all devices
    // This routine filters them down
    this.setMapDevices = function(_deviceList) {
        deviceList.length = 0;

        for (var i = 0; i < _deviceList.length; i++) {
            var device = _deviceList[i];
            if (device.varByName("latitude") && device.varByName("longitude")) {
                deviceList.push(device);
            }
        }

        sidebar.setMapDevices(_deviceList);

        this.markDirty("marker");
        return this;
    }

    this.onConstruct = function() {
        map = new CuiMap({
            showPlaceholder: false,
        });

        sidebar = new DmMapsSidebar({
            onDeviceClicked: function(device) {
                map.jumpTo(device.varByName("latitude").value(), device.varByName("longitude").value());
            }
        });

        return [
            "<div style='position:absolute; left: 0px; width:280px; height: 100%;'>",
                sidebar,
            "</div>",
            "<div style='position:absolute; left: 280px; right:0px; height: 100%;'>",
                map,
            "</div>"
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        map.clearMarkersAndPaths();

        // Add markers:
        var markersSidebarHtml = "";
        for (var i = 0; i < deviceList.length; i++) {
            params.user.devices().get(deviceList[i].id()
            ).onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    alert("Error fetching device");
                    return;
                }
                var dev = data.device;
                var latVar = dev.varByName("latitude");
                var lngVar = dev.varByName("longitude");
                var lat = latVar.value();
                var lng = lngVar.value();

                map.addMarker(lat, lng, dev.name());

                if (!initialized) {
                    initialized = true;
                    map.jumpTo(lat, lng);
                }

                // Add path
                var _tmp = function(_latVar, _lngVar) {
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
                            for (i = 0; i < lngData.samples.length; i++) {
                                if (latData.samples[i])
                                    path.push(new google.maps.LatLng(latData.samples[i].v, lngData.samples[i].v));
                            }
                            path.push(new google.maps.LatLng(_latVar.value(), lngVar.value()));
                            map.addPath(path).refresh();
                        });
                    });
                }(latVar, lngVar);
            });
        }

        cuiRefresh([map, sidebar], live);
    }

}
