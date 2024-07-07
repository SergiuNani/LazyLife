
var allButtons = document.querySelectorAll(".button")

console.log(
    allButtons.length
)

allButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        console.log(`Button ${index + 1} was clicked`)
    })
})

TextAreaId = document.getElementById("TextAreaId")
TextAreaId.addEventListener("keydown", (event) => {


    if (event.key == "Enter") {
        TextAreaId.value = "BRAVO SEFFFF"
    }
})
