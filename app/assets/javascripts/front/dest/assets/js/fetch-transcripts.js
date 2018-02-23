
    var initial_transcripts = [];
    var additional_transcripts = [];
    var index;

    // 初期のTranscriptsを取得（同期）

    function fetchTranscripts(initial_transcripts, index){
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", "https://transparent-sxsw-dev.herokuapp.com/api/transcripts/1", false);
      xmlHttp.send();
      data = JSON.parse(xmlHttp.response)
      for(var i = 0; i < data.transcripts.length; i++) {
          initial_transcripts.push(data.transcripts[i]);
      }
      index = data.index
      console.log(index)
    }

    fetchTranscripts(initial_transcripts, index);
    fetchTranscripts(additional_transcripts, index);

    // 追加のTranscriptsを取得

    // function addTranscripts(additional_transcripts, index){
    //   // const axiosBase = require('axios');
    //   var instance = axios.create({
    //     // baseURL: 'http://localhost:5000/api',
    //     baseURL: 'https://transparent-sxsw-dev.herokuapp.com/api',
    //     headers: {
    //       'ContentType': 'application/json'
    //       // 'origin' : 'https://transparent-sxsw-dev.herokuapp.com'
    //     },
    //     responseType: 'json'
    //   });
    //
    //   instance.get('/transcripts/1/'+index).then(function (response){
    //     for(var i = 0; i < response.data.transcripts.length; i++) {
    //         additional_transcripts.push(response.data.transcripts[i]);
    //     }
    //     index = response.data.index;
    //     console.log(additional_transcripts.length);
    //   }, function (error) {
    //     console.log(error);
    //   });
    // }

    // addTranscripts(additional_transcripts, index);
