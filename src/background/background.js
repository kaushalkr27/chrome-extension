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
        else if(msg.message == "completed 2"){
            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
                if (changeInfo.status == "complete") {
                    setTimeout(postMessage, 2000, {message: '3'})
                }
            });
        }
        else if(msg.message == "completed 3"){
                    setTimeout(postMessage, 2000, {message: '4'})
                }
        else if(msg.message == "completed 4"){
            setTimeout(postMessage, 2000, {message: '5'})
        }
        else if(msg.message == "completed 5"){
            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
                if (changeInfo.status == "complete") {
                    setTimeout(postMessage, 2000, {message: '6'})
                }
            });
        }
    });
});

function postMessage(message) {
    portGlobal.postMessage(message)
    console.log("Sent message");
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