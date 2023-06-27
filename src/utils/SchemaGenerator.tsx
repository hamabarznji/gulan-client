import * as Yup from 'yup';

interface InputField {
  id: number;
  label: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array'|'date' | 'datetime' ;
  required: boolean;
  helperText: string;
  min?: number;
  max?: number;
}

const generateSchema = (fields: InputField[]): Yup.ObjectSchema<any> => {
  const schemaFields: { [key: string]: Yup.Schema<any> } = {};

  fields.forEach((field) => {
    const { name, label, type, required, helperText, min, max } = field;

    let fieldSchema: Yup.Schema<any>;

    switch (type) {
      case 'string':
        fieldSchema = Yup.string();
        break;
      case 'date':
        fieldSchema = Yup.date();
        break;
      case 'number':
        fieldSchema = Yup.number();
        if (min !== undefined) {
          fieldSchema = (fieldSchema as Yup.NumberSchema<number>).min(min, `${label} must be at least ${min}`);
        }
        if (max !== undefined) {
          fieldSchema = (fieldSchema as Yup.NumberSchema<number>).max(max, `${label} cannot exceed ${max}`);
        }
        break;
      case 'boolean':
        fieldSchema = Yup.boolean();
        break;
      case 'array':
        fieldSchema = Yup.array().of(Yup.string());
        break;
      default:
        fieldSchema = Yup.string();
    }

    if (required) {
      fieldSchema = fieldSchema.required(`${label} is required`);
    }

    schemaFields[name] = fieldSchema;
  });

  return Yup.object().shape(schemaFields);
};

export default generateSchema;
