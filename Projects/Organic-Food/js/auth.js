import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

// Protect admin page
function protectAdmin(callback) {
  
  onAuthStateChanged(auth, (user) => {
    
    if (!user) {
      window.location.href = "login.html";
      return;
    }
    
    document.getElementById("adminEmail").textContent = user.email;
    
    const letter = user.email.charAt(0).toUpperCase();
    
    document.getElementById("avatar").textContent = letter;
    document.getElementById("bigAvatar").textContent = letter;
    
    if (callback) {
      callback();
    }
    
  });
  
}

// Logout
async function logout() {
  
  if (!confirm("Are you sure you want to logout?")) {
    return;
  }
  
  await signOut(auth);
  
  window.location.href = "login.html";
  
}

window.logout = logout;

export { protectAdmin };