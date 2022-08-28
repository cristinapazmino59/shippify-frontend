import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { notValid } from '../../hooks/alert';
import defaultUser from '../../utils/defaultUser.json';
import s from './Login.module.css';


const Login = ({ showLogin, setShowLogin }) => {
    const { toggleAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <AnimatePresence exitBeforeEnter>
            { showLogin && ( 
                <motion.div className={s.backdrop}
                    variants={{
                        visible: {opacity: 1},
                        hidden: {opacity: 0}
                    }}
                    initial= "hidden"
                    animate= "visible"
                >
                    <motion.div className={s.modalContainer}>
                        <div className={s.formContainer}>
                            <Formik
                                initialValues= {{
                                    email: "",
                                    password: "",
                                }}
                                validationSchema= {Yup.object({
                                    email: Yup.string()
                                            .email("Enter a valid email"),
                                })}
                                onSubmit = { values => {
                                    if (values.email === defaultUser[0].email && values.password === defaultUser[0].password) {
                                        const loggedUser = {
                                            id: 1,
                                            email: values.email,
                                            user: values.email.split("@")[0]
                                          };
                                        toggleAuth(loggedUser);
                                        localStorage.setItem("newUser", JSON.stringify(loggedUser));
                                        setShowLogin(false);
                                        navigate(`/mynotes/${loggedUser.id}`);
                                    } else {
                                        notValid();
                                    }
                                }}
                                >
                                {formProps => (
                                <Form className={s.form}>
                                    <div >E-mail</div>
                                    <Field className={s.input} name="email" type="text"/> <br/>
                                    <div className={s.error} >
                                        <ErrorMessage name="email" /> <br/>
                                    </div>
                                    <div>Password</div>
                                    <Field className={s.input} name="password" type="password" /> <br/> 
                                    <div className={s.error} >
                                        <ErrorMessage name="password" /> <br/>
                                    </div>
                                    <button className={s.button} type="submit">
                                        LOG IN
                                    </button>
                                </Form>
                                    )}
                            </Formik>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Login;