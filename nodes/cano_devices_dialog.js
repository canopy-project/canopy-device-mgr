/*
 * CanoDevicesDialogNode - Dialog box for listing and selecting devices.
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
function CanoDevicesDialogNode(origParams) {
    var self=this,
        $me,
        $list,
        params
    ;

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
        params.canopy_client.fetchDevices(function(device) {
            $list.html("")
            var length = device.devices.length;
            for (var i = 0; i < length ; i++) {
                $list.append("<div>" + device.devices[i].friendly_name + "</div>");
            }
        });
    }

    $list = $("<div>");

    $me = new CanoDialogNode({
        title_html: "Devices",
        outer_css: params.layout_css,
        body_html: $list
    }).get$();
}
