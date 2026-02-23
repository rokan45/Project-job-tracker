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

//update interview count
function InterviewDisplayNum(){
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

// status button updated
const allInterviewButton=document.querySelectorAll('.interview-btn');

allInterviewButton.forEach(btn =>{
    btn.addEventListener('click',function(e){
        const jobCards=e.currentTarget.closest('.job-card');//child
        const statusBtn=jobCards.querySelector('.status-btn');

        if(statusBtn){
            statusBtn.innerText= "Interview";
            statusBtn.classList.remove('bg-[#EEF4FF');
            statusBtn.classList.add('bg-green-600','text-white','font-bold');

            //replace it with no jobs
            const interviewPage=document.getElementById('no-jobs-page');//parent
            interviewPage.innerHTML=jobCards;

        }

        
    })
})




//All rejected work button
const allrejectedButton=document.querySelectorAll('.rejected-btn');

allrejectedButton.forEach(btn =>{
    btn.addEventListener('click',function(e){
        const Parent=e.currentTarget.closest('.job-card');

        const statusBtn=Parent.querySelector('.status-btn');
        if(statusBtn){
            statusBtn.innerText= "Rejected";
            statusBtn.classList.remove('bg-[#EEF4FF');
            statusBtn.classList.add('bg-red-600','text-white','font-bold');
        }

        
    })
})
