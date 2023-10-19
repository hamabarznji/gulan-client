import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CropIcon from '@mui/icons-material/Crop';
interface MenuItem {
  title: string;
  icon: React.ComponentType;
  path: string;
  roles: string[];
  nestedLinks?: boolean;
  nestedLinksItems?: MenuItem[];
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
    icon: StoreIcon,
    path: "/items",
    roles: ["admin"],
    nestedLinks: true,
    nestedLinksItems: [
      {
        title: "Categories",
        icon: CategoryIcon,
        path: "/items/category",
        roles: ["admin"]
      },
      {
        title: "Vendors",
        icon: BusinessIcon,
        path: "/items/vendors",
        roles: ["admin"]
      },
      {
        title: "Colors",
        icon: ColorLensIcon,
        path: "/items/colors",
        roles: ["admin"]
      },
      {
        title: "Sizes",
        icon: CropIcon,
        path: "/items/sizes",
        roles: ["admin"]
      },
    ],
  },
  {
    title: "Purchased Items",
    icon: ShoppingCartIcon,
    path: "orders/purchased",
    nestedLinks: false,
    roles: ["admin"],
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
