var resultsTable, nlpBtn, inputDiv;
// var entityDivMS, typeDivMS, entityDivGCP, typeDivGCP;
var columnNum = 0;

document.addEventListener("DOMContentLoaded", function () {

  resultsTable = document.getElementById("resultsTable");
  nlpBtn = document.getElementById("nlpBtn");
  inputDiv = document.getElementById("inputDiv");
  langNLP = document.getElementById("langNLP");

  // entityDivMS = document.getElementById("entityDivMS");
  // typeDivMS = document.getElementById("typeDivMS");
  // entityDivGCP = document.getElementById("entityDivGCP");
  // typeDivGCP = document.getElementById("typeDivGCP");

  nlpBtn.addEventListener("click", onPress)
  inputDiv.maxLength  = 5000;
  inputDiv.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {
      onPress();
    }
  });

  // inputDiv.addEventListener("submit", onPress)


});

onPress = () => {
  if(inputDiv.value){
    process(inputDiv.value);
  } else {
    alert("Input text can't be blank.");
  }
}

process = ( input ) => {

  input = input.replace(/\r?\n+/g,"");
  console.log(input);

  const req = {
    text: input,
    langcode: langNLP.value
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
    const results = response.data.results;

    show(input,results);

    // results.forEach((result) => {
      // outputDiv.innerHTML += (result.json.nlp_type+' NLP\n');
      // if (result.json.nlp_type==='MS') {
      //
      //   if(result.json.entities.length == 0) {
      //     entityDivMS.innerHTML += ('No Entity.');
      //     entityDivMS.innerHTML += ('\n');
      //   } else {
      //     result.json.entities.forEach((entity) => {
      //       entityDivMS.innerHTML += ('Entity : '+entity.name);
      //       if(entity.category) { entityDivMS.innerHTML += (' ( '+entity.category+' ) ') };
      //       entityDivMS.innerHTML += ('\n');
      //     });
      //   }
      // } elif (result.json.nlp_type==='GCP') {
      //
      //
      // }
    // })

  }, function (error) {
    console.log(error);
  });

}

show = ( input, results ) => {

  var entityMS = '';
  var entityGCP = '';
  // var MSCounter = '';
  // var GCPCounter = '';

  columnNum += 1;

  const tr  = resultsTable.insertRow(1);
  const numColumn  = tr.insertCell(0);
  const numDiv = document.createElement('div');
  numDiv.setAttribute("align", "center")
  const num = document.createTextNode(columnNum.toString());
  numDiv.appendChild(num);
  numColumn.appendChild(numDiv);

  const inputColumn  = tr.insertCell(-1);
  const inputCell = document.createElement('div');
  const inputText = document.createTextNode(input);
  inputCell.appendChild(inputText);
  inputColumn.appendChild(inputCell);

  const cellMS  = tr.insertCell(-1);
  const cellGCP  = tr.insertCell(-1);

  results.forEach((result) => {
    if (result.json.nlp_type==='MS') { setResult(result.json, cellMS) };
    if (result.json.nlp_type==='GCP') { setResult(result.json, cellGCP) };
  });

}

setResult = (json, cell) => {
  var text = '';
  if(json.entities.length==0) {
    // textMS += ('No Entity.');
    // textMS += ('\n');
  } else {
    var num = 0;
    json.entities.forEach((entity) => {
      num += 1;
      text = ( ' ' + num.toString() + ' : ' + entity.name);
      if(entity.category) {
        text += (' ( '+entity.category+' ) ')
      } else {
        text += (' ()');
      };
      const div = document.createElement('div');
      const t = document.createTextNode(text);
      div.appendChild(t);
      cell.appendChild(div);
    });
  }
  return text
}
