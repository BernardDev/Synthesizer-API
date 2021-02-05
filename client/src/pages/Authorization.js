import './Authorization.scss';
import './utility.scss';
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useForm} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';

const schema = yup.object().shape({
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

const baseUrl = process.env.REACT_APP_API_URL;
console.log('baseUrl', baseUrl);

function Authorization() {
  const [status, setStatus] = useState({});

  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log('data.email', data.email);
    if (data) {
      try {
        const response = await axios.post(`${baseUrl}/apikey`, {
          email: data.email,
        });
        setStatus({
          errors: response.errors,
          code: response.status,
          text: response.statusText,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  console.log('status', status);

  // if resopnse.status === 201: An email has been sent to you with your API key
  // if resopnse.status === anything other than that: ...

  return (
    <div className='authorization-bg'>
      <div className='wrapper'>
        {status.code === 201 ? (
          'An email has been sent to you with your API key'
        ) : (
          <Form noValidate validated={false} onSubmit={handleSubmit(onSubmit)}>
            <InputWithFeedback
              humanReadbleName='Email'
              name='email'
              type='email'
              errors={errors}
              register={register}
            />
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}

export default Authorization;
