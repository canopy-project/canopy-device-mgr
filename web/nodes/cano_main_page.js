function CanoMainPageNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    $me = $("\
    <div class='cano-topbar-outer'>\
        <div style='float:right; padding:4px;'>Logout</div>\
        <div class='cano-topbar-left-section'>\
            <div class=logo-in-text>Canopy</div>\
        </div>\
        <div class='cano-topbar-middle-section'>\
            <div style='padding-bottom:2px; display:inline-block; border-bottom: 2px solid #c00000;'>My Devices</div>\
            <div style='padding-bottom:2px; margin-left:20px; display:inline-block;'>Settings</div>\
        </div>\
    </div>\
    \
    <div class=cano-dialog-flat style='margin:8px'>\
        <div style='line-height:1.00; font-size:26px; padding-bottom:2px; display:inline-block; text-align:left;>'>\
            <span class=s>devices<br></span>3\
        </div>\
        <div style='line-height:1.00; font-size:26px; margin-left:20px;padding-bottom:2px; display:inline-block; text-align:left;>'>\
            <span class=s>online<br></span>2\
        </div>\
        <div style='line-height:1.00; font-size:26px; margin-left:20px;padding-bottom:2px; display:inline-block; text-align:left;>'>\
            <span class=s>disconnected<br></span>1\
        </div>\
    </div>\
\
    <div style='margin:8px'>\
        <img src='http://canopy.link/shutterstock_82034455_fan_h175.jpg' height=64>\
        <div style='width:180px; display:inline-block;line-height:1.0'><span class=ml>Greg's SmartFan</span><span class=s style='color:#606060'><br>office</span></div>\
        <br><br>\
        <img src='http://canopy.link/shutterstock_82034455_fan_h175.jpg' height=64>\
        <div style='width:180px; display:inline-block;line-height:1.0; background:#d0d0d0; padding:4px;'><span class=ml>Demo RaspPi</span><span class=s style='color:#606060'><br>office</span></div>\
        <br><br>\
        <img src='http://canopy.link/shutterstock_82034455_fan_h175.jpg' height=64>\
        <div style='width:180px; display:inline-block;line-height:1.0'><span class=ml>Demo RaspPi2</span><span class=s style='color:#606060'><br>office</span></div>\
    </div>\
\
    <div style='position: absolute; top:45px; left:264px; '>\
        <div style='width:512px; height:086px; box-shadow: 2px 2px 8px #808080'>\
        </div>\
        <div style='margin-top:16px; width:512px; height:086px; box-shadow: 2px 2px 8px #808080'>\
        </div>\
        <div style='margin-top:16px; width:512px; height:086px; box-shadow: 2px 2px 8px #808080'>\
        </div>\
        <div style='margin-top:16px; width:512px; height:086px; box-shadow: 2px 2px 8px #808080'>\
        </div>\
    </div>\
    ");
}
