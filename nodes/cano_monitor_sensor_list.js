/*
 * CanoMonitorSensorList - Selectable list of available sensors.
 */
function CanoMonitorSensorListNode(origParams) {
    var self=this,
        $body,
        $me,
        params;

    $.extend(this, new CanoNode());

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
                items.push({html: propName});
            }
        }
        console.log(items);
        optionNode.setItems(items);
    }

    optionNode = new CanoOptionNode({items: []});
    $me = optionNode.get$();
}
