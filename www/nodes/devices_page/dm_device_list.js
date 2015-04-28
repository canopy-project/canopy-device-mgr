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
 * Device List table
 *
 *  PARAMS:
 *      params.user -- Optional CanopyUser object
 *      params.onCreateDeviceRequest
 *
 *  METHODS:
 *      setDeviceQuery(dq)
 *
 */
function DmDeviceList(params) {
    cuiInitNode(this);
    var self = this;

    var pageControl;

    var deviceQuery;
    var _deviceQuery;

    this.setDeviceQuery = function(__deviceQuery) {
        _deviceQuery = __deviceQuery;
    }

    this.onConstruct = function() {

        pageControl = new CuiPageControl({
            cssClass: "cui_default",
            onPageChange: function(page) {
                self.markDirty().refresh();
            }
        });

        pageControl.setItemsPerPage(30);

        $deviceList = $("<div>");

        return [
            "<div class='dm_padded_content'>",
                pageControl,
                $deviceList,
            "</div>"
        ];
    }

    function constructTable(devices) {
        $table = $("<table border=0 class='dm_devices_page dm_device_table' cellspacing=0 cellpadding=8>\
            <tr>\
                <th align=left>\
                    UUID\
                </th>\
                <th align=left>\
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
                <th align=left>\
                    Cloud Vars\
                </th>\
            </tr>\
        </table>");

        for (var i = 0; i < devices.length; i++) {
            var device = devices[i];
            var lastActivity = device.lastActivitySecondsAgo();
            var selectedDevice = null;
            var selected = (selectedDevice && (selectedDevice.id() == device.id())) ? "class=selected" : "";
            $row = $("<tr " + selected + ">\
                <td width=10% nowrap style='overflow: hidden; font-size:12px; font-family:monospace'><div style='position:relative; vertical-align=text-baseline;'><div style='display: inline-block;position:absolute;'>" + device.id() + "</div>&nbsp;</div></td>\
                <td width=10 style='padding-left:0px'>\
                <div style=''>...</div>\
                </td>\
                <td>\
                    " + device.name() + "\
                </td>\
                <td>\
                    " + (CanopyUtil_LastSeenSecondsAgoText(lastActivity)) + "\
                </td>\
                <td>\
                    " + (CanopyUtil_ConnectionStatusText(lastActivity, device.websocketConnected())) + "\
                </td>\
                <td>\
                    " + device.vars().length + "\
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
        return $table;
    }

    this.onRefresh = function($me, dirty, live) {
        var refresh = dirty();

        if (deviceQuery != _deviceQuery) {
            refresh = true;
            deviceQuery = _deviceQuery;
        }

        if (refresh) {
            var start = pageControl.startIdx();
            var count = pageControl.numItemsPerPage();
            deviceQuery.count().onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    alert("Problem fetching device count: " + data.errorMsg);
                    return;
                }
                pageControl.setNumItems(data.count).refresh();
                deviceQuery.getMany(start, count).onDone(function(result, data) {
                    if (result != CANOPY_SUCCESS) {
                        alert("Problem fetching devices: " + data.errorMsg);
                        return;
                    }
                    $deviceList.html(constructTable(data.devices));
                });
            });
        }

        cuiRefresh([pageControl], live);
    }
}
