import InputsFieldInterface from "../InputsFieldInterface";

const addUserInputs: InputsFieldInterface[] = [
  {
    id: 1,
    label: "User Name",
    name: "name",
    type: "string",
    required: true,
    helperText: "Username is required",
    isMenu: false,
    isSensitive: false,
  },
  {
    id: 2,
    label: "Password",
    name: "password",
    type: "string",
    required: true,
    helperText: "Password is required",
    isMenu: false,
    isSensitive: true,

  },
  {
    id: 3,
    label: "Role",
    name: "role",
    type: "string",
    required: true,
    helperText: "Role is required",
    isMenu: true,
    isSensitive: false,

    options: [
      {
        id: 1,
        label: "Admin",
        value: "admin",
      },
      {
        id: 2,
        label: "User",
        value: "user",
      },
    ],
  },

];

export default addUserInputs;
