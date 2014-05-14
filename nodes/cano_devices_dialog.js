
function CanoDevicesDialogNode(params) {
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
        canopy.fetchDevices(function(device) {
            $me.html("");
            var length = device.devices.length;
            for (var i = 0; i < length ; i++) {
                $me.append("<div>" + device.devices[i].friendly_name + "</div>");
            }
        });
    }

    $me = $("\
        <div class='cano-dialog cano-sidebar-layout'>\
        </div>\
    ");
}
