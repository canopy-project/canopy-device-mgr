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
 * Analytics page for Canopy Device Manager
 *
 *  PARAMS:
 *      params.user -- Optional CanopyUser object
 *
 *  METHODS:
 *      setUser
 *
 */
function DmAnalyticsPage(params) {
    cuiInitNode(this);
    this.markDirty("user");
    var self = this;

    var user = params.user;

    var canvas;
    var menu;
    var switcher;
    var numDevices;

    var noDevicesScreen;
    var mapsScreen;
    var aggregateScreen;

    function selectPage(name) {
        if (numDevices == 0) {
            switcher.select("no_devices").refresh();
        } else {
            switcher.select(name).refresh();
        }
    }

    this.setUser = function(_user) {
        user = _user;
        this.markDirty("user");
        return this;
    }

    this.onConstruct = function() {
        menu = new CuiTopbar({
            cssClass: "cui_default cui_topbar_submenu",
            items: [ {
                content: "Aggregate",
                value: "aggregate"
            }, {
                content: "Maps",
                value: "maps"
            } ],
            navState: cuiNavState,
            navStateName: "ana_page",
            onSelect: function(value) {
                switcher.select(value).refresh();
            },
            showDropdown: "org",
            showUserDropdown: false,
            user: params.user,
            viewerName: params.viewer.name()
        });
        
        aggregateScreen = new DmAggregateScreen({
            user: user,
        });

        mapsScreen = new DmMapsScreen({
            user: user,
        });

        noDevicesScreen = new DmNoDevicesScreen({
            onCreateDeviceRequest : function() {
                switcher.select("create_device").refresh();
            },
        });

        switcher = new CuiSwitcher({
            children: {
                "aggregate": aggregateScreen,
                "maps": mapsScreen,
                "no_devices": noDevicesScreen,
            },
            onSelect: function(name) {
            },
            default: "aggregate"
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
            user.devices().getMany(0, 10).onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    alert("problem");
                }
                mapsScreen.get$(); // make sure it is constructed
                mapsScreen.setMapDevices(data.devices);
                mapsScreen.refresh();
            });
        }
        cuiRefresh([menu, canvas], live);
    }
}
