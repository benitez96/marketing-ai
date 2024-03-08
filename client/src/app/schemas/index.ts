
import * as Yup from 'yup';

export const validationSchema = Yup.object({
    email: Yup.string().email('Email invalido').required('Campo requerido'),
    password: Yup.string().required('Campo requerido'),
})