// ================= PROFILE MENU =================

const avatar = document.getElementById("avatar");
const profileMenu = document.getElementById("profileMenu");

avatar.addEventListener("click", function(event) {
  
  event.stopPropagation();
  
  if (profileMenu.style.display === "block") {
    profileMenu.style.display = "none";
  } else {
    profileMenu.style.display = "block";
  }
  
});

// Hide menu when clicking outside
document.addEventListener("click", function() {
  
  profileMenu.style.display = "none";
  
});

// Prevent menu from closing when clicking inside it
profileMenu.addEventListener("click", function(event) {
  
  event.stopPropagation();
  
});

// ================= NOTIFICATION =================

const notification = document.querySelector(".notification");

notification.addEventListener("click", function() {
  
  alert("Notification panel will be added in Module 5.");
  
});

// ================= BADGE =================

function setNotificationCount(count) {
  
  const badge = document.getElementById("notificationCount");
  
  badge.innerText = count;
  
  if (count <= 0) {
    
    badge.style.display = "none";
    
  } else {
    
    badge.style.display = "flex";
    
  }
  
}

export { setNotificationCount };