import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createNew } from '../../hooks/methods';
import { create } from '../../hooks/alert';
import s from './CreateVehicle.module.css';

const CreateVehicle = ({ showCreateVehicle, setShowCreateVehicle, driver }) => {

    const handleCancel = () => {
        setShowCreateVehicle(false)
    };

    return (
        <AnimatePresence exitBeforeEnter>
            { showCreateVehicle && ( 
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
                                    type: "",
                                    color: "",
                                    plate: "",
                                }}

                                validationSchema= {Yup.object({
                                    type: Yup.string("")
                                            .required("There must be a vehicle type"),
                                    color: Yup.string("Color must be a string")
                                            .required("There must be a color"),
                                    plate: Yup.string("")
                                            .required("There must be a car plate")
                                })}

                                onSubmit={values => {
                                    values.driverId = driver.id;
                                    createNew(`/vehicles`, values)
                                    .then(() => {
                                        create();
                                        setShowCreateVehicle(false)
                                     })
                                    .catch(err => console.log(err))
                                }}
                            >
                                {formProps => (
                                <Form className={s.form} name="newVehicle">
                                    <h1 className={s.title}>Create vehicle</h1>
                                        <div>Type</div>
                                        <Field as="select" className={s.input} name="type" type="text">
                                            <option value="">Select</option>
                                            <option value="bicycle">Bicycle</option>
                                            <option value="motorcycle">Motorcycle</option>
                                            <option value="car">Car</option>
                                            <option value="van">Van</option>
                                            <option value="truck">Truck</option>
                                        </Field>
                                        <div className={s.error} >
                                            <ErrorMessage name="type" /> <br/>
                                        </div>

                                        <div>Color</div>
                                        <Field className={s.input} name="color" type="text" />
                                        <div></div>
                                        <div className={s.error} >
                                            <ErrorMessage name="color" /> <br/>
                                        </div>

                                        <div>Plate</div>
                                        <Field className={s.input} name="plate" type="text" />
                                        <div>
                                        <div className={s.error} >
                                            <ErrorMessage name="plate" /> <br/>
                                        </div>

                                        <div className={s.subGridContainer}>
                                            <button className={`${s.button} ,${s.create}`} type="submit">
                                                Create
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

export default CreateVehicle;