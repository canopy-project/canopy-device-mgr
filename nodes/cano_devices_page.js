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
function CanoDevicesPageNode(params) {
    var self=this,
        $me,
        sidebarNode,
        deviceListNode,
        noDevicesNode,
        createDeviceNode,
        deviceDetailsNode,
        mainNode
    ;

    var canvas;
    var topbarSubmenu;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        topbarSubmenu.live();
        canvas.live();
        sidebarNode.onLive();
        mainNode.onLive();
        deviceDetailsNode.onLive();
        deviceListNode.onLive();

        self.refresh()
    }

    this.refresh = function() {
        params.user.devices().getMany(0, 10).onDone(function(result, data) {
            if (result != CANOPY_SUCCESS) {
                alert("problem");
            }
            if (data.devices.length == 0) {
                mainNode.select("no_devices");
            }
            else {
                mainNode.select("device_list");
            }
            deviceListNode.refresh();
        });
    }

    topbarSubmenu = new CuiTopbar({
        appName: params.user.username(),
        cssClass: "cui_default cui_topbar_submenu",
        items: [ {
            content: "Device List",
            value: "devices"
        }],
        showAppDropdown: false,
    });

    sidebarNode = new CanoDevicesSidebarNode({
        user: params.user,
        onCreateDeviceLink : function() {
            mainNode.select("create_device");
        },
        onFilterChange : function(filterName, filter) {
            deviceListNode.setFilter(filterName, filter);
        }
    });

    deviceListNode = new CanoDeviceListNode({
        user: params.user,
        onSelect: function(idx, device) {
            deviceDetailsNode.setDevice(device);
        },
        onShow: function() {
            deviceDetailsNode.show();
            sidebarNode.show();
            topbarSubmenu.setBreadcrumb(null).refresh();
        }
    });
        
    noDevicesNode = new CanoDevicesNoDevicesMsgNode({
        onCreateDeviceLink : function() {
            mainNode.select("create_device");
        },
        onShow: function() {
            deviceDetailsNode.hide();
            sidebarNode.hide();
            topbarSubmenu.setBreadcrumb(["Welcome"]).refresh();
        }
    });

    createDeviceNode = new CanoDevicesCreateNode({
        user : params.user,
        onCreated: function() {
            self.refresh()
        },
        onCancel: function() {
            self.refresh()
        },
        onShow: function() {
            deviceDetailsNode.hide();
            sidebarNode.hide();
            params.user.devices().count().onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    alert("problem");
                }
                if (data.count == 0) {
                    topbarSubmenu.setBreadcrumb(["Welcome", "Create Devices"]).refresh();
                }
                else {
                    topbarSubmenu.setBreadcrumb(["Devices", "Create Devices"]).refresh();
                }
            });
        }
    });

    deviceDetailsNode = new CanoDeviceDetailsNode({
        user: params.user,
        onDeviceModified: function() {
            deviceListNode.refresh();
        }
    });
    
    mainNode = new CanoSwitcherNode({
        children: [{
            name: "create_device",
            content: createDeviceNode,
        }, {
            name: "no_devices",
            content: noDevicesNode,
        }, {
            name: "device_list",
            content: deviceListNode,
        }]
    });
    mainNode.select("device_list");

    var layout = new CuiHSplit3Layout({
        cssClass: "",
        left: sidebarNode.get$(),
        middle: mainNode.get$(),
        right: deviceDetailsNode.get$(),

        leftSize: "280px",
        rightSize: "680px",
    });

    canvas = new CuiCanvas({
        preceededBy: topbarSubmenu,
        contents: layout
    });

    $me = CanopyUtil_Compose(["<div>\
        ", topbarSubmenu, "\
        ", canvas, "\
    </div>"]);
}
