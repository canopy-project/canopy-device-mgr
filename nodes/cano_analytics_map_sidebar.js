//
// Copyright 2015 SimpleThings, Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
function CanoAnalyticsMapSidebarNode(params) {
    var self=this,
        $me,
        $list,
        mapDevices = [],
        devicesList = []
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        this.refresh();
    }

    this.setDevices = function(_devicesList) {
        devicesList = _devicesList;
    }

    this.refresh = function() {
        var devices = devicesList;
        mapDevices.length = 0;
        $list.html("");
        var i;
        for (i = 0; i < devices.length; i++) {
            var device = devices[i];
            if (device.varByName("latitude") && device.varByName("longitude")) {
                mapDevices.push(device);
            }
        }
        if (mapDevices.length == 0) {
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

        for (i = 0; i < mapDevices.length; i++) {
            $btn = $("<div class=devmgr_maps_device_item><img src='https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=0.5' align=top></img> " + mapDevices[i].name() + "</div>");
            $btn.off("click").on("click", function(dev) {
                    return function() {
                        if (params.onDeviceClicked)
                            params.onDeviceClicked(dev);
                    };
                }(mapDevices[i])
            );
            $list.append($btn);
        }
    }

    this.getMapDevices = function() {
        return mapDevices;
    }

    $list = $("<div>");

    $me = CanopyUtil_Compose(["\
<div style='z-index: 400; position:fixed; width: 250px; top: 89px; border-right:0px solid #d0d0d0; bottom:0px; background:#ffffff; color:#000000'>\
    <div style='padding:16px; font-size: 16px; border-right:0px solid #f0f0f0;'>\
        ", $list, "\
    </div>\
    <div style='padding-bottom:16px; text-align:center; z-index: 500; position:fixed; width: 250px; bottom:0px; background:#ffffff; color:#000000'>\
        Powered by <a target=_blank href=http://canopy.link><span class='logo-in-text'>Canopy</div>\
    </div>\
</div>"]);
}

