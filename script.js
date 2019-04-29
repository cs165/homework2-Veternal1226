// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

function checkAnswer(event) {
	statusChange(event.currentTarget);

	let result = getResult();
	if(result) {
		for(const answer of answers) {
			answer.removeEventListener('click', checkAnswer);
		}
		displayResult(result);
    }
}

function statusChange(answerInput){
    //travel whole answer of the input's question
    let questionInputCSS='[data-question-id="'+answerInput.dataset.questionId+'"]';
    let questionAnswer=document.querySelectorAll(questionInputCSS);
    //all answer change to uncheck
    for(const answer of questionAnswer) {
		answer.children[1].src = IMG_UNCHECKED;
		answer.classList.remove('checked');
		answer.classList.add('unchecked');
    }
    //only check input answer
    answerInput.children[1].src = IMG_CHECKED;
    answerInput.classList.remove('unchecked');
    answerInput.classList.add('checked');
    //refresh answer set
    if(answerInput.dataset.questionId==='one') {
		answerSet[0]=answerInput.dataset.choiceId;
    }
    else if(answerInput.dataset.questionId==='two') {
		answerSet[1]=answerInput.dataset.choiceId;
    }
    else if(answerInput.dataset.questionId==='three') {
		answerSet[2]=answerInput.dataset.choiceId;
	}
}

function getResult(){
    /*  only 2==3 will display 2
        other situation will display 1
        e.x. 123>1  121>1   122>2 
    */
    //check all done
    if(answerSet[0] && answerSet[1] && answerSet[2]){
        if(answerSet[1]===answerSet[2])
            return answerSet[1];
        else
            return answerSet[0];
    }
    else
        return null;
}

function displayResult(result){
    //add new section in article
    let container=document.querySelector('article');
    let newSection=document.createElement('section');
    newSection.classList.add('result');
    container.appendChild(newSection);
    //modify result section
	const resultContainer=document.querySelector('.result');
	const resultHeader=document.createElement('h1');
    resultHeader.textContent='You got: '+RESULTS_MAP[result].title;
    resultContainer.appendChild(resultHeader);

	const resultContent=document.createElement('p');
    resultContent.textContent=RESULTS_MAP[result].contents;
    resultContainer.appendChild(resultContent);

	const resultButton=document.createElement('button');
	resultButton.textContent='Restart quiz';
    resultButton.addEventListener('click', restart);
    resultContainer.appendChild(resultButton);
}

function restart(){
    let Container=document.querySelector('article');
    //clear answer set
    for(let i=0; i<3; i++) {
        answerSet[i]=undefined;
    }
    //remove result
    Container.removeChild(Container.lastChild);
    //reset answers
	for(const answer of answers) {
		answer.children[1].src = IMG_UNCHECKED;
		answer.classList.remove('unchecked');
		answer.classList.remove('checked');
		answer.addEventListener('click', checkAnswer);
    }
    //jump to top
    document.querySelector('header').scrollIntoView();
}

let answerSet={};

const IMG_UNCHECKED = 'images/unchecked.png';
const IMG_CHECKED = 'images/checked.png';

const answers = document.querySelectorAll('.choice-grid div');
for(const answer of answers) {
	answer.addEventListener('click', checkAnswer);
}
