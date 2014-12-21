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
function CanoAnalyticsPageNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarSubmenuNode,
        sidebarNode,
        dashboardNode,
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

    this.refresh = function() {
        if (canopy.me.Devices().length > 0) {
            mainNode.select("dashboard");
        }
        else {
            mainNode.select("no_devices");
        }
    }

    this.drawCharts = function() {
        dashboardNode.drawCharts();
    }

    sidebarNode = new CanoAnalyticsSidebarNode({
        canopyClient : canopy,
        dispatcher: dispatcher
    });

    topbarSubmenuNode = new CanoTopbarSubmenuNode({
        canopyClient: canopy,
        items: [ {
            content: "Dashboard",
            value: "dashboard"
        }],
        onSelect: function(val) {
            self.refresh();
        }
    })

    noDevicesNode = new CanoAnalyticsNoDevicesNode({});

    dashboardNode = new CanoDashboardNode({
        canopyClient: canopy
    });

    mainNode = new CanoSwitcherNode({
        children: [ {
            name: "dashboard",
            content: dashboardNode,
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
