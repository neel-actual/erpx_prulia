# Copyright (c) 2013, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _

def execute(filters=None):
	columns, data = get_columns(filters), get_data(filters)
	return columns, data

@frappe.whitelist()
def get_column_data():
	columns, data = get_columns(), get_data(None)
	return columns, data

def get_data(filters=None):
	# user = frappe.db.get_value('User', frappe.session.user, 'email') 

	user = frappe.db.get_value('User', frappe.session.user, 'email') 

	# user = "yehang.95@hotmail.com"

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
			ext = " and pm.branch = '" + data.branch + "'"
		else:
			ext = " and pm.branch in ('" + data.branch + "', " + branch + ")"
		
		if 'QL' in position:
			ext += " or pm.agency_no like '" + data.agency_no[:3] + "%'"
		
		if 'QA' in position:
			return
	
	if data.position == 'QL':
		ext = " and pm.agency_no like '" + data.agency_no[:3] + "%'"
		if get_position != []:
			if 'BD' in position or 'CO' in position:
				if get_branch == []:
					ext += " or pm.branch = '" + data.branch + "'"
				else:
					ext += " or pm.branch in ('" + data.branch + "', " + branch + ")"

			if 'QA' in position:
				return
		else:
			if get_branch != []:
				ext += " or pm.branch in ('" + data.branch + "', " + branch + ")"

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
		  pm.agency_no,
		  pa.attendance,
		  pa.reg_datetime,
		  pe.fees,
		  pe.start_date_time,
		  pm.shirt_size,
		  pm.meal_option,
		  pe.event_name


          FROM
         `tabPRULIA Member` pm
		 RIGHT JOIN `tabPRULIA Attendee` pa on pa.member = pm.name
		 LEFT JOIN `tabPRULIA Event` pe on pe.name = pa.parent

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
		{
			"label":_("Event Name"),
			"fieldname": "event_name",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("Event T & D"),
			"fieldname": "start_date_time",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("Shirt Size"),
			"fieldname": "shirt_size",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("Meal Option"),
			"fieldname": "meal_option",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("Attendence"),
			"fieldname": "attendence",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("Reg Date"),
			"fieldname": "reg_datetime",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("Fees"),
			"fieldname": "fees",
			"fieldtype": "Data",
			"width": 90
		},
	]
	return columns

