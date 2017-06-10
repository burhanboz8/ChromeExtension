$(document).ready(function(){
    loaderVisibility(false);
    chrome.storage.sync.get(['success', 'type','name','link'], function(items) {
        if(items.success==1){
          $("#userNameSpan").text(items.name);
          $("#typeSpan").text(items.type);
          $("#currentLink").val(items.link);
        }else if (items.success == -1){
          // sistem guncelleniyor yazmak gerek!
        }else if (items.success == 0){
          //hata olustugunu yazmak gerek!
        }
    });
    $("#botBtn").click(function(e){
        e.preventDefault();
        loaderVisibility(true);
        console.log("Bot clicked");
        $.ajax({
          method :"GET",
          url: "http://127.0.0.1:3547/feedback",
          data : {
            "link" : $("#currentLink").val(),
            "type" :'-1'
          },
          success: function(result){
               thankMessage();
          }
        });
    });
    $("#humanBtn").click(function(e){
        e.preventDefault();
        loaderVisibility(true);
        console.log("Human clicked");
        $.ajax({
          method :"GET",
          url: "http://127.0.0.1:3547/feedback",
          data : {
            "link" : $("#currentLink").val(),
            "type" :'1'
          },
          success: function(result){
               console.log(result);
               thankMessage();
          }
        });
    });
});

function showDefaultPanel(){
  loaderVisibility(false);
}
function thankMessage(){
  loaderVisibility(false);
  $("#context").hide();
  $("#context").html("<p style='color=#3b4047; font-size:larger;'><b>Thank you</b> for your feedback!</p>");
  $("#context").show(1000);
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
