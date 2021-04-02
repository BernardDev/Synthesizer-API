import './Authorization.scss';
import '../utility.scss';

import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Message from '../components/messages/Message';
import axios from 'axios';
import {useForm} from 'react-hook-form';

import * as yup from 'yup';
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';

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
        className={errors[name] ? 'is-invalid' : ''}
      />
      <Form.Control.Feedback type='invalid'>
        <ErrorMessage errors={errors} name={name} />
      </Form.Control.Feedback>
    </>
  );
}

const baseUrl = process.env.REACT_APP_API_URL;

function Authorization() {
  const [response, setResponse] = useState({});

  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    if (data) {
      try {
        const response = await axios.post(`${baseUrl}/apikey`, {
          email: data.email,
        });
        setResponse({
          message: response.data.message,
          errors: response.data.errors,
          code: response.status,
          text: response.statusText,
        });
      } catch (error) {
        console.log(error.response);
        setResponse({
          message: error.response.data.message,
          errors: error.response.data.errors,
          code: error.response.status,
          text: error.response.statusText,
        });
      }
    }
  }

  function renderSwitch(code) {
    switch (code) {
      case 409:
        return 'danger';
      case 201:
        return 'success';
      default:
    }
  }

  return (
    <div className='authorization-bg'>
      <div className='wrapper-test'>
        <Form noValidate validated={false} onSubmit={handleSubmit(onSubmit)}>
          <Form.Text className=''>
            Register with your email to access the API with the API key we sent
            to it!
          </Form.Text>
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
        <div className='mini-wrap'>
          <Message
            variant={renderSwitch(response.code)}
            message={response.message}
          />
        </div>
      </div>
    </div>
  );
}

export default Authorization;
