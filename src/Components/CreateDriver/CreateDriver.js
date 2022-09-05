import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createNew } from '../../hooks/methods';
import { createDriver } from '../../hooks/alert';
import s from './CreateDriver.module.css';

const CreateDriver = ({ showCreateDriver, setShowCreateDriver }) => {
    
    const handleCancel = () => {
        setShowCreateDriver(false)
    };

    return (
        <AnimatePresence exitBeforeEnter>
            { showCreateDriver && ( 
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
                                    name: "",
                                    email: "",

                                }}

                                validationSchema= {Yup.object({
                                    name: Yup.string("Name must be a string")
                                    .required(""),
                                    email: Yup.string("Email must be a string")
                                    .required(""),
                                })}

                                onSubmit={values => {
                                    createNew(`/drivers/`, values)
                                    .then(() => {
                                        createDriver();
                                        setShowCreateDriver(false)
                                     })
                                    .catch(err => console.log(err))
                            
                                }}
                             
                                >
                                {formProps => (
                                <Form className={s.form} name="newDriver">
                                    <h1 className={s.title}>Create Driver</h1>
                                    <div>Name</div>
                                        <Field className={s.input} name="name" type="text" />
                                        <div></div>
                                        <div className={s.error} >
                                            <ErrorMessage name="name" /> <br/>
                                        </div>

                                        <div>Email</div>
                                        <Field className={s.input} name="email" type="text" />
                                        <div></div>
                                        <div className={s.error} >
                                            <ErrorMessage name="email" /> <br/>
                                        
                                       

                                        <div className={s.subGridContainer}>
                                            <button className={`${s.button} ,${s.submit}`} type="submit">
                                                Submit
                                            </button>
                                            <button className={`${s.button} ,${s.cancel}`} onClick={handleCancel} type="reset" >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
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

export default CreateDriver;