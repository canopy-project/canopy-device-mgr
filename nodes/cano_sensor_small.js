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

    var value = (sensor.value() !== null) ? sensor.value().v : '-';
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
