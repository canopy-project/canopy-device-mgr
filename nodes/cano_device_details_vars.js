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
function CanoDeviceDetailsVarsNode(params) {
    var self=this,
        $me,
        device = null,
        device2 = null,
        varNodes = [],
        plotNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        var i;
        for (i = 0; i < varNodes.length; i++) {
            varNodes[i].onLive();
        }
    }

    this.setDevice = function(dev, dev2) {
        device = dev;
        device2 = dev2;
        this.refresh();
    }

    this.refresh = function() {
        if (device == null || device2 == null)
            return;

        if (device2.vars().length == 0) {
            // no cloud variables
            $me.html("<div style='font-size:17px'>This device does not have any Cloud Variables.\
            <p>\
                To create a Cloud Variable using the REST API, see here: <br><a \
                href='http://canopy.link/devzone/restapi/#declare_cloud_variables'> \
                <b>REST API: Declare Cloud Variables</b></a> \
            </p></div>");
            return;
        } else {
            $me.html("");
            var cloudVars = device2.vars();
            varNodes.length = 0;
            plotNode.appendTo($me);
            for (var i = 0; i < cloudVars.length; i++) {
                var varNode = new CanoCloudVarBoxNode({
                    cloudvar: cloudVars[i],
                    onHover: function(cloudvar) {
                        cloudvar.historicData().onDone(function(result, data) {
                            if (result != CANOPY_SUCCESS) {
                                alert("Problem fetching historic data");
                            }
                            plotNode.setTimeseriesData(data['samples']);
                        });
                    },
                    onHoverOut: function(cloudvar) {
                        plotNode.setTimeseriesData(null);
                    }
                });
                $me.append(varNode.get$());
                varNodes.push(varNode);
            }
            return;
        }
    }

    plotNode = new CanoDeviceDetailsVarsPlot({});

    $me = $("<div>");
    this.refresh();
}

