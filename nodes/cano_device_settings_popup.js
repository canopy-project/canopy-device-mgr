/*
 *  params:
 *  .canopyClient - CanopyClient object
 *  .device - CanopyDevice object
 */
function CanoDeviceSettingsPopupNode(params) {
    var self=this,
        popupNode,
        canopy = params.canopyClient,
        device = params.device,
        $cancelButton,
        $locationInput,
        $nameInput,
        $saveButton
    ;

    $.extend(this, new CanoNode());

    this.onLive = function() {
        $saveButton.off().on('click', function() {
            var friendlyName = $nameInput.val();
            var locationNote = $locationInput.val();

            device.setSettings({
                friendlyName: friendlyName,
                locationNote: locationNote,
                onSuccess: function() {
                    popupNode.close();
                },
                onError: function() {
                    alert("doh!");
                }
            });
        });
        $cancelButton.off().on('click', function() {
            popupNode.close();
        });
    }

    this.get$ = function() {
        return popupNode.get$();
    }

    $nameInput = $("<input type=text value='" + device.friendlyName() + "'></input>");
    $locationInput = $("<input type=text value='" + device.locationNote() + "'></input>");

    $cancelButton = $("<input type=submit value='CANCEL' class='btn_not_selected' style='margin-top:12px;'></input>");
    $saveButton = $("<input type=submit value='SAVE' style='margin-top:12px;'></input>");

    $content = CanopyUtil_Compose([
        "<div style='width:420px'>\
            <div class=l>" + device.friendlyName() + " Settings</div>\
            <br>\
            <div class=thicker>Name</div>\
            ", $nameInput, "\
            <br><br>\
            <div class=thicker>Location Note</div>\
            ", $locationInput, "\
            <br><br>\
            ", $saveButton, "\
            ", $cancelButton, "\
        </div>"
    ]);


    popupNode = new CanoPopupNode({
        content: $content
    });
}
