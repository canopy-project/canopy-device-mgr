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
function CanoAnalyticsWidgetNode(params) {
    var self=this,
        $me,
        $chart,
        $legend
        devicesList = []
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

    this.setDevices = function(_devicesList) {
        devicesList = _devicesList;
    }

    function computeStats(deviceList) {
        var out = {
            numConnected: 0,
            numDisconnected: 0,

            numActive: 0,
            numInactive: 0,
            numNewlyCreated: 0,
        };
        for (i = 0; i < deviceList.length; i++) {
            if (deviceList[i].websocketConnected()) {
                out.numConnected++;
            } else {
                out.numDisconnected++;
            }

            if (deviceList[i].isNewlyCreated() == null) {
                out.numNewlyCreated++;
            } else if (deviceList[i].isActive()) {
                out.numActive++;
            } else {
                out.numInactive++;
            }
        }
        return out;
    }

    var getData = function(type) {
        var stats = computeStats(devicesList);
        if (type == "Websocket Connection") {
            return {
                data: google.visualization.arrayToDataTable([
                    ['Value', 'Num Devices'],
                    ['Connected', stats.numConnected],
                    ['Disconnected', stats.numDisconnected]
                ]),
                legend: "\
                    <div style='color:#70b060'>&bull; Connected (" + stats.numConnected + ")</div>\
                    <div style='color:#707070'>&bull; Disconnected (" + stats.numDisconnected + ")</div>\
                "
            }
        }
        if (type == "Activity") {
            return {
                data: google.visualization.arrayToDataTable([
                    ['Value', 'Num Devices'],
                    ['Active', stats.numActive],
                    ['Inactive', stats.numInactive],
                    ['Newly Created', stats.numNewlyCreated]
                ]),
                legend: "\
                    <div style='color:#70b060'>&bull; Active (" + stats.numActive + ")</div>\
                    <div style='color:#707070'>&bull; Inactive (" + stats.numInactive + ")</div>\
                    <div style='color:#3060b0'>&bull; Newly Created (" + stats.numNewlyCreated + ")</div>\
                "
            }

        }
        return null;
    }
    this.drawCharts = function() {
        v = getData(params.type);
        if (v == null) {
            return;
        }

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
        var chart = new google.visualization.PieChart($chart[0]);
        chart.draw(v.data, options);

        $legend.html(v.legend);
    }

    $chart = $("<div style='display:inline-block; height:200px; width:200px;'></div>");
    $legend = $("<div style='display: inline-block; font-weight: 400; font-size: 16px; text-align:left'>");

    $me = CanopyUtil_Compose(["<div style='vertical-align:top; display: inline-block; margin-right:40px; max-width:200; text-align:center'>\
        " + params.type + "\
        <br>", $chart, "\
        <br>", $legend, "\
    </div>"]);
}
