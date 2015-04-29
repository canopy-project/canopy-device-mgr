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
 * Device Details pane
 *
 *  PARAMS:
 *
 *  METHODS:
 *      setDevice(device)
 *
 */
function DmDeviceDetails(params) {
    cuiInitNode(this);
    this.markDirty();
    var self = this;

    var device = params.device;
    var _device;

    var $title;
    var $contents;
    var $id;
    var $cloudvars;

    this.setDevice = function(__device) {
        _device = __device;
        return this;
    }

    this.onConstruct = function() {
        $title = $("<div class='dm_device_details dm_title'></div>");

        $id = $("<div class='dm_device_details dm_id'></div>");

        $contents = $("<div class='dm_device_details dm_contents'></div>");
        $cloudvars = $("<div class='dm_device_details dm_cloud_vars'></div>");

        return [
            "<div class='dm_device_details " + params.cssClass + "'>",
                $title,
                $id,
                $contents,
                "<div style='padding-left:8px; font-weight:400; font-size:16px'>Cloud Variables</div>",
                $cloudvars,
                "<div style='padding-left:8px; font-weight:400; font-size:16px'>bagel_mode channel darkness avg_rssi humidity temperature station_cnt</div>",
                "<br><br>",
            "</div>"
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        var redraw = dirty();
        if (_device != device) {
            device = _device;
            redraw = true;
        }

        if (redraw) {
            if (device) {
                $title.html(device.name());
                $id.html("ID: " + device.id());
                var lastActivity = device.lastActivitySecondsAgo();

                if (!lastActivity) {
                    $title.css("border-top", "4px solid #3060c0");
                } else if (lastActivity < 60) {
                    $title.css("border-top", "4px solid #40a040");
                } else if (lastActivity > 60) {
                    $title.css("border-top", "4px solid #802020");
                }

                $contents.html(cuiCompose(["<div class='dm_device_details dm_content'>",
                    "<table width=100% cellspacing=0 cellpadding=0'>",
                        "<tr>",
                            "<td width=1 nowrap align=right style='font-weight:400; color:#404040'>",
                                "Activity Status:",
                            "</td>",
                            "<td>",
                                CanopyUtil_LastSeenSecondsAgoText(lastActivity),
                            "</td>",
                        "</tr>",
                        "<tr>",
                            "<td width=1 nowrap align=right style='font-weight:400; color:#404040'>",
                                "Websocket:",
                            "</td>",
                            "<td>",
                                CanopyUtil_ConnectionStatusText(lastActivity, device.websocketConnected()),
                            "</td>",
                        "</tr>",
                        "<tr>",
                            "<td width=1 nowrap align=right style='font-weight:400; color:#404040'>",
                                "Secret Key:",
                            "</td>",
                            "<td>",
                                "<div style='font-size:14px; font-family:monospace'>",
                                    "<a href=show>show</a>",
                                "</div>",
                            "</td>",
                        "</tr>",
                        "<tr>",
                            "<td width=1 nowrap align=left style='font-weight:400; color:#404040'>",
                                "Location Note",
                            "</td>",
                            "<td>",
                                device.locationNote(),
                                //locationNode,
                            "</td>",
                        "</tr>",
                    "</table><br>",
                "</div>"]));

                $cloudvars.html("");
                if (device.vars().length == 0) {
                    $cloudvars.html("No Cloud Variables");
                } else {
                    for (var i = 0; i < device.vars().length; i++) {
                        var cloudVar = new CuiCloudVarWidget({
                            cssClass: "dm_device_details",
                            cloudVar: device.vars()[i],
                        });
                        $cloudvars.append(cloudVar.get$());
                        cloudVar.live();
                    }
                }
            } else {
                $title.html("Select a device");
            }
        }
    }
}
