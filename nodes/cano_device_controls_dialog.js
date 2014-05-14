
function CanoDeviceControlsDialogNode(params) {
    var self=this,
        canopy = params.canopyClient,
        $me;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        this.refresh();
    }

    this.refresh = function() {
        canopy.fetchDevices(function(devices) {
            $me.html("");
            var cls = devices.devices[0].device_class
            for (var propname in cls) {
                var property = cls[propname];
                if (property.category != "control")
                    continue;

                if (property.datatype == "boolean") {
                    $me.append("<input type=submit value='" + propname + "'></input>" + property.description + "<BR>");
                }
                else {
                    $me.append(propname  + ": <input type=text></input>" + property.description + "<BR>");
                }
            }
        });
    }

    $me = $("\
        <div class='cano-dialog cano-main-top-half-layout'>\
        </div>\
    ");
}
