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
        dispatcher = params.dispatcher
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        this.refresh();
    }

    this.refresh = function() {
    }

    this.drawCharts = function() {
        if (!document.getElementById("piechart"))
            return;

        // chart 1
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Connected',     1],
            ['Disconnected',      12],
        ]);

        var options = {
            title: '',
            width: 200,
            height: 200,
            fontName: "Arial",
            legend: 'none',
            pieSliceTextStyle: {
                fontName: "Arial",
                fontSize: 12
            },
            slices: [ {
                color: "#70b060",
            }, {
                color: "#707070",
            } ],
            chartArea: {
                top: "5%",
                left: "5%",
                width: "90%",
                height: "90%"
            }
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);

        // chart 2
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Active',     1],
            ['Inactive',      3],
            ['Newly Created',      10],
        ]);

        var options = {
            title: '',
            width: 200,
            height: 200,
            fontName: "Arial",
            legend: 'none',
            pieSliceTextStyle: {
                fontName: "Arial",
                fontSize: 12
            },
            slices: [ {
                color: "#70b060",
            }, {
                color: "#707070",
            }, {
                color: "#3060b0",
            } ],
            chartArea: {
                top: "5%",
                left: "5%",
                width: "90%",
                height: "90%"
            }
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart2'));

        chart.draw(data, options);
    }

    $me = CanopyUtil_Compose(["<div>\
            <div style='vertical-align:top; display: inline-block; max-width:200; text-align:center'>\
                Websocket Connection\
                <br><div id=piechart style='display:inline-block; height:200px; width:200px;'></div>\
                <br><div style='display: inline-block; font-weight: 400; font-size: 16px; text-align:left'>\
                    <div style='color:#70b060'>&bull; Connected</div>\
                    <div style='color:#707070'>&bull; Disconnected</div>\
                </div>\
            </div>\
            <div style='margin-left:60px; vertical-align:top; display: inline-block; text-align:center'>\
                Activity\
                <br><div id=piechart2 style='display:inline-block; height:200px; width:200px;'>\
                    <div style='display:inline-block; height:200px; width:200px;'>\
                    </div>\
                </div>\
                <br><div style='display: inline-block; font-weight: 400; font-size: 16px; text-align:left'>\
                    <div style='color:#70b060'>&bull; Active</div>\
                    <div style='color:#707070'>&bull; Inactive</div>\
                    <div style='color:#3060b0'>&bull; Newly Created</div>\
                </div>\
            </div>\
    </div>"]);
}
