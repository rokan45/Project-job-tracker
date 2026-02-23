console.log("Im connected");

//handle job, interview and rejected page with button

function showItem(id){
    const jobPageElement=document.getElementById("all-jobs");
    const noJobPageElement=document.getElementById("no-jobs-page");

    //hide all
    jobPageElement.classList.add("hidden");
    noJobPageElement.classList.add("hidden");

    //showing item
    const showSelectedItem=document.getElementById(id);
    showSelectedItem.classList.remove("hidden");
}