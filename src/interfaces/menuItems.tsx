import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
interface MenuItem {
  title: string;
  icon: React.ComponentType;
  path: string;
  roles: string[];
  isImage?: boolean;
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: DashboardIcon, path: "/dashboard", roles: ["admin"],isImage: false },
  { title: "Invoices", icon: ReceiptLongIcon, path: "/invoices", roles: ["admin", "user"],isImage: false },
  { title: "Items", icon: InventoryIcon, path: "/items", roles: ["admin"],isImage: false },
  { title: "Users", icon: PersonIcon, path: "/users", roles: ["admin"] },
  { title: "Expenses", icon: PointOfSaleIcon, path: "/expenses", roles: ["admin"],isImage: true },
];

export default menuItems;
