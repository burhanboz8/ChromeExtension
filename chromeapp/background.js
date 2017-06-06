chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    if(tab.url.includes("twitter")){
      $.ajax({
        method :"POST",
        url: "http://127.0.0.1:3547/user",
        data : {
          "link" :tab.url,
        },
        success: function(result){
            if(result == "Human"){
                chrome.browserAction.setIcon({path:"icongreen.png"});
            }else if(result == "Bot"){
                chrome.browserAction.setIcon({path:"iconred.png"});
            }else{
                chrome.browserAction.setIcon({path:"icon.png"});
            }
        }
      });
    }else{
        chrome.browserAction.setIcon({path:"icon.png"});
    }
  }
);
// Handle requests for passwords
chrome.runtime.onMessage.addListener(function(request) {
    if (request.type === 'request_type') {
        chrome.tabs.create({
            url: chrome.extension.getURL('dialog.html'),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true
                // incognito, top, left, ...
            });
        });
    }
});
function setPassword(type) {
  $.ajax({
    method :"GET",
    url: "http://127.0.0.1:3547/user",
    data : {
      "type" :type,
    },
    success: function (result) {
              if (result == "Human") {
                console.log('helal');
              }
      },
              error: function (error) {
                  console.log("hatali");
              }
  });
};
chrome.browserAction.onClicked.addListener(function (tab) {
});
