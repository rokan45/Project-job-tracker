console.log("Im connected");
updateTotalCount();

//handle job, interview and rejected page with button
function showItem(id, event) {
    const jobPageElement = document.getElementById('jobs-container');
    const noJobPageElement = document.getElementById('no-jobs-page');

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


//Count and set to total jobs
function updateTotalCount() {
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

//update interview count
function interviewCount(){
    const interviewCount=document.querySelectorAll('.job-card[data-status="interview"]').length;

    const inteviewNum=document.getElementById('total-interview');
    inteviewNum.innerText=interviewCount;
}
//rejected count
function rejectedCount() {
    const display = document.getElementById('total-rejected');
    const count = document.querySelectorAll('.job-card[data-status="rejected"]').length;
    if(display) display.innerText = count;
}

//event listener
document.addEventListener('click', (e) => {
    // Delete Logic
    if (e.target.closest('.trash-btn')) {
        e.target.closest('.job-card').remove();
        updateTotalCount();
        updateInterviewCount();
        updateRejectedCount();
    }

    // Interview Click
    if (e.target.classList.contains('interview-btn')) {
        handleStatusChange(e.target, 'interview');
    }

    // Rejected Click
    if (e.target.classList.contains('rejected-btn')) {
        handleStatusChange(e.target, 'rejected');
    }
});



function handleStatusChange(button, newStatus) {
    const card = button.closest('.job-card');
    const statusLabel = card.querySelector('.status-btn');
    
    // Set data attribute for filtering
    card.setAttribute('data-status', newStatus);

    if (newStatus === 'interview') {
        statusLabel.innerText = "Interview";
        statusLabel.className = "status-btn btn mt-5 w-[120px] h-10 bg-green-600 text-white font-bold border-none";
    } else {
        statusLabel.innerText = "Rejected";
        statusLabel.className = "status-btn btn mt-5 w-[120px] h-10 bg-red-600 text-white font-bold border-none";
    }

    interviewCount();
    rejectedCount();
}
