// var initial_transcripts = [];
// var index;
// var first_index;
//
// function fetchTranscripts(initial_transcripts, index){
//   var xmlHttp = new XMLHttpRequest();
//   xmlHttp.open("GET", "/demo/api/transcripts/" + <%= @wall_id %>, false);
//   xmlHttp.send();
//   data = JSON.parse(xmlHttp.response)
//   for(var i = 0; i < data.transcripts.length; i++) {
//       initial_transcripts.push(data.transcripts[i]);
//   }
//   index = data.index;
//   first_index = data.first_index;
//   console.log(index);
//   return initial_transcripts, index
// }

// initial_transcripts, index = fetchTranscripts(initial_transcripts, index);
//
//
// function loadTranscripts(initial_transcripts, index){
//   var instance = axios.create({
//     baseURL: '/demo',
//     headers: {
//       'ContentType': 'application/json'
//     },
//     responseType: 'json'
//   });
//   instance.get('/api/transcripts/' + <%= @wall_id %> + '/' + index).then(function (response){
//     transcripts = response.data.transcripts;
//     index = response.data.index;
//
//     for(var i = 0; i < transcripts.length; i++) {
//         // initial_transcripts.unshift(transcripts[i]);
//         // TRANSCRIPTS.prependContents(transcripts[i]);
//     }
//     if (transcripts.length　!= 0){
//         console.log(response.data);
//         // TRANSCRIPTS.add(transcripts);
//         TRANSCRIPTS.prependContents(transcripts);
//
//     }
//
//   }, function (error) {
//     console.log(error);
//   }).then(function (response){
//     loadTranscripts(initial_transcripts, index);
//   });
// }
// window.addEventListener('load', loadTranscripts(initial_transcripts, index))
//
// function loadPastContents(){
//   isLoading = true;
//   var instance = axios.create({
//     baseURL: '/demo',
//     headers: {
//       'ContentType': 'application/json'
//     },
//     responseType: 'json'
//   });
//   instance.get('/api/transcripts/' + wallId + '/past/' + first_index).then(function (response){
//     console.log(response.data)
//
//     transcripts = response.data.transcripts;
//     first_index = response.data.first_index;
//
//     TRANSCRIPTS.appendContents(transcripts);
//
//   }, function (error) {
//     console.log(error);
//   }).then(function (response){
//     isLoading = false;
//   });
//
// }

// window.addEventListener('scroll', function() {
//
//     // スクロールが下部に来たらtrueを返します
//     console.log(TRANSCRIPTS.getScrollBottomPosition());
//
//     if (TRANSCRIPTS.getScrollBottomPosition()) {
//
//       if (!isLoading) {
//         loadPastContents();
//       };
//         //
//         // スクロール下部に来たら実行
//         // TRANSCRIPTS.appendContents(additional_transcripts1);
//     }
// }, false);
