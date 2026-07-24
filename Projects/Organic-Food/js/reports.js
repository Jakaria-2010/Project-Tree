import { db } from "./firebase.js";

import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

function loadReports() {
  
  const table = document.getElementById("reportsTable");
  const totalReports = document.getElementById("totalReports");
  
  const q = query(
    collection(db, "reports"),
    orderBy("createdAt", "desc")
  );
  
  onSnapshot(q, (snapshot) => {
    
    table.innerHTML = "";
    
    let count = 0;
    
    if (snapshot.empty) {
      
      table.innerHTML = `
                <tr>
                    <td colspan="4">
                        No reports found.
                    </td>
                </tr>
            `;
      
      totalReports.textContent = "0";
      
      return;
    }
    
    snapshot.forEach((doc) => {
      
      count++;
      
      const report = doc.data();
      
      let date = "Loading...";
      
      if (report.createdAt) {
        date = report.createdAt.toDate().toLocaleString();
      }
      
      table.innerHTML += `

<tr>

<td>${report.name}</td>

<td>${report.problem}</td>

<td>${date}</td>

<td>

<button class="actionBtn">
👁 View
</button>

</td>

</tr>

`;
      
    });
    
    totalReports.textContent = count;
    
  });
  
}

export { loadReports };