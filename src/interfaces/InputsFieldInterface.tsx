
interface InputsFieldInterface {
    id: number;
    label: string;
    name: string;
    type: "string" | "number" | "boolean" | "array"|"date" | "datetime" 
    required: boolean;
    helperText: string;
    min?: number;
    max?: number;
    isMenu: boolean;
    options?: any[],
    defaultValue?: any,
    isSensitive: boolean,
  }


  export default InputsFieldInterface;