import frappe
import requests
import json

from frappe import throw, _
from frappe.utils import validate_email_add

@frappe.whitelist()
def send_email_sendin_blue(doc):
    doc = json.loads(doc)
    #frappe.msgprint(doc['email_group'][0]['email_group'])

    docname = frappe.get_doc('Newsletter', doc.get('name'))

    if docname.email_sent:
       throw(_("Newsletter has already been sent"))

    attachments = []
    if doc.get('send_attachements'):
	files = frappe.get_all("File", fields = ["file_name", "file_url"], filters = {"attached_to_doctype": "Newsletter",
		"attached_to_name":docname.name, "is_private":0}, order_by="creation desc")

	for file in files:
	    try:
	        # these attachments will be attached on-demand
		# and won't be stored in the message
		attachments.append({"url": frappe.utils.get_url() + file.file_url, "name": file.file_name})
	    except IOError:
		frappe.throw(_("Unable to find attachment {0}").format(file.name))


    emails = frappe.db.sql("""
        select email from `tabEmail Group Member` where email_group = %s
    """, (doc['email_group'][0]['email_group']), as_dict = True)
    try:
        url = "https://api.sendinblue.com/v3/smtp/email"

        headers= {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': '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'
        }

	input_emails = []
	for email in emails:
	    #single_email = {"email": email}
	    #input_emails.append(single_email)
	    input_emails.append(email)


	email = validate_email_add(docname.send_from, True)

	data = {
	    "sender":{
		 "email": email,
		 #"name": name
	    },
	    "subject":doc['subject'],
	    "htmlContent":"<!DOCTYPE html><html><body><p>" + doc['message'] + "</p></body></html>",
	    "messageVersions":[
		 {
		     "to":input_emails,
		     #"htmlContent":"<!DOCTYPE html><html><body><h1>Modified header!</h1><p>"+ doc['message'] +"</p></body></html>",
		     "subject":doc['subject']
		 }
	     ]
	}

	if attachments:
	    data["attachment"] = attachments

        r = requests.post(url=url, json=data, headers=headers)
        docname.flags.ignore_permissions = True
        docname.email_sent = 1
        docname.save()
        return json.loads(r.content)
    except Exception as ex:
        return ex
