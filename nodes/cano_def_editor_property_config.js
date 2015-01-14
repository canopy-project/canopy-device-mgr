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

function CanoDefEditorPropertyConfigNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        device = params.device,
        prop = params.prop,
        $saveButton,
        $controlTypeInput,
        $datatypeInput,
        $minValueInput,
        $maxValueInput,
        $numericDisplayHintInput,
        $unitsInput,
        $regexInput
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    function composeSDDL() {
        out = {
            "control-type" : $controlTypeInput.val(),
            "datatype" : $datatypeInput.val(),
            "min-value" : $minValueInput.val(), // TODO: null
            "max-value" : $maxValueInput.val(),
            "numeric-display-hint" : $numericDisplayHintInput.val(),
            "units" : $unitsInput.val()
            //"regex" : $regexInput.val()
        };
        return out;
    }

    this.onLive = function() {
        $saveButton.off().on("click", function() {
            var prop = composeSDDL();
            device.updateSDDL({
                sddlObj : prop,
                onSuccess: function() {
                    alert("ok");
                },
                onError: function() {
                    alert("no good");
                }
            });
        })
    }

    this.update = function(prop) {
        $form = $("<form>");
      
        // Property type
        isSensor = prop.isSensor() ? "selected" : "";
        isControl = prop.isControl() ? "selected" : "";
        $propertyTypeInput = $("<select>\
            <option " + isSensor + " value=sensor>Sensor</option>\
            <option " + isControl + " value=control>Control</option>\
            <option value=class>Class</option>\
        </select>");

        // Control type
        if (prop.isControl()) {
            isParameter = prop.controlType() == "parameter" ? "selected" : "";
            isTrigger = prop.controlType() == "trigger" ? "selected" : "";
            $controlTypeInput = $("<select>\
                <option " + isParameter + " value=parameter>Parameter</option>\
                <option " + isTrigger + " value=trigger>Trigger</option>\
            </select>");
        }

        // Datatype
        isBool = prop.datatype() == "bool" ? "selected" : "";
        isDatetime = prop.datatype() == "datetime" ? "selected" : "";
        isFloat32 = prop.datatype() == "float32" ? "selected" : "";
        isFloat64 = prop.datatype() == "float64" ? "selected" : "";
        isInt8 = prop.datatype() == "int8" ? "selected" : "";
        isInt16 = prop.datatype() == "int16" ? "selected" : "";
        isInt32 = prop.datatype() == "int32" ? "selected" : "";
        isUint8 = prop.datatype() == "uint8" ? "selected" : "";
        isUint16 = prop.datatype() == "uint16" ? "selected" : "";
        isUint32 = prop.datatype() == "uint32" ? "selected" : "";
        isString = prop.datatype() == "string" ? "selected" : "";
        isVoid = prop.datatype() == "void" ? "selected" : "";
        $datatypeInput = $("<select>\
            <option " + isBool + " value=bool>bool</option>\
            <option " + isDatetime + " value=datetime>datetime</option>\
            <option " + isFloat32 + " value=float32>float32</option>\
            <option " + isFloat64 + " value=float64>float64</option>\
            <option " + isInt8 + " value=int8>int8</option>\
            <option " + isInt16 + " value=int16>int16</option>\
            <option " + isInt32 + " value=int32>int32</option>\
            <option " + isUint8 + " value=uint8>uint8</option>\
            <option " + isUint16 + " value=uint16>uint16</option>\
            <option " + isUint32 + " value=uint32>uint32</option>\
            <option " + isString + " value=string>string</option>\
            <option " + isVoid + " value=void>void</option>\
        </select>");

        // Min value
        hasMinValue = prop.minValue() != null ? "checked" : "";
        hasMinValue2 = prop.minValue() != null ? "" : "disabled";
        $minValueCheckbox = $("<input " + hasMinValue + " type=checkbox></input>");
        $minValueInput = $("<input name=min-value value=0 " + hasMinValue2 + "></input>");

        // Max value
        hasMaxValue = prop.maxValue() != null ? "checked" : "";
        hasMaxValue2 = prop.maxValue() != null ? "" : "disabled";
        $maxValueCheckbox = $("<input " + hasMaxValue + " type=checkbox></input>");
        $maxValueInput = $("<input name=max-value value=0 " + hasMaxValue2 + "></input>");

        // Numeric display hint
        isNormal = prop.numericDisplayHint() == "normal" ? "selected" : "";
        isPercentage = prop.numericDisplayHint() == "percentage" ? "selected" : "";
        isScientific = prop.numericDisplayHint() == "scientfic" ? "selected" : "";
        isHex = prop.numericDisplayHint() == "hex" ? "selected" : "";
        $numericDisplayHintInput = $("<select>\
            <option " + isNormal + " value=normal>Normal</option>\
            <option " + isPercentage + " value=percentage>Percentage</option>\
            <option " + isScientific + " value=scientific>Scientific</option>\
            <option " + isHex + " value=hex>Hex</option>\
        </select>");

        // Units 
        $unitsInput = $("<input name=units value='" + prop.units() + "'></input>");

        // Regular expression
        var $regexInput;
        if (prop.datatype == "string") {
            $regexInput = $("<input name=regex value='" + prop.regex() + "'></input>");
        }

        // Save button
        $saveButton = $("<input type=submit value=SAVE>");
        $inner = CanopyUtil_Compose(["<div class=cano-def_editor_property-body-inner>\
        <table>\
            <tr>\
                <td>Property Type</td>\
                <td>\
                    ", $propertyTypeInput, "\
                </td>\
            </tr>\
            <tr>\
                <td>Control Type</td>\
                <td>\
                    ", $controlTypeInput, "\
                </td>\
            </tr>\
            <tr>\
                <td>Datatype</td>\
                <td>\
                    ", $datatypeInput, "\
                </td>\
            </tr>\
            <tr>\
                <td>Min Value</td>\
                <td>\
                    ", $minValueCheckbox, $minValueInput, "\
                </td>\
            </tr>\
            <tr>\
                <td>Max Value</td>\
                <td>\
                    ", $maxValueCheckbox, $maxValueInput, "\
                </td>\
            </tr>\
            <tr>\
                <td>Numeric Display Hint</td>\
                <td>\
                    ", $numericDisplayHintInput, "\
                </td>\
            </tr>\
            <tr>\
                <td>Units</td>\
                <td>\
                    ", $unitsInput, "\
                </td>\
            </tr>\
            <tr>\
                <td>Regular Expression</td>\
                <td>\
                    ", $regexInput, "\
                </td>\
            </tr>\
        </table>\
        ", $saveButton, "\
        <input type=submit value='Revert' disabled></input><br>\
    </div>"]);

        $inner.appendTo($me);
    }

    /* Assemble everything together */
    $me = $("<div>");

    this.update(prop);

}
