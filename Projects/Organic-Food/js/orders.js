let allOrders = [];
import { db } from "./firebase.js";

import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
let sortDirection = "desc";
function sortOrders() {
  
  allOrders.sort((a, b) => {
    
    const timeA = a.createdAt?.seconds ?? 0;
    const timeB = b.createdAt?.seconds ?? 0;
    
    return sortDirection === "desc" ?
      timeB - timeA :
      timeA - timeB;
    
  });
  
  displayOrders(allOrders);
  
}
function loadOrders() {
  
  const table = document.getElementById("ordersTable");
  
  const totalOrders = document.getElementById("totalOrders");
  const pendingOrders = document.getElementById("pendingOrders");
  const deliveredOrders = document.getElementById("deliveredOrders");
  
  const q = query(
    collection(db, "orders"),
    orderBy("createdAt", "desc")
  );
onSnapshot(
  q,
  (snapshot) => {
    
table.innerHTML = "";

let total = 0;
let pending = 0;
let delivered = 0;

if (snapshot.empty) {
  
  table.innerHTML = `
                <tr>
                    <td colspan="6">No orders found.</td>
                </tr>
            `;
  
  totalOrders.textContent = "0";
  pendingOrders.textContent = "0";
  deliveredOrders.textContent = "0";
  
  return;
    
}
  (error) => {
    console.error("Firestore Error:", error);
    alert(error.message);
  }
);
  
    allOrders = [];

snapshot.forEach((doc) => {
  
  allOrders.push({
    id: doc.id,
    ...doc.data()
  });
  
});
    snapshot.forEach((doc) => {
      
      const order = doc.data();
      
      total++;
      
      if (order.status === "Pending") {
        pending++;
      }
      
      if (order.status === "Delivered") {
        delivered++;
      }
      
      let date = "Loading...";
      
      if (order.createdAt) {
        date = order.createdAt.toDate().toLocaleString();
      }
      
      table.innerHTML += `

<tr>

<td>${order.customerName}</td>

<td>${order.phone}</td>

<td>৳${order.total}</td>

<td>

<span class="status ${order.status.toLowerCase()}">

${order.status}

</span>

</td>

<td>${date}</td>

<td>

<button
class="actionBtn"
onclick="viewOrder('${doc.id}')">

👁 View

</button>

</td>

</tr>

`;
      
    });
    
    totalOrders.textContent = total;
    pendingOrders.textContent = pending;
    deliveredOrders.textContent = delivered;
    sortOrders();
};
  
}

export { loadOrders };
import {
  getDoc,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

window.viewOrder = async function(id) {
  
  const snap = await getDoc(doc(db, "orders", id));
  
  if (!snap.exists()) return;
  
  const order = snap.data();
  
  const modal = document.getElementById("orderModal");
  
  const body = document.getElementById("modalBody");
  
  let itemsHTML = "";
  
  order.items.forEach(item => {
    
    itemsHTML += `
<div class="itemRow">

<span>${item.name}</span>

<span>৳${item.price}</span>

</div>
`;
    
  });
  
  body.innerHTML = `
  
<h3
style="color:#2e7d32;cursor:pointer;"
onclick="navigator.clipboard.writeText('${order.orderId}');
alert('Order ID Copied!');">

📦 ${order.orderId}

</h3>

<p><b>Customer:</b> ${order.customerName}</p>

<p><b>Phone:</b> ${order.phone}</p>

<p><b>Address:</b><br>${order.address}</p>

<hr>

<h3>Items</h3>

${itemsHTML}

<hr>

<h3>Total : ৳${order.total}</h3>

<p><b>Status</b></p>

<select id="statusSelect">

<option value="Pending"
${order.status=="Pending"?"selected":""}>
Pending
</option>

<option value="Accepted"
${order.status=="Accepted"?"selected":""}>
Accepted
</option>

<option value="Preparing"
${order.status=="Preparing"?"selected":""}>
Preparing
</option>

<option value="Out for Delivery"
${order.status=="Out for Delivery"?"selected":""}>
Out for Delivery
</option>

<option value="Delivered"
${order.status=="Delivered"?"selected":""}>
Delivered
</option>

<option value="Cancelled"
${order.status=="Cancelled"?"selected":""}>
Cancelled
</option>

</select>

<br><br>

<button
class="saveBtn"
onclick="updateStatus('${id}')">

💾 Save Status

</button>

`;
  
  modal.style.display = "flex";
  
};

document.getElementById("closeModal").onclick = function() {
  
  document.getElementById("orderModal").style.display = "none";
  
};

window.onclick = function(e) {
  
  const modal = document.getElementById("orderModal");
  
  if (e.target === modal) {
    
    modal.style.display = "none";
    
  }
  
};
window.updateStatus = async function(id) {
  
  const status =
    document.getElementById("statusSelect").value;
  
  await updateDoc(
    doc(db, "orders", id),
    {
      status: status
    }
  );
  
  alert("✅ Status Updated!");
  
  document.getElementById("orderModal").style.display = "none";
  
}
function displayOrders(orders) {
  
  const table = document.getElementById("ordersTable");
  
  table.innerHTML = "";
  
  if (orders.length === 0) {
    
    table.innerHTML = `
<tr>
<td colspan="7">
No matching orders.
</td>
</tr>
`;
    
    return;
    
  }
  
  orders.forEach(order => {
    
    let date = "";
    
    if (order.createdAt) {
      
      date = order.createdAt.toDate().toLocaleString();
      
    }
    
    table.innerHTML += `

<tr>

<td>
<b>${order.orderId}</b>
</td>

<td>${order.customerName}</td>

<td>${order.phone}</td>

<td>৳${order.total}</td>
<td>

<span class="status ${order.status.toLowerCase()}">

${order.status}

</span>

</td>

<td>${date}</td>
<td>

<button
class="actionBtn"
onclick="viewOrder('${order.id}')">

👁 View

</button>

<button
class="deleteBtn"
onclick="deleteOrder('${order.id}')">

🗑 Delete

</button>

</td>



`;
    
  });
  
}
document
  .getElementById("searchBox")
  .addEventListener("input", function() {
    
    const text = this.value.toLowerCase();
    
    const filtered = allOrders.filter(order => {
      
      return (
        
        (order.customerName || "").toLowerCase().includes(text)
        
        ||
        
        (order.phone || "").includes(text)
        
      );
      
    });
    
    displayOrders(filtered);
    
  });
  window.deleteOrder = async function(id) {
  
  const ok = confirm(
    "Delete this order permanently?"
  );
  
  if (!ok) return;
  
  try {
    
    await deleteDoc(
      doc(db, "orders", id)
    );
    
    alert("✅ Order deleted!");
    
  } catch (err) {
    
    alert(err.message);
    
  }
  
}
document.getElementById("sortOrder")
  .addEventListener("change", function() {
    
    sortDirection = this.value;
    
    sortOrders();
    
    
  });