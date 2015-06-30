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

function includeJsFile(filename) {
    document.write(
        '<script src="' 
            + DM_INCLUDE_PATH + filename + 
            '" type="text/javascript"><\/script>'
    );
}
function includeAbsJsFile(filename) {
    document.write(
        '<script src="' 
            + filename + 
            '" type="text/javascript"><\/script>'
    );
}
function includeAbsCssFile(filename) {
    document.write(
        '<link href="'
            + filename + 
        '" rel="stylesheet" type="text/css">'
    );
}
function includeCssFile(filename) {
    document.write(
        '<link href="'
            + DM_INCLUDE_PATH + filename + 
        '" rel="stylesheet" type="text/css">'
    );
}

includeJsFile("/nodes/account_page/dm_account_page.js");
includeJsFile("/nodes/account_page/dm_organizations_screen.js");
includeJsFile("/nodes/account_page/dm_create_organization.js");

includeJsFile("/nodes/analytics_page/dm_aggregate_screen.js");
includeJsFile("/nodes/analytics_page/dm_analytics_page.js");
includeJsFile("/nodes/analytics_page/dm_maps_screen.js");
includeJsFile("/nodes/analytics_page/dm_maps_sidebar.js");

includeJsFile("/nodes/devices_page/dm_create_devices_screen.js");
includeJsFile("/nodes/devices_page/dm_device_details.js");
includeJsFile("/nodes/devices_page/dm_device_list.js");
includeJsFile("/nodes/devices_page/dm_device_list_nav_bar.js");
includeJsFile("/nodes/devices_page/dm_device_list_screen.js");
includeJsFile("/nodes/devices_page/dm_devices_page.js");
includeJsFile("/nodes/devices_page/dm_devices_sidebar.js");
includeJsFile("/nodes/devices_page/dm_no_devices_screen.js");

includeJsFile("/nodes/org_admin_page/dm_org_admin_page.js");
includeJsFile("/nodes/org_admin_page/dm_org_members_screen.js");
includeJsFile("/nodes/org_admin_page/dm_org_invite_member_screen.js");
includeJsFile("/nodes/org_admin_page/dm_org_create_team_screen.js");
includeJsFile("/nodes/org_admin_page/dm_org_team_details.js");
includeJsFile("/nodes/org_admin_page/dm_org_teams_screen.js");
includeJsFile("/nodes/org_admin_page/dm_org_teams_sidebar.js");

includeJsFile("/nodes/main/dm_main.js");
includeJsFile("/nodes/main/dm_main_org.js");

includeCssFile("/nodes/dm.css");
includeCssFile("/nodes/devices_page/dm_devices_page.css");
includeCssFile("/nodes/account_page/dm_account_page.css");
includeCssFile("/nodes/org_admin_page/dm_org_admin_page.css");

