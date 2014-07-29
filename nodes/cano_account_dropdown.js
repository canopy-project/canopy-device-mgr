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
function CanoAccountDropdown(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        $logoutButton,
        visible = false
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $logoutButton.off('click').on('click', function(event) {
            canopy.logout({
                onSuccess: function() {
                    window.location.reload();
                }
            });
            event.stopPropogation();
        });
    }

    this.show = function() {
        $me.show();
        visible = true;
    }
    this.hide = function() {
        $me.hide();
        visible = false;
    }
    this.isVisible = function() {
        return visible;
    }

    $logoutButton = $("<a href='javascript:void(0);'>Logout</a>");

    $me = CanopyUtil_Compose(["<div class=cano-account_dropdown-outer>\
        <div class=cano-account_dropdown-inner>\
            ", $logoutButton, "\
        </div>\
    </div>"]);
    $me.hide();
}
