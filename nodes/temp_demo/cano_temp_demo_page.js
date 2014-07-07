FAN_DEVICE_ID = "d59e4703-ed10-11e3-a241-74d02b36a289";

function CanoTempPlusPageNode(canopy, dispatcher) {
    var $me,
        chart1,
        chart2,
        $topp,
        $bottom
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        canopy.fetchSensorData(FAN_DEVICE_ID, "temperature", function(data) {
            chart1.setTimeseriesData(data.samples);
        })
        canopy.fetchSensorData(FAN_DEVICE_ID, "humidity", function(data) {
            chart2.setTimeseriesData(data.samples);
        })
    }

    $me = $("<div style='width:100%;'></div>");
    $topp = $("<div style='height:200px'></div>");
    $bottom = $("<div style='height:200px'></div>");
    $me.append($topp);
    $me.append($bottom);

    chart1 = new CanoPlotNode({title: "temperature"}).appendTo($topp);
    chart2 = new CanoPlotNode({title: "humidity"}).appendTo($bottom);
}

