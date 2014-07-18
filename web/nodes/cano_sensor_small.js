/*
 * .sensor -- CanopyProperty object to display
 */
function CanoSensorSmallNode(params) {
    var self=this,
        $me,
        $left,
        $right,
        sensor = params.sensor,
        propNodes = []
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    var value = (sensor.value() !== null) ? sensor.value().v : '-';
    if (value != '-') {
        if (sensor.units() == "degrees_f") {
            value += "&deg;F";
        }
        if (sensor.numericDisplayHint() == "percentage") {
            value += "%";
        }
    }

    $me = $("<div class=cano-sensor_small-outer>\
        <div class=cano-sensor_small-top>" + value + "</div>\
        <div class=cano-sensor_small-bottom>" + sensor.name() + "</div>\
    </div>");
}
