/*
 *
 *
 *  DEPRECATED!
 *
 *
 */

 * /*
 * Copyright 2014 Gregory Prisament
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
function CanoDevicesListNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarNode,
        filter = {},
        deviceItemNodes = []
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    this.setFilter = function(newFilter) {
        filter = newFilter;
        this.refresh();
    }

    this.refresh = function() {
        // re-fetch devices
        // TODO: optimize this
        alert("refetching");
        canopy.fetchDevices({
            onSuccess: function() {
                deviceItemNodes.length = 0; /* TODO cleanup existing items? */
                $me.html("");

                for (var i = 0; i < canopy.devices.length; i++) {
                    var device = canopy.devices[i];
                    var deviceItemNode = new CanoDevicesListItemNode({
                        canopyClient: canopy,
                        device: canopy.devices[i]
                    });
                    if (filter.connected === true && !device.isConnected())
                        continue;
                    else if (filter.connected === false && device.isConnected())
                        continue;

                    deviceItemNodes.push(deviceItemNode);
                    deviceItemNode.appendTo($me);
                }
                if (canopy.devices.length == 0) {
                    $me.append("\
                        <div style='width:716px; margin-top:16px; background:#ffffff; border:1px solid #d8d8d8; padding:8px;'>\
                            <div class=l>Welcome to Canopy.</div>\
                            <div>\
                                <p>\
                                    There's nothing to do here until you get access to Canopy-enabled <i>things</i>.\
                                </p>\
                            </div>\
                        </div>\
                    ");
                }
            }
            onError: function() {
                alert("Ooops");
            }
        })
    }

    $me = $("<div class=cano-devices_list-outer>");

    this.refresh();
}
