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
        priv = {filterName: "All", filter:  {}};
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        this.refresh();
    }

    this.setFilter = function(filterName, newFilter) {
        priv.filter = newFilter;
        priv.filterName = filterName;
        self.refresh();
    }

    this.refresh = function() {
        var devices = canopy.me.devices.Filter(priv.filter);
        $me.html("<div>Showing <i>" + priv.filterName + "</i> <span style='color:#808080'>(" + devices.length + " of " + devices.length + ")</span></div>");

        $table = $("<table class=devmgr_device_table cellspacing=0 cellpadding=8 style='font-size:16px'>\
            <tr>\
                <th>\
                    UUID\
                </th>\
                <th>\
                    Device Name\
                </th>\
                <th>\
                    Status\
                </th>\
            </tr>\
        </table>");

        var disconnected = "<span style='color:#a00000;'>Disconnected</span>"

        for (var i = 0; i < devices.length; i++) {
            var device = devices[i];
            $row = $("<tr>\
                <td style='font-size:12px; font-family:monospace'>\
                    " + device.UUID().substring(0, 6) + "...\
                </td>\
                <td>\
                    " + device.FriendlyName() + "\
                </td>\
                <td>\
                    " + (device.ConnectionStatus()) + "\
                </td>\
            </tr>");
            $row.off('click').on('click', function(idx, device) {
                return function() {
                    params.onSelect(idx, device);
                }
            }(i, device));
            $table.append($row);
        }
        $me.append($table);
    }

    $me = $("<div style='padding:16px'>");
}
