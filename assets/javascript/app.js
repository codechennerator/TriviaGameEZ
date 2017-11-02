$(document).ready(function(){

	var questions = [];
	var selectedAnswers = [];
	var checkedAnswers = [];
	var timer = 20;
	var isSubmitted = false;
	var intervalId;

	function Question(triviaQuest, answer0, answer1, answer2, answer3, answerKey){
		this.question = triviaQuest;
		this.answers = [];
		this.answers.push(answer0, answer1, answer2,answer3);
		this.correctIndex = answerKey;
	}

	questions[0] = new Question('Which insect inspired the term computer bug?','Moth','Cockroach','Fly','Beetle',0);
	questions[1] = new Question('Who is widely considered the father of computing?', 'Albert Einstein','Charles Babbage','John von Neuman','Georg Cantor', 1);
	questions[2] = new Question('What does RAM stand for?', 'Remote Answering Machine','Rotary Attribute Machine','Random Access Memory','Resource Access Memory', 2);
	questions[3] = new Question('What was the first game console?', 'Super Nintendo','Atari 2600','Intellivision','Magnavox Odyssey', 3);

	
	/*---------------- TIMER FUNCTIONS----------------------*/
	function stop(){
		clearInterval(intervalId);
	}
	function decrement(){
		timer--;

		$("#timerDiv").text("Time Remaining: " + timer);

		if(timer === 0){
			submit();
			stop();

			$("#timerDiv").text("Times up!");
		}

	}
	function startTimer(){
		intervalId = setInterval(decrement, 1000);
	}

	/*---------------- SCRIPT TO HTML (SHOWING RESULTS)----------------------*/
	


	function showResultsDiv(myArray){
		for (var i = 0; i<myArray.length; i++){
			var pDiv = document.createElement('p');
			pDiv.innerHTML = myArray[i];
			document.getElementById('resultsDiv').appendChild(pDiv);
		}
		$(".result-screen").css('display','block');
		$(".game-screen").css('display','none');
	}

	function resultsToDiv(){
		var str = '';
		var answersArray = [];

		for(let i = 0; i<checkedAnswers.length; i++){
			if(checkedAnswers[i] == true){
				str = "Question " + (i+1) + ": You were correct! ";
			}else{
				str = "Question " + (i+1) + ": You were wrong. The correct answer was " + questions[i].answers[questions[i].correctIndex];
			}
			answersArray.push(str);
		}

		$('#results').text(str);
		showResultsDiv(answersArray);
	}

	/*------------------PROCESSING ANSWERS---------------------*/
	function compareAnswers(){
		for(let i = 0; i<questions.length; i++){
			if(questions[i].correctIndex == selectedAnswers[i]){
				checkedAnswers.push(true);
			}else{
				checkedAnswers.push(false);
			}
		}
	}
	// javascript:: var question = document.querySelector('input[name = gender']:checked).value;
	function getAnswers(){
		var q0 = $('input[name=q0]:checked').val();
		var q1 = $('input[name=q1]:checked').val();
		var q2 = $('input[name=q2]:checked').val();
		var q3 = $('input[name=q3]:checked').val();
		selectedAnswers.push(q0,q1,q2,q3);
	}

	function submit(){
		getAnswers();
		compareAnswers();
		resultsToDiv();
		isSubmitted = true;
	}

	/*-----------------------------------FUNCTIONALITY CALLED BELOW ----------------------------------*/

	//setup board
	$('.question').each(function(i){
		
		if(($(this).attr('value')) == i){
			
			$(this).children('h3').text(questions[i].question);

			$(this).children('form').children('label').each(function(j){
				
				if($(this).attr('value') == j){
					$(this).text(questions[i].answers[j]);
				}
			});
			
		}
	});

	 //hide game and result screens.
	$(".game-screen").css('display', 'none');
	$(".result-screen").css('display','none');

	//Upon clicking start, reveal the game. Hide the start screen Start the timer.
	$("#startDiv").click(function(){
		$(".start-screen").css('display','none');
		$(".game-screen").css('display', 'block');
		//Start timer. It will automatically submit if number hits 0.
		startTimer();
	});

	//function for submit button.
	$('#submit').click(function(){
		if (!isSubmitted){
			submit();
			stop();
		}
	});
	
});