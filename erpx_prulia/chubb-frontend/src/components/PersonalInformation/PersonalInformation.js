import React from "react";
import "./PersonalInformation.scss";
import { withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Formik } from "formik";
import moment from "moment";

import {
  memberDetailsMap,
  CustomInput,
  getMemberDetails,
  getPrevReg
} from "../../helpers";

const getDOB = ic => {
  if (ic.match(/^(\d{2})(\d{2})(\d{2})-?\d{2}-?\d{4}$/)) {
    var year = RegExp.$1;
    var month = RegExp.$2;
    var day = RegExp.$3;

    var now = new Date().getFullYear().toString();

    var decade = now.substr(0, 2);
    if (now.substr(2, 2) > year) {
      year = parseInt(decade.concat(year.toString()), 10);
    } else year = "19" + year;

    var str = year + "-" + month + "-" + day;

    // if valid date, return date
    if (isValidDate(str)) return str;
  }

  return "";
};

const isValidDate = date => {
  return new Date(date).toString() !== "Invalid Date";
};

const getAge = dateOfBirth => {
  const dob = moment(dateOfBirth);

  return moment(new Date()).diff(dob, "years");
};

class PersonalInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regs: [],
      activeChild: 0
    };
  }

  goBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    if (this.props.state.populated) return;

    let key_pairs = memberDetailsMap(
      this.props.state.child ? this.props.state.childs : 0
    );
    let keys = Object.keys(key_pairs);
    let key_values = Object.values(key_pairs);

    keys.forEach(key => {
      this.props.gettingValues(
        {
          target: {
            value: ""
          }
        },
        key
      );
    });

        const query = new URLSearchParams(this.props.location.search);
        let code=query.get('prudential_id');


    getMemberDetails(code)
      .then(data => {
        key_values.forEach((key_value, index) => {
          if (data[key_value]) {
            this.props.gettingValues(
              {
                target: {
                  value: data[key_value]
                }
              },
              keys[index]
            );
          }
        });

        this.props.gettingValues(
          {
            target: {
              value: getDOB(data.nric_number)
            }
          },
          "mainInsuredBirthDate"
        );

        //get prev registration
        getPrevReg(this.props.state.member).then(regs => {
          regs = regs.filter(reg => {
            return (
              ["Approved", "Pending Approval"].indexOf(reg.application_status) >
              -1
            );
          });

          if (regs.length) {
            this.setState({
              regs: regs
            });
          }
        });
      })
      .catch(e => {
        console.error(e);
        window.alert("Please login to continue");
        window.location.href = "/";

        // let data = {
        //   creation: "2018-12-11 14:15:53.482815",
        //   send_password_update_notification: 0,
        //   membership_fee: 0,
        //   full_name: "Nicole Sherzinger",
        //   owner: "yapnicole93@gmail.com",
        //   user_status: "Active",
        //   modified_by: "Administrator",
        //   new_password: "",
        //   prudential_id: "0000001",
        //   highest_qualification: "SPM",
        //   office_number: "",
        //   branch: "Damansara Intan",
        //   docstatus: 0,
        //   email: "yapnicole93@gmail.com",
        //   home_phone: "",
        //   meal_option: "Non-Vegetarian",
        //   fax_number: "",
        //   logout_all_sessions: 0,
        //   promo_year: 0,
        //   nric_number: "900101-88-8888",
        //   doctype: "PRULIA Member",
        //   user_id: "yapnicole93@gmail.com",
        //   register_acknowledgement: 1,
        //   school: "",
        //   name: "0000001",
        //   idx: 5,
        //   cell_number: "6019-999 99999",
        //   field_of_study: "",
        //   gender: "Female",
        //   region: "Central3",
        //   modified: "2020-07-25 11:20:44.905880",
        //   profile_photo: "/files/person.png",
        //   race: "",
        //   shirt_size: "M",
        //   position: "QL",
        //   resign_year: 0,
        //
        //   address: "abc",
        //   spouse_name: "abc",
        //   spouse_nric_number: "901010-88-8888",
        //
        //   child_name0: "abc",
        //   child_dob0: "22-08-2019",
        //
        //   acknowledge_child: true
        // };
        //
        // key_values.forEach((key_value, index) => {
        //   if (data[key_value]) {
        //     this.props.gettingValues(
        //       {
        //         target: {
        //           value: data[key_value]
        //         }
        //       },
        //       keys[index]
        //     );
        //   }
        // });
        //
        // this.props.gettingValues(
        //   {
        //     target: {
        //       value: getDOB(data.nric_number)
        //     }
        //   },
        //   "mainInsuredBirthDate"
        // );
        //
        // getPrevReg(this.props.state.member).then(regs => {
        //   regs = regs.filter(reg => {
        //     return (
        //       ["Approved", "Pending Approval"].indexOf(reg.application_status) >
        //       -1
        //     );
        //   });
        //
        //   if (regs.length) {
        //     this.setState({
        //       regs: regs
        //     });
        //   }
        // });
      });
  }

  childActive = i => {
    this.setState({
      activeChild: i
    });
  };

  render() {
    return (
      <div className="personalInfoDiv">
        <div>
          <div className="topDiv">
            <svg
              onClick={this.goBack}
              style={{ cursor: "pointer" }}
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-chevron-left"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
            <p>Personal Information</p>
          </div>

          {this.state.regs.length !== 0 && (
            <div className="mainForm">
              <p>You have registered previously</p>
              {this.state.regs.map(reg => (
                <div key={reg.name}>
                  <h6 className="highlight">{reg.name}</h6>
                  <div>
                    <p>
                      Application status:{" "}
                      <span className="highlight">
                        {reg.application_status}
                      </span>
                    </p>
                    {reg.approval_date && (
                      <p>
                        Approval date:{" "}
                        <span className="highlight">{reg.approval_date}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <a href="/">Go to home</a>
            </div>
          )}

          {this.state.regs.length === 0 && (
            <div className="mainForm">
              {/* <div className="second">
                    <p>Complete Your Personal Details</p>
                    <Form.Check
                        type="radio"
                        label="Buy for myself"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                    />
                    <Form.Check
                        type="radio"
                        label="Buy for others"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                    />
                </div> */}

              <Formik
                enableReinitialize={true}
                initialValues={this.props.state.populated || this.props.state}
                validate={values => {
                  const errors = {};

                  if (!values.mainInsuredName)
                    errors.mainInsuredName = "Name is required";

                  if (!values.mainInsuredEmail) {
                    errors.mainInsuredEmail = "Email is required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.mainInsuredEmail
                    )
                  ) {
                    errors.mainInsuredEmail = "Invalid email address";
                  }

                  if (!values.mainInsuredNric) {
                    errors.mainInsuredNric = "NRIC is required";
                  } else if (
                    !/^\d{6}-\d{2}-\d{4}$/i.test(values.mainInsuredNric)
                  ) {
                    errors.mainInsuredNric = "Invalid NRIC";
                  } else {
                    let mainDOB = getDOB(values.mainInsuredNric);
                    if (mainDOB) {
                      if (!values.mainInsuredBirthDate) {
                        values.mainInsuredBirthDate = mainDOB;
                      }
                    } else {
                      errors.mainInsuredNric = "Invalid NRIC";
                    }
                  }

                  if (!values.mainInsuredBirthDate) {
                    errors.mainInsuredBirthDate = "Date of birth is required";
                  } else {
                    if (!isValidDate(values.mainInsuredBirthDate)) {
                      errors.mainInsuredBirthDate = "Date of birth is invalid";
                    }
                  }

                  if (!values.mainInsuredMobileNo)
                    errors.mainInsuredMobileNo = "Mobile Number is required";

                  if (!values.mainInsuredGender)
                    errors.mainInsuredGender = "Gender is required";

                  if (!values.mainInsuredStatus)
                    errors.mainInsuredStatus = "Marital status is required";

                  if (!values.mainInsuredAddress)
                    errors.mainInsuredAddress = "Address is required";

                  if (!values.mainInsuredPostcode)
                    errors.mainInsuredPostcode = "Postcode is required";
                  else if (values.mainInsuredPostcode.length < 5) {
                    errors.mainInsuredPostcode = "Invalid postcode";
                  }

                  if (this.props.state.spouse) {
                    if (!values.spouseName)
                      errors.spouseName = "Name is required";

                    if (!values.spouseNric) {
                      errors.spouseNric = "NRIC is required";
                    } else if (
                      !/^\d{6}-\d{2}-\d{4}$/i.test(values.spouseNric)
                    ) {
                      errors.spouseNric = "Invalid NRIC";
                    } else {
                      let spouseDOB = getDOB(values.spouseNric);
                      if (spouseDOB) {
                        if (!values.spouseBirthDate) {
                          values.spouseBirthDate = spouseDOB;
                        }
                      } else {
                        errors.spouseNric = "Invalid NRIC";
                      }
                    }

                    if (!values.spouseBirthDate) {
                      errors.spouseBirthDate = "Date of birth is required";
                    } else {
                      if (!isValidDate(values.spouseBirthDate)) {
                        errors.spouseBirthDate = "Date of birth is invalid";
                      }
                    }
                  }

                  if (this.props.state.child) {
                    Object.keys(values).forEach(key => {
                      if (key.startsWith("childName") && !values[key]) {
                        errors[key] = "Name is required";
                      }

                      if (key.startsWith("childBirthDate")) {
                        if (!isValidDate(values[key])) {
                          errors[key] = "Date of birth is invalid";
                        }

                        if (!getAge(values[key]))
                          errors[key] = "Date of birth is required";

                        if (
                          getAge(values[key]) < 1 ||
                          getAge(values[key]) > 23
                        ) {
                          errors[key] =
                            "The age is not eligible, only 1 to 23 years of age is eligible";
                        }
                      }
                    });

                    if (!values.acknowledge_child)
                      errors.acknowledge_child = "Please check the box";
                  }

                  Object.keys(values).forEach(key => {
                    this.props.gettingValues(
                      {
                        target: {
                          value: values[key]
                        }
                      },
                      key
                    );
                  });

                  console.error(errors);

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.props.gettingValues(
                    {
                      target: {
                        value: values
                      }
                    },
                    "populated"
                  );
                  setSubmitting(false);
                  this.props.history.push("/declaration");
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <form onSubmit={handleSubmit}>
                    {this.props.state.mainInsured && (
                      <div className="mainInsured">
                        <p>Main Insured</p>

                        <div className="inputGroup three">
                          <label>Full Name as per NRIC</label>
                          <input
                            type="text"
                            name="mainInsuredName"
                            value={values.mainInsuredName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={80}
                          />
                          <span className="error">
                            {errors.mainInsuredName &&
                              touched.mainInsuredName &&
                              errors.mainInsuredName}
                          </span>
                        </div>

                        <div className="inputGroup two three">
                          <label>Email</label>
                          <input
                            type="text"
                            name="mainInsuredEmail"
                            value={values.mainInsuredEmail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={80}
                          />
                          <span className="error">
                            {errors.mainInsuredEmail &&
                              touched.mainInsuredEmail &&
                              errors.mainInsuredEmail}
                          </span>
                        </div>

                        <div className="inputGroup two three">
                          <label>NRIC</label>
                          <CustomInput
                            type="text"
                            name="mainInsuredNric"
                            mask="999999-99-9999"
                            value={values.mainInsuredNric}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            >
                          </CustomInput>

                          <span className="error">
                            {errors.mainInsuredNric &&
                              touched.mainInsuredNric &&
                              errors.mainInsuredNric}
                          </span>
                        </div>

                        <div className="inputGroup two three">
                          <label>Mobile Number</label>
                          <CustomInput
                            type="text"
                            name="mainInsuredMobileNo"
                            mask="+6 019 999 99999"
                            value={values.mainInsuredMobileNo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            >
                          </CustomInput>

                          <span className="error">
                            {errors.mainInsuredMobileNo &&
                              touched.mainInsuredMobileNo &&
                              errors.mainInsuredMobileNo}
                          </span>
                        </div>

                        <div className="inputGroup two three">
                          <label>Date of Birth</label>
                          <input
                            name="mainInsuredBirthDate"
                            type="date"
                            value={values.mainInsuredBirthDate}
                            onChange={handleChange}
                          />
                          <span className="error">
                            {errors.mainInsuredBirthDate &&
                              errors.mainInsuredBirthDate}
                          </span>
                        </div>

                        <div className="inputGroup two three">
                          <label>Gender</label>
                          <div className="radioDiv">
                            <Form.Check
                              type="radio"
                              label="Male"
                              name="mainInsuredGender"
                              id="formHorizontalRadios1"
                              value="Male"
                              checked={values.mainInsuredGender === "Male"}
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Female"
                              name="mainInsuredGender"
                              id="formHorizontalRadios2"
                              value="Female"
                              checked={values.mainInsuredGender === "Female"}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="inputGroup two three">
                          <label>Marital Status</label>
                          <div className="radioDiv">
                            <Form.Check
                              type="radio"
                              label="Married"
                              name="mainInsuredStatus"
                              id="formHorizontalRadios3"
                              value="Married"
                              checked={values.mainInsuredStatus === "Married"}
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Single"
                              name="mainInsuredStatus"
                              id="formHorizontalRadios4"
                              value="Single"
                              checked={values.mainInsuredStatus === "Single"}
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Others"
                              name="mainInsuredStatus"
                              id="formHorizontalRadios5"
                              value="Others"
                              checked={values.mainInsuredStatus === "Others"}
                              onChange={handleChange}
                            />
                          </div>
                          <span className="error">
                            {errors.mainInsuredStatus &&
                              errors.mainInsuredStatus}
                          </span>
                        </div>

                        <div className="inputGroup two">
                          <label>Address</label>
                          <input
                            type="text"
                            name="mainInsuredAddress"
                            value={values.mainInsuredAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <span className="error">
                            {errors.mainInsuredAddress &&
                              errors.mainInsuredAddress}
                          </span>
                        </div>

                        <div className="inputGroup two three">
                          <label>Postcode</label>
                          <CustomInput
                            type="text"
                            name="mainInsuredPostcode"
                            mask="999999"
                            value={values.mainInsuredPostcode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            >
                          </CustomInput>

                          <span className="error">
                            {errors.mainInsuredPostcode &&
                              errors.mainInsuredPostcode}
                          </span>
                        </div>
                      </div>
                    )}

                    {this.props.state.spouse && (
                      <div className="mainInsured">
                        <p>Spouse</p>
                        <div className="inputGroup three">
                          <label>Full Name as per NRIC</label>
                          <input
                            type="text"
                            name="spouseName"
                            value={values.spouseName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={80}
                          />
                          <span className="error">
                            {errors.spouseName &&
                              touched.spouseName &&
                              errors.spouseName}
                          </span>
                        </div>

                        <div className="inputGroup two three">
                          <label>NRIC</label>
                          <CustomInput
                            type="text"
                            name="spouseNric"
                            mask="999999-99-9999"
                            value={values.spouseNric}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            >
                          </CustomInput>

                          <span className="error">
                            {errors.spouseNric &&
                              touched.spouseNric &&
                              errors.spouseNric}
                          </span>
                        </div>

                        <div className="inputGroup two three">
                          <label>Date of Birth</label>
                          <input
                            name="spouseBirthDate"
                            type="date"
                            value={values.spouseBirthDate}
                            onChange={handleChange}
                          />
                          <span className="error">
                            {errors.spouseBirthDate && errors.spouseBirthDate}
                          </span>
                        </div>
                      </div>
                    )}

                    {this.props.state.child && (
                      <div className="childMain">
                        <div className="tabs">
                          {Array.apply(null, {
                            length: this.props.state.childs
                          }).map((a, i) => {
                            return (
                              <div
                                className={
                                  this.state.activeChild === i ? "active" : ""
                                }
                                onClick={() => this.childActive(i)}
                                key={"tab" + i}
                              >
                                Child {i + 1}
                              </div>
                            );
                          })}
                        </div>

                        {Array.apply(null, {
                          length: this.props.state.childs
                        }).map((a, i) => {
                          return (
                            <>
                              <div
                                style={
                                  this.state.activeChild !== i
                                    ? {
                                        display: "none"
                                      }
                                    : {
                                        display: "flex"
                                      }
                                }
                                className="inputGroup"
                                key={"name" + i}
                              >
                                <label>Full Name as per NRIC</label>

                                <input
                                  type="text"
                                  name={`childName${i}`}
                                  maxLength={80}
                                  value={values[`childName${i}`]}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <span className="error">
                                  {errors[`childName${i}`] &&
                                    touched[`childName${i}`] &&
                                    errors[`childName${i}`]}
                                </span>
                              </div>
                              <div
                                style={
                                  this.state.activeChild !== i
                                    ? {
                                        display: "none"
                                      }
                                    : {
                                        display: "flex"
                                      }
                                }
                                className="inputGroup"
                                key={"dob" + i}
                              >
                                <label>Date of Birth</label>
                                <input
                                  className="three"
                                  type="date"
                                  name={`childBirthDate${i}`}
                                  value={values[`childBirthDate${i}`]}
                                  onChange={handleChange}
                                />
                                <span className="error">
                                  {errors[`childBirthDate${i}`] &&
                                    touched[`childBirthDate${i}`] &&
                                    errors[`childBirthDate${i}`]}
                                </span>
                              </div>
                            </>
                          );
                        })}

                        <div className="terms">
                          <div className="content">
                            <Form.Check
                              name="acknowledge_child"
                              value={values.acknowledge_child}
                              size="lg"
                              type="checkbox"
                              onChange={handleChange}
                            />
                            {/*I am a Malaysian or a permanent resident of Malaysia. In the event*/}
                            {/*I have opted to purchase the coverage for my spouse and/or*/}
                            {/*child(ren), I hereby confirm that my spouse and/or my child is a*/}
                            {/*Malaysia or a permanent resident of Malaysia, as the case may be.*/}
                            Eligible child are over 1 year of age and under 19
                            years of age (or 23 years of age if a fulltime
                            student at a recognized school, college or
                            university).
                          </div>
                          <span className="error">
                            {errors.acknowledge_child &&
                              errors.acknowledge_child}
                          </span>
                        </div>
                      </div>
                    )}

                    <button
                      className="next"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      NEXT
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(PersonalInformation);
