/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./PersonalAccidentInsurance.scss";
import { Accordion, Card, Button, Form } from "react-bootstrap";
import pdfIcon from "./images/pdfIcon.svg";
import { Link, withRouter } from "react-router-dom";

class PersonalAccidentInsurance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="mainDivPersonal">
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
          <p>Personal Accident Insurance</p>
        </div>
        <div className="formDiv">
          <Accordion>
            <Card>
              <Card.Header>
                <div className="expansionHeader">
                  <h5>
                    RM{this.props.state.premiums.mainInsured} Annual Premium
                  </h5>
                  <div className="second">
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        defaultChecked={this.props.state.mainInsured}
                        value={this.props.state.mainInsured}
                        onChange={e => this.props.getChecked(e, "mainInsured")}
                        size="lg"
                        type="checkbox"
                      />
                    </Form.Group>
                    <div id="formBasicCheckbox" className="insideSecond">
                      <h6>Main Insured</h6>
                      <p>
                        Accident, Death or TPD <br />
                        <span>RM1,000,000</span>
                      </p>
                    </div>
                    <div className="iconDiv">
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-caret-down-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                      </Accordion.Toggle>
                    </div>
                  </div>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <p>Accident, Death or Total & Permanent Disability</p>
                  <span>RM1,000,000</span>

                  <p>Funeral Expenses</p>
                  <span>RM3,000</span>

                  <p>Medical</p>
                  <span style={{ marginBottom: 0 }}>RM5,000</span>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <div className="expansionHeader">
                  <h5>RM{this.props.state.premiums.spouse} Annual Premium</h5>
                  <div className="second">
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        defaultChecked={this.props.state.spouse}
                        value={this.props.state.spouse}
                        onChange={e => this.props.getChecked(e, "spouse")}
                        size="lg"
                        type="checkbox"
                      />
                    </Form.Group>
                    <div id="formBasicCheckbox" className="insideSecond">
                      <h6>Spouse (Optional)</h6>
                      <p>
                        Accident, Death or TPD <br />
                        <span>RM1,000,000</span>
                      </p>
                    </div>
                    <div className="iconDiv">
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-caret-down-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                      </Accordion.Toggle>
                    </div>
                  </div>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <p>Accident, Death or Total & Permanent Disability</p>
                  <span>RM1,000,000</span>

                  <p>Funeral Expenses</p>
                  <span>RM3,000</span>

                  <p>Medical</p>
                  <span style={{ marginBottom: 0 }}>RM5,000</span>
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Card.Header>
                <div className="expansionHeader">
                  <h5>RM{this.props.state.premiums.child} / Child</h5>
                  <div className="second">
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        defaultChecked={this.props.state.child}
                        value={this.props.state.child}
                        onChange={e => this.props.getChecked(e, "child")}
                        size="lg"
                        type="checkbox"
                      />
                    </Form.Group>
                    <div id="formBasicCheckbox" className="insideSecond">
                      <h6>Eligible Child (Optional)</h6>
                      <p>
                        Accident, Death or TPD
                        <br />
                        <span>RM100,000 each</span>
                      </p>
                    </div>
                    <div className="iconDiv">
                      <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-caret-down-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                      </Accordion.Toggle>
                    </div>
                  </div>
                  {this.props.state.childs && (
                    <div className="third">
                      <label>Child/s :</label>
                      <select
                        value={this.props.state.childs}
                        onChange={e => this.props.gettingValues(e, "childs")}
                        type="number"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                      </select>
                    </div>
                  )}
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <p>Accident, Death or Total & Permanent Disability</p>
                  <span>RM100,000</span>

                  <p>Funeral Expenses</p>
                  <span>RM3,000</span>

                  <p>Medical</p>
                  <span style={{ marginBottom: 0 }}>RM5,000</span>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <hr />
          <div className="total">
            <label>Total</label>
            <span>RM{this.props.state.total}</span>
          </div>

          <div className="lastPrivacy">
            <p className="p1">
              Subject to terms, conditions and exclusion in policy wording.
            </p>
            <p className="p2">
              This product is underwritten by Chubb Insurance Malaysia Berhad
              (“Chubb”) and is distributed by PRULIA Sdn Bhd as the registered
              agent of Chubb. Chubb is a general insurer licensed under the
              Financial Services Act 2013 and regulated by Bank Negara Malaysia.
              The details provided herein is not complete and for you to know
              more of this insurance product, please read the Policy Wordings
              and Product Disclosure Sheet.
            </p>
          </div>

          <div>
            <a href="" download></a>
          </div>

          <div className="pdfDiv">
            <div className="div">
              <img src={pdfIcon} />{" "}
              <a
                href={`${process.env.PUBLIC_URL}/assets/files/chubb_pa_wordings.pdf`}
                download
              >
                Chubb PA Wordings
              </a>
            </div>
            <div className="div">
              <img src={pdfIcon} />{" "}
              <a
                href={`${process.env.PUBLIC_URL}/assets/files/product_disclosure_sheet.pdf`}
                download
              >
                Product Disclosure Sheet (PDS)
              </a>
            </div>
            {/*<div className="div">*/}
            {/*  <img src={pdfIcon} />{" "}*/}
            {/*  <a*/}
            {/*    href={`${process.env.PUBLIC_URL}/assets/files/prulia_endorsement_up_to_age_80.pdf`}*/}
            {/*    download*/}
            {/*  >*/}
            {/*    PRULIA Endorsement*/}
            {/*  </a>*/}
            {/*</div>*/}
            {/*<div className="div"><img src={pdfIcon}/> <a href="#">Personal Data Protection Notice</a></div>*/}
            {/*<div className="div"><img src={pdfIcon}/> <a href="#">Declaration And Authorization</a></div>*/}
            {/*<div className="div"><img src={pdfIcon}/> <a href="#">Eligibility Criteria</a></div>*/}
          </div>

          {this.props.state.total != 0 && (
            <div className="buttonDiv">
              <Link to="/personal-information">ENROLL NOW</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(PersonalAccidentInsurance);
