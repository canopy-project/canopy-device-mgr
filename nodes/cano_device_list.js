/*
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
function CanoDeviceListNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        priv = {filterName: "All", filter:  {}},
        selectedDevice = null
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }
    
    this.onShow = function() {
        $me.show();
        if (params.onShow)
            params.onShow();
    }

    this.setFilter = function(filterName, newFilter) {
        priv.filter = newFilter;
        priv.filterName = filterName;
        self.refresh();
    }

    this.refresh = function() {
        /*params.user.devices().getMany(0, 40).onDone(function(result, data) {
            alert("result " + result);
        });*/
        canopy.me.fetchDevices({
            onSuccess : function() {
                var devices = canopy.me.Devices().Filter(priv.filter);
                $me.html("<div>Showing <i>" + priv.filterName + "</i> <span style='color:#808080'>(" + devices.length + " of " + devices.length + ")</span></div>");

                $table = $("<table class=devmgr_device_table cellspacing=0 cellpadding=8 width=50% style='font-size:16px'>\
                    <tr>\
                        <th align=left>\
                            UUID\
                        </th>\
                        <th align=left>\
                            Device Name\
                        </th>\
                        <th align=left>\
                            Activity\
                        </th>\
                        <th align=left>\
                            WebSocket\
                        </th>\
                    </tr>\
                </table>");

                for (var i = 0; i < devices.length; i++) {
                    var device = devices[i];
                    var lastActivity = device.LastActivitySecondsAgo();
                    var selected = (selectedDevice && (selectedDevice.UUID() == device.UUID())) ? "class=selected" : "";
                    $row = $("<tr " + selected + ">\
                        <td style='font-size:12px; font-family:monospace'>\
                            " + device.UUID().substring(0, 6) + "...\
                        </td>\
                        <td>\
                            " + device.FriendlyName() + "\
                        </td>\
                        <td>\
                            " + (CanopyUtil_LastSeenSecondsAgoText(lastActivity)) + "\
                        </td>\
                        <td>\
                            " + (CanopyUtil_ConnectionStatusText(lastActivity, device.ConnectionStatus())) + "\
                        </td>\
                    </tr>");
                    $row.off('click').on('click', function(idx, device) {
                        return function() {
                            selectedDevice = device;
                            params.onSelect(idx, device);
                            self.refresh();
                        }
                    }(i, device));
                    $table.append($row);
                }
                $me.append($table);

                self.onLive();
            }
        });

    }

    $me = $("<div style='padding:16px'>");

    this.refresh();
}
