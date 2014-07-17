function CanopyUtil_GetURLParams() {
    var params = [];
    var query = location.search.slice(1).split('&');
    $.each(query, function(i, value) {
        var token = value.split('=');
        params[decodeURIComponent(token[0])] = decodeURIComponent(token[1]);
    });
    return params;
}

function CanopyUtil_Compose(segments) {
    var i;
    var numSegments = segments.length;
    var out = [];
    var $out;
    var placeholderCnt = 0;
    var placeholders = [];
    for (i = 0; i < numSegments; i++) {
        if (typeof segments[i] === "string") {
            /* regular string, just append to output */
            out.push(segments[i]);
        }
        else if (typeof segments[i] === "object") {
            if (segments[i].get$) {
                /* canopy node object.  Create placeholder */
                var placeholderId = "_tmpid_" + placeholderCnt;
                out.push("<div id=" + placeholderId + "/>");
                placeholders.push({
                    id: placeholderId,
                    $segment: segments[i].get$()
                });
                placeholderCnt++;
            }
            else if (segments[i] instanceof jQuery) {
                /* jquery object.  Create placeholder */
                var placeholderId = "_tmpid_" + placeholderCnt;
                out.push("<div id=" + placeholderId + "/>");
                placeholders.push({
                    id: placeholderId,
                    $segment: segments[i]
                });
                placeholderCnt++;
            }
        }
    }

    $out = $(out.join(""));

    /* replace placeholders with actual content */
    for (i = 0; i < placeholderCnt; i++) {
        var id = placeholders[i].id;
        var $segment = placeholders[i].$segment;
        $out.find("#" + id).replaceWith($segment);
    }

    return $out;
}
