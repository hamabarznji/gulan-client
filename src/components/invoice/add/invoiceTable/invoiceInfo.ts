interface Row {
    num: string;
    product: string;
    itemColor:string;
    itemSize:string;
    qty: number;
    price: number;
    total: number;
    action: React.ReactNode;
  }


  export const columns = [
    { id: "num", label: "#", align: "center" },
    { id: "product", label: "Item", align: "center" },
    { id: "itemColor", label: "Color", align: "center" },
    { id: "itemSize", label: "Size", align: "center" },
    { id: "qty", label: "QTY", align: "center" },
    { id: "price", label: "Price", align: "center" },
    { id: "total", label: "Total", align: "center" },
    { id: "action", label: "Action", align: "center" },
  ];
  
  
export default Row  