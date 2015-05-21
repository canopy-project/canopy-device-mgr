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
    var canvas;
    
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
            }, {
                content: "Organizations",
                value: "organizations"
            }],
            navState: cuiNavState,
            navStateName: "acct_page",
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

        createOrgScreen = new DmCreateOrganization({
            user: params.user,
            onCancel: function() {
                menu.setBreadcrumb(null).refresh();
                switcher.select("organizations").refresh();
            },
            onCreated: function() {
                menu.setBreadcrumb(null).refresh();
                switcher.select("organizations").refresh();
            }
        });

        orgScreen = new DmOrganizationsScreen({
            user: params.user,
            onCreateClicked: function() {
                switcher.select("create_organization").refresh();
                menu.setBreadcrumb(["Account", "Create Organization"]).refresh();
            }
        });

        switcher = new CuiSwitcher({
            children: {
                "profile": new CuiWrapper(profileScreen.get$()),
                "password": new CuiWrapper(passwordScreen.get$()),
                "organizations": orgScreen,
                "create_organization": createOrgScreen
            },
            default: "profile",
            onSelect: function() {
                profileScreen.onLive();
                passwordScreen.onLive();
            }
        });

        layout = new CuiHSplitLayout({
            left: sidebar.get$(),
            right: cuiCompose(["<div style='padding:16px'>", switcher, "</div>"]),
            leftSize: "220px"
        });

        canvas = new CuiCanvas({
            preceededBy: menu,
            contents: cuiCompose([
                // TODO: Why is this needed?
                "<div class='dm_account_page' style='position:absolute; width:100%; height:100%'>", 
                    layout,
                "</div>"
            ]),
        });

        return [
            menu,
            canvas,
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        profileScreen.onLive();
        passwordScreen.onLive();
        sidebar.onLive();
        cuiRefresh([menu, canvas, switcher], live);
    }
}
