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
function CanoAnalyticsHistogramWidgetNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        $chart,
        $legend
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

    var getData = function(varName) {
        console.log("Plotting");
        var devices = canopy.me.Devices();
        var i;
        var data = [[varName]];
        for (i = 0; i < devices.length; i++) {
            var device = devices[i];
            if (!device.Vars())
                continue;
            if (device.Vars().Var(varName) != undefined) {
                data.push([device.Vars().Var(varName).Value()]);
            }
        }
        return {
            data: google.visualization.arrayToDataTable(data),
        }
    }
    this.drawCharts = function() {
        v = getData(params.varName);
        if (v == null) {
            return;
        }

        var options = {
            title: '',
            width: 400,
            height: 200,
            fontName: "Arial",
            legend: 'none',
            colors: ["#3060b0"],
            orientation: "horizontal",
            bar: {
                groupWidth: "75%"
            },
            chartArea: {
                top: 10,
                left: 30,
                width: 400,
                height: 140
            },
            histogram: {
                bucketSize: 1,
                hideBucketItems: true
            }
        };
        var chart = new google.visualization.Histogram($chart[0]);
        chart.draw(v.data, options);

        $legend.html(v.legend);
    }

    $chart = $("<div style='display:inline-block; height:200px; width:440px;'></div>");
    $legend = $("<div style='display: inline-block; font-weight: 400; font-size: 16px; text-align:left'>");

    $me = CanopyUtil_Compose(["<div style='vertical-align:top; display: inline-block; margin-right:40px; max-width:440px; text-align:center'>\
        " + params.varName + " (Current)\
        <br>", $chart, "\
    </div>"]);
}
