/*
 * Copyright 2014 SimpleThings, Inc.
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
function CanoCloudVarBoxNode(params) {
    var self=this,
        $me
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        this.refresh();
    }

    this.refresh = function() {
        $me.html("<div style='display:inline-block; margin:10px; border-radius:5px; text-align:center; width:80px; height:80px; background:#f0f4f0; border:1px solid #a0a0a0;'>\
                <div style='position: relative'>\
                    <div style='position: absolute; line-height:1; width:80px; top: 10px;'>\
                        <div style='font-size:32px'>\
                            " + params.cloudvar.Value() + "\
                        </div>\
                        <div style='font-size:12px; color: #008000;'>\
                            " + params.cloudvar.Timestamp() + "\
                        </div>\
                    </div>\
                </div>\
                <div class='bottom_aligner'></div>\
                <div style='display: inline-block; font-weight:400; font-size:13px'>\
                    " + params.cloudvar.Name() + "\
                </div>\
        </div>");
    }

    $me = $("<div style='display:inline-block'>");
    this.refresh();
}

