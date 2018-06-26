// var initial_transcripts = [];
// var index;
//
// function fetchTranscripts(initial_transcripts, index){
//   var xmlHttp = new XMLHttpRequest();
//   xmlHttp.open("GET", "/demo/api/transcripts/" + wallID, false);
//   xmlHttp.send();
//   data = JSON.parse(xmlHttp.response)
//   for(var i = 0; i < data.transcripts.length; i++) {
//       initial_transcripts.push(data.transcripts[i]);
//   }
//   index = data.index
//   console.log(index)
//   return initial_transcripts, index
// }
//
// initial_transcripts, index = fetchTranscripts(initial_transcripts, index);
//
//
// function loadTranscripts(initial_transcripts, index){
//   console.log(index);
//   // const axiosBase = require('axios');
//   var instance = axios.create({
//     baseURL: '/demo',
//     headers: {
//       'ContentType': 'application/json'
//     },
//     responseType: 'json'
//   });
//   console.log('send req with index : ' + index);
//   instance.get('/api/transcripts/' + wallID + '/' + index).then(function (response){
//     console.log(response.data);
//     transcripts = response.data.transcripts;
//     index = response.data.index;
//
//     for(var i = 0; i < transcripts.length; i++) {
//         initial_transcripts.unshift(transcripts[i]);
//         console.log(transcripts[i]);
//         // transcripts_add(transcripts);
//         // startBtn.innerHTML = onMicPhrase + '<br> Status : <i>' + 'Recording...' + '</i>';
//     }
//     if (transcripts.length　!= 0){
//
//         transcripts_add(transcripts);
//     }
//
//   }, function (error) {
//     console.log(error);
//   }).then(function (response){
//     loadTranscripts(initial_transcripts, index);
//   });
// }
// window.addEventListener('load', loadTranscripts(initial_transcripts, index))

function loadPastTranscripts(initial_transcripts, index){
  // var instance = axios.create({
  //   baseURL: '/demo',
  //   headers: {
  //     'ContentType': 'application/json'
  //   },
  //   responseType: 'json'
  // });
  // instance.get('/api/transcripts/' + <%= @wall_id %> + '/' + index).then(function (response){
  //   transcripts = response.data.transcripts;
  //   index = response.data.index;
  //
  //   for(var i = 0; i < transcripts.length; i++) {
  //       initial_transcripts.unshift(transcripts[i]);
  //   }
  //   if (transcripts.length　!= 0){
  //       console.log(response.data);
  //       // transcripts_add(transcripts);
  //       TRANSCRIPTS.add(transcripts);
  //
  //   }
  //
  // }, function (error) {
  //   console.log(error);
  // }).then(function (response){
  //   loadTranscripts(initial_transcripts, index);
  // });
}
