var type = "Human";
var userName = "TEST";
$(document).ready(function(){
    loaderVisibility(false);
    var query = { active: true, currentWindow: true };
    function callback(tabs) {
      var currentTab = tabs[0];
      if(currentTab.url.includes("twitter")){
          $.ajax({
            method :"POST",
            dataType:"json",
            url: "http://127.0.0.1:3547/user",
            data : {
              "link" :tab.url,
            },
            success: function(result){
                //isteklerin degismesi lazim.
                if(result == "Human"){
                    chrome.browserAction.setIcon({path:"icongreen.png"});
                        loaderVisibility(false);
                }else if(result == "Bot"){
                    chrome.browserAction.setIcon({path:"iconred.png"});
                        loaderVisibility(false);
                }else{
                    chrome.browserAction.setIcon({path:"icon.png"});
                    loaderVisibility(true);
                }
            }
          });
        }
    }
    chrome.tabs.query(query, callback);
});
$("#humanBtn").click(function(e){
    e.preventDefault();
$.ajax({
  method :"GET",
  dataType:"json",
  url: "http://127.0.0.1:3547/feedback",
  data : {
    "link" :tab.url,
    "type" :'Human',
  },
  success: function(result){
       thankMessage();
  }
});
});
$("#botBtn").click(function(e){
    e.preventDefault();
    $.ajax({
      method :"GET",
      url: "http://127.0.0.1:3547/feedback",
      data : {
        "link" :tab.url,
        "type" :'Bot',
      },
      success: function(result){
           thankMessage();
      }
    });

});
function showDefaultPanel(){
  loaderVisibility(false);
}
function thankMessage(){
  loaderVisibility(false);
  clearContext();
  $("#context").html("<p style='color=#3b4047; font-size:larger;'><b>Thank you</b> for your feedback!</p>");
}
function loaderVisibility(show){
  if(show){
    $("#context").hide();
    $("#loader").show();
  }else{
    $("#loader").hide();
    $("#context").show();
  }

}
