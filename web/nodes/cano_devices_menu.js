/*
 * params
 *  .onFilterSet -- callback when filtering options change.
 */
function CanoDevicesMenuNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarNode,
        $currentFilter,
        $allDevicesButton,
        $onlineDevicesButton,
        $disconnectedDevicesButton,
        $filterTitle,
        $filterCount
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $allDevicesButton.off().on('click', function() {
            self.setFilter({});
        });
        $onlineDevicesButton.off().on('click', function() {
            self.setFilter({connected: true});
        });
        $disconnectedDevicesButton.off().on('click', function() {
            self.setFilter({connected: false});
        });
    }

    /*
     * options is object:
     *  .connected - true, false or null (for either)
     */
    this.setFilter = function(options) {
        if (options.connected === undefined || options.connected === null) {
            $filterTitle.html("<br>showing all devices");
            $filterCount.html(canopy.devices.length);
        }
        else if (options.connected === true) {
            $filterTitle.html("<br>showing online devices");
            $filterCount.html(canopy.devices.connected().length);
        }
        else if (options.connected === false) {
            $filterTitle.html("<br>showing disconnected devices");
            $filterCount.html(canopy.devices.disconnected().length);
        }
        if (params.onFilterSet)
            params.onFilterSet(options);
    }

    $me= $("<div class=cano-devices_menu-outer>");

    $filterCount = $("<span class=big>" + canopy.devices.length + "</span>");
    $filterTitle = $("<span class=s><br>showing all devices</span>");

    $currentFilter = CanopyUtil_Compose(["\
        <div style='display:inline-block; width:250px;'>\
            <div style='text-align:center; border-bottom:2px solid #a00000; padding-bottom:4px; display: inline-block; line-height:0.90'>\
                ", $filterCount, $filterTitle, "\
            </div>\
        </div>\
    "]);
    $currentFilter.appendTo($me);

    $allDevicesButton = $("\
        <div class=cano-devices_menu-button>\
            <span class=big>" + canopy.devices.length + "</span>\
            <span class=s><br>devices</span>\
        </div>\
    ");
    $allDevicesButton.appendTo($me);

    $onlineDevicesButton = $("\
        <div style='margin-left:30px;' class=cano-devices_menu-button>\
            <span class=big>" + canopy.devices.connected().length + "</span>\
            <span class=s><br>online</span>\
        </div>\
    ");
    $onlineDevicesButton.appendTo($me);

    $disconnectedDevicesButton = $("\
        <div style='margin-left:20px;' class=cano-devices_menu-button>\
            <span class=big>" + canopy.devices.disconnected().length + "</span>\
            <span class=s><br>disconnected</span>\
        </div>\
    ");
    $disconnectedDevicesButton.appendTo($me);
}
