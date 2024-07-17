export const userValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: 'Email cannot be empty'
    },
    isString: {
      errorMessage: "Email must be a string"
    }
  },
  name:{
    notEmpty: {
      errorMessage: 'Name cannot be empty'
    },
    isString: {
      errorMessage: "Name must be a string"
    }
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
  },
}

// export const queryValidationSchema = {
//   filter: {
//     in: ['name', 'email'],
//     errorMessage: "Filter must be either 'name' or 'email'"
//   },
//   value: {
//     notEmpty: {
//       errorMessage: "Value cannot be empty"
//     },
//     isString: {
//       errorMessage: "Value must be a string"
//     }
//   }
// }