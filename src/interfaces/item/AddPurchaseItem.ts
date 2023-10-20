import InputsFieldInterface from "../InputsFieldInterface";

const addPurchasedItems: InputsFieldInterface[] = [
  {
    id: 1,
    label: "Item Name",
    name: "item_id",
    type: "string",
    required: true,
    helperText: "Item Name is required",
    isMenu: true,
    isSensitive: false,
    options: []
  }, {
    id: 2,
    label: "Price",
    name: "price",
    type: "number",
    required: true,
    helperText: "Price is required",
    isMenu: false,
    isSensitive: false,
  
  },
 {
    id: 3,
    label: "QTY",
    name: "qty",
    type: "number",
    required: true,
    helperText: "Quantity is required",
    isMenu: false,
    isSensitive: false,
  
  },

 
 

];

export default addPurchasedItems;
