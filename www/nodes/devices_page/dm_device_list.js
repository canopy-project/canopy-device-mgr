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

    var navBar;
    var canvas;
    var selectedDevice = null;

    var deviceQuery;
    var _deviceQuery;

    var devices;

    this.setDeviceQuery = function(__deviceQuery) {
        _deviceQuery = __deviceQuery;
        return this;
    }

    this.setFilterName = function(__filterName) {
        navBar.setFilterName(__filterName);
        return this;
    }

    this.onConstruct = function() {

        $deviceList = $("<div>");

        navBar = new DmDeviceListNavBar({
            onPageChange: function(page) {
                self.markDirty("page").refresh();
            },
            filterName: "All",
        });

        var $container = $("<div>");

        canvas = new CuiCanvas({
            preceededBy: navBar,
            relativeTo: $container,
            contents: $deviceList,
        });


        $container.html(cuiCompose([navBar, canvas]));

        return $container;
    }

    function constructTable(_devices) {
        $table = $("<table border=0 class='dm_devices_page dm_device_table' cellspacing=0>\
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
                <th align=left class='dm_hide_below_1024w' width=40%>\
                    <div style='display:inline-block; min-width:368px; height:1px'>\
                </th>\
            </tr>\
        </table>");

        for (var i = 0; i < _devices.length; i++) {
            var device = _devices[i];
            var lastActivity = device.lastActivitySecondsAgo();
            var selected = (selectedDevice && (selectedDevice.id() == device.id())) ? "class=selected" : "";
            $row = $("<tr " + selected + ">\
                <td class='dm_device_table dm_uuid' nowrap style='overflow: hidden; font-size:12px; font-family:monospace'><div style='position:relative; vertical-align=text-baseline;'><div style='display: inline-block;position:absolute;'>" + device.id() + "</div>&nbsp;</div></td>\
                <td width=1 style='padding-left:0px'>\
                    <div class='dm_invisible_above_1260w' style='font-weight:300'>...</div>\
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
                <td class='dm_hide_below_1024w' align=left width=40%>\
                </td>\
            </tr>");
            $row.off('click').on('click', function(idx, device) {
                return function() {
                    selectedDevice = device;
                    if (params.onSelect) {
                        params.onSelect(idx, device);
                    }
                    self.markDirty("table").refresh();
                }
            }(i, device));
            $table.append($row);
        }
        return $table;
    }

    this.onRefresh = function($me, dirty, live) {
        var refresh = dirty("page");

        if (deviceQuery != _deviceQuery) {
            refresh = true;
            deviceQuery = _deviceQuery;
        }

        if (refresh) {
            var start = navBar.startIdx();
            var count = navBar.numItemsPerPage();
            deviceQuery.count().onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    alert("Problem fetching device count: " + data.errorMsg);
                    return;
                }
                navBar.setNumItems(data.count).refresh();
                deviceQuery.getMany(start, count).onDone(function(result, data) {
                    if (result != CANOPY_SUCCESS) {
                        alert("Problem fetching devices: " + data.errorMsg);
                        return;
                    }
                    $deviceList.html(constructTable(data.devices));
                    devices = data.devices;
                });
            });
        } else if (dirty("table")) {
            // TODO: it is very inefficient to regenerate the whole table all
            // the time.
            $deviceList.html(constructTable(devices));
        }

        cuiRefresh([navBar, canvas], live);
    }

    this.onSetupCallbacks = function() {
    }
}
