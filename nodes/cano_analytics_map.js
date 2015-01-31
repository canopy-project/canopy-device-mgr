/*
 * Copyright 2015 SimpleThings, Inc.
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
function CanoAnalyticsMapNode(params) {
    var self=this,
        $me,
        mapInitialized = false;
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    this.refresh = function() {

    }

    this.show = function() {
        $me.show();
        if (!mapInitialized) {
            self.drawMap();
            mapInitialized = true;
        }
    }

    this.drawMap = function() {
        var mapOptions = {
            center: { lat: -34.397, lng: 150.644},
            zoom: 8
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }
    $me = $("<div id=map-canvas style='position: absolute; bottom: 0px; top: 85px; border: 1px solid #c0c0c0; right: 0px; left: 260px;'></div>");
}
