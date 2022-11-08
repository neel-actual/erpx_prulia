# Copyright (c) 2013, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
from turtle import pos
import frappe
from frappe import _
import frappe.utils.response
from frappe.utils.pdf import get_pdf

def execute(filters=None):
	columns, data = get_columns(filters), get_data(filters)
	return columns, data

@frappe.whitelist(allow_guest=True)
def get_column_data():
	columns, data = get_columns(), get_data(None)
	html = """
	<style>
	table{
		 border-collapse: collapse;
	}
	table,
	table td,
	table th{
		border: solid 1px #ddd;
		border-spacing: 0px;
	}
	table th,
	table .th-tr{
		background:#ededed;
	}
	table .th-tr td{
		font-weight:600;
	}
	table td,
	table th{
		padding: 5px 5px;
		font-size:12px;
	}
	table, tr, td, th, tbody, thead, tfoot {
		page-break-inside: avoid !important;
	}
	</style>
	<h1> Prulia Membership and Event Report</h1>
	<table>
	<tr class="th-tr">
	<td>Prudential ID</td>
	<td>Full Name</td>
	<td>Positions</td>
	<td>Region</td>
	<td>Branch</td>
	<td>Cell Numbers</td>
	<td>Agency No</td>
	<td>Status</td>
	"""

	events = frappe.db.get_list('PRULIA Event',
		filters={
			'add_to_report': 1
		},
		fields=['event_name', 'name'],
		page_length=3,
		as_list=False
	)
	if events:
		for item in events:
			html += "<td>" + item.event_name + "</td>"
	
	html += """
	</tr>
	"""
	
	for item in data:
		html += "<tr>"
		html += "<td>" + item.prudential_id + "</td>"
		html += "<td>" + item.full_name + "</td>"
		html += "<td>" + item.position + "</td>"
		html += "<td>" + item.region + "</td>"
		html += "<td>" + item.branch + "</td>"
		html += "<td>" + item.cell_number + "</td>"
		html += "<td>" + item.agency_no + "</td>"
		html += "<td>" + item.user_status + "</td>"
		
		for i in events:
			html += "<td>" + item[i.name] + "</td>"
		html += "</tr>"
	html +="</table>"

	frappe.local.response.filename = "Prulia Membership and event report.pdf"
	frappe.local.response.filecontent = get_pdf(html, {"orientation": "Landscape"})
	frappe.local.response.type = "download"
	# frappe.local.response.display_content_as = "attachment"

	# return columns, data

def get_data(filters=None):
	# user = frappe.db.get_value('User', frappe.session.user, 'email') 

	# if user == None:
	# 	user = frappe.db.get_value('User', frappe.session.user, 'email') 

	user = frappe.db.get_value('User', frappe.session.user, 'email') 

	# user = "Wittonlam@erpx.com.my"

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

	events = frappe.db.get_list('PRULIA Event',
		filters={
			'add_to_report': 1
		},
		fields=['event_name', 'name'],
		page_length=3,
		as_list=False
	)
	ext_events = ""
	if events:
		for item in events:
			ext_events += ", if((select count(pa.name) from `tabPRULIA Attendee` pa left join `tabPRULIA Event` pe on pa.parent = pe.name where pa.member = pm.prudential_id and pe.event_name = '" + item.event_name + "' limit 1) > 0, 'Registered', '') as " + item.name + " "
			

	data = frappe.db.sql("""
	      SELECT
		  pm.prudential_id,
		  pm.full_name,
		  pm.position,
		  pm.branch,
		  pm.cell_number,
		  pm.user_status,
		IFNULL(pm.agency_no,"") as agency_no,
		  pm.region
		  %s
          FROM
         `tabPRULIA Member` pm

         WHERE
		 pm.docstatus=0
		 %s
		 order by pm.region, pm.branch, pm.agency_no, pm.full_name ASC
	"""% (ext_events,ext),as_dict=1)
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
		# {
		# 	"label":_("NRIC Number"),
		# 	"fieldname": "nric_number",
		# 	"fieldtype": "Data",
		# 	"width": 90
		# },
		{
			"label":_("Positions"),
			"fieldname": "position",
			"fieldtype": "Data",
			"width": 90
		},
		{
			"label":_("Region"),
			"fieldname": "region",
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
	events = frappe.db.get_list('PRULIA Event',
		filters={
			'add_to_report': 1
		},
		fields=['event_name', 'name'],
		as_list=False
	)
	if events:
		for item in events:
			columns += {
				"label":_(item.event_name),
				"fieldname": item.name,
				"fieldtype": "Data",
				"width": 90
			},

	return columns

