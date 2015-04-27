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
 * Account page for Canopy Device Manager
 *
 *  PARAMS:
 *      params.user -- Optional CanopyUser object
 *
 *  METHODS:
 *      setUser
 *
 */
function DmAccountPage(params) {
    cuiInitNode(this);

    var menu;
    var sidebar;
    var switcher;
    var profileScreen;
    var passwordScreen;
    
    this.onConstruct = function() {
        menu = new CuiTopbar({
            appName: params.user.username(),
            cssClass: "cui_default cui_topbar_submenu",
            items: [ {
                content: "Profile",
                value: "profile"
            }, {
                content: "Password",
                value: "password"
            }],
            onSelect: function(val) {
                switcher.select(val).refresh();
            },
            showAppDropdown: false,
        });

        sidebar = new CanoAccountSidebarNode({
            user: params.user
        });

        passwordScreen = new CanoAccountPasswordSectionNode({
            user: params.user
        });

        profileScreen = new CanoAccountProfileSectionNode({
            user: params.user
        });

        switcher = new CuiSwitcher({
            children: {
                "profile": new CuiWrapper(profileScreen.get$()),
                "password": new CuiWrapper(passwordScreen.get$())
            },
            default: "profile",
            onSelect: function() {
                profileScreen.onLive();
                passwordScreen.onLive();
            }
        });

        return [
            menu,
            sidebar,
            "<div style='padding:16px; margin-left: 280px;'>", 
                switcher, 
            "</div>"
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        profileScreen.onLive();
        passwordScreen.onLive();
        sidebar.onLive();
        cuiRefresh([menu, sidebar, switcher], live);
    }
}
