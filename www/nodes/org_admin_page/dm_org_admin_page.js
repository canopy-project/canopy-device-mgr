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
 * Organization Admin page for Canopy Device Manager
 *
 *  PARAMS:
 *      params.org -- Optional CanopyOrganization object
 *
 *  METHODS:
 *      setUser
 *      setOrg
 *
 */
function DmOrgAdminPage(params) {
    cuiInitNode(this);

    var menu;
    var canvas;
    
    this.onConstruct = function() {
        menu = new CuiTopbar({
            appName: params.user.username(),
            cssClass: "cui_default cui_topbar_submenu",
            items: [ {
                content: "Settings",
                value: "settings"
            }, {
                content: "Members",
                value: "password"
            }, {
                content: "Teams",
                value: "password"
            }, {
                content: "Organizations",
                value: "organizations"
            }],
            navState: cuiNavState,
            navStateName: "org_admin_page",
            onSelect: function(val) {
                //switcher.select(val).refresh();
            },
            showDropdown: "org",
            showUserDropdown: false,
            user: params.user
        });

        canvas = new CuiCanvas({
            preceededBy: menu,
            contents: cuiCompose([
                // TODO: Why is this needed?
                "<div class='dm_org_admin_page' style='position:absolute; width:100%; height:100%'>", 
                    "Org settings",
                "</div>"
            ]),
        });

        return [
            menu,
            canvas,
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        cuiRefresh([menu, canvas], live);
    }
}
