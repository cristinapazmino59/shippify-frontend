import { useState, useContext } from 'react';
import { ActionContext } from '../../context/ActionContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { find } from '../../hooks/methods';
import { create, notFound } from '../../hooks/alert';
import CreateVehicle from '../CreateVehicle/CreateVehicle';
import s from './FindDriver.module.css';

const FindDriver = ({ showFindDriver, setShowFindDriver }) => {
    const {isFindAction, isFind, toggleAction} = useContext(ActionContext);
    const [ showCreateVehicle, setShowCreateVehicle ] = useState(false);
    const [ driver, setDriver ] = useState({});

    const handleCancel = () => {
        setShowFindDriver(false)
    };

/*     const handleChange = (e) => { 
        setDriver(e.target.value)
    } */

    return (
    <>
        
        <AnimatePresence exitBeforeEnter>
            { showFindDriver && ( 
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
                                }}

                                validationSchema= {Yup.object({
                                    email: Yup.string("")
                                            .required("Type the email of the driver"),
                                })}

                                onSubmit={values => {
                                    console.log(values)
                                    console.log(isFind)
                                    find(`/drivers/${values.email}`)
                                    .then((driver) => {
                                        setDriver(driver);
                                        console.log(driver)
                                        if (isFind) {
                                            find(`/vehicles/${driver.id}`)
                                            .then(vehicles => {
                                                console.log(vehicles)
                                                setShowFindDriver(false);
                                            })
                                            .catch(err => console.log(err))
                                        } else {
                                            setShowFindDriver(false);
                                            setShowCreateVehicle(true);
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        notFound();
                                        setShowFindDriver(false)
                                    })
                                }}
                            >
                                {formProps => (
                                <Form className={s.form} name="driver">
                                    <h1 className={s.title}>Enter the driver email</h1>
                                         <div>Driver Email</div>
                                        <Field className={s.input} name="email" type="text" />
                                        <div></div>
                                        <div className={s.error} >
                                            <ErrorMessage name="email" /> <br/>
                                        </div>
                                                       
                                        <div>
                                     
                                        <div className={s.subGridContainer}>
                                            <button className={`${s.button} ,${s.search}`} type="submit">
                                                Search
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
        <CreateVehicle showCreateVehicle={showCreateVehicle} setShowCreateVehicle={setShowCreateVehicle} driver={driver}/>
    </>
    )
}

export default FindDriver;