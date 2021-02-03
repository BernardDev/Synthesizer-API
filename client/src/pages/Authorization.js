import './Authorization.scss';
import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().min(3).required(),
  lastName: yup.string(),
  email: yup.string().email().required(),
});

function InputWithFeedback({name, type, register, errors, humanReadbleName}) {
  return (
    <>
      <Form.Label>{humanReadbleName}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        ref={register}
        className={errors[name] ? 'is-invalid' : ''} // { lastName: 'some error' }
      />
      <Form.Control.Feedback type='invalid'>
        <ErrorMessage errors={errors} name={name} />
      </Form.Control.Feedback>
    </>
  );
}

function Authorization() {
  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log('VALUES:', data);

  console.log('FROM ERRORS', errors);
  return (
    <>
      <Form
        noValidate
        validated={false}
        // class="was-validated"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputWithFeedback
          humanReadbleName='First Name'
          name='firstName'
          type='text'
          errors={errors}
          register={register}
        />
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Authorization;
