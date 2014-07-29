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
function CanoSignupDialogNode(params) {
    var self=this,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        $me;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $("#signup_button").off('click').on("click", function() {
            var username = $("#signup_username").val();
            var email = $("#signup_email").val();
            var password = $("#signup_password").val();
            var passwordConfirm = $("#signup_password2").val();
            canopy.createAccount({
                username: username, 
                email: email, 
                password: password, 
                passwordConfirm: passwordConfirm,
                onSuccess: function() {
                    dispatcher.showPage("main");
                },
                onError: function() {
                    alert("Create acct failed");
                }
            });
        });
        $("#signup_submit").off('click').on('click', function() {
            self.expand();
            if (params.onExpand())
                params.onExpand();
        });
    }

    this.expand = function() {
            $("#signup_submit").hide();
            $("#signup_button").show();
            $("#signup_form").slideDown();
    }

    this.collapse = function() {
            $("#signup_form").slideUp();
            $("#signup_submit").show();
            $("#signup_button").hide();
    }

    $me = $("\
        <div class=cano-dialog style='width:300px'>\
            <div class=l>New to <span class=logo-in-text>Canopy</span>?</div>\
            <div id=signup_form style='display:none;'>\
                <div class=small_margin_top>\
                    Choose a username<br>\
                    <input name=signup_username id=signup_username type=text></input>\
                </div>\
                <div class=small_margin_top>\
                    Enter your email address<br>\
                    <input name=signup_email id=signup_email type=text></input>\
                </div>\
                <div class=small_margin_top>\
                    Choose a password<br>\
                    <input name=signup_password id=signup_password type=password></input>\
                </div>\
                <div class=small_margin_top>\
                    Confirm your password<br>\
                    <input name=signup_password2 id=signup_password2 type=password></input>\
                </div>\
            </div>\
            <input id='signup_button' class=small_margin_top type=submit style='display:none' value='CREATE ACCOUNT'></input>\
            <input id=signup_submit type=submit style='margin-top:12px' value='SIGN UP'></input>\
            <a class='thicker' href='tour.html'>Take tour</a>\
        </div>\
    ");
}
