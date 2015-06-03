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
 * Footer for login page
 *
 * PARAMS:
 *
 *      .hostname -- Hostname of deployment
 */
function DmLoginFooter(params) {
    cuiInitNode(this);

    this.onConstruct = function() {
        return [
            "<center class=dm_login_footer style='padding-top:00px; padding-bottom:30px' >",
                "<table width=800>",
                    "<tr>",
                        "<td valign=bottom>",
                            "<img style='position: relative; top:15px;' class=dm_cloud_img src=" + DM_INCLUDE_PATH + "/../images/cloud_circuit_h256.png></img>",
                        "</td>",
                        "<td valign=center>",
                            "<div class='l' style=''>Canopy Device Manager</div>",
                            "<ul>",
                                "<li>Monitor, control and share your Canopy-enabled devices.</li>",
                                "<li>Advanced administrative tools for device makers.</li>",
                                "<li>100% open source.</li>",
                            "</ul>",
                        "</td>",
                    "</tr>",
                "</table>",
                "<div style='font-size: 16px'>",
                    "Twitter: ",
                    "<a target=_blank style='color:#ffff80; font-weight:400;' href='http://twitter.com/CanopyIoT'>",
                        "@CanopyIoT",
                    "</a>",
                    "<div style='display:inline-block; width:50px'></div>",
                    "Email: ",
                    "<a target=_blank style='color:#ffff80; font-weight:400;' href='mailto:info@canopy.link'>",
                        "info@canopy.link",
                    "</a>",
                    "<div style='display:inline-block; width:50px'></div>",
                    "GitHub: ",
                    "<a target=_blank style='color:#ffff80; font-weight:400;' href='http://github.com/canopy-project'>",
                        "github.com/canopy-project",
                    "</a>",
                    "<div style='display:inline-block; width:50px'></div>",
                    "Forum: ",
                    "<a target=_blank style='color:#ffff80; font-weight:400;' href='http://canopy.lefora.com'>",
                        "canopy.lefora.com",
                    "</a>",
                "</div>",
            "</center>",

            "<center>",
                    "<br><div style='font-size:16px'>Copyright 2014-2015 Canopy Services, Inc.</div>",
            "</center>",
        ]
    }
}
