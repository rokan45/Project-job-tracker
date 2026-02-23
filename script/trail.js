// Initial load
document.addEventListener('DOMContentLoaded', () => {
    updateCount();
    updateInterviewCount();
    updateRejectedCount();
});

// 1. Tab Switching Logic
function showItem(status, event) {
    const allCards = document.querySelectorAll('.job-card');
    const noJobsPage = document.getElementById("no-jobs-page");
    let visibleCount = 0;

    allCards.forEach(card => {
        const cardStatus = card.getAttribute('data-status') || 'all';
        
        if (status === 'all') {
            card.classList.remove('hidden');
            visibleCount++;
        } else if (cardStatus === status) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    // Show "No Jobs" illustration if tab is empty
    noJobsPage.classList.toggle('hidden', visibleCount > 0);
    
    // Update Available Jobs Header Count
    document.querySelector('.flex.justify-between span').innerText = visibleCount;

    // Button active styling
    document.querySelectorAll(".page-btn").forEach(btn => {
        btn.classList.replace('bg-blue-600', 'bg-white');
        btn.classList.replace('text-white', 'text-[#64748B]');
    });
    event.currentTarget.classList.add('bg-blue-600', 'text-white');
}

// 2. Global Counters
function updateCount() {
    const total = document.querySelectorAll('.job-card').length;
    document.getElementById('total-jobs').innerText = total;
}

function updateInterviewCount() {
    const count = document.querySelectorAll('.job-card[data-status="interview"]').length;
    document.getElementById('total-interview').innerText = count;
}

function updateRejectedCount() {
    // Make sure your Rejected H1 in HTML has id="total-rejected"
    const display = document.getElementById('total-rejected');
    const count = document.querySelectorAll('.job-card[data-status="rejected"]').length;
    if(display) display.innerText = count;
}

// 3. Handle Status Changes (Interview/Rejected)
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

    // Refresh all counts
    updateInterviewCount();
    updateRejectedCount();
    
    // Auto-refresh the current tab view
   // const activeTab = document.querySelector('.page-btn.bg-blue-600').innerText.toLowerCase();
    // Simulate a click or call showItem to refresh visibility
}

// 4. Event Listeners
document.addEventListener('click', (e) => {
    // Delete Logic
    if (e.target.closest('.trash-btn')) {
        e.target.closest('.job-card').remove();
        updateCount();
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