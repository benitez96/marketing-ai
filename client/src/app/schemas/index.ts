
import * as Yup from 'yup';

export const validationSchema = Yup.object({
    username: Yup.string().required('Campo requerido'),
    password: Yup.string().required('Campo requerido'),
})