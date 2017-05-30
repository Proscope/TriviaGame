$(document).ready(function(){
var correct = 0;
var incorrect = 0;
$("#right").text(correct);
$("#wrong").text(incorrect);

var firstQuestion = 
{
	'questionNumber': 1,
	'timeRemaining': 20,
	'questionScript': "Which destiny character can use a Golden Gun",
	'potentialAnswers':
	[
	'Titan',
	'Hunter',
	'Warlock',
	'Pole Dancer'
		],
	"correctAnswer":'Hunter',
	
	'imageGif':"https://media.giphy.com/media/UrfMvc9uxse4w/giphy.gif",
}
var secondQuestion = 
{
	'questionNumber': 2,
	'timeRemaining': 20,
	'questionScript': "Which hand cannon does damage over time due to the powers of the Darkness?",
	'potentialAnswers':
	[
	'Palindrome',
	'Eyesluna',
	'Thorn',
	'The Last Word'
	],
	"correctAnswer":'Thorn',
	
	'imageGif':"https://media.giphy.com/media/13KAjhkQKfxRBe/giphy.gif",
}
var thirdQuestion = 
	{
	'questionNumber': '3',
	'timeRemaining': 20,
	'questionScript': "Who is the hunter Vanguard rep in the Tower?",
	'potentialAnswers':
	[
		'Cayde-6',
		'Amanda Holliday',
		'Zavala',
		'Lord Shaxx'
	],
	"correctAnswer":'Cayde-6',
	'imageGif':'https://media.giphy.com/media/J1R8nhmVY8Ata/giphy.gif',
}
var forthQuestion= 
	{
	'questionNumber': '4',
	'timeRemaining': 20,
	'questionScript': "Who is the raid boss for the Kings Fall Raid?",
	'potentialAnswers':
	[
		'Crota',
		'Atheon',
		'Aksis',
		'Oryx'
	],
	"correctAnswer":'Oryx',
	'imageGif':"https://media.giphy.com/media/hi4lrRZ8YLnaM/giphy.gif",

	}
var fifthQuestion = 
{
	'questionNumber': '5',
	'timeRemaining': 20,
	'questionScript': "Which is a super of a Titan?",
	'potentialAnswers':
	[
		'Bladedancer',
		'Voidwalker',
		'Striker',
		'Nightstalker'
	],
	"correctAnswer":'Striker',
		'imageGif':"https://media.giphy.com/media/8oMcJ5rv57dXa/giphy.gif",

	}
var myArray = [firstQuestion, secondQuestion, thirdQuestion,forthQuestion, fifthQuestion];
console.log(myArray.length);
console.log(myArray[2]);
//Set the question to an var that can go anywhere.  Make an function that will adjus the falue of this array. 
var question;
var answer; 
var userInput;
// counter for round Timer  
var counter = 20; 
//global interval ID
var intervalID;
//add my quote to my page every time 
function displayQuestion(){
	console.log(true);
	var startDiv = $('<div>');
		//first adjust the button 
		startDiv.html(function(n){
			return "<h1> "+question.questionScript +"</h1>";
		})
		console.log(question.questionScript);
		startDiv.addClass('col-lg-12 marker');
		$('#start').append(startDiv);
		

}
function render(){
	var startDiv = $('#start');
		//first adjust the button 
		startDiv.html(
			"<h1> "+question.questionScript +"</h1>"
		);
	var length = (question.potentialAnswers.length);

	for (var i = 0; i < length ; i++){
					var btn = $("<button>");
					btn.addClass('col-lg-6  temp btn-primary question'+ i);
					btn.attr('data-let', question.potentialAnswers[i]);
					btn.html(question.potentialAnswers[i]);
					$("#start").append(btn);
		}
}// Close Render
//addVideo takes information object Video URL and turns it into a new video 
function changeQuestion(){
	if(myArray.length >0){
		console.log(myArray.length);
		var number = Math.floor(Math.random() * myArray.length);
		question = myArray[number];
		myArray.splice(number, 1);
		console.log(number.length);
		console.log(myArray[number]);
	
		return question;
	}else{
		alert( "The game is over!");
	}
	
}

function displayTimeRunsOut(){
		$('#start').empty();
		displayQuestion(question);
}
function displayImage(){
	var gifUrl = question.imageGif;
	console.log(gifUrl);
	var image = $("<img>");
	image.addClass('img-responsive image')
	image.attr('src', gifUrl);
	$('.marker').append(image);

}
function displayWrongAnswer(){
	var div = $("<div>");
	div.addClass("col-lg-12");
	div.html('<h2>' + userInput + " is incorrect! The correctAnswer was " + answer + "! </h2>");
	$('.image').append(div);

	setTimeout(nextQuestion, 8000);

}
function nextQuestion (){
	//call change question to pick a new question
	$('#start').empty();
	changeQuestion();
	//call render to render that question 
	render();

}


	$('#startGame').on('click',function(){
		// the the question for this round 
		question = changeQuestion();
		console.log(question);
		displayQuestion(question);
		render(question);
		//Set and display game 
		intervalID = setInterval(function(){
			//reduce counter 
			counter --; 
			//display new counter value 
			$('#timer').html("<h2>" + counter +" </h2>");
			// if = user inform user that they have lost and call a function that will pick a new question. 
			if(counter === 0 ){
				console.log('clearing interval', intervalID);
				displayTimeRunsOut();
				clearInterval(intervalID);
			}
		}, 1000)
		console.log('on start', intervalID);

	})//close Click

	$(document).on('click',".temp", function(){

		// Hold empty timer area
		console.log(question.questionScript);
		$('#timer').html('');
		// clear the timer 
		clearInterval(intervalID);
		//Hold the correct answer
		answer = question.correctAnswer;
		console.log(answer + " answer");
		//Hold the users Answer
		userInput	= $(this).data("let");
		console.log(userInput);
		// Empty the Start Div 
		$('#start').empty();

		displayQuestion(question);
		
		// Set image.  not dependent on correct answer 
		// Sets the text informing the player whether they have won or lost 
		console.log(userInput);
		console.log(userInput === answer);
		console.log(answer);
		if (userInput === answer){
			displayImage();

			console.log("got here");
			var div = $("<div>");
			div.addClass("col-lg-12");
			console.log(answer);
			div.html('<h2>'+answer + " is correct! you have won this round.</h2>");
			console.log(div);
			$("#start").append(div); 
			setTimeout(nextQuestion, 8000);

		}
		else{
			displayImage();
			displayWrongAnswer();
			console.log('wrong');
			
			}

		//Will empty the Temp
		})// close 	

	
})
