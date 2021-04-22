let portGlobal = null;

function postMessage(message) {
    portGlobal.postMessage(message)
    console.log("Sent message", message);
}

chrome.runtime.onConnect.addListener(function (port) {
    portGlobal = port
    console.assert(port.name == "neoscale");

    port.onMessage.addListener(function(msg){

        function myListener(tabId, changeInfo, tab) {
            if (changeInfo.status == "complete" && tab.active) {
                setTimeout(postMessage, 2000, {message: "start "+(msg.message+1)});
                chrome.tabs.onUpdated.removeListener(myListener);
            }
        }

        if(msg.same == "d"){
            chrome.tabs.onUpdated.addListener(myListener);
        }else{
            setTimeout(postMessage, 2000, {message: "start "+(msg.message+1)});
        }
    });
});