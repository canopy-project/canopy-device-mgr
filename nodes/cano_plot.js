function CanoPlotNode(origParams)
{
    var self=this,
        $me,
        params,
        dataArray = []
    ;

    $.extend(this, new CanoNode());

    params = $.extend({}, {
    }, origParams);

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    /* Expects array of objects [t: <RFC3339 Time>,  v: <float>] */
    this.setTimeseriesData = function(samples) {
        dataArray.length = 0;
        dataArray.push([
            "Time",
            "Value"
        ])
        for (i = 1; i < samples.length; i++) {
            t0 = Date.parse(samples[i-1].t);
            t1 = Date.parse(samples[i].t);
            if (t1 - t0 > 200000)
            {
                dataArray.push([
                    new Date(t0),
                    null
                ]);
                dataArray.push([
                    new Date(t1),
                    null
                ]);
            }
            else
            {
                if (params.vAxisFormat == "#%") {
                    dataArray.push([
                        new Date(t1),
                        samples[i].v / 100.0
                    ]);
                }
                else {
                    dataArray.push([
                        new Date(t1),
                        samples[i].v*1.8 + 32
                    ]);
                }
            }
        }
        this.drawChart();
    }

    this.drawChart = function() {
        var data = google.visualization.arrayToDataTable(dataArray);

        var options = {
            title: params.title,
            legend: { position: 'none' },
            fontName : "Source Sans Pro",
            fontSize : 12,
            hAxis: {textStyle:{color:"black"}, format: "h:mm a", gridlines: {color: 'transparent'}},
            vAxis: {textStyle:{color:"black"}, format: params.vAxisFormat, gridlines: {color: 'transparent'}},
            chartArea:{left:50,top:10,width:"80%",height:"80%"},
            height: 150,
        };

        var chart = new google.visualization.AreaChart($me[0]);
        chart.draw(data, options);
    }

    $me = $("<div style='color:#000000'>");
}


google.load("visualization", "1", {packages:["corechart"]});
