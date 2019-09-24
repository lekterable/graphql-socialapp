import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useMutation } from 'react-apollo'
import * as Yup from 'yup'
import { REGISTER_QUERY } from '../../queries'
import auth from '../../utils/auth'
import Input from '../shared/Input'
import './register-form.scss'

export default ({ onSubmit }) => {
  const [register, { client }] = useMutation(REGISTER_QUERY)

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      onSubmit={async values => {
        const { data } = await register({
          variables: { ...values }
        })
        auth.authorize(data.register)
        await client.resetStore()
        onSubmit()
      }}
      validationSchema={validationSchema}
    >
      {({ isValid, isSubmitting }) => (
        <Form className="register-form">
          <Field
            component={Input}
            className="input-text"
            name="username"
            placeholder="username"
          />
          <Field
            component={Input}
            className="input-text"
            name="email"
            placeholder="email"
          />
          <Field
            component={Input}
            className="input-text"
            name="password"
            placeholder="password"
          />
          <button
            disabled={!isValid || isSubmitting}
            type="submit"
            className="btn btn--primary"
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  )
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username cannot be empty'),
  email: Yup.string()
    .email('Email is invalid')
    .required('Email cannot be empty'),
  password: Yup.string().required('Password cannot be empty')
})
