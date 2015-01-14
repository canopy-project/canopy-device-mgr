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
function CanoAccountSidebarNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarNode,
        sidebarNode,
        mainNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        topbarNode.onLive();
        sidebarNode.onLive();
        mainNode.onLive();
    }

    topbarNode = new CanoTopbarNode({
        canopyClient : canopy,
        dispatcher: dispatcher
    });

    sidebarNode = new CanoDevicesSidebarNode({
        canopyClient : canopy,
        dispatcher: dispatcher
    });

    mainNode = new CanoDevicesNoDevicesMsgNode({
        canopyClient : canopy,
        dispatcher: dispatcher
    });

    var numDevices = canopy.me.Devices().length;
    var numDevicesQuota = 10;
    var numDevicesPct = numDevices/numDevicesQuota;
    if (numDevicesPct > 1.0)
        numDevicesPct = 1.0;
    var numDevicesPixels = Math.round(numDevicesPct*200);

    $me = CanopyUtil_Compose(["\
<div style='z-index: 400; position:fixed; width: 250px; top: 89px; border-right:1px solid #d0d0d0; bottom:0px; background:#f8f8f8; color:#000000'>\
    <div style='padding:16px; font-size: 16px; border-right:1px solid #f0f0f0;'>\
        <div class=ml>Quotas</div>\
        <table>\
            <tr>\
                <td valign=top style='font-size:16px;'>\
                    <b>Account Type:</b> <span style='color:#008000'>Free</span><br>\
                    <table>\
                        <tr>\
                            <td>Devices:</td>\
                            <td><b>" + numDevices + "</b> of <b>" + numDevicesQuota + "</b></td>\
                        </tr>\
                        <tr>\
                            <td colspan=2>\
                                <div style='height:10px; width:200px; background:#ffffff; border:1px solid #a0a0a0;'>\
                                    <div style='height:10px; width:" + numDevicesPixels + "px; background:#3060b0;'>\
                                    </div>\
                                </div>\
                            </td>\
                        </tr>\
                        <tr>\
                            <td>Storage: </td>\
                            <td><b>0.0MB</b> of <b>1.0MB</b></td>\
                        </tr>\
                        <tr>\
                            <td colspan=2>\
                                <div style='height:10px; width:200px; background:#ffffff; border:1px solid #a0a0a0;'>\
                                    <div style='height:10px; width:00px; background:#3060b0;'>\
                                    </div>\
                                </div>\
                            </td>\
                        </tr>\
                        <tr>\
                            <td>Data Transfer:</td>\
                            <td><b>0.0Mb</b> of <b>10Mb</b></td>\
                        </tr>\
                        <tr>\
                            <td colspan=2>\
                                <div style='height:10px; width:200px; background:#ffffff; border:1px solid #a0a0a0;'>\
                                    <div style='height:10px; width:00px; background:#3060b0;'>\
                                    </div>\
                                </div>\
                            </td>\
                        </tr>\
                        <tr>\
                            <td>Emails: </td>\
                            <td><b>0</b> of <b>100</b></td>\
                        </tr>\
                        <tr>\
                            <td colspan=2>\
                                <div style='height:10px; width:200px; background:#ffffff; border:1px solid #a0a0a0;'>\
                                    <div style='height:10px; width:0px; background:#3060b0;'>\
                                    </div>\
                                </div>\
                            </td>\
                        </tr>\
                        <tr>\
                            <td>Texts: </td>\
                            <td><b>0</b> of <b>100</b></td>\
                        </tr>\
                        <tr>\
                            <td colspan=2>\
                                <div style='height:10px; width:200px; background:#ffffff; border:1px solid #a0a0a0;'>\
                                    <div style='height:10px; width:0px; background:#3060b0;'>\
                                    </div>\
                                </div>\
                            </td>\
                        </tr>\
                    </table>\
                    <br><a href='..'><b>UPGRADE</b></a>\
                </td>\
            </tr>\
        </table>\
    </div>\
        <div style='padding-bottom:16px; text-align:center; z-index: 500; position:fixed; width: 250px; bottom:0px; background:#f8f8f8; color:#000000'>\
            Powered by <a target=_blank href=http://canopy.link><span class='logo-in-text'>Canopy</div>\
        </div>\
</div>"]);
}
