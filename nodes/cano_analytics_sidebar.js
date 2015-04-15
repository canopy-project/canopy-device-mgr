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
function CanoAnalyticsSidebarNode(params) {
    var self=this,
        $me
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $newReportBtn.off('click').on('click', function() {
            alert("Creating new reports is not supported at this time");
        });
    }

    var $newReportBtn = $("<input type='submit' value='NEW REPORT'>");

    $me = CanopyUtil_Compose(["\
<div style='z-index: 400; position:fixed; width: 250px; top: 89px; border-right:0px solid #d0d0d0; bottom:0px; background:#ffffff; color:#000000'>\
    <div style='padding:16px; font-size: 16px; border-right:0px solid #f0f0f0;'>\
        Gain insights about how your devices are used.<br>\
        <br><br>", $newReportBtn, "\
    </div>\
    <div style='padding-bottom:16px; text-align:center; z-index: 500; position:fixed; width: 250px; bottom:0px; background:#ffffff; color:#000000'>\
        Powered by <a target=_blank href=http://canopy.link><span class='logo-in-text'>Canopy</div>\
    </div>\
</div>"]);
}
