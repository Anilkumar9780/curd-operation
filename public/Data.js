import React, { useEffect, useState } from "react";
//Components
import { Header } from "../common/header/Header.jsx";
import CommonInputFieldModal from "../common/Modal/CommonInputFieldModal.jsx";
import ConfirmationPopup from "../common/ConfirmationPopup/ConfirmationPopup.jsx";
import { JPMomentCalendar } from "../../services/JPMoment.jsx";
// Material ui components
import Modal from "@material-ui/core/Modal";
import Slide from "@material-ui/core/Slide";
// Services
import {
  addWebhookUrl,
  deletingWebhooksUrl,
  fetchWebhooksUrls,
} from "../../services/webhooks-services/index.jsx";
import JPEvent from "../../services/JPEvent.jsx";
// Constants
import {
  buttonTextBeforeProcess,
  buttonTextOnProcessing,
  commmonInputFieldPlaceholder,
  commonInputFieldCloseBtn,
  commonInputFieldName,
  commonInputFieldTitle,
  confirmationCancelBtn,
  confirmationMsg,
  confirmationTitle,
  confKey,
  deleteMessage,
  proceedBtnText,
  registeredMessage,
} from "./Constants/index.jsx";
/**
 * @returns node
 */
const Webhook = () => {
  // Instance
  const eventMsg = new JPEvent();
  //States
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleConfPopup, setIsVisibleConfPopup] = useState(false);
  const [inputUrlValue, setInputUrlValue] = useState("");
  const [webhooksUrls, setWebhooksUrls] = useState([]);
  const [deleteTokenId, setDeleteTokenId] = useState("");
  const [buttonText, setButtonText] = useState();
  const [errorsToDisplay, setErrorToDisplay] = useState([]);
  // Header properties storing
  let headerProperties = {
    title: "WEBHOOKS",
    action: [
      {
        title: "Add Webhook URL",
        className: "text-capitalize",
        action: () => {
          showingAddModal();
        },
      },
    ],
  };
  /**
   * To manage the display of Add url modal
   */
  const showingAddModal = () => {
    setIsVisibleModal(true);
  };
  /**
   * To manage the display of confirmation popup
   * @param {string} id
   */
  const showingConfirmationModal = (id) => {
    setIsVisibleConfPopup(true);
    setDeleteTokenId(id);
  };
  /**
   *To update the Input Value state
   * @param {object} event
   */
  const handleChangeInputUrlField = (event) => {
    setInputUrlValue(event.target.value);
  };
  /**
   * To handle the closing of confirmation popup
   */
  const handleCloseConfirmPopup = () => {
    setIsVisibleConfPopup(false);
  };
  /**
   * To handle the closing of Add/Register url modal
   */
  const handleCloseAddModal = () => {
    // 
    setButtonText(false);
    setDeleteTokenId(id);
    // 
    setIsVisibleModal(false);
    setInputUrlValue("");
    setErrorToDisplay("");
  };
  /**
   * Hiting post Api to register or add Webhook url
   */
  const addingNewWebhooksUrl = async () => {
    try {
      setButtonText(buttonTextOnProcessing);
      await addWebhookUrl(inputUrlValue).then((res) => {
        console.log("res", res);
        const { data: { data } = [] } = res;
        setWebhooksUrls([...webhooksUrls, data]);
        eventMsg.fire("tostFrom:React", {
          type: "success",
          data: registeredMessage,
        });
        setIsVisibleModal(false);
        setInputUrlValue("");
        setButtonText("");
      });
    } catch ({
      // Destructuring
      data: {
        error: { validation: { url = "" } = {} },
      },
    }) {
      setErrorToDisplay(url);
    }
  };



  /**
   * Hiting get Api to fetch Webhooks urls list
   */
  const fetchingWebhooksUrls = async () => {
    try {
      await fetchWebhooksUrls().then((res) => {
        const { data: { data } = [] } = res;
        setWebhooksUrls(data);
      });
    } catch ({
      // Destructuring
      data: {
        error: { message = "" },
      },
    }) {
      eventMsg.fire("tostFrom:React", {
        type: "error",
        data: message,
      });
    }
  };

  /**
   * Componet Did Mount
   */
  useEffect(() => {
    fetchingWebhooksUrls();
  }, []);
  /**
   * Hiting delete Api to delete webhooks url
   * @param {String} id
   */
  const deleteWebhookUrl = async (id) => {
    setButtonText(buttonTextOnProcessing);
    try {
      await deletingWebhooksUrl(id).then((res) => {
        console.log("delete", res);
        const updatingUrlsList = webhooksUrls.filter((url) => {
          return url.id !== id;
        });
        eventMsg.fire("tostFrom:React", {
          type: "success",
          data: deleteMessage,
        });
        setWebhooksUrls(updatingUrlsList);
        setIsVisibleConfPopup(false);
        setButtonText("");
      });
    } catch ({
      // Destructuring
      data: {
        error: { message = "" },
      },
    }) {
      eventMsg.fire("tostFrom:React", {
        type: "error",
        data: message,
      });
    }
  };
  /**
   * Handle Confirmation Popup Response
   * @param {String} res
   */
  const handleConfRes = (res) => {
    switch (res) {
      case "delete":
        deleteWebhookUrl(deleteTokenId);
        break;
      default:
        handleCloseConfirmPopup();
        break;
    }
  };
  return (
    <div>
      <Header heading={headerProperties} />
      {isVisibleModal ? (
        <CommonInputFieldModal
          isVisible={true}
          handleClose={handleCloseAddModal}
          handleSave={addingNewWebhooksUrl}
          inputValue={inputUrlValue}
          name={commonInputFieldName}
          handleInputChange={(event) => handleChangeInputUrlField(event)}
          placeholder={commmonInputFieldPlaceholder}
          title={commonInputFieldTitle}
          yesText={buttonText || buttonTextBeforeProcess}
          noText={commonInputFieldCloseBtn}
          errorsToDisplay={errorsToDisplay}
        />
      ) : null}
      {isVisibleConfPopup ? (
        <Modal
          open={isVisibleConfPopup}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Slide direction="down" in={isVisibleConfPopup} timeout={400}>
            <ConfirmationPopup
              msg={confirmationMsg}
              handleConfRes={handleConfRes}
              title={confirmationTitle}
              yesText={buttonText || proceedBtnText}
              noText={confirmationCancelBtn}
              confKey={confKey}
            />
          </Slide>
        </Modal>
      ) : null}
      <div
        className="container-fluid position-fixed table-responsive jps-table-layout"
        style={{ marginTop: "20px" }}
      >
        <table className="margin0">
          <thead>
            <tr>
              <th className="col-name" width="5%">
                S.No
              </th>
              <th className="col-name" width="10%">
                Url
              </th>
              <th className="col-name" width="10%">
                Created At
              </th>
              <th
                className="col-name text-right"
                width="3%"
                user-access="['PA', 'BA', 'SA']"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="middle">
            {webhooksUrls.length !== 0 ? (
              webhooksUrls.map((list, index) => {
                return (
                  <tr key={index} className="align-middle">
                    <td>{index + 1}</td>
                    <td>{list.url}</td>
                    <td>
                      {JPMomentCalendar(list.last_batch_update_datetime, "MDY")}
                    </td>
                    <td
                      className="table-actions text-right"
                      user-access="['PA', 'BA', 'SA']"
                    >
                      <a
                        title="Delete Division"
                        className="jps-delete"
                        onClick={() => showingConfirmationModal(list.id)}
                      >
                        <i className="jpicon-delete"></i>
                      </a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center">
                <td colSpan="5">Record not found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Webhook;




// Services file
// Services
import HttpService from "../HttpService.jsx";
import { URLS } from "../../config/Urls.jsx";
// Instace
const http = new HttpService();
// To register webhooks url
const addWebhookUrl = async (inputUrlValue) => {
  return await http.slsPost(URLS.WEBHOOKS, { url: inputUrlValue });
};
// To fetch the webhooks urls list
const fetchWebhooksUrls = async () => {
  return await http.slsGet(URLS.GET_WEBHOOKS_LIST);
};
// To delete the webhooks url
const deletingWebhooksUrl = async (id) => {
  const UrlsId = URLS.GET_WEBHOOKS_LIST + "/" + id;
  return await http.slsDelete(UrlsId);
};
export { addWebhookUrl, fetchWebhooksUrls, deletingWebhooksUrl };


//api calling  
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const URLS = {
    LOGIN:`${BASE_URL}/users`
}


// 
import { URLS } from "../Config/URLS";
import axios from "axios";
/**
 * Login User
 * @param {string} email
 * @param {string, number} password
 */
export const LoginUser =  async (email, password) => {
   return await axios.get(`${URLS.LOGIN}?email=${email}&password=${password}`)
};







import React from 'react';
import './style.css';


class RegisterForm extends React.Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {}
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

    submituserRegistrationForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
          let fields = {};
          fields["username"] = "";
          fields["emailid"] = "";
          fields["mobileno"] = "";
          fields["password"] = "";
          this.setState({fields:fields});
          alert("Form submitted");
      }

    }

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["username"]) {
        formIsValid = false;
        errors["username"] = "*Please enter your username.";
      }

      if (typeof fields["username"] !== "undefined") {
        if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["username"] = "*Please enter alphabet characters only.";
        }
      }

      if (!fields["emailid"]) {
        formIsValid = false;
        errors["emailid"] = "*Please enter your email-ID.";
      }

      if (typeof fields["emailid"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["emailid"])) {
          formIsValid = false;
          errors["emailid"] = "*Please enter valid email-ID.";
        }
      }

      if (!fields["mobileno"]) {
        formIsValid = false;
        errors["mobileno"] = "*Please enter your mobile no.";
      }

      if (typeof fields["mobileno"] !== "undefined") {
        if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["mobileno"] = "*Please enter valid mobile no.";
        }
      }

      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password.";
        }
      }

      this.setState({
        errors: errors
      });
      return formIsValid;


    }



  render() {
    return (
    <div id="main-registration-container">
     <div id="register">
        <h3>Registration page</h3>
        <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
        <label>Name</label>
        <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.username}</div>
        <label>Email ID:</label>
        <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange}  />
        <div className="errorMsg">{this.state.errors.emailid}</div>
        <label>Mobile No:</label>
        <input type="text" name="mobileno" value={this.state.fields.mobileno} onChange={this.handleChange}   />
        <div className="errorMsg">{this.state.errors.mobileno}</div>
        <label>Password</label>
        <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.password}</div>
        <input type="submit" className="button"  value="Register"/>
        </form>
    </div>
</div>

      );
  }


}


export default RegisterForm;








const validate = (values) => {
  const errors = {};
  // name validation
  if (!values.name) {
    errors.name = 'Name is required'
  } else if (values.name.length < 20) {
    errors.name = 'Name must be at least 20 characters long'
  }
  // username validation
  if (!values.username) {
    errors.username = 'Username is required'
  } else if (!/^[A-Z%+-]+@[A-Z]$/i.test(values.username)) {
    errors.username = 'Invalid username address';
  }

  // email validation
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  //address validation 
  if (!values.address) {
    errors.address = 'Address is required'
  } else if (values.address.length < 100) {
    errors.address = 'Address must be at least 50 characters long'
  }

  //password 
  if (!values.password) {
    return "Password is required";
  } else if (values.password.length < 8) {
    return "Password must have a minimum 8 characters";
  }

  // confirm Password
  if (!values.confirmPassword) {
    return "Confirm password is required";
  } else if (values.confirmPassword.length < 8) {
    return "Confirm password must have a minimum 8 characters";
  } else if (values.confirmPassword !== values.password) {
    return "Passwords do not match";
  }

  // return errors 
  return errors;
}
export default validate;