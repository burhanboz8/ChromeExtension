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
            if(result.type == "Human"){
                chrome.browserAction.setIcon({path:"icongreen.png"});
            }else if(result.type== "Bot"){
                chrome.browserAction.setIcon({path:"iconred.png"});
            }else{
                chrome.browserAction.setIcon({path:"icon.png"});
            }
        }
      });
      $.ajax({
        method :"GET",
        dataType:"json",
        url: "http://127.0.0.1:3547/user",
        data : {
          "link" :tab.url,
        },
        success: function(result){
            var type = result.type;
            var name = result.name;
              $('#typeSpan').load("dialog.html",function(){
                $('#typeSpan').text(type);
              });
              $('#userNameSpan').load("dialog.html",function(){
                $('#userNameSpan').text(name);
              });

        },error: function (error) {
                  console.log("hatali");
              }
      });
    }else{
        chrome.browserAction.setIcon({path:"icon.png"});
    }
  }
);
