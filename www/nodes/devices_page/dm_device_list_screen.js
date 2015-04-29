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
        sidebarNode = new CanoDevicesSidebarNode({
            user: params.user,
            onCreateDeviceLink : function() {
                if (params.onCreateDeviceRequest) {
                    params.onCreateDeviceRequest();
                }
            },
            onFilterChange : function(filterName, filter) {
                deviceListNode.setFilterName(filterName).refresh();
            }
        });

        deviceDetailsNode = new DmDeviceDetails({
            user: params.user,
            onDeviceModified: function() {
                deviceListNode.refresh();
            }
        });


        $deviceDetailsWindow = cuiCompose([
            "<div style='position:fixed; right:24px; width:360px; top:125px; z-index:10000; background:#ffffff; border: 1px solid #a0a0a0; box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.4);'>",
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
            
        innerLayout = new CuiHSplitLayout({
            left: deviceListNode,
            right: cuiCompose([
                $deviceDetailsWindow,
                "<div style='position:absolute; top:0px; background: #ffffff; border-left: 1px solid #a0a0a0;bottom:0px; width:100%'>",
                    "<div style='font-size:22px;padding:16px;'>",
                        "ThingSee0",
                    "</div>",
                "</div>",
            ]),
            rightSize: "3px"
        });
        
        layout = new CuiHSplitLayout({
            left: sidebarNode.get$(),
            right: innerLayout,
            leftSize: "220px"
        });

        /*layout = new CuiHSplit3Layout({
            cssClass: "",
            left: sidebarNode.get$(),
            middle: deviceListNode.get$(),
            right: deviceDetailsNode.get$(),

            leftSize: "240px",
            rightSize: "680px",
        });*/

        // TODO: Why is this needed?
        return ["<div class='dm_devices_page' style='position:absolute; width:100%; height:100%'>", layout, "</div>"];
        //return layout;
    }

    this.onRefresh = function($me, dirty, live) {
        if (dirty("user")) {
        }

        cuiRefresh([layout, deviceDetailsNode], live);

        if (live) {
            sidebarNode.onLive();
            deviceListNode.refresh(live);
        }
    }
}
