import React, { Component} from 'react';
import {Field, reduxForm} from 'redux-form';


class StreamForm extends Component{
    
    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? ' error' : ''}`;
        return(
            //meta parameter contains input validation errors
            //if you use form props as an argument in this function then below commented line and next line to it are same
            //<input onChange={formProps.input.onChange} value={formProps.input.value}/>
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                <div>{this.renderError(meta)}</div>
            </div>
        );
    }

    renderError({error, touched}){
        if(error && touched){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
        
    }

    render(){
        return(
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
};

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title){
        errors.title = 'Title required.';
    }
    if(!formValues.description){
        errors.description = 'Description required.';
    }

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);