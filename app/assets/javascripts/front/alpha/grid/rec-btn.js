<!-- Browser Hooks -->

var key, languageOptions, formatOptions, recognitionMode, inputSource, filePicker, languageCode;
var SDK;
var recognizer;
var previousSubscriptionKey;
var result;
var timeout_counter = 0;
var recognize_counter = 0;
// var languageCode = '<%= @language_code %>';
var isActive = false; // セッションアラート対策

document.addEventListener("DOMContentLoaded", function () {

    fetchConfig();

    // key = '<%= @MS_ASR_KEY %>';
    languageOptions = languageCode;
    formatOptions = "Simple";
    inputSource = "Mic";
    recognitionMode = "Conversation";

    recBtn.addEventListener("click", function () {

      setTimeout(function() {

        if (TRANSCRIPTS.getRecordingStatus()){

          killMic();
          dimensionValue4 = 'off';

        } else {

          activateMic();
          dimensionValue4 = 'on';

        }

        if(ga === undefined) {
          console.log('undefined');
        }else {
          ga('set', 'dimension4', dimensionValue4);
        };
        // TRANSCRIPTS.toggleRecordhing();

      });

    });

    Initialize(function (speechSdk) {
        SDK = speechSdk;
    });

});

function fetchConfig(){
  var instance = axios.create({
    baseURL: '/console',
    headers: {
      'ContentType': 'application/json'
    },
    responseType: 'json'
  });
  instance.get('/config').then(function (response){
    key = response.data.asr;
  }, function (error) {
    console.log(error);
  });
}

function sleepByPromise(sec) {
     return new Promise(resolve => setTimeout(resolve, sec*1000));
 }

function postTranscript(text) {
  var FacebookID = 'guest_x';
  var post_url = '/api/transcripts';
  var with_words = TRANSCRIPTS.getKeywords();
  var search_type = TRANSCRIPTS.getMediaType();

  var body = {
          'transcript' : text,
          'FacebookID' :  FacebookID,
          'langcode' : languageCode,
          'wallID' : wallId,
          'clientID' : FacebookID,
          'search_type' : search_type,
          'with_words' : with_words,
          'UI_version' : uiVersion
      };

  console.log(body)

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("POST", post_url);
  xmlHttp.setRequestHeader( 'Content-Type', 'application/json' )
  xmlHttp.onreadystatechange = async function() {
    await sleepByPromise(2)
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      TRANSCRIPTS.setRecordingText('');
    }
  };
  xmlHttp.send(JSON.stringify(body));
  console.log(xmlHttp.response);

}

function Setup() {
    if (recognizer != null) {
        RecognizerStop(SDK, recognizer);
    }
    recognizer = RecognizerSetup(SDK, recognitionMode, languageOptions, SDK.SpeechResultFormat[formatOptions], key);
}

function UpdateStatus(status) {
    console.log(status);
}

function OnSpeechEndDetected() {
    // stopBtn.disabled = true;
}

function UpdateRecognizedPhrase(json) {
  console.log('UpdateRecognizedPhrase');
  console.log(json)

    if(json.RecognitionStatus == "Success"){

      result = json.DisplayText;
      TRANSCRIPTS.setRecordingText(result);

      postTranscript(json.DisplayText)
      console.log(JSON.stringify(json));
      timeout_counter = 0;
      recognize_counter += 1;
      if (recognize_counter == 240){

        errorHandler();
        killMic();

      }

    } else if(json.RecognitionStatus == "InitialSilenceTimeout"){

      timeout_counter += 1;
      recognize_counter += 1;
      console.log('15 seconds silense Timeout');
      console.log('Timeout Counter : '+timeout_counter);
      console.log('Timeout Counter : '+recognize_counter);

      if (timeout_counter == 24){

        errorHandler();

      } else {

        if (TRANSCRIPTS.getRecordingStatus()){ activateMic(); }

      }

    } else {

      console.log('No transcript');
      console.log(JSON.stringify(json));

    }
}

function OnComplete() {
    // startBtn.disabled = false;
    // stopBtn.disabled = true;
}

function activateMic() {
  console.log('activate Mic')
  if (!recognizer) {
      Setup();
  }
  isActive = true;
  if (!TRANSCRIPTS.getRecordingStatus()){ TRANSCRIPTS.toggleRecordhing(); }
  RecognizerStart(SDK, recognizer);
}

function killMic() {
  console.log('kill Mic')
  isActive = false;
  if (TRANSCRIPTS.getRecordingStatus()){ TRANSCRIPTS.toggleRecordhing(); }
  RecognizerStop(SDK, recognizer);
}

function errorHandler() {
  alert("Session Timeout. Please Restart.");
  killMic();
}
