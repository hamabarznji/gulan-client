import InputsFieldInterface from "../InputsFieldInterface";

const addExpenseInputs: InputsFieldInterface[] = [
  {
    id: 1,
    label: "Item Name",
    name: "name",
    type: "string",
    required: true,
    helperText: "Item Name is required",
    isMenu: false,
    isSensitive: false,
  },
  {
    id: 2,
    label: "Selling Price",
    name: "selling_price",
    type: "number",
    required: true,
    helperText: "Selling Price is required",
    isMenu: false,
    isSensitive: false,
  
  },
  {
    id: 3,
    label: "Category",
    name: "category_id",
    type: "string",
    required: false,
    helperText: "Category is required",
    isMenu: true,
    isSensitive: true,
    options: []

  },
  {
    id: 4,
    label: "Color",
    name: "color_id",
    type: "string",
    required: false,
    helperText: "Color is required",
    isMenu: true,
    isSensitive: true,
    options: []

  },
  {
    id: 5,
    label: "Size",
    name: "size_id",
    type: "string",
    required: false,
    helperText: "Size is required",
    isMenu: true,
    isSensitive: true,
    options: []

  },
 
 

];

export default addExpenseInputs;
