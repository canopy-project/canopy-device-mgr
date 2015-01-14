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
        plotNode
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
        plotNode.setTimeseriesData(data);
    }

    plotNode = new CanoPlotNode({
        title: "hi",
        vAxisFormat: "#",
        width: 480,
        height: 90
    });

    $me = CanopyUtil_Compose(["\
            <div class=devmgr_cloudvar_plot_outer>\
                <div class=devmgr_cloudvar_plot_inner>\
                    ", plotNode, "\
                </div>\
            </div>\
    "]);
}

