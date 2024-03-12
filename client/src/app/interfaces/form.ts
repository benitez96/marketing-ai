export enum Types {
    RADIO = 'radio',
    SELECT = 'select'
}

export interface IFormInputValues {
    label: string;
    value: string;
    description?: string;
}

export interface IFormInput {
    description: string;
    label: string;
    values: IFormInputValues[]
    type: Types;
    name: string;
    required: boolean;
    placeholder?: string;
}

// {
//     source: 'user',
//     id: 2,
//     role: 'user',
//     default_value: '',
//     enabled: false,
//     template: '-',
//     priority: null
//   }