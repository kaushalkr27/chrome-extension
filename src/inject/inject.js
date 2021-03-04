var port = chrome.runtime.connect({ name: "neoscale" });

port.onMessage.addListener(function (msg) {
    console.log("port active");
    if (msg.message == "2") {
        start_2();
        console.log("recieved 22222");
    }
    else if (msg.message == "3") {
        console.log("recieved 33333");
        start_3();
    }
    else if (msg.message == "4") {
        console.log("recieved 44444");
        start_4();
    }
    else if (msg.message == "5") {
        console.log("recieved 55555");
        start_5();
    }
    else if (msg.message == "6") {
        console.log("recieved 66666");
        start_6();
    }
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "1") {
            console.log("start 1");
            start_1();
        }
    }
);

function sendMesssageToBakground(json) {
    port.postMessage(json, function () {
        console.log("Sent from content");
    });
}

function clickOnSearch(searchButton) {
    searchButton.click();
    sendMesssageToBakground({ "message": "completed 1" })
}

function start_1() {
    var inputBox = document.getElementById('twotabsearchtextbox');
    inputBox.value = "tooth brush";
    var searchButton = document.getElementById('nav-search-submit-button');
    setTimeout(clickOnSearch, 3000, searchButton);
}

function start_2() {
    console.log("Started 2");
    console.log("22222222");
    var allSponsoredItems = document.querySelectorAll('[data-component-type="sp-sponsored-result"]');
    var item = allSponsoredItems[1].getElementsByTagName('a');
    console.log(item);
    item[0].click();
    sendMesssageToBakground({ "message": "completed 2" })
}

function start_3() {
    var image = document.getElementsByClassName('a-dynamic-image');
    image[0].click();
    sendMesssageToBakground({ "message": "completed 3" })
}

function start_4() {
    var images = document.getElementById('ivThumbs').getElementsByClassName('ivThumbImage');
    console.log("-----");
    console.log(images.length);
    console.log(images);
    console.log("-----");
    var i = 1;
    var interval = setInterval(function () {
        images[i].click();
        if (i >= images.length - 1) {
            var closeButton = document.getElementsByClassName('a-icon-close')[1];
            closeButton.click();
            clearInterval(interval);
            sendMesssageToBakground({ "message": "completed 4" })
        }
        i = i + 1;
    }, 3000);
}

function start_5() {
    var element = document.getElementsByClassName('a-icon-star')[0];
    element.addEventListener('mouseover', function () {
        setTimeout(function () {
            var oneStar = document.getElementsByClassName('1star')[1];
            oneStar.click();
            sendMesssageToBakground({ "message": "completed 5" })
        }, 2000);
    });

    var event = new MouseEvent('mouseover', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });

    element.dispatchEvent(event);
}

function start_6() {
    setTimeout(function () {
        console.log("SCROLL");
        document.getElementsByClassName('review')[2].scrollIntoView({
            behavior: 'smooth'
        });
    }, 2000);
}