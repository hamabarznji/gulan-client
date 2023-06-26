
interface InputsFieldInterface {
    id: number;
    label: string;
    name: string;
    type: "string" | "number" | "boolean" | "array";
    required: boolean;
    helperText: string;
    min?: number;
    max?: number;
    isMenu: boolean;
    options?: any[]
  }


  export default InputsFieldInterface;