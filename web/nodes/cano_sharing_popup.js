/*
 *  params:
 *  .canopyClient - CanopyClient object
 *  .device - CanopyDevice object
 */
function CanoSharingPopupNode(params) {
    var self=this,
        popupNode,
        canopy = params.canopyClient,
        device = params.device,
        $cancelButton,
        $content,
        $validationStatus;
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return popupNode.get$();
    }

    this.onLive = function() {
        $cancelButton.off().on('click', function() {
            popupNode.close();
        });

        $shareButton.off().on('click', function() {
            var accessLevel = $("input[name=share_access_level]:checked").val();
            var sharingLevel = $("input[name=share_share_level]:checked").val();
            var recipient = $username.val();

            console.log(accessLevel);
            console.log(sharingLevel);
            console.log(recipient);

            canopy.share({
                deviceId: device.id(),
                accessLevel: accessLevel,
                sharingLevel: sharingLevel,
                recipient: recipient,
                onSuccess: function() {
                },
                onError: function() {
                }
            });
        });

        $username.off().on('keyup', function() {
            if (!CanopyUtil_IsValidEmail($username.val())) {
                $validationStatus.html("<span style='color:#ff0000'>X</span>");
            }
            else {
                $validationStatus.html("<span style='color:black'>ok</span>");
            }
        });
    }

    $cancelButton = $("<input type=submit value='CANCEL' class='btn_not_selected' style='margin-top:12px;'></input>");
    $shareButton = $("<input type=submit value='SHARE' style='margin-top:12px;'></input>");
    $username = $("<input name=username id=username type=text></input>");
    $validationStatus = $("<span class=thicker><span></span></span>");
    

    $content = CanopyUtil_Compose(["<div style='width:420px'>\
        <div class=l>Share " + device.friendlyName() + "</div>\
        <div id=sharing_form>\
            <div class=ms>\
                By sharing, you allow the recipient to monitor, control\
                and further share " + device.friendlyName() + ".\
                <br><br><div>\
                    <div class=thicker>Username or email of recipient</div>\
                    ", $username, " ", $validationStatus, "\
                </div>\
                <br><div>\
                    <div class=thicker>Permit recipient to:</div>\
                    <input value='monitor_only' type=radio name='share_access_level'>Monitor Only</input>\
                    <input value='monitor_and_control' style='margin-left:30px;' checked=checked type=radio name='share_access_level'>Monitor and Control</input>\
                </div>\
                <br><div>\
                    <div class=thicker>Allow further sharing?</div>\
                    <input value='no_share' type=radio name='share_share_level'>No further sharing</input><br>\
                    <input value='share_only' type=radio checked=checked name='share_share_level'>May share with others</input><br>\
                    <input value='share_and_revoke' type=radio name='share_share_level'>Device owner: may share and revoke others' access</input>\
                </div>\
                <br>\
                ", $shareButton, "\
                ", $cancelButton, "\
            </div>\
        </div>\
    </div>"]);

    popupNode = new CanoPopupNode({
        content: $content
    });
}
