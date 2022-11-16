// name Validation
export const nameValidator = (fullName) => {
  if (!fullName) {
    return 'Name is required';
  } else if (fullName.length < 50) {
    return 'Name must be at least 50 characters long';
  }
  return "";
}

// username Validation
export const usenameValidator = (username) => {
  const extension = new RegExp(/^([a-z])([A-Z])([@])$/)
  if (!username) {
    return 'Username is required';
  } else if (!extension.test(username)) {
    return 'Incorrect username format';
  }
  return "";
}

// email Validation
export const emailValidator = (email) => {
  const extensions = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  if (!email) {
    return "Email is required";
  } else if (!extensions.test(email)) {
    return "Incorrect email format";
  }
  return "";
};

// password Validation
export const passwordValidator = (password) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 8) {
    return "Password must have a minimum 8 characters";
  } else if (!password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    return "*Please enter secure and strong password.";
  }
  return "";
};

// confirPassword Validation
export const confirmPasswordValidator = (confirmPassword, values) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (confirmPassword.length < 8) {
    return "Confirm password must have a minimum 8 characters";
  } else if (confirmPassword !== values.password) {
    return "Passwords do not match";
  }
  return "";
}
