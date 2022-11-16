const validate = (inputValues) => {
  const errors = {};

  // fullName validation
  if (!inputValues.fullName) {
    errors.fullName = 'Name is required';
    return false;
  } else if (inputValues.fullName.length < 20) {
    errors.fullName = 'Name must be at least 20 characters long';
    return false;
  }
  // username validation
  if (!inputValues.username) {
    errors.username = 'Username is required'
    return false;
  } else if (!/^[A-Z%+-]+@[A-Z]$/i.test(inputValues.username)) {
    errors.username = 'Invalid username address';
    return false;
  }

  // email validation
  if (!inputValues.email) {
    errors.email = 'Email is required';
    return false;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputValues.email)) {
    errors.email = 'Invalid email address';
    return false;
  }

  //address validation 
  if (!inputValues.address) {
    errors.address = 'Address is required';
    return false;
  } else if (inputValues.address.length < 100) {
    errors.address = 'Address must be at least 50 characters long';
    return false;
  }

  //password validation
  if (!inputValues.password) {
    errors.password = "Password is required";
    return false;
  } else if (inputValues.password.length < 8) {
    errors.password = "Password must have a minimum 8 characters";
    return false;
  }

  // confirmPassword validation
  if (!inputValues.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
    return false;
  } else if (inputValues.confirmPassword.length < 8) {
    errors.confirmPassword = "Confirm password must have a minimum 8 characters";
    return false;
  } else if (inputValues.confirmPassword !== inputValues.password) {
    errors.confirmPassword = "Passwords do not match";
    return false;
  }

  // return errors 
  return errors;
}
export { validate };