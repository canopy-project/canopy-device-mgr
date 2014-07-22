/*
 * .content -- html, Node, or jQuery object to display
 */
function CanoPopupNode(params) {
    var self=this,
        $me
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    this.close = function() {
        $me.hide();
    }

    $me = CanopyUtil_Compose(["\
        <div class=cano-popup-outer>\
            <div class=cano-popup-inner>\
                ", params.content, "\
            </div>\
        </div>\
    "]);
}
