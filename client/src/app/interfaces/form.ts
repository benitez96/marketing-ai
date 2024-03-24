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

export interface IFormAnalyzeWebsite {
    product_description: string
}