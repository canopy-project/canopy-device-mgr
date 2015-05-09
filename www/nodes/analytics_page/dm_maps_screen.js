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
    var self=this;

    var map;
    var deviceList = [];
    var initialized = false;
    var sidebar;
    var interval;

    var cachedDeviceList;

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
            "<div style='position:absolute; left: 0px; width:220px; height: 100%;'>",
                sidebar,
            "</div>",
            "<div style='position:absolute; left: 220px; right:0px; height: 100%;'>",
                map,
            "</div>"
        ];
    }

    this.onRefresh = function($me, dirty, live) {

        if (deviceList) {
            // Update markers
            map.clearAllMarkers();
            for (var i = 0; i < deviceList.length; i++) {
                var dev = deviceList[i];
                var lat = dev.varByName("latitude").value();
                var lng = dev.varByName("longitude").value();
                map.setMarker(dev.id(), lat, lng, dev.name());

                if (!initialized) {
                    initialized = true;
                    map.jumpTo(lat, lng);
                }
            }

            // Update paths
            function addPath(device) {
                var latVar = device.varByName("latitude");
                var lngVar = device.varByName("longitude");
                latVar.historicData().onDone(function(result, latData) {
                    if (result != CANOPY_SUCCESS) {
                        return
                    }
                    if (latData.samples.length < 2) {
                        return;
                    }
                    lngVar.historicData().onDone(function(result, lngData) {
                        if (result != CANOPY_SUCCESS) {
                            return
                        }
                        path = [];
                        for (var i = 0; i < lngData.samples.length; i++) {
                            if (latData.samples[i])
                                path.push(new google.maps.LatLng(latData.samples[i].v, lngData.samples[i].v));
                        }
                        map.setPath(device.id(), path).refresh();
                    });
                });
            }

            for (var i = 0; i < deviceList.length; i++) {
                addPath(deviceList[i]);
            }
        }

        cuiRefresh([map, sidebar], live);
    }

    this.onSetupCallbacks = function() {
        if (!interval) {
            interval = setInterval(function() {
                function updateDevice(i, cnt) {
                    deviceList[i].updateFromRemote().onDone(function() {
                        if ((i + 1) < cnt) {
                            updateDevice(i + 1, cnt);
                        } else {
                            self.refresh();
                        }
                    })
                }
                if (deviceList && deviceList.length > 0) {
                    updateDevice(0, deviceList.length);
                }
            }, 10000);
        }
    }
}
