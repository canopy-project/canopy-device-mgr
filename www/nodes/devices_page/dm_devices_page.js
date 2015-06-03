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
 * Devices page for Canopy Device Manager
 *
 *  PARAMS:
 *      params.user -- Optional CanopyUser object
 *
 *  METHODS:
 *      setUser
 *
 */
function DmDevicesPage(params) {
    cuiInitNode(this);
    this.markDirty("user");
    var self = this;

    var user = params.user;

    var canvas;
    var menu;
    var switcher;
    var numDevices;

    var deviceListScreen;
    var noDevicesScreen;
    var createDevicesScreen;

    function selectPage(name) {
        if (name == "device_list") {
            if (numDevices == 0) {
                switcher.select("no_devices").refresh();
            } else {
                switcher.select("device_list").refresh();
            }
        }
    }

    this.setUser = function(_user) {
        user = _user;
        this.markDirty("user");
        return this;
    }

    this.onConstruct = function() {
        menu = new CuiTopbar({
            appName: user ? user.username() : "Not signed in",
            cssClass: "cui_default cui_topbar_submenu",
            items: [ {
                content: "Device List",
                value: "devices"
            }],
            showAppDropdown: false,
        });

        deviceListScreen = new DmDeviceListScreen({
            user: user,
            onCreateDeviceRequest: function() {
                switcher.select("create_device").refresh();
            }
        });

        noDevicesScreen = new DmNoDevicesScreen({
            onCreateDeviceRequest : function() {
                switcher.select("create_device").refresh();
            },
        });

        createDeviceScreen = new DmCreateDevicesScreen({
            user : params.user,
            onCreated: function() {
                self.markDirty("user");
                switcher.select("device_list");
                self.refresh();
            },
            onCancel: function() {
                selectPage("device_list");
            },
        });

        switcher = new CuiSwitcher({
            children: {
                "create_device": createDeviceScreen,
                "no_devices": noDevicesScreen,
                "device_list": deviceListScreen,
            },
            onSelect: function(name) {
                if (name == "device_list") {
                    menu.setBreadcrumb(null).refresh();
                } else if (name == "create_device") {
                    if (numDevices == 0) {
                        menu.setBreadcrumb(["Welcome", "Create Devices"]).refresh();
                    }
                    else {
                        menu.setBreadcrumb(["Devices", "Create Devices"]).refresh();
                    }
                }
            },
            dflt: "device_list"
        });

        canvas = new CuiCanvas({
            preceededBy: menu,
            refreshOnWindowResize: true,
            contents: switcher
        });

        return [menu, canvas];
    }

    this.onRefresh = function($me, dirty, live) {
        if (dirty("user") && user) {
            user.devices().count().onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    alert("problem");
                }
                numDevices = data.count;
                selectPage("device_list");
            });
        }
        cuiRefresh([menu, canvas], live);
    }
}
