
import EmployeeService from '../services/EmployeeService'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddEmployeeComponent = () => {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const navigator = useNavigate()
    const { id } = useParams()    // useParams is used to provide value from browser header and gives key value pair,here onlu key is used i.e ID.

    // function handleFirstName(e){   /* e represents event parameter */
    //     setFirstName(e.target.value);
    //  } this whole could also be written for every field submission in form but for every feild a function would be very hasty.


    // done to avoid empty submisssio of form if no fields are entered.
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    useEffect(() => {

        if (id) {                                          // this id parameter is retrieved from browser using useParams.
            EmployeeService.getEmployeeById(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }


    }, [id])

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstName, lastName, email } /* Saving the Values from form input using useState variables value after change. */
            console.log(employee);

            if (id) {
                // update employee finction of axios from employee service.
                EmployeeService.updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.log(error);
                })
            } else {
                // createEmployee function from employee service 
                EmployeeService.createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.log(error);
                })
            }
        }

    }

    // done to avoid empty submisssio of form if no fields are entered.
    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors }      // called as Spread Operator to copy one object to another object i.e(errors usestate to copyErrors)

        if (firstName.trim()) {                      // if firstName is not empty then enter if codition.
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is Required!!!';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is Required!!!';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is Required!!!';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'> Update Employee</h2>
        } else {
            return <h2 className='text-center'> Add Employee</h2>
        }
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form action="">

                            <div className="form-group mb-2">
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={firstName /* this value form useState*/}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} // to provide css to invlaid input text by user (ternary operator if errors.firstName is true then another css)
                                    onChange={(e) => setFirstName(e.target.value)}>
                                </input>
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName} </div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Last Name</label>
                                <input type="text" placeholder='Enter Employee Last Name' name='lastName' value={lastName /* this value form useState*/} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} onChange={(e) => setLastName(e.target.value)}></input>
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName} </div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Email</label>
                                <input type="text" placeholder='Enter Employee Email' name='email' value={email /* this value form useState*/} className={`form-control ${errors.email ? 'is-invalid' : ''}`} onChange={(e) => setEmail(e.target.value)}></input>
                                {errors.email && <div className='invalid-feedback'>{errors.email} </div>}
                            </div>

                            <button className="btn btn-success" onClick={saveOrUpdateEmployee}> Submit </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddEmployeeComponent
