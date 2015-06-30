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
    var inviteMemberScreen;
    var membersScreen;
    var switcher;
    
    this.onConstruct = function() {
        membersScreen = new DmOrgMembersScreen({
            user: params.user,
            org: params.org,
            onInviteClicked: function() {
                switcher.select("invite_member").refresh();
                menu.setBreadcrumb(["Organization", "Add Member"]).refresh();
            }
        });

        teamsScreen = new DmOrgTeamsScreen({
            user: params.user,
            org: params.org,
            onCreateTeamClicked: function() {
                switcher.select("create_team").refresh();
                menu.setBreadcrumb(["Organization", "Create Team"]).refresh();
            }
        });

        createTeamScreen = new DmOrgCreateTeamScreen({
            user: params.user,
            org: params.org,
            onAdded: function() {
                menu.setBreadcrumb(null).refresh();
                switcher.select("teams").refresh();
            },
            onCancel: function() {
                menu.setBreadcrumb(null).refresh();
                switcher.select("teams").refresh();
            },
        })

        inviteMemberScreen = new DmOrgInviteMemberScreen({
            user: params.user,
            org: params.org,
            onAdded: function() {
                menu.setBreadcrumb(null).refresh();
                switcher.select("members").refresh();
            },
            onCancel: function() {
                menu.setBreadcrumb(null).refresh();
                switcher.select("members").refresh();
            },
        })

        menu = new CuiTopbar({
            appName: params.user.username(),
            cssClass: "cui_default cui_topbar_submenu",
            items: [ {
                content: "Members",
                value: "members"
            }, {
                content: "Teams",
                value: "teams"
            }, {
                content: "Settings",
                value: "settings"
            }],
            navState: cuiNavState,
            navStateName: "org_admin_page",
            onSelect: function(val) {
                switcher.select(val).refresh();
            },
            showDropdown: "org",
            showUserDropdown: false,
            user: params.user,
            viewerName: params.org.name()
        });

        switcher = new CuiSwitcher({
            children: {
                "members": membersScreen,
                "teams": teamsScreen,
                "settings": new CuiWrapper($("<b>settings</b>")),
                "invite_member": inviteMemberScreen,
                "create_team": createTeamScreen
            },
            default: "members",
        });

        canvas = new CuiCanvas({
            preceededBy: menu,
            contents: cuiCompose([
                // TODO: Why is this needed?
                "<div class='dm_org_admin_page' style='position:absolute; width:100%; height:100%'>", 
                    switcher,
                "</div>"
            ]),
        });

        return [
            menu,
            canvas,
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        cuiRefresh([menu, canvas, switcher], live);
    }
}
