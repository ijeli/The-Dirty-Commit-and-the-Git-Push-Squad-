var url = "https://api.twitter.com/oauth/authorize";
url += '?' + $.param({
  'api-key': "8eh1KRCeNXEgeZNaYUZpUcv3Z"
});
$.ajax({
 url: url,
 method: 'GET',
 dataType: 'JSON',
 success: function(data) {
   console.log(data)
 },
 error: function(err) {
   console.log('error:' + err)
 }
})