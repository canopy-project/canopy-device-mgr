/*
 * Option is a sequence of DIVs, only one of which can be selected at a time.
 *
 * params:
 *      .outerClass
 *      .itemSelectedClass
 *      .itemNotSelectedClass
 *      .itemPendingSelectClass
 *      .itemNotPendingSelectClass
 *      .onSelect
 *      .onClick -- return false to not select
 *      .items
 *          .content
 *          .value
 *      .selectedIdx
 *      .pendingSelectIdx
 */
function CanoOptionNode(origParams) {
    var self=this,
        $items = [],
        $me,
        selectedIdx
    ;

    var params = $.extend({}, {
        outerClass: "",
        itemSelectedClass: "",
        itemNotSelectedClass: "",
        itemPendingSelectClass: "",
        itemNotPendingSelectClass: "",
        onSelect: null,
        onClick: null,
        selectedIdx: -1,
        pendingSelectIdx: -1
    }, origParams);

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        for (var i = 0; i < $items.length; i++) {
            var $item = $items[i];
            $item.off('click').on('click', 
                function(idx) { 
                    return function() {
                        if (params.onClick) {
                            if (params.onClick(self, idx, params.items[idx].value) != false) {
                                self.select(idx);
                            }
                        } 
                        else {
                            self.select(idx);
                        }
                    }
                }(i)
            );
        }
    }

    this.select = function(idx, skipCallbacks) {
        selectedIdx = idx;
        for (var i = 0; i < params.items.length; i++) {
            if (i == idx) {
                // selected
                $items[i].removeClass(params.itemNotSelectedClass);
                $items[i].addClass(params.itemSelectedClass);
                $items[i].removeClass(params.itemPendingSelectClass);
                if (params.onSelect && !skipCallbacks) {
                    params.onSelect(self, idx, params.items[i].value);
                }
            } else {
                $items[i].removeClass(params.itemSelectedClass);
                $items[i].addClass(params.itemNotSelectedClass);
            }
        }
    }

    this.pendingSelect = function(idx) {
        for (var i = 0; i < params.items.length; i++) {
            if (i == idx && idx != selectedIdx) {
                // selected
                $items[i].removeClass(params.itemNotPendingSelectClass);
                $items[i].addClass(params.itemPendingSelectClass);
            } else {
                $items[i].removeClass(params.itemPendingSelectClass);
                $items[i].addClass(params.itemNotPendingSelectedClass);
            }
        }
    }

    $me = $("<div class=\"" + params.outerClass + "\">");

    for (var i = 0; i < params.items.length; i++) {
        var $item = CanopyUtil_Compose(["<div>", params.items[i].content, "</div>"]);
        $items.push($item);
        $me.append($item);
    }

    this.select(params.selectedIdx, true);
    this.pendingSelect(-1);
}
