/*
 * CanoDevicesDialogNode - Dialog box for listing and selecting devices.
 *
 * Required Parameters:
 *  
 *      canopy_client: <CanopyClient object>
 *          Canopy client used for fetching data from the cloud.
 *
 * Optional Parameters:
 *
 *      layout_css: <object>
 *          CSS used for laying out the position of this dialog box.  Defaults
 *          to {}.
 *
 *      onSelect: <function(<object> device)>
 */
function CanoDevicesDialogNode(origParams) {
    var self=this,
        $me,
        $list,
        optionNode,
        params
    ;

    $.extend(this, new CanoNode());

    params = $.extend({}, {
        layout_css: {}
    }, origParams);

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        this.refresh();
    }

    this.refresh = function() {
        params.canopy_client.fetchDevices(function(device) {
            items = [];
            var length = device.devices.length;
            for (var i = 0; i < length ; i++) {
                items.push({
                    html: device.devices[i].friendly_name,
                    value: device.devices[i]
                });
            }
            optionNode.setItems(items);
        });
    }

    $list = $("<div>");

    optionNode = new CanoOptionNode({
        items: [],
        normalClass: "cano-device-item",
        selectedClass: "cano-device-item-selected",

        onSelect: function(idx, item) {
            if (params.onSelect)
                params.onSelect(item.value);
        }
    })

    $me = new CanoDialogNode({
        title_html: "Devices",
        outer_css: params.layout_css,
        body_node: optionNode
    }).get$();
}
