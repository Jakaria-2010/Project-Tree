import { protectAdmin } from "./auth.js";
import { setNotificationCount } from "./ui.js";

import { loadOrders } from "./orders.js";
import { loadReports } from "./reports.js";

protectAdmin(() => {
  
  setNotificationCount(0);
  
  loadOrders();
  
  loadReports();
  
});