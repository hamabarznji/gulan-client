
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from '@mui/icons-material/Inventory';
const menuItems: { title: string; icon: React.FC; path: string }[] = [
    { title: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
    { title: "Invoices", icon: ReceiptLongIcon, path: "/invoices" },
    { title: "Products", icon: InventoryIcon, path: "/products" },
    { title: "Users", icon: PersonIcon, path: "/users" },
  ];

  export default menuItems;