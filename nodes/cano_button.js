/*
 * Generic button
 *
 * params:
 *  cssClass
 *  content
 *  onClick
 */
function CanoButtonNode(origParams) {
    var self=this,
        $me
    ;

    var params = $.extend({}, {
        cssClass: "",
        content: "",
        onClick: "",
    }, origParams);

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $me.off('click').on('click', function() {
            if (params.onClick)
                params.onClick();
        });
    }

    $me = CanopyUtil_Compose(["<div class=\"" + params.cssClass + "\">", params.content, "</div>"]);
}
