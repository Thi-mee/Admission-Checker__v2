// Admission Checker for Nihel University


const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const states = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
    "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
    "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa",
    "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
    "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
    "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];
const genders = ["Male", "Female"]
const subjects = ['Physics', "Chemistry", "Biology", "Commerce", "Accounting", "Economics", "History", "Government"]
const grades = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9']


let examination = {

    errorMessage: "",

    personalDetails: {
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        dateOfBirth: "",
        gender: 0,
        dateOfBirth: "",
        stateOfOrigin: "",
        verify: function(){
            this.firstName = document.getElementById('fname').value
            if (!(this.firstName?.length > 3)) {
                examination.errorMessage = "Input a valid First Name";
                return 0;
            }
            this.lastName = document.getElementById('lname').value
            if (!(this.lastName?.length > 3)) {
                examination.errorMessage = "Input a valid Last Name";
                return 0;
            }
            this.email = document.getElementById('email').value
            if (!emailRegex.test(this.email)) {
                examination.errorMessage = "Input a valid Email Address";
                return 0;
            }
            this.mobileNo = document.getElementById('mobileNo').value;
            if (this.mobileNo.length !== 11) {
                examination.errorMessage = "Input a valid mobile Number";
                return 0;
            }
            this.dateOfBirth = document.getElementById('DOB').value;
            if (!this.dateOfBirth) {
                examination.errorMessage = "input valid date";
                return 0;
            }
            let age = (new Date().getFullYear()) - (new Date(this.dateOfBirth).getFullYear())
            if (age < 16) {
                examination.errorMessage = "age should be 16 and greater";
                return 0;
            }
            gender = document.getElementById('gender').value;
            if (gender == '0') {
                examination.errorMessage = "You have to choose a gender";
                return 0;
            }
            this.gender = Number(gender)
            let stateOfOrigin = document.getElementById('SOO').value;
            if (stateOfOrigin == '0') {
                examination.errorMessage = "You have to choose a State of Origin";
                return 0;
            }
            this.stateOfOrigin = states[Number(stateOfOrigin) - 1]

            examination.errorMessage = "";
            return 1;
        }
    },

    preValuation: {
        jambScore: 0,
        postJambScore: 0,
        grrr: 9,
        verify: function () {
            let jambScore = document.getElementById('jambScore').value
            if (!jambScore || isNaN(Number(jambScore))) {
                examination.errorMessage = "Please, Input a valid Jamb Score"
                return 0
            }
            let postJambScore = document.getElementById('postJambScore').value
            if (!postJambScore || isNaN(Number(postJambScore))) {
                examination.errorMessage = "Please, Input a valid post Jamb Score"
                return 0
            }
            if (Number(jambScore) < 0 || Number(jambScore) > 400) {
                examination.errorMessage = "Invalid Score: Jamb Score must be between 0 and 400"
                return 0
            }
            if (Number(postJambScore) < 0 || Number(postJambScore) > 20) {
                examination.errorMessage = "Invalid Score: Post Jamb Score must be between 0 and 20"
                return 0
            }
            this.jambScore = Number(jambScore)
            this.postJambScore = Number(postJambScore)
            examination.errorMessage = ""
            return 1
        }
    },

    oLevelResults: {
        mathsScore: 0,
        englishScore: 0,
        subOneId: 0,
        subOneScore: 0,
        subTwoId: 0,
        subTwoScore: 0,
        subThreeId: 0,
        subThreeScore: 0,
        verify: function () {
            this.mathsScore = document.getElementById('mathGrade').value
            if (this.mathsScore === '-1'){
                examination.errorMessage = "Select Grade for Maths"
                return 0
            }
            this.mathsScore = Number(this.mathsScore)
            this.englishScore = document.getElementById('englishGrade').value
            if (this.englishScore === '-1'){
                examination.errorMessage = "Select Grade for English"
                return 0
            }
            this.englishScore = Number(this.englishScore)
            this.subOneId = document.getElementById('sub1').value
            if (this.subOneId === '0'){
                examination.errorMessage = "Select third subject"
                return 0
            }
            this.subOneScore = document.getElementById('gradeSub1').value
            if (this.subOneScore === '-1'){
                examination.errorMessage = "Select Grade for third subject"
                return 0
            }
            this.subOneScore = Number(this.subOneScore)
            this.subTwoId = document.getElementById('sub2').value
            if (this.subTwoId === '0'){
                examination.errorMessage = "Select fourth subject"
                return 0
            }
            this.subTwoScore = document.getElementById('gradeSub2').value
            if (this.subTwoScore === '-1'){
                examination.errorMessage = "Select Grade for fourth subject"
                return 0
            }
            this.subTwoScore = Number(this.subTwoScore)
            this.subThreeId = document.getElementById('sub3').value
            if (this.subThreeId === '0') {
                examination.errorMessage = "Select fifth subject"
                return 0
            }
            this.subThreeScore = document.getElementById('gradeSub3').value
            if (this.subThreeScore === '-1'){
                examination.errorMessage = "Select Grade for fifth subject"
                return 0;
            }
            this.subThreeScore = Number(this.subThreeScore)

            examination.errorMessage = ""
            return 1;
        }
    },

    verify: function () {
        let totalOLevelScore = this.oLevelResults.mathsScore + this.oLevelResults.englishScore + this.oLevelResults.subOneScore + this.oLevelResults.subTwoScore + this.oLevelResults.subThreeScore;
        
        let totalScore = this.preValuation.postJambScore + (totalOLevelScore/50)*30 + (this.preValuation.jambScore)/8

        if (totalScore >= 80 && totalScore <= 100){
            return "You passed on merit"
        }
        if (totalScore >= 75){
            return "You passed for concensionary score"
        }
        if (totalScore >= 65 && ["Ogun", "Lagos", "Osun", "Oyo", "Niger", "Ondo", "Ekiti"].includes(this.personalDetails.stateOfOrigin)){
            return "You're qualified for catchment"
        }
        if (totalScore >= 60){
            return "You qualified for vc list"
        }
        else
            return "You Don't meet the requirements"
    }
}


window.addEventListener('DOMContentLoaded', () => {

    // dropdown for state of origin
    let dropdown = document.getElementById("SOO");
    dropdown.innerHTML = `<option value="0" disabled selected>-- please select --</option>`
    states.forEach((state, index) => {
        dropdown.innerHTML += `<option value=${index + 1}>${state}</option>`
    })

    // dropdown for gender
    dropdown = document.getElementById('gender');
    dropdown.innerHTML = `<option value="0"  disabled selected>-- please select --</option>`
    genders.forEach((gender, index) => {
        dropdown.innerHTML += `<option value=${index + 1}>${gender}</option>`
    })

    // dropdown for subjects
    let dropdowns = document.querySelectorAll(".form-latter .subjs")
    dropdowns.forEach((dropdown) => {
        dropdown.innerHTML = `<option value="0" disabled selected>-- please select --</option>`
        subjects.forEach((subject, index) => {
            dropdown.innerHTML += `<option value=${index + 1}>${subject}</option>`
        })
    })

    // Dropdown for grades
    dropdowns = document.querySelectorAll(".form-latter .grds")
    dropdowns.forEach(dropdown => {
        let i = 10;
        dropdown.innerHTML = `<option value="-1" disabled selected>-- please select --</option>`
        grades.forEach((grade, index) => {
            if (index === grades.length -1){
                return  dropdown.innerHTML += `<option value=0>${grade}</option>`
            }
            dropdown.innerHTML += `<option value=${i--}>${grade}</option>`
        })
    })
})



let formIndex = 0
document.getElementById('nextBtn').addEventListener('click', () => {
    if (formIndex == 0) {
        if (!examination.personalDetails.verify()) {
            document.getElementById('error-display').innerText = examination.errorMessage
            document.getElementById('error-display').classList.remove('hide')
        }
        else {
            document.getElementById('error-display').classList.add  ('hide')
            document.getElementById('form-init').classList.toggle("hide");
            document.getElementById('form-mid').classList.toggle("hide");
            document.getElementById('sectionHeading').innerText = "Pre Valuation details"
            formIndex = 1;
        }
    }
    else if (formIndex == 1) {
        if (!examination.preValuation.verify()) {
            document.getElementById('error-display').classList.remove('hide')
            document.getElementById('error-display').innerText = examination.errorMessage
        }
        else {
            document.getElementById('error-display').classList.add('hide')
            document.getElementById('form-mid').classList.toggle("hide");
            document.getElementById('form-latter').classList.toggle("hide");
            document.getElementById('sectionHeading').innerText = "O level Results"
            formIndex = 2;
        }
    }
    else if (formIndex == 2) {
        if (!examination.oLevelResults.verify()) {
            document.getElementById('error-display').classList.remove('hide')
            document.getElementById('error-display').innerText = examination.errorMessage
        }
        else{
            document.getElementById('error-display').classList.add('hide')
            document.getElementById('display').classList.remove('hide')
            document.getElementById('res').innerText = examination.verify();
        }
    }
})




function refresh(){
    location.reload()
}
























// let subjectsDropdowns = document.querySelectorAll("#form-latter .subjs")
// let selectedSubjects = {}
// let occupiedSelectIndexes = []

// subjectsDropdowns.forEach((dropdown, index) => {
    
//     dropdown.addEventListener('change', (e) => {

//         if (!occupiedSelectIndexes.includes(index)){ // if index not in occupiedSelectIndexes...
//             occupiedSelectIndexes.push(index); // add index to occupiedSelectIndexes
//         }

//         selectedSubjects[index] = subjects[dropdown.value - 1] // add subject at that index in selectedSubjects
        

//         let newSubjects = []
//         let selectedSubjectValues = Object.values(selectedSubjects)
//         for (const subject of subjects) {

//             if (!selectedSubjectValues.includes(subject)){
//                 newSubjects.push(subject)
//             }

//         }
//         repopulateSubjects(newSubjects, occupiedSelectIndexes)
//     })
// })

// function repopulateSubjects(newSubjects, occupiedIndexes){
//     subjectsDropdowns.forEach((dropdown, i) => {
//         if (!occupiedIndexes.includes(i)) {
//             console.log(dropdown, i)
//             dropdown.innerHTML = `<option value="0">-- please select --</option>`
//             newSubjects.forEach((subject, index) => {
//                 dropdown.innerHTML += `<option value=${index + 1}>${subject}</option>`
//             })
//         }
//     })
// }