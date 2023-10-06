import InputsFieldInterface from "../InputsFieldInterface";

const addExpenseInputs: InputsFieldInterface[] = [

  {
    id: 1,
    label: "Pruchased Price",
    name: "price",
    type: "number",
    required: true,
    helperText: "Pruchased Price is required",
    isMenu: false,
    isSensitive: false,
  
  },

  {
    id: 2,
    label: "Quantity",
    name: "qty",
    type: "number",
    required: true,
    helperText: "Quantity Price is required",
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
    id:4,
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
