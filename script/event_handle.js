console.log("Im connected");
let currentFilter = 'all';

//Count and set to total jobs
function updateJobCount() {
    //total available job count
        const allCards = document.querySelectorAll('.job-card');
        let cardNumber = 0;
        for (const card of allCards) {
            cardNumber++;
        }
        console.log(cardNumber);

        const Jobs = document.getElementById('total-jobs');
        if (Jobs) {
            Jobs.innerText = cardNumber;
        }

    //update interview count
     const interviewCount = document.querySelectorAll('.job-card[data-status="interview"]').length;

        const inteviewNum = document.getElementById('total-interview');
        if (inteviewNum) {
            inteviewNum.innerText = interviewCount;
        }

    //rejected count
    const display = document.getElementById('total-rejected');
        const count = document.querySelectorAll('.job-card[data-status="rejected"]').length;
        if (display) {
            display.innerText = count;
        }
}


//handle job, interview and rejected page by filtering
function showItem(filterType, event) {
    currentFilter = filterType; // pass all filterr
    const allJobCards = document.querySelectorAll('.job-card');
    let JobCount = 0;

    // show/hide them based on the filtertype
    allJobCards.forEach(card => {
        const status = card.getAttribute('data-status'); //current status
        if (filterType === 'all' || status === filterType) {
            card.classList.remove('hidden'); 
            JobCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    
    const noJobsPage = document.getElementById('no-jobs-page');
    const jobsContainer = document.getElementById('jobs-container');

    if (JobCount === 0) {
        noJobsPage.classList.remove('hidden'); 
        jobsContainer.classList.add('hidden'); // Hide the main jobs container
    } else {
        noJobsPage.classList.add('hidden');
        jobsContainer.classList.remove('hidden'); // Show the main jobs container
    }

    // Update the count on available job section
    const availableJobsSpan = document.querySelector('.available-jobs');
    if (availableJobsSpan) {
        availableJobsSpan.innerText = JobCount;
    }

    // job button active state styles
    const allButtons = document.querySelectorAll(".page-btn");
    allButtons.forEach(btn => {
        btn.classList.remove("bg-blue-600", "text-white");
        btn.classList.add("bg-white", "text-[#64748B]");
    });

    // Apply active style to the clicked button
    let clickedBtn = event ? event.currentTarget : null;
    if (!clickedBtn) {
        if (filterType === 'all') clickedBtn = document.getElementById('all-btn');
        else if (filterType === 'interview') clickedBtn = document.getElementById('Interview-btn');
        else if (filterType === 'rejected') clickedBtn = document.getElementById('reject-btn');
    }

    if (clickedBtn) {
        clickedBtn.classList.remove("bg-white", "text-[#64748B]");
        clickedBtn.classList.add("bg-blue-600", "text-white");
    }

    //call to alwys update the count
    updateJobCount();
}



//event listener
document.addEventListener('click', (e) => {
    // Delete Logic
    if (e.target.closest('.trash-btn')) {
        e.target.closest('.job-card').remove();
        showItem(currentFilter, null);
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
    const oldStatus = card.getAttribute('data-status');

    if (oldStatus === newStatus) {
        return;
    }

    // Set data attribute for filtering
    card.setAttribute('data-status', newStatus);

    if (newStatus === 'interview') {
        statusLabel.innerText = "Interview";
        statusLabel.className = "status-btn btn mt-5 w-[120px] h-10 bg-green-600 text-white font-bold border-none";
    } else {
        statusLabel.innerText = "Rejected";
        statusLabel.className = "status-btn btn mt-5 w-[120px] h-10 bg-red-600 text-white font-bold border-none";
    }

    showItem(currentFilter, null);
}

// Initial setup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // check all attribute have not aplied
    document.querySelectorAll('.job-card').forEach(card => {
        if (!card.hasAttribute('data-status')) {
            card.setAttribute('data-status', 'not-applied');
        }
    });


    const allBtn = document.getElementById('all-btn');
    if (allBtn) {
        showItem('all', {currentTarget: allBtn});
    } else {
        //in case 'all-btn' is not found
        showItem('all', null);
    }
});