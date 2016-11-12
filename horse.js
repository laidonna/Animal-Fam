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
var thisChatAnimal = "Horse";


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
  var randResponses = ["I can just wing it!", 
                      "Don’t worry! You are my mane ;)", 
                      "Are you feeling ok? You’re voice is quite horse o.O", 
                      "You whinny some and you lose some.", 
                      "I herd you were having a hard time :/", 
                      "Get off your high horse!! And get to work :)",
                      "Days like this can really stirrup the emotions. Well, it won’t be there furlong.", 
                      "Must be a stable population.", 
                      "Come and horse around.", 
                      "Common mate, I’ll bale you out of studying.",
                      "You’re never pasture prime.",  
                      "The stuff night mares are made of!", 
                      "It’s a personality defect; he mustang out with the wrong people.",
                      "You will always rein king of the puns (I know).",  
                      "These contests really stirrup the emotions.", 
                      "Your non existent beard is nice and horse."];
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


    if ((text2.indexOf('bye') >= 0)
            ||(text2.indexOf('bb') >= 0)
            ||(text2.indexOf('cya') >= 0)
            ||(text2.indexOf('sup') >= 0)){   
      findKeyword('The mustang out with the wrong people.');
    }else if((text2.indexOf('hi') >= 0)
            ||(text2.indexOf('hey') >= 0)
            ||(text2.indexOf('hello') >= 0)
            ||(text2.indexOf('greetings') >= 0)
            ||(text2.indexOf('salutation') >= 0)
            ||(text2.indexOf('address') >= 0)
            ||(text2.indexOf('yo') >= 0)){   
      findKeyword('Your non-existent beard is nice and horse.');
    }
      else if((text2.indexOf('stress') >= 0)
            ||(text2.indexOf('life is hard') >= 0)
            ||(text2.indexOf('study') >= 0)){   
      findKeyword('Common mate, i’ll bale you out of studying.');
    }
    else if((text2.indexOf('sick') >= 0)
            ||(text2.indexOf('tired') >= 0)
            ||(text2.indexOf('fml') >= 0)
            ||(text2.indexOf('leave me alone') >= 0)
            ||(text2.indexOf('why is life so hard') >= 0)
            ||(text2.indexOf('kill me now') >= 0)){   
      findKeyword('You’re never pasture prime. The stuff night mares are made of.');
    }else{
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
