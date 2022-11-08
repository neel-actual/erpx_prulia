# Copyright (c) 2013, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
from turtle import pos
import frappe
from frappe import _

def execute(filters=None):
	columns, data = get_columns(filters), get_data(filters, None)
	return columns, data

@frappe.whitelist()
def get_column_data():
	columns, data = get_columns(), get_data(None)
	return columns, data

def get_data(filters=None):
	# user = frappe.db.get_value('User', frappe.session.user, 'email') 

	# if user == None:
	# 	user = frappe.db.get_value('User', frappe.session.user, 'email') 

	user = frappe.db.get_value('User', frappe.session.user, 'email') 

	# user = "wittonlam@gmai.com"

	data = frappe.get_doc('PRULIA Member', {'user_id': user})

	get_branch = frappe.db.sql("""select branch from `tabPRULIA Newsletter Branch` where parent = %s """, (data.name), as_dict = True)
	if get_branch != []:
		branch = '\''+ '\',\''.join([d['branch'] for d in get_branch]) + '\''

	position = []
	get_position = frappe.db.sql("""select position from `tabPRULIA Newsletter Position` where parent = %s """, (data.name),as_dict = True)
	if get_position != []:
		position = [d['position'] for d in get_position]

	ext = ""
	if data.position == "BD" or data.position == 'CO':
		if get_branch == []:
			ext = " and branch = '" + data.branch + "'"
		else:
			ext = " and branch in ('" + data.branch + "', " + branch + ")"
		
		if 'QL' in position:
			ext += " or agency_no like '" + data.agency_no[:3] + "%'"
		
		if 'QA' in position:
			return
	
	if data.position == 'QL':
		ext = " and agency_no like '" + data.agency_no[:3] + "%'"
		if get_position != []:
			if 'BD' in position or 'CO' in position:
				if get_branch == []:
					ext += " or branch = '" + data.branch + "'"
				else:
					ext += " or branch in ('" + data.branch + "', " + branch + ")"

			if 'QA' in position:
				return
		else:
			if get_branch != []:
				ext += " or branch in ('" + data.branch + "', " + branch + ")"

	if data.position == 'QA':
		return

	# frappe.throw(data.branch + ' - ' + data.position + ' - ' + ext)

	data = frappe.db.sql("""
	      SELECT
		  pm.prudential_id,
		  pm.full_name,
		  pm.nric_number,
		  pm.position,
		  pm.branch,
		  pm.cell_number,
		  pm.user_status,
		  pm.agency_no

          FROM
         `tabPRULIA Member` pm

         WHERE
		 pm.docstatus=0
		 %s
		 order by pm.agency_no
	"""% (ext),as_dict=1)
	return data	

def get_columns(filters=None):
	columns =[
		{
			"label":_("Prudential ID"),
			"fieldname": "prudential_id",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("Full Name"),
			"fieldname": "full_name",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("NRIC Number"),
			"fieldname": "nric_number",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("Positions"),
			"fieldname": "position",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("Branch"),
			"fieldname": "branch",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("Cell Numbers"),
			"fieldname": "cell_number",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("Agency No"),
			"fieldname": "agency_no",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("Status"),
			"fieldname": "user_status",
			"fieldtype": "Data",
			"width": 90
		},
	]
	return columns
