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
function CanoAppsListNode(params) {
    var self=this,
        $me
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    $me = CanopyUtil_Compose(["<div>\
        <div style='max-width:640px; border: 1px solid #d0d0d0; background: #f0f0f0; border-radius:4px;'>\
            <div style='background:#3060b0; font-weight:400; color:#ffffff; border-top-left-radius:4px; border-top-right-radius; padding:8px; font-size:30px'>\
                Device Manager\
            </div>\
            <div style='padding:8px'>\
                <p>\
                    Canopy's default web-based management interface for device\
                    makers.\
                </p>\
                <table cellpadding=0 cellspacing=0 class=devmgr_generic_param_table>\
                    <tr>\
                        <td>CLIENT ID</td>\
                        <td>18nuNp3AhCvAvsVVASjpcY28aSUhSpej</td>\
                    </tr>\
                    <tr>\
                        <td>CLIENT SECRET</td>\
                        <td>2uPiKAWyWYZuF3V7yFrZWeQq</td>\
                    </tr>\
                    <tr>\
                        <td>REDIRECT URIS</td>\
                        <td>http://dev02.canopy.link/mgr/index.html</td>\
                    </tr>\
                    <tr>\
                        <td>JAVASCRIPT ORIGINS</td>\
                        <td>http://dev02.canopy.link</td>\
                    </tr>\
                </table>\
            </div>\
        </div>\
</div>"]);
}
