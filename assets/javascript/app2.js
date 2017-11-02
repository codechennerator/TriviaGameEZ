var timer = 60;
var intervalId;
var isSubmitted = false;
var selectedAnswers = [];
var checkedAnswers = [];

//You can add any amount of questions!
var questions = [
	{
		question: 'Which insect inspired the term computer bug?',
		answers: ['Moth','Cockroach','Fly','Beetle'],
		correctIndex: 0,
		divToAppend: $('div',{'class':'question'})
	},
	{
		question: 'Who is widely considered the father of computing?',
		answers: ['Albert Einstein','Charles Babbage','John von Neuman','Georg Cantor'],
		correctIndex: 1,
		divToAppend: $('div',{'class':'question'})
	},
	{
		question: 'What does RAM stand for?',
		answers: ['Remote Answering Machine','Rotary Attribute Machine','Random Access Memory','Resource Access Memory'],
		correctIndex: 2,
		divToAppend: $('div',{'class':'question'})
	},
	{
		question: 'What was the first game console?',
		answers: ['Super Nintendo','Atari 2600','Intellivision','Magnavox Odyssey'],
		correctIndex: 3,
		divToAppend: $('div',{'class':'question'})
	},
	{
		question: 'When working in Microsoft Internet Explorer, what is the shortcut to open the window to your favorites?',
		answers: ['Shift-Home','Ctrl-D','Ctrl-B','Ctrl-N'],
		correctIndex: 2,
		divToAppend: $('div',{'class':'question'})
	}

];



	/*------------------ Make Question Divs ----------------*/
	function askQuestions(){
		for (let i = 0; i<questions.length; i++){
			var questDiv = document.createElement('div');
			var headDiv = document.createElement('h3');
			var formDiv = document.createElement('form');
			
			// add class to questDiv
			questDiv.setAttribute('class', 'question');

			// append the trivia question.
			headDiv.innerHTML=questions[i].question;
			questDiv.appendChild(headDiv);

			//Then append the input and label tags for our form.
			for (let j = 0; j<questions[i].answers.length; j++){
				
				var inputDiv = document.createElement('input');
				var labelDiv = document.createElement('label');
				inputDiv.setAttribute('type','radio');
				inputDiv.setAttribute('id', 'q'+ i + 'radio' + j);
				inputDiv.setAttribute('name', 'q' + i,);
				inputDiv.setAttribute('value', j);		
				labelDiv.setAttribute('for', 'q'+ i + 'radio' + j);
				labelDiv.innerHTML = questions[i].answers[j];

				formDiv.appendChild(inputDiv);
				formDiv.appendChild(labelDiv);

			}
			questDiv.appendChild(formDiv);

			//Finally, append our entire question div to our container.
			 var insertQuestDiv = document.getElementById('insertQuestions');
			 insertQuestDiv.appendChild(questDiv);

		}
	}

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
	function getAnswers(){
		for(let i = 0; i<questions.length; i++){
			var selected = $('input[name=' + 'q' + i + ']:checked').val();
			selectedAnswers.push(selected);
		}
	}

	function submit(){
		getAnswers();
		compareAnswers();
		resultsToDiv();
		isSubmitted = true;
	}



	/*-----------------------------------FUNCTIONALITY CALLED BELOW ----------------------------------*/
	
	//Append all the questions that are available.
	askQuestions();

	//Hide Game and result screens.
	$(".game-screen").css('display', 'none');
	$(".result-screen").css('display','none');

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

