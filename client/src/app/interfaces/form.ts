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
    type: Types
}

// {
//     source: 'user',
//     id: 2,
//     name: 'ai_model',
//     role: 'user',
//     default_value: '',
//     placeholder: '',
//     enabled: false,
//     values: [
//       { value: 'gpt-3.5-turbo', label: 'GPT-3.5' },
//       { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' }
//     ],
//     template: '-',
//     description: '',
//     type: 'radio',
//     label: 'GPT Model',
//     required: false,
//     priority: null
//   }