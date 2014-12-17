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
        $me,
        valueEditNode,
        hoverPlotNode
    ;

    valueEditNode = new CanoEditable({
        onChange: function(value) {
            params.cloudvar.Value(value);
            params.cloudvar.Save({
                onSuccess: function() {
                    self.refresh();
                },
                onError: function() {
                    self.refresh();
                }
            });
        },
        inputClass: "devmgr_cloudvar_box_input",
        textClass: "devmgr_cloudvar_box_value_editable"
    });

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $me.off("mouseout").on("mouseout", function() {
            hoverPlotNode.get$().hide();
        });
        $me.off("mouseover").on("mouseover", function() {
            hoverPlotNode.get$().show();
        });
        valueEditNode.onLive();
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

    var valueNode;
    if (params.cloudvar.Direction() == "out") {
        valueNode = $("<span>" + params.cloudvar.Value() + "</span>");
    }
    else {
        valueNode = valueEditNode;
    }

    hoverPlotNode = new CanoHoverPlotNode({});

    this.refresh = function() {
        valueEditNode.setValue(params.cloudvar.Value(), true);
        $me.html(CanopyUtil_Compose(["<div class=devmgr_cloudvar_box_outer>\
            <div class='devmgr_cloudvar_box_top'>\
                <div class=devmgr_cloudvar_box_value>\
                    ", valueNode, "\
                </div>\
                <div style='font-size:12px; font-weight:400; color: #80ff80;'>\
                    " + this.timestampString() + "\
                </div>\
            </div>\
            <div class='devmgr_cloudvar_box_bottom'>\
                " + params.cloudvar.Name() + "\
            </div>\
            ", hoverPlotNode, "\
        </div>"]));

        hoverPlotNode.get$().hide();
        params.cloudvar.FetchHistoricData({
            onSuccess: function(data) {
                hoverPlotNode.setTimeseriesData(data['samples']);
            }
        });
    }

    $me = $("<div style='display:inline-block'>");
    this.refresh();
}

