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
        dashboardNode,
        mapsNode,
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
        if (canopy.me.Devices().length > 0) {
            mainNode.select(page);
        }
        else {
            mainNode.select("no_devices");
        }
    }

    this.drawCharts = function() {
        dashboardNode.drawCharts();
    }

    sidebarNode = new CanoAnalyticsMapSidebarNode({
        canopyClient : canopy,
        dispatcher: dispatcher,
        onDeviceClicked: function(device) {
            mapsNode.jumpTo(device.Vars().Var("latitude").Value(), device.Vars().Var("longitude").Value());
        }
    });

    topbarSubmenuNode = new CanoTopbarSubmenuNode({
        canopyClient: canopy,
        items: [ {
            content: "Dashboard",
            value: "dashboard"
        }, {
            content: "Maps",
            value: "maps"
        }],
        onSelect: function(val) {
            if (val == "maps") {
                var mapDevices = sidebarNode.getMapDevices();
                mapsNode.setMapDevices(mapDevices);
            }
            self.refresh(val);
        }
    })

    noDevicesNode = new CanoAnalyticsNoDevicesNode({});

    dashboardNode = new CanoDashboardNode({
        canopyClient: canopy
    });

    mapsNode = new CanoAnalyticsMapNode({
        canopyClient: canopy
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
