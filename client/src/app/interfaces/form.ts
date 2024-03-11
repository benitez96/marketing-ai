export enum Types {
    RADIO = 'radio'
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
}

// {
//     source: 'user',
//     id: 2,
//     role: 'user',
//     default_value: '',
//     placeholder: '',
//     enabled: false,
//     template: '-',
//     required: false,
//     priority: null
//   }