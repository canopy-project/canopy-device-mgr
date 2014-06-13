/*
 * CanoDeviceControlsNode - Dialog box for remote controlling device.
 *
 * Required Parameters:
 *  
 *      canopy_client: <CanopyClient object>
 *          Canopy client used for fetching data from the cloud.
 *
 * Optional Parameters:
 *
 *      layout_css: <object>
 *          CSS used for laying out the position of this dialog box.  Defaults
 *          to {}.
 */
function CanoDeviceControlsDialogNode(origParams) {
    var self=this,
        $body,
        $me,
        params;

    $.extend(this, new CanoNode());

    params = $.extend({}, {
        layout_css: {}
    }, origParams);

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        this.refresh();
    }

    this.refresh = function() {
        params.canopy_client.fetchDevices(function(devices) {
            var cls = devices.devices[0].device_class
            $body.html("");
            for (var propname in cls) {
                var property = cls[propname];
                if (property.category != "control")
                    continue;

                if (property.datatype == "boolean") {
                    $body.append("<input type=submit value='" + propname + "'></input>" + "<BR>");
                }
                else {
                    $body.append(propname  + ": <input type=text></input>" + property.description + "<input type=submit value=apply></input><BR>");
                }
            }
        });
    }
    $body = $("<div>")

    $me = new CanoDialogNode({
        title_html: "Control",
        outer_css: params.layout_css,
        body_html: $body
    }).get$();
}
