import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from "formik";
import {useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {LoginParamsType} from "../../api/todolists-api";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../app/store";
import {selectIsLoggedIn} from "./selectors";

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(loginTC(values))
            if (loginTC.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
            formik.resetForm()
        }
        ,
        validate: (values) => {
            const errors: Partial<Omit<LoginParamsType, 'captcha'>> = {};
            /*const errors: Partial<Pick<LoginParamsType, 'email' | 'rememberMe' | 'password'>> = {};*/
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password required';
            } else if (values.password.length < 3) {
                errors.password = 'Passwords must be at least 3 characters in length';
            }
            return errors;
        },
    })

    if (isLoggedIn) {
        return <Navigate to={"/"}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>

                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>

                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps("email")}/>
                        {formik.touched.email && formik.errors.email &&
                        <div style={{color: "red"}}>{formik.errors.email}</div>}

                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps("password")}/>
                        {formik.touched.password && formik.errors.password &&
                        <div style={{color: "red"}}>{formik.errors.password}</div>}

                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox {...formik.getFieldProps("rememberMe")}/>}/>

                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>

                </FormControl>
            </form>
        </Grid>
    </Grid>
}
