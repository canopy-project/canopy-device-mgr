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
 *      .autoRefreshInterval - default: 20000
 *      .onDeviceModified
 *
 *  METHODS:
 *      setDevice(device)
 *
 */
function DmDeviceDetails(params) {
    cuiInitNode(this);
    this.markDirty("info", "vars", "device");
    var self = this;

    var device = params.device;
    var _device;
    var cloudVarWidgets = [];
    var $plotOption;
    var deviceNameEditable;
    var locationNoteEditable;

    var autoRefreshInterval = (params.autoRefreshInterval ? params.autoRefreshInterval : 20000);
    var interval;

    var $title;
    var $id;
    var $cloudvars;
    var $lastActivityText;
    var $connectionStatusText;
    var $locationNoteText;
    var $infoTable;
    var $secretKey;

    var cachedDeviceName;
    var cachedDeviceId;
    var cachedDeviceId2;
    var cachedSecretKey;
    var cachedLastActivity;
    var cachedConnectionStatus;
    var cachedLocationNote;
    var cachedVarCount;

    var plot;
    var plotOption;

    this.setDevice = function(__device) {
        _device = __device;
        this.markDirty("info", "vars", "device");
        return this;
    }

    this.onConstruct = function() {
        plot = new CuiCloudVarPlot({
            height: 100,
            autoRefreshInterval: autoRefreshInterval,
        });
        
        $plotOption = $("<div>");

        deviceNameEditable = new CuiEditableText({
            cssClass: "cui_default dm_device_details",
            value: "My Device",
            onChange: function(value, userEdited) {
                console.log("onChange", userEdited);
                if (userEdited) {
                    device.name(value);
                    device.updateToRemote().onDone(function(result, resp) {
                        if (result != CANOPY_SUCCESS) {
                            alert("Error changing device name: " + resp.errorMsg);
                        }
                        if (params.onDeviceModified) {
                            params.onDeviceModified(device);
                        }
                    });
                }
            }
        });

        locationNoteEditable = new CuiEditableText({
            cssClass: "cui_default dm_device_details",
            value: "",
            onChange: function(value, userEdited) {
                console.log("onChange", userEdited);
                if (userEdited) {
                    device.locationNote(value);
                    device.updateToRemote().onDone(function(result, resp) {
                        if (result != CANOPY_SUCCESS) {
                            alert("Error changing location note: " + resp.errorMsg);
                        }
                        if (params.onDeviceModified) {
                            params.onDeviceModified(device);
                        }
                    });
                }
            }
        });

        $title = cuiCompose([
            "<div class='dm_device_details dm_title'>",
                deviceNameEditable,
            "</div>"
        ]);

        $id = $("<div class='dm_device_details dm_id'></div>");

        $cloudvars = $("<div class='dm_device_details dm_cloud_vars'></div>");

        $lastActivityText = $("<div>Loading...</div>");
        $connectionStatusText = $("<div>Loading...</div>");
        $locationNoteText = $("<div>Loading...</div>");
        $secretKey = $("<div>Loading...</div>");

        $infoTable = cuiCompose([
            "<div class='dm_device_details dm_contents'>",
                "<table width=100% cellspacing=0 cellpadding=0>",
                    "<tr>",
                        "<td width=1 nowrap align=left style='font-weight:400; color:#404040'>",
                            "Activity Status:",
                        "</td>",
                        "<td>",
                            $lastActivityText,
                        "</td>",
                    "</tr>",
                    "<tr>",
                        "<td width=1 nowrap align=left style='font-weight:400; color:#404040'>",
                            "Websocket:",
                        "</td>",
                        "<td>",
                            $connectionStatusText,
                        "</td>",
                    "</tr>",
                    "<tr>",
                        "<td width=1 nowrap align=left style='font-weight:400; color:#404040'>",
                            "Secret Key:",
                        "</td>",
                        "<td>",
                            "<div style='font-size:12px; font-family:monospace'>",
                                    $secretKey, 
                            "</div>",
                        "</td>",
                    "</tr>",
                    "<tr>",
                        "<td width=1 nowrap align=left style='font-weight:400; color:#404040'>",
                            "Location Note:",
                        "</td>",
                        "<td>",
                            locationNoteEditable,
                        "</td>",
                    "</tr>",
                "</table>",
            "</div>"
        ]);

        return [
            "<div class='dm_device_details " + params.cssClass + "'>",
                $title,
                $id,
                $infoTable,
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
        if (_device != device) {
            device = _device;
        }
        if (dirty("info") && device) {
            if (cachedDeviceName !== device.name()) {
                cachedDeviceName = device.name();
                deviceNameEditable.setValue(cachedDeviceName);
            }
            if (cachedDeviceId !== device.id()) {
                cachedDeviceId = device.id();
                $id.html("ID: " + cachedDeviceId);
            }
            if (cachedSecretKey !== device.secretKey()) {
                cachedSecretKey = device.secretKey();
                $secretKey.html(" " + cachedSecretKey);
            }
            if (cachedLastActivity !== device.lastActivitySecondsAgo()
                || cachedConnectionStatus !== device.websocketConnected()
            ) {
                cachedLastActivity = device.lastActivitySecondsAgo();
                cachedConnectionStatus = device.websocketConnected();
                $lastActivityText.html(CanopyUtil_LastSeenSecondsAgoText(cachedLastActivity));
                $connectionStatusText.html(CanopyUtil_ConnectionStatusText(cachedLastActivity, device.websocketConnected()));
            }
            if (cachedLocationNote !== device.locationNote()) {
                cachedLocationNote = device.locationNote();
                locationNoteEditable.setValue(cachedLocationNote);
            }
        }

        if (dirty("vars") && device) {
            var vars = device.vars();
            var countChanged = false;
            if (cachedVarCount != vars.length) {
                cachedVarCount = vars.length;
                countChanged = true;
                // Force repopulation
                $cloudvars.html("");
            }

            for (var i = 0; i < vars.length; i++) {
                if (cloudVarWidgets[i] === undefined) {
                    var cloudVarWidget = new CuiCloudVarWidget({
                        cssClass: "dm_device_details",
                        cloudVar: vars[i],
                    });
                    cloudVarWidgets.push(cloudVarWidget);
                    $cloudvars.append(cloudVarWidget.get$());
                    cloudVarWidget.refresh(live);
                } else {
                    cloudVarWidgets[i].setCloudVar(vars[i]);
                    if (countChanged) {
                        $cloudvars.append(cloudVarWidgets[i].get$());
                    }
                    cloudVarWidgets[i].refresh(live);
                }

                //$cloudvars.append(cloudVarWidgets[i].get$());
                //cloudVarWidgets[i].refresh(live);
            }
            if (vars.length == 0) {
                $cloudvars.html("No Cloud Variables");
            }
        }

        if (dirty("device") && device) {
            if (cachedDeviceId2 !== device.id()) {
                cachedDeviceId2 = device.id();
                $plotOption.html("");
                if (device.vars().length == 0) {
                    $plotOption.html("<div style='padding:16px'>No history</div>");
                    plot.get$().hide();
                } else {
                    plot.get$().show();
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
                    plot.setCloudVar(device.vars()[0]).refresh(live);
                    $plotOption.html(plotOption.get$());
                    plotOption.refresh(live);
                }
            }
        }

        cuiRefresh([deviceNameEditable, locationNoteEditable], live);
        /*var redraw = dirty();
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
                    $plotOption.html("<div style='padding:16px'>No history</div>");
                    plot.get$().hide();
                } else {
                    plot.get$().show();
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
        cuiRefresh([], live);*/
    }

    this.onSetupCallbacks = function($me) {
        if (!interval) {
            interval = setInterval(function() {
                device.updateFromRemote().onDone(function(result, resp) {
                    if (result != CANOPY_SUCCESS) {
                        console.log(resp.errorMsg);
                        return;
                    }
                    self.markDirty("info", "vars").refresh();
                });
            }, autoRefreshInterval);
        }
    }

}
