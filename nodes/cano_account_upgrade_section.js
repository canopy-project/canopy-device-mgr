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
function CanoAccountUpgradeSectionNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarSubmenuNode,
        sidebarNode,
        mainNode,
        $errorMsg,
        $addFundsInput,
        $successMsg
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $errorMsg.hide();

        $addFundsInput.off('click').on('click', function() {
            $errorMsg.html("This deployment does not support adding funds at this time");
            $errorMsg.slideDown();
        });
    }

    $addFundsInput = $("<input type=submit value='ADD FUNDS'></input>");
    $errorMsg = $("<div style='display:none; font-style:italic; color: #ff0000;'></div>");
    $successMsg = $("<div style='display:none; font-style:italic; color: #008000;'>Password changed!</div>");
    $saveBtn = $("<input type=submit value='CHANGE PASSWORD'></input>");

    $me = CanopyUtil_Compose(["<div>\
        <div style='margin-bottom:16px; padding:16px; border: 1px solid #c0c0c0; border-radius:4px; background:#d8d8d8'>\
            <div style='font-size: 30px; font-weight:400'>\
                Account Balance\
            </div>\
            <div style='line-height:1; color: #808080; font-size: 50px;'>\
                $0.00\
            </div>\
            ", $errorMsg, "\
            <br>", $addFundsInput, "\
        </div>\
        <div style='font-size: 30px; font-weight:400'>\
            Upgrade\
        </div>\
        <p>\
            Upgrading is easy.  Simply add funds to your account.\
        </p>\
        <ul>\
            <li>Your quotas will increase based on the size of the balance in\
            your account.</li>\
            <li>Your quotas will never decrease, as long as you maintain a positive balance (with 30-day grace period)\
            </li>\
            <li>Charges are assessed monthly based on actual usage.</li>\
            <li>You will only be charged for devices that have connected for the first time.</li>\
        </ul>\
        <p>\
            <b>Add $10,000 or more and quotas will be removed entirely!</b>\
        </p>\
        <p>\
            <a style='font-weight:400' target=_blank href='http://canopy.link/services'>Pricing and Other Services</a>\
        </p>\
    </div>"]);
}
