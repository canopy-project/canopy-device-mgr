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
 * Device List screen for Canopy Device Manager
 *
 *  PARAMS:
 *      params.user -- Optional CanopyUser object
 *      params.onCreateDeviceRequest
 *
 *  METHODS:
 *      setUser
 *
 */
function DmDeviceListScreen(params) {
    cuiInitNode(this);
    this.markDirty("user");

    var user = params.user;

    var layout;

    var sidebarNode;
    var deviceListNode;
    var deviceDetailsNode;

    this.setUser = function(_user) {
        user = _user;
        this.markDirty("user");
        return this;
    }

    this.onConstruct = function() {
        sidebarNode = new DmDevicesSidebar({
            user: params.user,
            onCreateDeviceClicked : function() {
                if (params.onCreateDeviceRequest) {
                    params.onCreateDeviceRequest();
                }
            },
            onFilterChange : function(filterName, filter) {
                var dq = params.user.devices();
                deviceListNode.setFilterName(filterName).refresh();
                if (filter) {
                    dq = dq.filter(filter);
                }
                deviceListNode.setDeviceQuery(dq).refresh();
            }
        });

        deviceDetailsNode = new DmDeviceDetails({
            user: params.user,
            autoRefreshInterval: 5000,
            onDeviceModified: function() {
                deviceListNode.markDirty("page").refresh();
            }
        });


        $deviceDetailsWindow = cuiCompose([
            "<div class='dm_devices_page dm_device_details_window'>",
                deviceDetailsNode,
            "</div>",
        ]);

        $deviceDetailsWindow.hide();

        deviceListNode = new DmDeviceList({
            user: params.user,
            onSelect: function(idx, device) {
                $deviceDetailsWindow.show();
                deviceDetailsNode.setDevice(device).refresh();
            },
            onShow: function() {
                sidebarNode.show();
                menu.setBreadcrumb(null).refresh();
            }
        });

        deviceListNode.setDeviceQuery(params.user.devices());
            
        layout = new CuiHSplitLayout({
            left: sidebarNode,
            right: cuiCompose([deviceListNode, $deviceDetailsWindow]),
            leftSize: "220px"
        });

        // TODO: Why is this needed?
        return ["<div class='dm_devices_page' style='position:absolute; width:100%; height:100%'>", layout, "</div>"];
        //return layout;
    }

    this.onRefresh = function($me, dirty, live) {
        cuiRefresh([layout, deviceListNode, deviceDetailsNode], live);
        // Note: Sidebar gets refreshed implicitely by layout, but the others
        // don't.
    }
}
