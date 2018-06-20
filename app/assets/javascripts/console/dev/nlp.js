var nlpBtn, inputDiv, outputDiv;


document.addEventListener("DOMContentLoaded", function () {

  nlpBtn = document.getElementById("nlpBtn");
  inputDiv = document.getElementById("inputDiv");
  outputDiv = document.getElementById("outputDiv");

  nlpBtn.addEventListener("click", process)

});

process = () => {

  if(inputDiv.value){

      outputDiv.innerHTML = 'Proccessing...';

      const req = {
        text: inputDiv.value,
        langcode: languageOptions.value
      }
      const instance = axios.create({
        baseURL: '/console',
        headers: {
          'ContentType': 'application/json'
        },
        responseType: 'json'
      });

      instance.post('/dev/test/nlp', req ).then(function (response){
        console.log(response.data);

        outputDiv.innerHTML = '';

        const results = response.data.results
        results.forEach((result) => {
          outputDiv.innerHTML += (result.json.nlp_type+' NLP\n');
          if(result.json.entities.length == 0) {
            outputDiv.innerHTML += ('No Entity.');
            outputDiv.innerHTML += ('\n');
          } else {
            result.json.entities.forEach((entity) => {
              outputDiv.innerHTML += ('Entity : '+entity.name);
              if(entity.category) { outputDiv.innerHTML += (' ( '+entity.category+' ) ') };
              outputDiv.innerHTML += ('\n');
            });
          }
        })

      }, function (error) {
        console.log(error);
      });

  } else {
    alert("Input text can't be blank.");
  }

}
