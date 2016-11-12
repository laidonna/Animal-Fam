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
var thisChatAnimal = "Cow";


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
  var randResponses = ["Deja Moo", 
                      "You are udder chaos", 
                      "My favorite subject is Cow-culus. Wbu?", 
                      "You’re not listening. Info goes in one ear, and out the udder!", 
                      "Baby cows go to lunch in the calf-ateria", 
                      "My favorite city is Moo-York",
                      "I’m udderly confused!", 
                      "Cow puns are moo-sic to my ears.",
                      "I like my coffee decalfinated",
                      "That’s offal",
                      "It’s time to moo-ve on",
                      "Well.. at least you’re not like that cow who walked into the street without looking for cars. He didn’t know his life was at steak."];
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


    if (text2.indexOf('trump') >= 0 ){
      findKeyword('Moo-ve to Canada');
    }else if(text2.indexOf('unicorn') >= 0){
      findKeyword('Those are not real');
    }else if((text2.indexOf('hi') >= 0)
            ||(text2.indexOf('hey') >= 0)
            ||(text2.indexOf('hello') >= 0)
            ||(text2.indexOf('greetings') >= 0)
            ||(text2.indexOf('salutation') >= 0)
            ||(text2.indexOf('address') >= 0)
            ||(text2.indexOf('yo') >= 0)){
      findKeyword('Moo there!! *cow greets you*');
    }else if(text2.indexOf('bye') >= 0 
            ||(text2.indexOf('bb') >= 0)){
      findKeyword('Have a nice moo day!');
    }else if(text2.indexOf('again') >= 0){
      findKeyword("deja moo");
    }else if(text2.indexOf('math') >= 0){
      findKeyword("baby cows go to lunch in the calf-ateria");
    }else if(text2.indexOf('travel') >= 0){
      findKeyword("Moo-York");
    }else if(text2.indexOf('coffee') >= 0){
      findKeyword("I like my coffee decalfinated!");
    }else if((text2.indexOf('awesome') >= 0)
            ||(text2.indexOf('spectacular')>=0)
            ||(text2.indexOf('great') >= 0)
            ||(text2.indexOf('wonderful')>=0)
            ||(text2.indexOf('good')>= 0)
            ||(text2.indexOf('nice')>= 0)
            ||(text2.indexOf('af')>=0)){
      findKeyword("That's moo-gnificent");
    }else if((text2.indexOf('ugly') >= 0)
            ||(text2.indexOf('bad')>=0)
            ||(text2.indexOf('tired')>=0)
            ||(text2.indexOf('gross'))>=0){
      findKeyword("That's terrible! Be more moo-gnificent like me!!");
    }else if((text2.indexOf('fail') >= 0)
            ||(text2.indexOf('failing')>=0)
            ||(text2.indexOf('dumb')>=0)
            ||(text2.indexOf('stupid')>=0)
            ||(text2.indexOf('help')>=0)
            ||(text2.indexOf('dying')>=0)
            ||(text2.indexOf('bad')>=0)
            ||(text2.indexOf('suck')>=0)
            ||(text2.indexOf('doomed')>=0)){
      findKeyword("Just keep moo-ving.");
    }else if((text2.indexOf('beautiful') >= 0)
            ||(text2.indexOf('pretty'))>=0){
      findKeyword("S-mooch *cow licks you*");
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