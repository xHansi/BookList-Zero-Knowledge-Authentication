import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { booklistController } from "./controllers/booklist-controller.js";


export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/booklist/{id}", config: booklistController.index },
  { method: "POST", path: "/booklist/{id}/addbook", config: booklistController.addBook },

  { method: "GET", path: "/dashboard/deletebooklist/{id}", config: dashboardController.deleteBooklist },
  { method: "GET", path: "/booklist/{id}/deletebook/{bookid}", config: booklistController.deleteBook },
  

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addbooklist", config: dashboardController.addBooklist },

  { method: "POST", path: "/authenticate_with_zero_knowledge", config: accountsController.zeroKnowledgeLogin },
  { method: "GET", path: "/login_with_zero_knowledge", config: accountsController.showZeroKnowledgeLogin },
];
