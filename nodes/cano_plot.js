function CanoPlotNode(origParams)
{
    var self=this,
        $me,
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
        for (i = 0; i < samples.length; i++) {
            dataArray.push([
                samples[i].t,
                samples[i].v
            ])
        }
        drawChart();
        window.onresize = drawChart;
    }

    drawChart = function() {
        var data = google.visualization.arrayToDataTable(dataArray);

        var options = {
            title: 'Sensor data',
            legend: { position: 'none' },
            chartArea : {left: 24, top: 24, width: '100%', height: '80%'},
            height: 300,
            fontName : "Source Sans Pro",
            backgroundColor: '#f8f6f4',
        };

        var chart = new google.visualization.LineChart($me[0]);
        chart.draw(data, options);
    }

    $me = $("<div>");
}

google.load("visualization", "1", {packages:["corechart"]});
