import InputMask from "react-input-mask";
import React from "react";
import axios from "axios";

window.axios = axios;

export const memberDetailsMap = (childNum) => {
    let key_pair = {
        member: 'prudential_id',
        mainInsuredBirthDate: "dob",
        mainInsuredEmail: "email",
        mainInsuredGender: "gender",
        mainInsuredMobileNo: "cell_number",
        mainInsuredName: "full_name",
        mainInsuredNric: "nric_number",
        mainInsuredStatus: "marital_status",
        mainInsuredAddress: 'address',
        mainInsuredPostcode: 'postcode',

        spouseName: 'spouse_name',
        spouseNric: 'spouse_nric_number',
        spouseBirthDate: 'spouse_dob',
    };

    for (let i = 0; i < childNum; i++) {
        key_pair[`childName${i}`] = `child_name${i}`;
        key_pair[`childBirthDate${i}`] = `child_dob${i}`;
    }

    return key_pair;
};

export function getMemberDetails() {
    return axios
        .get(
            "/api/method/erpx_prulia.prulia_members.doctype.prulia_member.prulia_member.mobile_member_login"
        )
        .then((data) => {
            return data && data.data && data.data.message;
        });
}

export function getPrevReg(member_id) {
    return fetch("/", {
        "headers": {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        "body": "doctype=PRULIA+PA&filters=%7B%22member%22%3A%22" + member_id+ "%22%7D&fields=%5B%22name%22%2C%22member%22%2C%22application_status%22%2C%22approval_date%22%5D&cmd=frappe.client.get_list",
        "method": "POST",
        "credentials": "include"
    })
        .then(response => response.json())
        .then(data => {
            return data && data.message || [];
        }).catch((e) => {
            console.error(e);
            return [];
        })
}

export function getURL() {
    return window.location.hostname.includes("localhost")
        ? "http://167.99.77.197/"
        : "/";
}

export const CustomInput = props => (
    <InputMask {...props}>{inputProps => <input {...inputProps} />}</InputMask>
);