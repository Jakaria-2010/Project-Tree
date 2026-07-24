import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

window.sendReport = async function() {
  
  const name = document.getElementById("name").value.trim();
  const problem = document.getElementById("problem").value.trim();
  const message = document.getElementById("message").value.trim();
  
  if (name === "" || problem === "" || message === "") {
    alert("Please fill all fields.");
    return;
  }
  
  const btn = document.querySelector("button");
  
  btn.disabled = true;
  btn.innerText = "Sending...";
  
  try {
    
    await addDoc(collection(db, "reports"), {
      
      name: name,
      
      problem: problem,
      
      message: message,
      
      status: "Open",
      
      createdAt: serverTimestamp()
      
    });
    
    alert("Report submitted successfully.");
    
    window.location.href = "index.html";
    
  }
  
  catch (error) {
    
    alert(error.message);
    
    btn.disabled = false;
    btn.innerText = "Send Report";
    
  }
  
}