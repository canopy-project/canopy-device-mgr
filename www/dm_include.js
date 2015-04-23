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

includeJsFile("/nodes/main/dm_main.js");

//includeCssFile("/nodes/devices_page/ts_device_lookup_screen.css");

