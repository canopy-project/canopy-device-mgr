
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
            $me.html("<div style='font-weight:400; color: #000000; padding:4px; padding-left:16px; font-size:22px; background:#e0e6f0'>Devices</div>");
            var length = device.devices.length;
            for (var i = 0; i < length ; i++) {
                $me.append("<div style='padding-left:16px'>" + device.devices[i].friendly_name + "</div>");
            }
        });
    }

    $me = $("\
        <div class='cano-dialog2 cano-sidebar-layout'>\
        </div>\
    ");
}
