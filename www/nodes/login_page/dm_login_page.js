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

        return [
            "<div>",
                header,
                "<div style='background: #d8d8d8; padding-top:16px; padding-bottom:16px'>",
                    "<div style='display:inline-block; border:1px solid #a0a0a0; width:50%; vertical-align: top; text-align:right'>",
                        "forms",
                    "</div><div style='display:inline-block; border:1px solid #a0a0a0; vertical-align: top; text-align:right'>",
                        "forms<br>Foo",
                    "</div>",
                "</div>",
                footer,
            "</div>"
        ];
    }
}
