
/****************************
 * GET ALL NECESSARY ELEMENTS
 ****************************/

console.log("Hello world")

const d = new Date()
var h = document.getElementById('h')

var tb = document.getElementById('tb')
var i = 0 //blanket index variable
var tdata

var cf = []

/**********************************
 *  WRITE THE DATE INTO THE HEADER
 *********************************/

h.innerHTML = d

/*******************
 * FILL IN THE TIMES
 *******************/

for (i = 0; i < 17; i++) {
    let cr = tb.appendChild(document.createElement('tr'))
    cr.classList.add('row')
}

let row = document.getElementsByClassName('row');

for (i = 0; i < 17; i++) {
    time = row[i].appendChild(document.createElement('td'))
    time.innerHTML = i + 7 + ":00"
}

for (i = 0; i < 17; i++) {
    plan = row[i].appendChild(document.createElement('td'))
    plan.classList.add('pd')
    plan.innerHTML = " "
}

let planData = document.getElementsByClassName('pd')

/*******************************
 * FILL IN THE FULL CELLS ARRAY
 ******************************/

for (i = 0; i < 17; i++) {
    cf[i] = false
}

/**********************************
 * FUNCTION TO ADD TASKS OR EVENTS
 *********************************/

function addTE(startid, endid, nameid, taskEvent) {
    let startin = document.getElementById(startid)
    let endin = document.getElementById(endid)
    let namein = document.getElementById(nameid)

    let starttime = Number(startin.value)
    let endtime = Number(endin.value)
    let name = namein.value

    if (starttime < 7 || starttime > 23 || starttime === null) {
        alert("Invalid start time.")
    }

    else if (endtime < 7 || endtime > 23 || endtime <= starttime || endtime === null) {
        alert("Invalid end time.")
        console.log(endtime <= starttime)
        console.log(starttime)
        console.log(endtime)
    }

    else if (name === null) {
        alert("Please give your " + taskEvent + " a name.")
    }

    else {

        for (i = starttime; i < endtime; i++) {
            if (cf[i - 7]) {
                alert("There is already a task or event there. Please remove it first.")
                return
            }
        }

        for (i = starttime; i < endtime; i++) {
            planData[i - 7].innerHTML = name
            cf[i - 7] = true

            db = document.createElement('button')
            planData[i - 7].appendChild(db)
            db.classList.add('db')
            db.innerHTML = 'Delete'
            db.addEventListener('click', () => {
                delTE(starttime, endtime)
            })
        }

    }
}

/*************************
 * REMOVE A TASK OR EVENT
 ***********************/

function delTE(start, end) {
    const response = confirm("Are you sure you want to delete this task or event?")
    if (response === false) {
        return 
    }
    for (i = start; i < end; i++) {
        planData[i - 7].innerHTML = " "
        cf[i - 7] = false
    }
}