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
 * Maps screen for Canopy Device Manager
 *
 *  PARAMS:
 *      params.user
 *
 *  METHODS:
 *
 *      .setMapDevices(deviceList)
 *      .jumpTo(lat, lng)
 *
 */
function DmMapsScreen(params) {
    cuiInitNode(this);

    var map;

    this.jumpTo = function(lat, lng) {
        map.jumpTo(lat, lng);
    }

    this.onConstruct = function() {
        map = new CuiMap({
            showPlaceholder: false,
        });

        return [
            "<div style='position:absolute; left: 280px; right:0px; height: 100%;'>",
                map,
            "</div>"
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        cuiRefresh([map], live);
    }

}
