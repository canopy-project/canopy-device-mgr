function CanoDevicesScreenNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        devicesMenuNode,
        $left,
        $right
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    $left = $("<div class=cano-main_page-left-and-middle-section></div>");
    $right = $("<div class=cano-main_page-right-section></div>");

    devicesMenuNode = new CanoDevicesMenuNode({
        canopyClient: canopy,
        dispatcher: dispatcher
    });
    devicesMenuNode.appendTo($left);

    devicesListNode = new CanoDevicesListNode({
        canopyClient: canopy,
        dispatcher: dispatcher
    });
    devicesListNode.appendTo($left);

    $me = $("<div class=center_channel>");
    $me.append($left).append($right);
}
