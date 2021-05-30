# -*- coding: utf-8 -*-
# Copyright (c) 2021, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe, json
from frappe.utils import now_datetime
from frappe.model.document import Document
from erpx_prulia.prulia_members.doctype.prulia_member.prulia_member import mobile_member_login

class PRULIAPedia(Document):
	pass

@frappe.whitelist()
def get_pedia_meta():
    meta = frappe.get_meta('PRULIA Pedia')
    return meta


@frappe.whitelist()
def get_pedia_posts(data):
	dat = json.loads(data)
	docs = frappe.get_all('PRULIA Pedia',
							fields=['*'],
							filters=[
								('PRULIA Pedia', "published", "=", True),
								('PRULIA Pedia', "title", "LIKE", "%"+dat.get('search')+"%")
							],
							order_by='published_date desc')
	return docs


@frappe.whitelist()
def get_pedia_comments(data):
	dat = json.loads(data)
	docs = frappe.get_all('PRULIA Pedia Comment',
							fields=['*'],
							filters=[
								('PRULIA Pedia Comment', "parent", "=", dat.get('id')),
							],
							order_by='comment_date desc')
	return docs


@frappe.whitelist()
def create_new_post(data):
    dat = json.loads(data)
    doc = frappe.new_doc("PRULIA Pedia")

    doc.flags.ignore_permissions = True
    doc.flags.ignore_mandatory = True

    for key in dat:
        doc.set(key, dat.get(key))
    doc.published_date = now_datetime()
    member = mobile_member_login()
    doc.prudential_id = member.name

    doc.save()

    return doc


@frappe.whitelist()
def add_comment(data):
	dat = json.loads(data)
	doc = frappe.new_doc("PRULIA Pedia Comment")

	doc.flags.ignore_permissions = True
	doc.flags.ignore_mandatory = True
	
	for key in dat:
		doc.set(key, dat.get(key))
	doc.parent = dat.get('parent')
	doc.comment_date = now_datetime()
	member = mobile_member_login()
	doc.commenter = member.name

	doc.save()

	return doc