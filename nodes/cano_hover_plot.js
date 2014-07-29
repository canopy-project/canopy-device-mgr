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
function CanoHoverPlotNode(params) {
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
        vAxisFormat: "#"
    });

    $me = CanopyUtil_Compose(["\
            <!--div class=cano-hover_plot-poker-outer>\
                <div class=cano-hover_plot-poker-inner>\
                    &#x25b2;\
                </div>\
            </div-->\
            <div class=cano-hover_plot-outer>\
                <div class=cano-hover_plot-inner>\
                    ", plotNode, "\
                </div>\
            </div>\
    "]);
}

