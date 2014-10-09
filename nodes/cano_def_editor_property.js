/*
 * Copyright 2014 Gregory Prisament
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

function CanoDefEditorPropertyNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        device = params.device,
        prop = params.prop,
        menuNode = null,
        controlPanelNode = null,
        configNode = null,
        $rest = null,
        $sddl = null,
        $c = null,
        $js = null
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        menuNode.onLive();
    }

    menuNode = new CanoOptionNode({
        outerClass : "cano-def_editor_property-menu-outer",
        itemSelectedClass : "cano-def_editor_property-menu-selected",
        itemNotSelectedClass : "cano-def_editor_property-menu-not-selected",
        onSelect: function(opt, idx, value){
            $rest.hide();
            $c.hide();
            $js.hide();
            $sddl.hide();
            configNode.get$().hide();
            if (value == "rest") {
                $rest.show();
            }
            else if (value == "config") {
                configNode.get$().show();
            }
            else if (value == "c") {
                $c.show();
            }
            else if (value == "js") {
                $js.show();
            }
            else if (value == "sddl") {
                $sddl.show();
            }
        },
        onClick: function() {
            return true;
        },
        items: [ {
            content: "Hide Details",
            value: "hide-details",
        }, {
            content: "Editor",
            value: "config",
        }, {
            content: "SDDL",
            value: "sddl",
        }, {
            content: "REST",
            value: "rest",
        }, {
            content: "C/C++",
            value: "c",
        }, {
            content: "JS",
            value: "js",
        } ],
        selectedIdx: 0
    });

    /* Construct SDDL information */
    /*
     *  "sensor cpu" : {
     *      "datatype" : "float32"
     *  }
     */
    var sddl = prop.sddlString();
    $sddl = CanopyUtil_Compose(["<div class=cano-def_editor_property-body-inner>\
        <b>SDDL Definition:</b>\
        <div class=code>" + sddl + "</div>\
    </div>"]).hide();


    /* Construct REST information */
    if (prop.isSensor()) {
        $rest = CanopyUtil_Compose(["<div class=cano-def_editor_property-body-inner>\
            <b>Post data sample:</b>\
            <div class=code>POST http://canopy.link/di/device/", device.id(), "\n\
{\n\
    \"", prop.name(), "\" : 74.3\n\
}</div>\
            <b>Get historical data:</b>\
            <div class=code>GET <a href=http://dev02.canopy.link/api/device/", device.id(), "/", prop.name(), ">http://canopy.link/api/device/", device.id(), "/", prop.name(), "</a></div>\
        </div>"]).hide();
    }
    else if (prop.isControl()) {
        $rest = CanopyUtil_Compose(["<div class=cano-def_editor_property-body-inner>\
            <b>Remotely control value:</b>\
            <div class=code>POST http://canopy.link/api/device/", device.id(), "\n\
{\n\
    \"", prop.name(), "\" : 74.3\n\
}</div>\
        </div>"]).hide();
    }

    if (prop.isSensor()) {
        $c = CanopyUtil_Compose(["<div class=cano-def_editor_property-body-inner>\
            <b>Post data sample:</b>\
            <div class=code>#include &lt;canopy.h&gt;\n\
int main(void)\n\
{\n\
    canopy_post_sample(\n\
        CANOPY_UUID, \"", device.id(),"\",\n\
        CANOPY_PROPERTY_NAME, \"", prop.name(), "\", \n\
        CANOPY_VALUE_FLOAT32, 74.3f);\n\
    return 0;\n\
}</div>\
            </div>"]).hide();
    }
    else if (prop.isControl()) {
        $c = CanopyUtil_Compose(["<div class=cano-def_editor_property-body-inner>\
            <b>Register control change callback</b>\
            <div class=code>#include &lt;canopy.h&gt;\n\
int handle_", prop.name(), "(CanopyContext ctx, const char *propname, float value, void *extra)\n\
{\n\
    printf(\"%s changed to %f\\n\", propname, value);\n\
    return 0;\n\
}\n\
int main(void)\n\
{\n\
    canopy_on_change(\n\
        CANOPY_UUID, \"", device.id(),"\",\n\
        CANOPY_PROPERTY_NAME, \"", prop.name(), "\", \n\
        CANOPY_ON_CHANGE_FLOAT32_CALLBACK, &handle_", prop.name(), ");\n\
    canopy_run_event_loop();\n\
    return 0;\n\
}</div>\
            </div>"]).hide();
    }

    /* Construct Javascript Information */
    if (prop.isSensor()) {
        $js = CanopyUtil_Compose(["<div class=cano-def_editor_property-body-inner>\
            <b>Include Javascript Client Library (HTML):</b>\
            <div class=code>&lt;script src=\"/static/canopy-js-client.js\"&gt&lt;/script&gt;</div>\
            <b>Get most recent value:</b>\
            <div class=code>canopy.fetchDevice({\n\
    deviceId: \"", device.id(), "\",\n\
    done: function(device, error) {\n\
        alert(device.", prop.name(), "());\n\
    }\n\
});</div>\
        </div>"]).hide();
    }
    else if (prop.isControl()) {
        $js = CanopyUtil_Compose(["<div class=cano-def_editor_property-body-inner>\
            <b>Include Javascript Client Library (HTML):</b>\
            <div class=code>&lt;script src=\"/static/canopy-js-client.js\"&gt&lt;/script&gt;</div>\
            <b>Remotely control value:</b>\
            <div class=code>canopy.fetchDevice({\n\
    deviceId: \"", device.id(), "\",\n\
    done: function(device, error) {\n\
        device.setTargetValue(\"", prop.name(), "\", 123.4);\n\
    }\n\
});</div>\
        </div>"]).hide();
    }

    configNode = new CanoDefEditorPropertyConfigNode({
        canopyClient: canopy,
        device: device,
        prop: prop,
    });
    configNode.get$().hide();

    /* Assemble everything together */
    $me = CanopyUtil_Compose(["<div class=cano-def_editor_property-outer>\
        <div class=cano-def_editor_property-titlebar>\
            <div class=cano-def_editor_property-name>", prop.name(), "</div>\
            <div class=cano-def_editor_property-type>", prop.propertyType(), "</div>\
            <div class=cano-def_editor_property-datatype>", prop.datatype(), "</div>\
            ", menuNode, "\
        </div>\
        <div class=cano-def_editor_property-body-outer>\
            ", configNode, "\
            ", $rest, "\
            ", $sddl, "\
            ", $c, "\
            ", $js, "\
        </div>\
    </div>"]);

}
