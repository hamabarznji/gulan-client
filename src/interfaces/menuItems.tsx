import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';

interface MenuItem {
  title: string;
  icon: React.ComponentType;
  path: string;
  roles: string[];
  nestedLinks?: boolean;
  nestedLinksItems?: [];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
    roles: ["admin"],
    nestedLinks: false,
  },
  {
    title: "Invoices",
    icon: ReceiptLongIcon,
    path: "/invoices",
    roles: ["admin", "user"],
  },
  {
    title: "Items",
    icon: InventoryIcon,
    path: "/items",
    roles: ["admin"],
    nestedLinks: true,
    nestedLinksItems: [
      {
        title: "Categories",
        icon: CategoryIcon,
        path: "/items/category",
        roles: ["admin"],
        isImage: false,
      },
      {
        title: "Vendors",
        icon: BusinessIcon,
        path: "/items/vendors",
        roles: ["admin"],
      },
    ],
  },
  {
    title: "Users",
    icon: PersonIcon,
    path: "/users",
    nestedLinks: false,
    roles: ["admin"],
  },
  {
    title: "Expenses",
    icon: PointOfSaleIcon,
    path: "/expenses",
    nestedLinks: false,
    roles: ["admin"],
  },
];

export default menuItems;
