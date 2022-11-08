# -*- coding: utf-8 -*-
# Copyright (c) 2020, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals

import frappe
import json
from frappe.model.document import Document
from frappe.utils import nowdate


class PRULIAPA(Document):
    pass


@frappe.whitelist(allow_guest=True)
def attach_form(data):
    return json.loads(data)


@frappe.whitelist(allow_guest=True)
def submit_application(data):
    ret = json.loads(data)

    # member_doc = frappe.get_doc('PRULIA Member', ret.get('member'))
    # if member_doc.user_id != frappe.session.user:
    #     return throw(_("Unable to find member profile for {0}").format(
    #         frappe.session.user), frappe.DoesNotExistError)

    doc = frappe.get_doc({
        "doctype": "PRULIA PA"
    })
    doc.member = ret.get('member')
    doc.main_dob = ret.get('main_dob')
    doc.main_email = ret.get('main_email')
    doc.main_gender = ret.get('main_gender')
    doc.main_cell_number = ret.get('main_cell_number')
    doc.main_full_name = ret.get('main_full_name')
    doc.main_nric_number = ret.get('main_nric_number')
    doc.main_marital_status = ret.get('main_marital_status')
    doc.main_address = ret.get('main_address')
    doc.main_postcode = ret.get('main_postcode')
    doc.main_sign = ret.get('main_sign')

    doc.spouse_name = ret.get('spouse_name')
    doc.spouse_nric_number = ret.get('spouse_nric_number')
    doc.spouse_dob = ret.get('spouse_dob')

    doc.payment_method = ret.get('payment_method')
    doc.issuing_bank = ret.get('issuing_bank')
    doc.card_number = ret.get('card_number')
    doc.card_expiry = ret.get('card_expiry')
    doc.total = ret.get('total')
    doc.card_sign = ret.get('card_sign')
    doc.application_status = 'Pending Approval'
    doc.application_form = ret.get('application_form')
    doc.submission_date = nowdate()

    for child in ret.get('children_table'):
        doc.append('children_table', {
            'full_name': child['full_name'],
            'dob': child['dob']
        })

    doc.insert(ignore_permissions=True)

    return doc
