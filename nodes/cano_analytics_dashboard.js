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
function CanoDashboardNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        chartNode,
        chartNode2,
        cloudVarHistograms = [],
        $cloudVarHistograms
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        chartNode.onLive();
        chartNode2.onLive();
        this.refresh();
    }

    this.refresh = function() {
    }

    this.drawCharts = function() {
        cloudVarHistograms.length = 0;

        var cloudvars = canopy.me.Devices().CloudVarNames();

        var i;
        $cloudVarHistograms.html("");
        for (i = 0; i < cloudvars.length; i++) {
            var histogramNode = new CanoAnalyticsHistogramWidgetNode({
                canopyClient: canopy,
                varName: cloudvars[i]
            });
            cloudVarHistograms.push(histogramNode);
            histogramNode.appendTo($cloudVarHistograms);
            histogramNode.drawCharts();
        }

        chartNode.drawCharts();
        chartNode2.drawCharts();
    }

    chartNode = new CanoAnalyticsWidgetNode({
        canopyClient: canopy,
        type: "Websocket Connection",
    });

    chartNode2 = new CanoAnalyticsWidgetNode({
        canopyClient: canopy,
        type: "Activity",
    });

    $cloudVarHistograms = $("<div>");

    $me = CanopyUtil_Compose(["<div>\
            <div class=l style='margin-bottom:16px'>Connectivity</div>\
            ", chartNode, "\
            ", chartNode2, "\
            <div class=l style='margin-top:32px; margin-bottom:16px'>Cloud Vars</div>\
            ", $cloudVarHistograms, "\
    </div>"]);
}
