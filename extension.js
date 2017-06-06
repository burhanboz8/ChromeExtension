function send(){
  $.ajax({
    method :"GET",
    url: "http://127.0.0.1:3546",
    data : "www.twitter.com/abdullahtelli",
    success: function(result){
        console.log(result);
    }
  });
}
