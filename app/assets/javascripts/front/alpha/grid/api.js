var searches = [];
var related_contents = [];
var search_last_index;
var search_first_index;
var related_content_last_index;
var isLoading = false;

// function fetchContents(){
//   var instance = axios.create({
//     baseURL: '/api',
//     headers: {
//       'ContentType': 'application/json'
//     },
//     responseType: 'json'
//   });
//   instance.get('/transcripts/' + wallId ).then(function (response){
//
//     init_setting();
//
//     return response
//
//   }).then(function (response){
//
//     searches = response.data.searches;
//     related_contents = response.data.related_contents;
//     search_last_index = response.data.search_last_index;
//     search_first_index = response.data.search_first_index;
//     related_content_last_index = response.data.related_content_last_index;
//
//     TRANSCRIPTS.appendContents({ searches, related_contents });
//
//   }, function (error) {
//       console.log(error);
//   }).then(function (response){
//     loadContents();
//   });
// }

function fetchContents() {
  var instance = axios.create({
    baseURL: '/api',
    headers: {
      'ContentType': 'application/json'
    },
    responseType: 'json'
  });
  instance.get('/transcripts/' + wallId ).then(function (response) {

    searches = response.data.searches;
    related_contents = response.data.related_contents;
    search_last_index = response.data.search_last_index;
    search_first_index = response.data.search_first_index;
    related_content_last_index = response.data.related_content_last_index;

    if (searches.length) {
      TRANSCRIPTS.appendContents({ searches, related_contents });
    }

  }, function (error) {
    console.log(error);
  }).then(function (response) {
    loadContents();
  });
}

function loadContents() {
  setTimeout(function() {
    var instance = axios.create({
      baseURL: '/api',
      headers: {
        'ContentType': 'application/json'
      },
      responseType: 'json'
    });
    instance.get('/transcripts/' + wallId + '/' + search_last_index + '/' + related_content_last_index ).then(function (response) {
      search_last_index = response.data.search_last_index;
      related_content_last_index = response.data.related_content_last_index;

      searches = response.data.searches;
      if (searches.length){
        console.log(searches);
        related_contents = [];
        TRANSCRIPTS.prependContents({ searches, related_contents });
      }

      related_contents = response.data.related_contents;
      if (related_contents.length){
        console.log(related_contents);
        TRANSCRIPTS.addContents(related_contents);
      }
    }).then(function (response) {
      loadContents();
    }, function (error) {
      console.log(error);
      alert("Something went wrong. Please refresh.");
    });
  }, 100);
}

function loadPastContents() {
  isLoading = true;

  setTimeout(function() {
    var instance = axios.create({
      baseURL: '/api',
      headers: {
        'ContentType': 'application/json'
      },
      responseType: 'json'
    });
    instance.get('/transcripts/' + wallId + '/' + search_first_index).then(function (response){

      searches = response.data.searches;
      related_contents = response.data.related_contents;
      search_first_index = response.data.search_first_index;

      TRANSCRIPTS.appendContents({ searches, related_contents });

    }, function(error) {
      console.log(error);
      alert("Something went wrong. Please refresh.");
    }).then(function(response) {
      isLoading = false;
    });
  }, 100);
}

function deleteSearch(search_id) {
  var instance = axios.create({
    baseURL: '/api',
    headers: {'ContentType': 'application/json'},
    responseType: 'json'
  });
  instance.get('/update/searches/' + search_id + '/archive').then(function (response) {
    console.log("Deleted searchId: ", search_id);
  }, function (error) {
    console.log(error);
  });
}

function deleteContents(related_content_id) {
  var instance = axios.create({
    baseURL: '/api',
    headers: {'ContentType': 'application/json'},
    responseType: 'json'
  });
  instance.get('/update/contents/' + related_content_id + '/archive').then(function (response){
    console.log("Deleted relatedContentId: ", related_content_id);
  }, function (error) {
    console.log(error);
  });
}

function viewContents(related_content_id) {
  var instance = axios.create({
    baseURL: '/api',
    headers: {'ContentType': 'application/json'},
    responseType: 'json'
  });
  instance.get('/update/contents/' + related_content_id + '/view').then(function (response){
    console.log("Viewed relatedContentId: ", related_content_id);
  }, function (error) {
    console.log(error);
  });
}

function openContents(related_content_id) {
  var instance = axios.create({
    baseURL: '/api',
    headers: {'ContentType': 'application/json'},
    responseType: 'json'
  });
  instance.get('/update/contents/' + related_content_id + '/open').then(function (response){
    console.log("Opened relatedContentId: ", related_content_id);
  }, function (error) {
    console.log(error);
  });
}

window.addEventListener('load',　fetchContents, false);

// var instance = axios.create({
//   baseURL: '/test',
//   headers: {
//     'ContentType': 'application/json'
//   },
//   responseType: 'json'
// });
// instance.get('/dev/domain').then(function (response){
//   console.log(response.data);
//
// }, function (error) {
//   console.log(error);
// });
