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
        varNodes = []
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

    this.setDevice = function(dev) {
        device = dev;
        this.refresh();
    }

    this.refresh = function() {
        if (device == null)
            return;

        if (!device.Vars() || device.Vars().Length() == 0) {
            // no cloud variables
            $me.html("<div style='font-size:17px'>This device does not have any Cloud Variables.\
            <p>\
                <b>(C/C++) Create a Cloud Variable with:</b>\
                <div class=code>canopy_var_init(ctx, \"inout float32 my_var\");\n\
canopy_var_set_float32(ctx, \"my_var\", 123.45f);\n\
canopy_sync_blocking(ctx, -1);</div>\
            </p>\
            <p>\
                <b>(REST) Create a Cloud Variable with:</b>\
                <div class=code>POST /api/device/" + device.UUID() + "\n\
{\n\
    \"sddl\" : {\n\
        \"inout float32 my_var\" : {},\n\
    },\n\
    \"vars\" : {\n\
        \"my_var\" : 123.45\n\
    }\n\
}\
                </div>\
            </p></div>");
            return;
        } else {
            $me.html("");
            var numVars = device.Vars().Length();
            varNodes.length = 0;
            for (var i = 0; i < numVars; i++) {
                var varNode = new CanoCloudVarBoxNode({
                    cloudvar: device.Vars().Var(i)
                });
                $me.append(varNode.get$());
                varNodes.push(varNode);
            }
            return;
        }
    }

    $me = $("<div>");
    this.refresh();
}

