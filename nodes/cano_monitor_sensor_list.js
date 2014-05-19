/*
 * CanoMonitorSensorList - Selectable list of available sensors.
 *
 * Optional Parameters:
 *
 *      onSelect: function(<string>sensorName)
 */
function CanoMonitorSensorListNode(origParams) {
    var self=this,
        $body,
        $me,
        params;

    $.extend(this, new CanoNode());

    params = $.extend({}, {
        layout_css: {}
    }, origParams);

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        optionNode.onLive();
    }

    this.setOptions = function(deviceProperties) {
        console.log(deviceProperties);
        items = [];
        for (propName in deviceProperties) {
            if (deviceProperties[propName].category == "sensor") {
                items.push({html: propName, value: propName});
            }
        }
        console.log(items);
        optionNode.setItems(items);
    }

    optionNode = new CanoOptionNode({
        items: [],
        onSelect: function(idx, item) {
            console.log("item");
            console.log(item);
            if (params.onSelect)
                params.onSelect(item.value);
        }
    });
    $me = optionNode.get$();
}
