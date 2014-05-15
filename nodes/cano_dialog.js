
/*
 *  CanoDialogNode - Generic dialog window for Canopy UI.
 *  
 *  All parameters are optional:
 *
 *      "body_class": <string>
 *          CSS classes to apply to the body section of the dialog.  Defaults
 *          to "cano-dialog-body"
 *
 *      "body_css": <object>
 *          Additional CSS styling to apply to the body.  Defaults to {}.  To
 *          eliminate body padding, use: {padding:"0px"}.
 *
 *      "body_html": <string|null>
 *          HTML content to show in the body.  If set, "body_node" is ignored.
 *          Defaults to null.
 *
 *      "body_node": <object|null>
 *          Canopy node object to render in the body.  Defaults to null.
 *
 *      "outer_class": <string>
 *          CSS classes to apply to the outer container of the dialog.
 *          Defaults to "cano-dialog-outer".
 *
 *      "outer_css": <object>
 *          Additional CSS styling to apply to the outer container of the
 *          dialog.  Defaults to {}.
 *
 *      "title_class": <string>
 *          CSS classes to apply to the title section of the dialog.  Defaults
 *          to "cano-dialog-title"
 *
 *      "title_css": <object>
 *          Additional CSS styling to apply to the title.  Defaults to {}.
 *
 *      "title_html": <string|null>
 *          HTML content to show in the title bar.  If set, "title_node" is
 *          ignored.  Defaults to null.
 *
 *      "title_node": <object|null>
 *          Canopy node object to render in the title.  Defaults to null.
 */


function CanoDialogNode(origParams) {
    var self=this,
        $me;

    $.extend(this, new CanoNode());

    params = $.extend({}, {
        body_class: "cano-dialog-body",
        body_css: {},
        body_html: null,
        body_node: null,
        outer_class: "cano-dialog-outer",
        outer_css: {},
        title_class: "cano-dialog-title",
        title_css: {},
        title_html: null,
        title_node: null
    }, origParams);

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        if (params.body_node !== null)
            params.body_node.onLive();
        if (params.title_node !== null)
            params.title_node.onLive();
    }

    $me = $("<div></div>")
        .addClass(params.outer_class)
        .css(params.outer_css)
    ;

    $title = $("<div>")
        .addClass(params.title_class)
        .css(params.title_css)
        .html((params.title_html !== null) ? 
            params.title_html : params.title_node.get$()
        )
    ;
    $title.appendTo($me);

    $body = $("<div>")
        .addClass(params.body_class)
        .css(params.body_css)
        .html((params.body_html !== null) ? 
            params.body_html : params.body_node.get$()
        )
    ;

    $body.appendTo($me);
}
