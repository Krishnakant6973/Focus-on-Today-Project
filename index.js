const allQuotes = [
    'Raise the bar by completing your goals',
    'Well begun is half done!',
    'Just a step away ,keep going!',
    'Whoa! you just completed all the goals ,time for chill'
]

let allGoals = JSON.parse(localStorage.getItem("allGoal")) || {}
const errorLabel = document.querySelector(".error-label")
const addBtn = document.querySelector(".add-btn")
const appreciateText = document.querySelector(".appreciate-text")
const progressValue = document.querySelector(".progress-value")
const goalContainer = document.querySelector(".goal-container")
let goalParentContainer = document.querySelector(".goal-parent-container")
let allCheckbox;
let allInputFields;
let totalGoal;
let completedGoalCount;
let goalProgress;
let goalCounter = 2;

if (Object.keys(allGoals).length > 1) {
    for (let i = 0; i < Object.keys(allGoals).length; i++) {
        if (Object.keys(allGoals)[i] == "goal-1") {
            continue
        }
        else {
            goalParentContainer.insertAdjacentHTML("beforeend",
                `               <div class="goal-container ">
                    <div class="checkbox ">
                        <img class="check-icon" src="./Images/Vector 1.svg">
                    </div>
                    <input type="text" class="input-field " name="" id=${Object.keys(allGoals)[i]} placeholder="Add new goal...">
                    <div class="cut-btn">
                    <span>&times;</span>
                </div>
                </div>
                `
            )
            goalCounter++
        }
    }
}

const dependentCode = function () {

    allCheckbox = document.querySelectorAll(".checkbox")
    allInputFields = document.querySelectorAll(".input-field")
    totalGoal = allCheckbox.length
    completedGoalCount = Object.values(allGoals).filter((value) => value.completed).length

    progressValue.firstElementChild.innerText = `${Math.floor(completedGoalCount / totalGoal * 100)}% Completed`
    progressValue.style.width = `${completedGoalCount / totalGoal * 100}%`
    goalProgress = completedGoalCount / totalGoal * 100;
    if (goalProgress == 100) {
        appreciateText.firstElementChild.innerText = allQuotes[3]
    }
    else if (goalProgress >= 50) {
        appreciateText.firstElementChild.innerText = allQuotes[1]
    }
    else if (goalProgress > 10) {
        appreciateText.firstElementChild.innerText = allQuotes[2]
    }
    else {
        appreciateText.firstElementChild.innerText = allQuotes[0]
    }
    if (goalProgress < 100) {
        errorLabel.classList.add("show-error")
    }

    allInputFields.forEach((input) => {

        if (allGoals[input.id]?.name) {
            input.value = allGoals[input.id].name
        }

        if (allGoals[input.id]?.completed) {
            input.parentElement.classList.add("completed")
        }

    })

}
dependentCode()

goalParentContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("checkbox") || e.target.parentElement.classList.contains("checkbox")) {
        e.stopPropagation()
        let updatedTarget = e.target
        if (e.target.parentElement.classList.contains("checkbox")) {
            updatedTarget = e.target.parentElement
        }
        const allGoalsAdded = [...allInputFields].every((input) => {
            return input.value;
        })
        if (allGoalsAdded) {
            updatedTarget.parentElement.classList.toggle("completed")
            allGoals[updatedTarget.nextElementSibling.id].completed = !allGoals[updatedTarget.nextElementSibling.id].completed
            localStorage.setItem("allGoal", JSON.stringify(allGoals))
            completedGoalCount = Object.values(allGoals).filter((value) => value.completed).length
            progressValue.firstElementChild.innerText = `${Math.floor(completedGoalCount / totalGoal * 100)}% Completed`
            progressValue.style.width = `${completedGoalCount / totalGoal * 100}%`

            goalProgress = completedGoalCount / totalGoal * 100;
            if (goalProgress == 100) {
                appreciateText.firstElementChild.innerText = allQuotes[3]
            }
            else if (goalProgress >= 50) {
                appreciateText.firstElementChild.innerText = allQuotes[1]
            }
            else if (goalProgress > 10) {
                appreciateText.firstElementChild.innerText = allQuotes[2]
            }
            else {
                appreciateText.firstElementChild.innerText = allQuotes[0]
            }
        }
        else {
            errorLabel.classList.add("show-error")
        }
        if (goalProgress < 100) {
            errorLabel.classList.add("show-error")
        }
        else {
            errorLabel.classList.remove("show-error")
        }

    }
    else {
        return
    }

})

goalParentContainer.addEventListener("input", (e) => {
    if (e.target.classList.contains("input-field")) {
        e.stopPropagation()
        if (allGoals[e.target.id]?.completed) {
            e.target.value = e.target.value = allGoals[e.target.id].name
            return
        }
        allGoals[e.target.id] = {
            name: e.target.value,
            completed: false
        }
        localStorage.setItem("allGoal", JSON.stringify(allGoals))
    }
    else {
        return
    }
})

goalParentContainer.addEventListener("focusin", (e) => {
    if (e.target.classList.contains("input-field")) {
        e.stopPropagation()
        errorLabel.classList.remove("show-error")
    }
    else {
        return
    }
})

goalParentContainer.addEventListener("focusout", (e) => {
    if (goalProgress < 100) {
        errorLabel.classList.add("show-error")
    }
    else {
        errorLabel.classList.remove("show-error")
    }
})

addBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn")) {
        e.stopPropagation()
        goalParentContainer.insertAdjacentHTML("beforeend",
            `               <div class="goal-container ">
                        <div class="checkbox ">
                            <img class="check-icon" src="./Images/Vector 1.svg">
                        </div>
                        <input type="text" class="input-field " name="" id="goal-${goalCounter}" placeholder="Add new goal...">
                         <div class="cut-btn">
                        <span>&times;</span>
                    </div>
                    </div>
                   `
        )
        goalCounter++
        dependentCode()

    }
    else {
        return
    }

})

goalParentContainer.addEventListener("click", (e) => {
    if (e.target.parentElement.classList.contains("cut-btn")) {
        console.log("cut-btn handler ", e.target)
        e.stopPropagation()
        if (document.querySelectorAll(".goal-container").length > 1 && !(e.target.parentElement.previousElementSibling.id == "goal-1") && !allGoals[e.target.parentElement.previousElementSibling.id].completed) {
            const storedData = JSON.parse(localStorage.getItem("allGoal"))
            id = e.target.parentElement.previousElementSibling.id
            delete storedData[id]
            localStorage.removeItem("allGoal")
            console.log(localStorage)
            localStorage.setItem("allGoal", JSON.stringify(storedData))
            allGoals = JSON.parse(localStorage.getItem("allGoal")) || {}
            e.target.parentElement.parentElement.remove()
            dependentCode()
        }
    }
    else {
        return
    }
})
