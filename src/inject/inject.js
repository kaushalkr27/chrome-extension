var port = chrome.runtime.connect({ name: "neoscale" });

var my_elem = document.getElementById('navbar-main');

var span = document.createElement('div');
span.innerHTML = 'Loading...';
span.style = "background-color:blue; height:30px; font-size:medium; text-align:center; color: white; font-weight:600"


function setHeader(header_str) {
    // my_elem.parentNode.insertBefore(span, my_elem);
    document.body.prepend(span);
    span.innerHTML = header_str;
}

port.onMessage.addListener(function (msg) {
    console.log("port active");
    if (msg.message == "start 2") {
        setHeader("Executing Action 1");
        start_2();
        console.log("recieved 22222");
    }
    else if (msg.message == "start 3") {
        setHeader("Executing Action 2");
        console.log("recieved 33333");
        start_3();
    }
    else if (msg.message == "start 4") {
        setHeader("Executing Action 3");
        console.log("recieved 44444");
        start_4();
    }
    else if (msg.message == "start 5") {
        setHeader("Executing Action 4");
        console.log("recieved 55555");
        start_5();
    }
    else if (msg.message == "start 6") {
        setHeader("Executing Action 5");
        console.log("recieved 66666");
        start_6();
    }
    else if (msg.message == "start 7") {
        setHeader("Executing Action 6");
        console.log("recieved 77777");
        start_7();
    }
    else if (msg.message == "start 8") {
        setHeader("Executing Action 7");
        console.log("recieved 88888");
        start_8();
    }
    else if(msg.message == "start 9"){
        setHeader("Executing Action 8");
        console.log("recieved 99999");
        start_9();
    }
    else if(msg.message == "start 10"){
        setHeader("Executing Action 9");
        start_10();
    }
});


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "1") {
            console.log("start 1");
            start_1();
            setHeader("Starting Script. ");
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
    sendMesssageToBakground({ "message": 1, "same": "d" })
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
    sendMesssageToBakground({ "message": 2, "same": "d"  })
}

function start_3() {
    var image = document.getElementsByClassName('a-dynamic-image');
    image[0].click();
    sendMesssageToBakground({ "message": 3, "same": "s"  })
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
            sendMesssageToBakground({ "message": 4, "same": "s"  })
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
            sendMesssageToBakground({ "message": 5, "same": "d"  })
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
        setTimeout(function(){
            document.getElementsByClassName('a-button-text')[1].scrollIntoView({ behavior: 'smooth' });
            setTimeout(function(){
                document.getElementsByClassName('a-button-text')[1].click();
                sendMesssageToBakground({ "message": 6, "same": "d"  });
            }, 2000);
        }, 3000);
    }, 2000);
}

function start_7(){
    setTimeout(function(){
        document.getElementById('add-to-cart-button').click();
        sendMesssageToBakground({ "message": 7, "same": "d"  });
    }, 2000);
}

function start_8(){
    setTimeout(function(){
        document.getElementById('hlb-ptc-btn-native').click();
        sendMesssageToBakground({ "message": 8, "same": "d"  });
    }, 2000);
}

function start_9(){
    setTimeout(function(){
        document.getElementsByClassName('a-button-text')[0].click();
        sendMesssageToBakground({"message":9, "same": "d" });
    }, 2000);
}

function start_10(){
    setTimeout(function(){
        document.getElementsByClassName('a-button-text')[0].click();
    }, 2000);
}