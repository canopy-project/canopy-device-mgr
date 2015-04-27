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
 * Sidebar for maps screen for Canopy Device Manager
 *
 *  PARAMS:
 *      none
 *
 *  METHODS:
 *
 *      .setMapDevices(deviceList)
 *      .onDeviceClicked(device)
 *
 */
function DmMapsSidebar(params) {
    cuiInitNode(this);

    var deviceList = [];
    var $list = $("<div>");

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

        this.markDirty();
        return this;
    }

    this.onConstruct = function() {
        map = new CuiMap({
            showPlaceholder: false,
        });

        return [
            "<div style='padding:16px;'>",
                $list,
            "</div>",
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        // Add markers:
        if (deviceList.length == 0) {
            $list.html("No devices with location data.<br>\
                    <bR>To see devices on the map they must report the\
                    following cloud variables:<br>\
                    <div style='padding:6px; margin-top:6px; border:1px solid #a0a0a0;'>\
                        <div class=icode style='font-size: 14px;'>out float32 latitude</div><br>\
                        <div class=icode style='font-size: 14px;'>out float32 longitude</div>\
                    </div>\
            ");
            return;
        }

        $list.html("");
        for (var i = 0; i < deviceList.length; i++) {
            $btn = $("<div class=devmgr_maps_device_item><img src='https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=0.5' align=top></img> " + deviceList[i].name() + "</div>");
            $btn.off("click").on("click", function(dev) {
                return function() {
                    if (params.onDeviceClicked)
                        params.onDeviceClicked(dev);
                };
            }(deviceList[i]));

            $list.append($btn);
        }
    }

}
