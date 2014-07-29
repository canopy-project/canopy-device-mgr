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
 * .sensor -- CanopyProperty object to display
 */
function CanoSensorSmallNode(params) {
    var self=this,
        $me,
        $left,
        $right,
        sensor = params.sensor,
        propNodes = [],
        hoverPlotNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $me.hover(function() {
            hoverPlotNode.get$().show();
            sensor.fetchHistoricData({
                onSuccess: function(data) {
                    hoverPlotNode.setTimeseriesData(data.samples);
                }
            });
        },
        function() {
            hoverPlotNode.get$().hide();
        }
        );
    }

    hoverPlotNode = new CanoHoverPlotNode();

    var value = (sensor.value() !== null) ? Math.round(100*sensor.value().v)/100 : '-';
    if (value != '-') {
        if (sensor.units() == "degrees_f") {
            value += "&deg;C";
        }
        if (sensor.numericDisplayHint() == "percentage") {
            value += "%";
        }
    }

    $me = $("<div class=cano-sensor_small-outer>\
        <div class=cano-sensor_small-top>\
            <div class=bottom_aligner></div><div style='display: inline-block'>\
                " + value + "\
            </div>\
        </div>\
        <div class=cano-sensor_small-bottom>" + sensor.name() + "</div>\
    </div>");

    hoverPlotNode.appendTo($me);
    hoverPlotNode.get$().hide();
}
