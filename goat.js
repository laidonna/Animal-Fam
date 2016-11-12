/*global firebase*/
 /*global $*/
 var config = {
    apiKey: "AIzaSyC4sa5bUPRkMCdrEbZ5x8G_lg5uLuLwroQ",
    authDomain: "chat-app-4d538.firebaseapp.com",
    databaseURL: "https://chat-app-4d538.firebaseio.com",
    storageBucket: "chat-app-4d538.appspot.com",
    messagingSenderId: "895862420876"
};
firebase.initializeApp(config);


var chatData = firebase.database().ref();
var thisChatAnimal = "Goat";


function findKeyword(response){
      var name = thisChatAnimal;
      var text = response;
      chatData.push({name: name, text: text});
      $('#messageInput').val('');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomResponses(){
  var randResponses = ["I goat yo back", 
                      "You goat owned!!", 
                      "Calm yoself down, I goat this.", 
                      "Aint nobody goat time for that. You have goat to be kidding me.", 
                      "swagoat", 
                      "Everybody tryin goat me"];
  var index = getRandomInt(0,randResponses.length-1);
  var rand = randResponses[index];
  return rand;
}


function pushMessage(event){
  if (event.keyCode == 13){
    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    chatData.push({name: name, text: text});
    $('#messageInput').val('');
    var text2 = text.trim();
    if((text2.indexOf('hi') >= 0)
            ||(text2.indexOf('hey') >= 0)
            ||(text2.indexOf('hello') >= 0)
            ||(text2.indexOf('greetings') >= 0)
            ||(text2.indexOf('salutation') >= 0)
            ||(text2.indexOf('address') >= 0)
            ||(text2.indexOf('yo') >= 0)){        
      findKeyword('Who you gonnnna call??? GOATBUSTERS!');
    }else if((text2.indexOf('kill') >= 0)
            ||(text2.indexOf('wow') >= 0)
            ||(text2.indexOf('idc') >= 0)
            ||(text2.indexOf('rude') >= 0)
            ||(text2.indexOf('bored') >= 0)
            ||(text2.indexOf('hell') >= 0)){
      findKeyword('You goat to block out the haters.');
    }else if((text2.indexOf('bye') >= 0)
            ||(text2.indexOf('bb') >= 0)
            ||(text2.indexOf('cya') >= 0)
            ||(text2.indexOf('sup') >= 0)){
      findKeyword('These puns have goatten out of hand!');
    }else if((text2.indexOf('work') >= 0)
            ||(text2.indexOf('fake') >= 0)
            ||(text2.indexOf('fail') >= 0)
            ||(text2.indexOf('stupid') >= 0)
            ||(text2.indexOf('bad') >= 0)
            ||(text2.indexOf('help') >= 0)){
      findKeyword("Ain't nobody goat time for that");
    }else if((text2.indexOf('help') >= 0)
            ||(text2.indexOf('i hate') >= 0)
            ||(text2.indexOf('you suck') >= 0)
            ||(text2.indexOf('why') >= 0)){
      findKeyword(' I ain’t no scapegoat.');
    }
    else{
      findKeyword(randomResponses());
    }
  }
}
$('#messageInput').keypress(pushMessage);
chatData.on("child_added", showMessage);


function showMessage(msg) {
  var message = msg.val();
  var messageSender = message.name;
  var messageContent = message.text;


  var messageEl = $("<div/>").addClass("message");
  var senderEl = $("<span/>").text(messageSender + ": ");
  var contentEl = $("<span/>").text(messageContent);
  
  messageEl.append(senderEl);
  messageEl.append(contentEl);
  $('#messages').append(messageEl);
}
