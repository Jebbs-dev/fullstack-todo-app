export const fieldValidationSchema = {
  name:{
    notEmpty: {
      errorMessage: 'Username is cannot be empty'
    },
  },
  email: {
    notEmpty: {
      errorMessage: 'Email is cannot be empty'
    },
    isString: {
      errorMessage: "email must be a string"
    }
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
  },

}