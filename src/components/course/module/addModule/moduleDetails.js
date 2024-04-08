import React from 'react';

function ModuleDetails(props) {

    const {moduleDetails} = props;

    const {moduleName, dueDate, dueTime} = moduleDetails;
    const {availability, latePolicy} = moduleDetails;

    const onChangeAvailability = (e) => {
        const {name, value} = e.target;
        availability[name] = value;
        props.onChange(moduleDetails);
    }

    const onChangeLatePolicy = (e) => {
        const {name, value} = e.target;
        latePolicy[name] = value;
        props.onChange(moduleDetails);
    }

    const onChange = (e) => {
        const {name, value} = e.target;
        const {moduleDetails} = props;
        moduleDetails[name] = value;
        props.onChange(moduleDetails);
    }


    return (
        <div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 d-flex flex-column mt-md-1 pt-md-1">
                        <label className={'text-left'} htmlFor="moduleName">Assignment Name:</label>
                        <input className="form-control"
                               value={moduleName}
                               type="text"
                               name="moduleName"
                               placeholder="Module name"
                               onChange={onChange}
                               required/>
                    </div>

                    <div className="col-md-3 d-flex flex-column border-md-top mt-md-1 pt-md-1">
                        <label className={'text-left'} htmlFor="dueDate">Due Date</label>
                        <input className="form-control"
                               type="date"
                               value={dueDate}
                               name="dueDate"
                               onChange={onChange}
                               required/>
                    </div>

                    <div className="col-md-3 d-flex flex-column border-md-top mt-md-1 pt-md-1">
                        <label className={'text-left'} htmlFor="due-time">Due Time: </label>
                        <input className="form-control"
                               type="time"
                               id="due-time"
                               name="dueTime"
                               value={dueTime}
                               min="0:00" max="23:59"
                               onChange={onChange}
                               required/>
                    </div>
                </div>

                <div className='row justify-content-center align-items-center mt-5'>
                    <h5>Availability period: </h5>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="startDate">Start Date</label>
                        <input className="form-control"
                               value={availability.startDate}
                               type="date"
                               name="startDate"
                               onChange={onChangeAvailability}
                               required/>
                    </div>
                    <div className="form-group  col-md-3">
                        <label className="mr-1" htmlFor="startTime">Start Time </label>
                        <input className="form-control"
                               type="time"
                               name="startTime"
                               value={availability.startTime}
                               min="0:00" max="23:59"
                               onChange={onChangeAvailability}
                               required/>
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="endDate">End Date</label>
                        <input className="form-control"
                               value={availability.endDate}
                               type="date"
                               name="endDate"
                               onChange={onChangeAvailability}
                               required/>
                    </div>
                    <div className="form-group  col-md-3">
                        <label className="mr-1" htmlFor="endTime">End Time </label>
                        <input className="form-control"
                               type="time"
                               name="endTime"
                               min="0:00" max="23:59"
                               value={availability.endTime}
                               onChange={onChangeAvailability}
                               required/>
                    </div>
                </div>

                <div className='row justify-content-center align-items-center'>
                    <h3>Late policy: </h3>
                </div>
                <div className='row  justify-content-center align-items-center '>
                    <div className="form-group col-md-3">
                        <label className="text-center" htmlFor="deduction">Deduce:</label>
                        <span className={'d-flex flex-row align-items-center justify-content-center m-0 p-2 rounded border'}>
                            <input className=" border-dark border-bottom border-top-0 border-right-0 border-left-0 w-50 text-center mr-1"
                                   type="number"
                                   name="deduction"
                                   min="0" max="100"
                                   value={latePolicy.deduction}
                                   onChange={onChangeLatePolicy}
                                   required/>
                            % points
                        </span>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="unit">For each:</label>
                        <span className={'d-flex flex-row align-items-center justify-content-center m-0 p-2 rounded border'}>
                            <select className=" border-dark border-bottom border-top-0 border-right-0 border-left-0 w-100 text-center mr-1"
                                    id="unit"
                                    name='unit'
                                    value={latePolicy.unit}
                                    onChange={onChangeLatePolicy}>
                                <option key='none' value="none">none</option>
                                <option key='days' value='days'>day</option>
                                <option key='hours' value='hours'>hour</option>
                                <option key='minutes' value='minutes'>minute</option>
                            </select>
                            late
                        </span>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="text-center" htmlFor="maxDeduction">Maximum deduction:</label>
                        <span
                            className={'d-flex flex-row align-items-center justify-content-center m-0 p-2 rounded border'}>
                            <input className="border-dark border-bottom border-top-0 border-right-0 border-left-0 w-50 text-center mr-1"
                                   type="number" id="maxDeduction"
                                   name="maxDeduction"
                                   min="0" max="100"
                                   value={latePolicy.maxDeduction}
                                   onChange={onChangeLatePolicy}
                                   required/>

                            % points
                        </span>
                    </div>
                </div>
        </div>
    );
}

export default ModuleDetails;