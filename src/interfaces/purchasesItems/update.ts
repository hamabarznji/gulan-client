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
 
 

];

export default addExpenseInputs;
