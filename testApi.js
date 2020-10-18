
console.log('testing the api');
// fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "quotes15.p.rapidapi.com",
// 		"x-rapidapi-key": "eebd39547bmsh168afa77ae1bee9p1baf5cjsn15c6ce8e04bd"
// 	}
// }).then(response => {
//     console.log(response);
//     response.json().then(function(data) {
//         console.log(data);
//       });
// })
// .catch(err => {
//     console.log(err);
    
// });
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
var targetUrl = 'https://opinionated-quotes-api.gigalixirapp.com/v1/quotes';
fetch(proxyUrl + targetUrl)
.then(response => {
    response.json().then(function(data) {
        console.log(data);
      });
})
.catch(err => {
    console.log(err);
    
});

$.ajax({ 
    type : "GET", 
    url : "https://api.paperquotes.com/apiv1/quotes/", 
    beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token b4ae6514eb002ab5d31384cfa2c5661fa13b71fc');},
    success : function(result) { 
        console.log(result.results); 
    }, 
    error : function(result) { 
      //handle the error
    } 
  }); 