chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    if(tab.url.includes("twitter")){
      $.ajax({
        method :"GET",
        dataType:"json",
        url: "http://127.0.0.1:3547/user",
        data : {
          "link" :tab.url,
        },
        success: function(result){
        console.log(result);
            if(result.success == 1){
              var type = result.type;
              var name = result.name;
              chrome.storage.sync.set({'success' : 1,'type':type,'name':name,'link':tab.url},function(){
                  console.log("SAVED!");
              });
              if(result.type == "Human"){
                  chrome.browserAction.setIcon({path:"icongreen.png"});
              }else if(result.type== "Bot"){
                  chrome.browserAction.setIcon({path:"iconred.png"});
              }else{
                  chrome.browserAction.setIcon({path:"icon.png"});
              }
            }else{
              chrome.storage.sync.set({'success' : result.success},function(){
                  console.log("SAVED BUT RESULT FAILED");
              });
            }
        },error: function (error) {
                console.log("hatali");
          }
      });
    }else{
        chrome.browserAction.setIcon({path:"icon.png"});
    }
  }
);
