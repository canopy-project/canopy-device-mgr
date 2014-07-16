
var gDevices; /* hack */

function CanoSubmenuNode(canopy, dispatcher) {
    var $me,
        self=this,
        deviceListNode;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $("#app_fan").off("click").on("click", function() {
            dispatcher.showPage("fan");
        });
        $("#app_temp").off("click").on("click", function() {
            dispatcher.showPage("temp");
        });
        this.refresh(false);
    }

    this.refresh = function(devicesOnly) {
        gAccount.fetchDevices({
            onSuccess: function(devices) {
                gDevices = devices;
                deviceListNode.refresh(devices);
                var numTotal = devices.length;
                var numConnected = devices.count({connected: true});
                var numDisconnected = numTotal - numConnected;
                $("#total_count").html(numTotal);
                $("#online_count").html(numConnected);
                $("#offline_count").html(numDisconnected);
                /*setTimeout(function(){self.refresh(true);}, 5000);*/
            }
        });
        if (!devicesOnly) {
            /* hack.  Why are we modifying the topbar here? */
            canopy.fetchAccount({
                onSuccess: function(account) {
                    $("#topbar_username").html("<b>" + account.username() + "</b>");
                    $("#topbar_username").off('click').on('click', function() {
                        canopy.logout({
                            onSuccess: function() {
                                dispatcher.showPage("login");
                            }
                        });
                    })
                }
            });
        }
    }

    deviceListNode = new CanoDeviceList(canopy);

    $me = $("\
<div class=cano-submenu>\
    <div class=center_channel>\
        <div class='cano-topbar-account big'>\
            <div class=cano-submenu-item2>My Devices</div>\
            <div class=cano-submenu-item1>Settings</div>\
        </div>\
        <div class=cano-submenu-item style='margin-right:30px'><div class=big id=total_count><b>-</b></div><div class=s>devices</div></div>\
        <div class=cano-submenu-item style='margin-right:30px'><div class=big id=online_count><b>-</b></div><div class=s><div class=green_bullet>&#9899;</div>connected</div></div>\
        <div class=cano-submenu-item><div class=big id=offline_count><b>-</b></div><div class=s><div class=red_bullet>&#9899;</div>offline</div></div>\
    </div>\
</div>\
<br>\
<div class=center_channel>\
    <!--div style='position:relative;'>\
    <div class=cano-dialog-outer style='position:absolute; right:0px; width:300px;'>\
    <div class=cano-event-panel>\
        <div class=cano-event-panel-outer>\
            <div class=cano-event-panel-title>Greg\'s Fan Connected</div>\
            <div class=cano-event-panel-time>28 min ago</div>\
            <div class=cano-event-panel-message>Enjoy your toast!</div>\
        </div>\
        \
        <div class=cano-event-panel-outer>\
            <div class=cano-event-panel-title>Toast Started</div>\
            <div class=cano-event-panel-time>30 min ago</div>\
        </div>\
        \
        <div class=cano-event-panel-outer>\
            <div class=cano-event-panel-title>Toast Finished</div>\
            <div class=cano-event-panel-time>May 5 9:22am</div>\
            <div class=cano-event-panel-message>Enjoy your toast!</div>\
        </div>\
    </div>\
    </div>\
    </div-->\
    <!--div class=appouter>\
        <div class=appbox>\
            <div class=logo style='position:relative; top:20%'>Canopy<br>Manager</div>\
        </div>\
        <div class=appname>\
            Canopy Manager\
        </div>\
        <div class=s>\
            1 compatible device\
        </div>\
    </div-->\
    <div class=appouter>\
        <div id=app_fan class=appbox>\
            <img height=150 src=http://www.canopy.link/shutterstock_82034455_fan_h175.jpg>\
        </div>\
        <div class=appname>\
            SmartFan\
        </div>\
    </div>\
    <!--div class=appouter>\
        <div id=app_temp class=appbox>\
            <img height=150 src=http://t1.gstatic.com/images?q=tbn:ANd9GcTEaSSfG8bm8ryaX9kjOLxWlzqyf19c0h4dF8vvHm8ip_nsJIWQ>\
        </div>\
        <div class=appname>\
            TempPlus \
        </div>\
        <div class=s>\
            1 compatible device\
        </div>\
    </div-->\
</div>\
    ");

    deviceListNode.appendTo($me);
}