import './Authorization.scss';
import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';

// controlled component hebben we
// post request

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

function Authorization() {
  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    if (data) {
      try {
        const post = await axios.post(`${baseUrl}/apikey?email=${data.email}`);
        console.log('post', post.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
  // const onSubmit = (data) => console.log('VALUES:', data.email);

  // function handleSendEmail() {
  //   if (data) {
  //   }
  // }

  // onSubmit:
  // post with axios:

  // const postData = async () => {console.log('DATA', data)}
  // try {}catch(error){console.error(error)}
  // await axios.post(`${baseUrl}/apikey?email=${data.email}`)

  // const fetchData = async () => {
  //   console.log('ÚRL', url);
  //   try {
  //     const response = await axios.get(`${baseUrl}/api/${url}?key=${key}`);
  //     console.log('RESPONSE:', response);
  //     setData(response.data);
  //   } catch (error) {
  //     console.log('ERROR', error);
  //   }
  // };

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
    </>
  );
}

export default Authorization;
