import InputsFieldInterface from "../InputsFieldInterface";

const addExpenseInputs: InputsFieldInterface[] = [
  {
    id: 1,
    label: "Description",
    name: "description",
    type: "string",
    required: true,
    helperText: "Description is required",
    isMenu: false,
    isSensitive: false,
  },
  {
    id: 2,
    label: "Category",
    name: "categoryId",
    type: "string",
    required: true,
    helperText: "Category is required",
    isMenu: true,
    isSensitive: false,
    options: []
  },
  {
    id: 3,
    label: "Amount",
    name: "amount",
    type: "number",
    required: false,
    helperText: "Amount is required",
    isMenu: false,
    isSensitive: true,

  },
  {
    id: 4,
    label: "",
    name: "createdAt",
    type: "date",
    required: true,
    helperText: "Date is required",
    isMenu: false,
    isSensitive: false,

  },

];

export default addExpenseInputs;
