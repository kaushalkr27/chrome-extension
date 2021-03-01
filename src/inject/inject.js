// document.querySelectorAll('[data-component-type="sp-sponsored-result"]

console.log("AMAZON");

var port = chrome.runtime.connect({name: "neoscale"});

port.onMessage.addListener(function(msg) {
    console.log("port active");
  if (msg.message == "2")
    start_2();
  else if (msg.question == "Madame who?")
    port.postMessage({answer: "Madame... Bovary"});
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "1") {
            console.log("start 1");
            start_1();
        }else if(request.message === "2"){
            console.log("Started 2");
            start_2();
        }
    }
);

function sendMesssageToBakground(json){
    // chrome.runtime.sendMessage(json, function(response) {
    //     console.log("Sent from content");
    //   });

      port.postMessage(json, function(){
        console.log("Sent from content");
      });
}

function clickOnSearch(searchButton){
    searchButton.click();
    sendMesssageToBakground({"message":"completed 1"})
}

function start_1() {
    var inputBox = document.getElementById('twotabsearchtextbox');
    inputBox.value = "tooth brush";
    var searchButton = document.getElementById('nav-search-submit-button');
    setTimeout(clickOnSearch, 3000, searchButton);
}

function start_2(){
    console.log("Started 2");
    console.log("22222222");
    var allSponsoredItems = document.querySelectorAll('[data-component-type="sp-sponsored-result"]');
    var item = allSponsoredItems[1].getElementsByTagName('a');
    console.log(item);
    item[0].click();
}