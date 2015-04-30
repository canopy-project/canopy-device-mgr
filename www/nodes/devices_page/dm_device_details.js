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
    var $plotOption;

    var $title;
    var $contents;
    var $id;
    var $cloudvars;
    var plot;
    var plotOption;

    this.setDevice = function(__device) {
        _device = __device;
        return this;
    }

    this.onConstruct = function() {
        plot = new CuiCloudVarPlot({
            height: 100,
            autoRefreshInterval: 5000,
        });
        
        $plotOption = $("<div>");

        $title = $("<div class='dm_device_details dm_title'></div>");

        $id = $("<div class='dm_device_details dm_id'></div>");

        $contents = $("<div class='dm_device_details dm_contents'></div>");
        $cloudvars = $("<div class='dm_device_details dm_cloud_vars'></div>");

        return [
            "<div class='dm_device_details " + params.cssClass + "'>",
                $title,
                $id,
                $contents,
                "<div style='padding-left:16px; font-weight:400; font-size:16px'>CLOUD VARIABLES</div>",
                $cloudvars,
                "<div style='padding-left:16px; font-weight:400; font-size:16px'>PAST HOUR</div>",
                $plotOption,
                "<div style='padding-left:0px; padding-right:0px; border-top:1px solid #d0d0d0; border-bottom:1px solid #d0d0d0'>",
                    plot,
                "</div><br>",
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
                            "<td width=1 nowrap align=left style='font-weight:400; color:#404040'>",
                                "Activity Status:",
                            "</td>",
                            "<td>",
                                CanopyUtil_LastSeenSecondsAgoText(lastActivity),
                            "</td>",
                        "</tr>",
                        "<tr>",
                            "<td width=1 nowrap align=left style='font-weight:400; color:#404040'>",
                                "Websocket:",
                            "</td>",
                            "<td>",
                                CanopyUtil_ConnectionStatusText(lastActivity, device.websocketConnected()),
                            "</td>",
                        "</tr>",
                        "<tr>",
                            "<td width=1 nowrap align=left style='font-weight:400; color:#404040'>",
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
                    plot.setCloudVar(device.vars()[0]).refresh(live);
                }

                $plotOption.html("");
                if (device.vars().length == 0) {
                    $plotOption.html("No history");
                } else {
                    var items = [];
                    for (var i = 0; i < device.vars().length; i++) {
                        items.push({
                            "content" : device.vars()[i].name(),
                            "value" : device.vars()[i],
                        });
                    }
                    plotOption = new CuiOption({
                        cssClass: "dm_device_details",
                        items: items,
                        onSelect: function(idx) {
                            return function(_idx, value) {
                                plot.setCloudVar(value).refresh(live);
                            };
                        }(i),
                        selectedIdx: 0,
                    });
                    $plotOption.html(plotOption.get$());
                    plotOption.live();
                }

            } else {
                $title.html("Select a device");
            }


        }
        cuiRefresh([], live);
    }
}
