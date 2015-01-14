/*
 * Copyright 2014 Gregory Prisament
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 *       <-------------------1004--------------------------------->
 *       <---256----><--------492-------------><------256--------->
 *       padding: 6px
 */
function CanoAnonDevicePageNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        controlPanelNode = null,
        defEditorNode = null
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $('body').css('background', '#f4f4f4');
        gCanopy.lookupAnonDevice(DEVICE_UUID,
            function(device) {
                // on success
                //controlPanelNode = new CanoDeviceControlWidgetNode({
                controlPanelNode = new CanoDevicesListItemNode({
                    canopyClient: canopy,
                    device: device
                });
                controlPanelNode.appendTo($main);

                defEditorNode = new CanoDefEditorNode({
                    canopyClient: canopy,
                    device: device
                });
                defEditorNode.appendTo($main);

            },
            function() {
                // on failure
                alert("Device not found");
            }
        );
    }

    $me = $("<div>");
    $main = $("\
        <div class=center_channel>\
            <h2><b>Anonymous Device</b>:" + DEVICE_UUID + " </h2>\
            <p>\
                Warning!  This is an <b>anonymous device</b>.  Anyone who knows\
                the device's UUID or URL can monitor and control it\
                through this interface or the device's REST endpoints.\
            </p>\
            <p>\
                If this device belongs to you, you should <a href=.>Claim it Now</a>.\
            </p>\
        </div>\
    ");

    $main.appendTo($me);

    /*$main = $("\
    <div class=center_channel>\
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
    </div>\
    ");*/
    /*$left = $("<div class=cano-main_page-left-section></div>");
    $middle = $("<div style='' class=cano-main_page-middle-section></div>");
    $right = $("<div class=cano-main_page-right-section></div>");

    $right.append("<div class=cano-dialog-flat style='width:212px;'>RaspPi Connected<hr>Toast Ready!<hr>Welcome to Canopy!</div>");

    $middle.append("\
        <div style='line-height:1.0;margin-top:110px;display:inline-block; height:64px;'>\
            <div style='padding:4px; display:inline-block'>\
                <div class=btn>OFF</div>\
                <div class=btn_not_selected>SLOW</div>\
                <div class=btn_not_selected>MED</div>\
                <div class=btn_not_selected>FAST</div>\
                <div style='display:inline-block; text-align:center;'>\
                    47&deg;F\
                    <br><span class=s>Temperature</span>\
                </div>\
                <div style='display:inline-block; text-align:center;'>\
                    32%\
                    <br><span class=s>Humidity</span>\
                </div>\
            </div>\
        </div>\
    ");

    $left.append("\
        <div style='line-height:1.0;margin-top:16px;display:inline-block'>\
            <img align=top style='border-radius:7px; box-shadow: 1px 1px 3px #a0a0a0'; src=images/robot1_64x64.jpg>\
            <div style='padding:4px; width:160px; display:inline-block'>\
                <span class=n>Greg's SmartFan</span><br>\
                <span class=s>This is my SmartFan.</span><br>\
                <img src=http://c.dryicons.com/images/icon_sets/minimalistica_part_2_icons/png/32x32/add_mail.png>\
            </div>\
        </div>\
        <div style='line-height:1.0;margin-top:16px; display:inline-block'>\
            <img align=top style='border-radius:7px; box-shadow: 1px 1px 3px #a0a0a0'; src=images/robot1_64x64.jpg>\
            <div style='padding:4px; display:inline-block'>\
                <span class=n>RaspPi</span><br>\
                <span class=s>living room</span>\
            </div>\
        </div>\
        <div style='line-height:1.0;margin-top:16px; display:inline-block'>\
            <img align=top style='border-radius:7px; box-shadow: 1px 1px 3px #a0a0a0'; src=images/robot1_64x64.jpg>\
            <div style='color:#a00000; padding:4px; display:inline-block'>\
                <span class=n>RaspPI2</span><br>\
                <span class=s>living room</span>\
            </div>\
        </div>\
    ");

    $main = $("<div class=center_channel style='margin-top:16px'></div>");
    $main.append($left);
    $main.append($middle);
    $main.append($right);

    $statusBar = $("\
        <div class=cano-dialog-flat>\
            <div style='line-height:1.00; font-size:26px; padding-bottom:2px; display:inline-block; text-align:left;>'>\
                <span class=s>all<br></span>3\
            </div>\
            <div style='line-height:1.00; font-size:26px; margin-left:20px;padding-bottom:2px; display:inline-block; text-align:left;>'>\
                <span class=s>online<br></span>2\
            </div>\
            <div style='line-height:1.00; font-size:26px; margin-left:20px;padding-bottom:2px; display:inline-block; text-align:left;>'>\
                <span class=s>disconnected<br></span>1\
            </div>\
        </div>\
    ").prependTo($left);;

    $submenuOld = $("<div style='width:100%; margin-top:16px; padding: 6px; padding-bottom:0px; border-bottom:2px solid #d0d0d0'>\
        <div class=center_channel>\
            <div style='margin-left:256px'>\
                <div style='display:inline-block; padding-bottom:4px; border-bottom: 2px solid #a00000;'>All (3)</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \
                Online (2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \
                Disconnected (1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \
            </div>\
        </div>\
    </div>");
    $submenu = $("<div style='width:100%; margin-top:16px; padding: 6px; padding-bottom:0px; '>\
        <div class=center_channel>\
            <div class=cano-dialog style='width:440px; margin-left:256px'>\
                <div style='display:inline-block; padding-bottom:4px; border-bottom: 2px solid #a00000;'>All (3)</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \
                Online (2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \
                Disconnected (1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \
            </div>\
        </div>\
    </div>");

    $me = $("<div>");
    topbarNode.appendTo($me);
    //$submenu.appendTo($me);
    $main.appendTo($me);*/
}
