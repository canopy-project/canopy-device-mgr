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

    this.timestampString = function() {
        var secsAgo = Math.floor(params.cloudvar.TimestampSecondsAgo());
        if (secsAgo < 60) {
            return "<span style='color:#80ff80'>Just now</span>";
        }
        else if (secsAgo < 60*60) {
            return "<span style='color:#d0f080'>" + Math.floor(secsAgo/60) + "m ago</span>";
        }
        else if (secsAgo < 24*60*60) {
            return "<span style='color:#ffc080'>" + Math.floor(secsAgo/(60*60)) + "h ago";
        }
        else {
            return "<span style='color:#ff4040'>" + Math.floor(secsAgo/(24*60*60*60)) + "d ago";
        }
    }

    this.refresh = function() {
        $me.html("<div style='display:inline-block; margin:3px; margin-right:10px; margin-bottom:10px; text-align:center;'>\
            <div style='padding-left:16px; padding-right: 16px; padding-top:4px; line-height:1; height:50px; border-top-left-radius:5px; border-top-right-radius: 5px; background:#404040; color:#ffffff;'>\
                <div style='font-size:32px'>\
                    " + params.cloudvar.Value() + "\
                </div>\
                <div style='font-size:12px; font-weight:400; color: #80ff80;'>\
                    " + this.timestampString() + "\
                </div>\
            </div>\
            <div style='font-weight:400; background:#3060b0; padding-bottom:2px; padding-top:1px; border-bottom-right-radius: 5px; border-bottom-left-radius:5px; color: #ffffff; font-size:13px'>\
                " + params.cloudvar.Name() + "\
            </div>\
        </div>");
    }

    $me = $("<div style='display:inline-block'>");
    this.refresh();
}

