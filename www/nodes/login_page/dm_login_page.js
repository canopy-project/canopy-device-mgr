/*
 * Copyright 2015 Canopy Services, Inc.
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
 * Login page for Canopy web applications.
 *
 * PARAMS:
 *
 *      .hostname - Hostname of cloud server
 *      .remote - CanopyRemote object
 *      .redirect
 */

function DmLoginPage(params) {
    cuiInitNode(this);

    var header;
    var footer;

    this.onConstruct = function() {
        header = new DmLoginHeader({
            hostname: params.hostname
        });

        footer = new DmLoginFooter({});

        loginForm = new DmLoginForm({
            remote: params.remote,
            redirect: params.redirect
        });

        signupForm = new DmSignupForm({
            remote: params.remote,
            redirect: params.redirect
        });

        return [
            "<div>",
                header,
                "<div style='background: #f0f0f0; padding-top:32px; padding-bottom:32px'>",
                    "<div style='display:inline-block; border-right:1px solid #b0b0b0; width:50%; vertical-align: top; text-align:right'>",
                        "<div style='display:inline-block; padding-right: 60px; text-align:left'>",
                            signupForm,
                        "</div>",
                    "</div>",
                    "<div style='display:inline-block; vertical-align: top; text-align:right'>",
                        "<div style='display:inline-block; padding-left: 20px; text-align:left'>",
                            loginForm,
                        "</div>",
                    "</div>",
                "</div>",
                footer,
            "</div>"
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        cuiRefresh([header, footer, loginForm, signupForm], live);
    }
}
