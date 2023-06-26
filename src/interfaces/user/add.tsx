import InputsFieldInterface from "../InputsFieldInterface";

const addUserInputs: InputsFieldInterface[] = [
    {
      id: 1,
      label: "User Name",
      name: "username",
      type: "string",
      required: true,
      helperText: "Username is required",
    },
    {
      id: 2,
      label: "Password",
      name: "password",
      type: "string",
      required: true,
      helperText: "Password is required",
    },
    {
      id: 3,
      label: "Role",
      name: "role",
      type: "string",
      required: true,
      helperText: "Role is required",
    },
  ];
  

  export default addUserInputs;