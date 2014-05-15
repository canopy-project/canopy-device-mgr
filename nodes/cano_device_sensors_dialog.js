/*
 * CanoDeviceSensorDialogNode - Dialog box for monitoring device sensors
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
 */
function CanoDeviceSensorsDialogNode(origParams) {
    var self=this,
        $me,
        $list,
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
    }

    $list = $("<div>");

    $me = new CanoDialogNode({
        title_html: "Monitor",
        outer_css: params.layout_css,
        body_html: $list
    }).get$();
}
