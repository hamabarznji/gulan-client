
interface InputsFieldInterface {
    id: number;
    label: string;
    name: string;
    type: "string" | "number" | "boolean" | "array";
    required: boolean;
    helperText: string;
    min?: number;
    max?: number;
  }


  export default InputsFieldInterface;