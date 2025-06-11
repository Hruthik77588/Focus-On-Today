const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressLabel = document.querySelector(".progress-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const downquote=document.querySelector(".quote")

const allQuote = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals",
];

const dquote=[
  '“Move one step ahead, today!”',
  '“Keep Going, You’re making great progress!”',
  '" you are great"',
  '"come again tomorrow"',
]


const allGoals = JSON.parse(localStorage.getItem("allGoal")) || {
  // first:{
  //   name:'',
  //   completed:false
  // },
  //  second:{
  //   name:'',
  //   completed:false
  // },
  //  third:{
  //   name:'',
  //   completed:false
  // }
};

let completedGoalscount = Object.values(allGoals).filter(
  (gaol) => gaol.completed
).length; //it updates the completed goal count

progressValue.style.width = `${(completedGoalscount / inputFields.length) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalscount}/${ inputFields.length} Completed`;
progressLabel.innerText=allQuote[completedGoalscount]
downquote.innerText=dquote[completedGoalscount]

//checkbox working
checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalAdded = [...inputFields].every((input) => {
      return input.value;
    });
    if (allGoalAdded) {
      checkbox.parentElement.classList.toggle("completed");

      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed; //to set the completed state is true or false
      completedGoalscount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length; //it updates the completed goal count

      progressValue.style.width = `${(completedGoalscount /  inputFields.length) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalscount}/${ inputFields.length} Completed`;
      progressLabel.innerText=allQuote[completedGoalscount]
      downquote.innerText=dquote[completedGoalscount]

      localStorage.setItem("allGoal", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});
// input Field working
inputFields.forEach((input) => {

  if(allGoals[input.id]){
    input.value = allGoals[input.id].name; //to display input text from localstorage

      if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
  }
  
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if ( allGoals[input.id] && allGoals[input.id].completed) {
      e.target.value = allGoals[input.id].name; //to prevent user from overwriting their goals
      return;
    }
    if(allGoals[input.id]) 
    {
      allGoals[input.id].name=input.value //if its already existing then update it
    }
      else{
    allGoals[input.id]={    //if there is empty object  then the input text will be blank
       name: input.value,
      completed: false,
    } 
    };
    localStorage.setItem("allGoal", JSON.stringify(allGoals));
  });
});
