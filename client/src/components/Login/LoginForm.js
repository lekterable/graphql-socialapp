import { Field, Form, Formik } from 'formik'
import React from 'react'
import { Mutation } from 'react-apollo'
import * as Yup from 'yup'
import { LOGIN_QUERY } from '../../queries'
import auth from '../../utils/auth'
import Input from '../shared/Input'
import './login-form.scss'

export default ({ onSubmit }) => (
  <Mutation mutation={LOGIN_QUERY}>
    {(login, { client }) => (
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async values => {
          const { data } = await login({
            variables: { ...values }
          })
          auth.authorize(data.login)
          await client.resetStore()
          onSubmit()
        }}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form className="login-form">
            <Field
              component={Input}
              className="input-text"
              name="username"
              placeholder="username"
            />
            <Field
              component={Input}
              className="input-text"
              name="password"
              placeholder="password"
            />
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="btn btn--primary"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    )}
  </Mutation>
)

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username cannot be empty'),
  password: Yup.string().required('Password cannot be empty')
})
