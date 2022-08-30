import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { edit } from '../../hooks/methods';
import { update } from '../../hooks/alert';
import s from './EditVehicle.module.css';

const EditVehicle = ({ showEditVehicle, setShowEditVehicle,vehicle }) => {
    const handleCancel = () => {
        setShowEditVehicle(false)
    };

    return (
        <AnimatePresence exitBeforeEnter>
            { showEditVehicle && ( 
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
                                enableReinitialize={true}
                                initialValues= {{
                                    type: vehicle.type ? vehicle.type : "",
                                    color: vehicle.color ? vehicle.color : "",
                                    plate: vehicle.plate ? vehicle.plate : "",
                                }}

                                validationSchema= {Yup.object({
                                    color: Yup.string("Color must be a string"),
                                    plate: Yup.string("")
                                })}

                                onSubmit={values => {
                                    edit(`/vehicles/${vehicle.id}`, values)
                                    .then(() => {
                                        update();
                                        setShowEditVehicle(false)
                                     })
                                    .catch(err => console.log(err))
                            
                                }}
                             
                                >
                                {formProps => (
                                <Form className={s.form} name="updatedVehicle">
                                    <h1 className={s.title}>Edit vehicle</h1>
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

export default EditVehicle;