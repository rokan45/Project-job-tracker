console.log("Im connected");
updateCount();

//handle job, interview and rejected page with button
function showItem(id, event) {
    const jobPageElement = document.getElementById("all-jobs");
    const noJobPageElement = document.getElementById("no-jobs-page");

    //hide all
    jobPageElement.classList.add("hidden");
    noJobPageElement.classList.add("hidden");

    //showing item
    const showSelectedItem = document.getElementById(id);
    showSelectedItem.classList.remove("hidden");

    //button event handle
    const allButtons = document.querySelectorAll(".page-btn");

    allButtons.forEach(btn => {
        // reset to default style (Gray text, White background)
        btn.classList.remove("bg-blue-600", "text-white");
        btn.classList.add("bg-white", "text-[#64748B]");
    });

    // Apply Active style to the clicked button
    const clickedBtn = event.currentTarget;
    clickedBtn.classList.remove("bg-white", "text-[#64748B]");
    clickedBtn.classList.add("bg-blue-600", "text-white");

}

//Deletion item: 1st way
// document.getElementById('delete-btn-1st').addEventListener('click', function () {
//     const getelement = document.getElementById('job-description');
//     console.log(`div contianer - ${getelement}`);
//     getelement.remove();

// })


//Count and set to total jobs
function updateCount() {
    //find out how manu available jobs are there
    const allCards = document.querySelectorAll('.job-card');
    let cardNumber = 0;
    for (const card of allCards) {
        cardNumber++;
    }
    console.log(cardNumber);

    //to set cardNumber in available job section
    const Jobs = document.getElementById('total-jobs');
    Jobs.innerText = cardNumber;

}

// delete and update toatal jobs
const deleteButton = document.querySelectorAll('.trash-btn');
deleteButton.forEach(btn => {
    btn.addEventListener('click', function (e) {
        const cardItem = e.currentTarget.closest('.job-card');
        cardItem.remove();

        //recount once again
        updateCount();
    })
})

