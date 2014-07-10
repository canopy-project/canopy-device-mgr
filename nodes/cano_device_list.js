
function CanoDeviceList(canopy) {
    var $me,
        self=this;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    this.refresh = function(devices) {
        $me.html("Devices:<br>");
        for (var i = 0; i < devices.length; i++) {
            $me.append(devices[i].friendlyName() + " " + 
                   devices[i].id() + " " 
                   + devices[i].isConnected()
                   + "<br>");

            var controlsHtml = "Controls: <br>";
            controls = devices[i].controlList();
            for (var j = 0; j < controls.length; j++) {
                console.log(controls[j].name());
            }

            console.log("Sensors:");
            sensors = devices[i].sensorList();
            for (var j = 0; j < sensors.length; j++) {
                console.log(sensors[j].name());
            }
        }
        return this;
    }

    $me = $("<div>");
}
