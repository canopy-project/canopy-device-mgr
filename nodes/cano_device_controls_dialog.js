
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
            $me.html("<div style='font-weight:400; color: #000000; padding:4px; padding-left:16px; font-size:larger; background:#e0e6f0'>Controls</div>");
            $inner = $("<div style='padding:16px'></div>");
            var cls = devices.devices[0].device_class
            for (var propname in cls) {
                var property = cls[propname];
                if (property.category != "control")
                    continue;

                if (property.datatype == "boolean") {
                    $inner.append("<input type=submit value='" + propname + "'></input>" + property.description + "<BR>");
                }
                else {
                    $inner.append(propname  + ": <input type=text></input>" + property.description + "<input type=submit value=apply></input><BR>");
                }
            }
            $me.append($inner);
        });
    }

    $me = $("\
        <div class='cano-dialog2 cano-main-top-half-layout'>\
        </div>\
    ");
}
