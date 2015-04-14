/*
 * Copyright 2014-2015 SimpleThings, Inc.
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
function CanoAnalyticsPageNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarSubmenuNode,
        sidebarNode,
        dashboardSidebarNode,
        dashboardNode,
        mapsNode,
        mapsSidebarNode,
        mainNode,
        noDevicesNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        sidebarNode.onLive();
        topbarSubmenuNode.onLive();
        mainNode.onLive();
        
        this.refresh();
    }

    this.refresh = function(page) {
        if (!page) {
            page = "dashboard";
        }
        params.user.devices().getMany(0, 10).onDone(function(result, data) {
            if (result != CANOPY_SUCCESS) {
                alert("Problemo");
                return;
            }
            if (data.devices.length > 0) {
                mainNode.select(page);
                sidebarNode.select(page);
                mapsSidebarNode.setDevices(data.devices);
                mapsSidebarNode.refresh();
            }
            else {
                mainNode.select("no_devices");
                sidebarNode.select("no_devices");
            }
        });
    }

    this.drawCharts = function() {
        dashboardNode.drawCharts();
    }

    mapsSidebarNode = new CanoAnalyticsMapSidebarNode({
        canopyClient : canopy,
        dispatcher: dispatcher,
        onDeviceClicked: function(device) {
            mapsNode.jumpTo(device.varByName("latitude").value(), device.varByName("longitude").value());
        }
    });
    dashboardSidebarNode = new CanoAnalyticsSidebarNode({
        dispatcher: dispatcher,
    });

    topbarSubmenuNode = new CanoTopbarSubmenuNode({
        user: params.user,
        items: [ {
            content: "Dashboard",
            value: "dashboard"
        }, {
            content: "Maps",
            value: "maps"
        }],
        onSelect: function(val) {
            if (val == "maps") {
                var mapDevices = mapsSidebarNode.getMapDevices();
                mapsNode.setMapDevices(mapDevices);
            }
            self.refresh(val);
        }
    })

    noDevicesNode = new CanoAnalyticsNoDevicesNode({});

    dashboardNode = new CanoDashboardNode({
        user: params.user
    });

    mapsNode = new CanoAnalyticsMapNode({
        user: params.user
    });

    sidebarNode = new CanoSwitcherNode({
        children: [ {
            name: "dashboard",
            content: dashboardSidebarNode
        }, {
            name: "maps",
            content: mapsSidebarNode
        }, {
            name: "no_devices",
            content: $("<div>")
        } ],
        selectedIdx: 0
    });

    mainNode = new CanoSwitcherNode({
        children: [ {
            name: "dashboard",
            content: dashboardNode,
        }, {
            name: "maps",
            content: mapsNode,
        }, {
            name: "no_devices",
            content: noDevicesNode,
        } ],
        selectedIdx: 0
    });

    $me = CanopyUtil_Compose(["<div>\
        ", topbarSubmenuNode, "\
        ", sidebarNode, "\
        &nbsp; <div style='padding:16px; margin-left: 244px; margin-top:18px'>", mainNode, "</div>\
    </div>"]);

}
