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
/*
 */
function CanoDeviceDetailsVarsPlot(params) {
    var self=this,
        $me,
        plotNode,
        $msg
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    this.close = function() {
        $me.hide();
    }

    this.setTimeseriesData = function(data) {
        if (data == null) {
            $msg.html("Hover over a cloud variable to see plot.</div>");
            $msg.show();
            plotNode.hide();
        }
        else if (data.length > 2) {
            $msg.hide();
            plotNode.show();
            plotNode.setTimeseriesData(data);
        } 
        else {
            $msg.html("Not enough data to show plot.");
            $msg.show();
            plotNode.hide();
        }
    }

    plotNode = new CanoPlotNode({
        title: "hi",
        vAxisFormat: "#",
        width: 480,
        height: 90
    });

    $msg = $("<div style='font-size: 14px; padding:8px'> </div>");
    this.setTimeseriesData(null);

    $me = CanopyUtil_Compose(["\
            <div class=devmgr_cloudvar_plot_outer>\
                <div class=devmgr_cloudvar_plot_inner>\
                    ", $msg, "\
                    ", plotNode, "\
                </div>\
            </div>\
    "]);
}

