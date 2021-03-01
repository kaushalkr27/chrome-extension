let portGlobal = null;


chrome.runtime.onConnect.addListener(function (port) {
    portGlobal = port
    console.assert(port.name == "neoscale");
    port.onMessage.addListener(function (msg) {
        if (msg.message == "completed 1") {
            console.log("Recieved");
            chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
                console.log("inside update");
                if (changeInfo.status == "complete") {
                    setTimeout(postMessage, 2000, {message: '2'})
                }
            });
        }
    });
});

function postMessage(message) {
    portGlobal.postMessage(message)
    console.log("Sent to start 2");
}



//   chrome.runtime.Port.onDisconnect.addEventListener( function(listener, port){
//     chrome.runtime.onConnect.addListener(function(port) {
//         console.assert(port.name == "neoscale");
//         port.onMessage.addListener(function(msg) {
//             if (msg.message == "completed 1"){
//                 chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//                     console.log("inside update");
//                     if(changeInfo.status == "complete"){
//                         port.postMessage({message: "2"});
//                         console.log("Sent to start 2");
//                         }
//                 });
//           }
//         });
//       });      

//   })