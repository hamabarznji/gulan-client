
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from '@mui/icons-material/Inventory';
const menuItems: { title: string; icon: React.FC; path: string ,roles:any[]}[] = [
    { title: "Dashboard", icon: DashboardIcon, path: "/dashboard",roles:['admin'] },
    { title: "Invoices", icon: ReceiptLongIcon, path: "/invoices" ,roles:['admin','user']},
    { title: "Products", icon: InventoryIcon, path: "/products",roles:['admin'] },
    { title: "Users", icon: PersonIcon, path: "/users",roles:['admin'] },
  ];

  export default menuItems;