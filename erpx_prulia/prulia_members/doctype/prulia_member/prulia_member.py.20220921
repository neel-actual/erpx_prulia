# -*- coding: utf-8 -*-
# Copyright (c) 2017, Alpha Harald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe, json
from frappe import throw, _
from frappe.utils import getdate, validate_email_add, today
from frappe.model.document import Document
from collections import namedtuple


class PRULIAMember(Document):
	__new_password = None
	__send_password_update_notification = None
	__logout_all_sessions = None
	def validate(self):
		self.validate_date()
		self.validate_email()
		self.validate_branch()
		self.update_region()
		if self.register_acknowledgement != 1:
			throw(_("You did not click the 'Acknowledgement' checkbox. If you do agree to the terms and conditions, please ensure you check the box before continuing. "))
		
		if self.user_id:
			self.validate_duplicate_user_id()			
		
		if frappe.db.exists("PRULIA Member", self.name):
			existing_member = frappe.get_doc("PRULIA Member", self.name)
			if existing_member.prudential_id != self.prudential_id:
				self.validate_prudential_id()
			if self.user_id is None and existing_member.user_id:
				frappe.permissions.remove_user_permission("PRULIA Member", self.name, existing_member.user_id)

		# clear new password
		self.__new_password = self.new_password
		self.new_password = ""

		self.__send_password_update_notification = self.send_password_update_notification
		self.send_password_update_notification = 0

		self.__logout_all_sessions = self.logout_all_sessions
		self.logout_all_sessions = ""

	def run_post_save_methods(self):
		#Autocreate User
		if self.user_status in ["Active"]:
			if self.user_id is None:
				if frappe.db.exists("User", self.email):
					self.user_id = self.email
				else:
					self.user_id = self.create_user(self)
			else:
				self.activateUser(self.user_id, True)

		elif self.user_id is not None: #deactivate user access
			self.activateUser(self.user_id, False)
		
		#sync userid with email and owner
		if self.user_id:
			self.update_user()
			if(self.user_status == 'Active'):
				if(self.user_id is not self.email):
					self.email = self.user_id

				if(self.user_id is not self.owner):
					self.owner = self.user_id
			else:
				self.user_id = ""
		self.db_update()

	def validate_date(self):
		if self.date_of_birth and getdate(self.date_of_birth) > getdate(today()):
			throw(_("Date of Birth cannot be greater than today."))

	def validate_email(self):
		if self.email:
			validate_email_add(self.email, True)

	def validate_prudential_id(self):
		user = frappe.db.sql_list("""select name from `tabUser` where
			username=%s """, (self.prudential_id))

		if user:
			throw(_('Prudential ID {0} already exist in the system').format(
				self.prudential_id), frappe.DuplicateEntryError)

	def validate_duplicate_user_id(self):
		member = frappe.db.sql_list("""select name from `tabPRULIA Member` where
			user_id=%s and user_status='Active' and name!=%s""", (self.user_id, self.name))
		if member:
			throw(_("User {0} is already assigned to Member {1}").format(
				self.user_id, member[0]), frappe.DuplicateEntryError)

	def validate_branch(self):
		if self.region:
			branch = frappe.db.sql_list("""select name from `tabPRULIA Branch` where
				name=%s and region=%s""", (self.branch, self.region))
			if not branch:
				throw(_("Branch {0} is not a valid branch for region {1}").format(
					self.branch, self.region))

	def update_region(self):
		branch = frappe.get_doc("PRULIA Branch", self.branch)
		self.region = branch.region

	def update_user(self):
		# add employee role if missing
		user = frappe.get_doc("User", self.user_id)
		user.flags.ignore_permissions = True

		if(self.user_status != "Active"):
			user.enabled = 0
		else:
			user.enabled = 1
			if "PRULIA Member" not in [user_role.role for user_role in user.get("roles")]:
				user.add_roles("PRULIA Member")

			# copy details like Fullname, DOB and Image to User
			if self.full_name :
				user.first_name = self.full_name

			if self.date_of_birth:
				user.birth_date = self.date_of_birth

			if self.gender:
				user.gender = self.gender

			if self.profile_photo:
				if not user.user_image:
					user.user_image = self.profile_photo
					try:
						frappe.get_doc({
							"doctype": "File",
							"file_name": self.profile_photo,
							"attached_to_doctype": "User",
							"attached_to_name": self.user_id
						}).insert()
					except frappe.DuplicateEntryError:
						# already exists
						pass

			if self.__new_password:
				user.new_password = self.__new_password
				if self.__send_password_update_notification:
					user.send_password_update_notification = self.__send_password_update_notification
				if self.__logout_all_sessions:
					user.logout_all_sessions = self.__logout_all_sessions
		user.save()

	def activateUser(self, userid = None, activate = True):
		# add employee role if missing
		if(frappe.db.exists("User", userid)):
			user = frappe.get_doc("User", userid)
			if user.enabled != activate:
				user.flags.ignore_permissions = True
				user.enabled = activate
				user.save()


	def create_user(self, member, user = None):
		user = frappe.get_doc({
			"doctype": "User",
			"name": member.full_name,
			"email": member.email,
			"enabled": 1,
			"first_name": member.full_name,
			"gender": member.gender,
			"birth_date": member.date_of_birth,
			"phone": member.cell_number,
			"username": member.prudential_id
		})
		user.flags.no_welcome_email = True
		user.flags.ignore_permissions = True
		if self.__new_password:
				user.new_password = self.__new_password
				if self.__send_password_update_notification:
					user.send_password_update_notification = self.__send_password_update_notification
				if self.__logout_all_sessions:
					user.logout_all_sessions = self.__logout_all_sessions
		else:
			from frappe.utils import random_string
			user.new_password = random_string(10)
		user.insert(ignore_permissions=True)
		user.add_roles("PRULIA Member")
		return user.name

@frappe.whitelist(allow_guest=True)
def update_password(new_password, key=None, old_password=None):
	from frappe.core.doctype.user import user as _core_user
	result = _core_user.test_password_strength(new_password, key, old_password)
	feedback = result.get("feedback", None)

	if feedback and not feedback.get('password_policy_validation_passed', False):
		_core_user.handle_password_test_fail(result)

	res = _core_user._get_user_for_update_password(key, old_password)
	if res.get('message'):
		return res['message']
	else:
		user = res['user']

	_core_user._update_password(user, new_password)

	user_doc, redirect_url = _core_user.reset_user_data(user)
	# return user_doc.roles
	is_prulia_member = False
	for user_role in user_doc.roles:
		if user_role.role == "PRULIA Member":
			is_prulia_member = True
			break

	if is_prulia_member:
		return "/password_changed"
	else:
		# get redirect url from cache
		redirect_to = frappe.cache().hget('redirect_after_login', user)
		if redirect_to:
			redirect_url = redirect_to
			frappe.cache().hdel('redirect_after_login', user)

		frappe.local.login_manager.login_as(user)
		if user_doc.user_type == "System User":
			return "/desk"
		else:
			return redirect_url if redirect_url else "/"

@frappe.whitelist(allow_guest=True)
def forget_password(data):
	dat = json.loads(data)
	doc = frappe.get_doc('PRULIA Member', dat.get('prulia_id'))
	if doc:
		if doc.nric_number == dat.get('nric_number'):
			if doc.user_status == 'Active':
				doc.flags.ignore_permissions = True
				from frappe.utils import random_string
				doc.new_password = random_string(10)
				doc.send_password_update_notification = True
				doc.save()
				return "Please check your email at {0} for your temporary login credential".format(doc.email)
			elif doc.user_status == 'Pending Activation':
				doc.flags.ignore_permissions = True
				doc.user_status = 'Active'
				doc.save()
				return 'Your account is activated, please check your email at {0} for your temporary login credential'.format(doc.email)
			elif doc.user_status == 'Pending Approval':
				return 'Your application is still pending for approval'
			else:
				return "Your account is inactive, please contact PRULIA App Admin to reactivate"
		else:
			return _("Wrong NRIC Number given for PRULIA Member {0}").format(dat.get('prulia_id'))
	else:
		return _("PRULIA Member {0} not found").format(dat.get('prulia_id'))


@frappe.whitelist()
def mobile_member_login():
	member_name = frappe.db.sql_list("""select name from `tabPRULIA Member` where
			user_id=%s and user_status='Active'""", (frappe.session.user))
	if not member_name:
		throw(_("Unable to find member profile for {0}").format(
			frappe.session.user), frappe.DoesNotExistError)
	else:
		member = frappe.get_doc('PRULIA Member', member_name[0])
		return member

@frappe.whitelist()
def update_member_pref(data):
	dat = json.loads(data)
	doc = frappe.get_doc('PRULIA Member', dat.get('name'))
	if doc.user_id == frappe.session.user:
		doc.flags.ignore_permissions = True
		doc.full_name = dat.get('full_name')
		doc.nric_number = dat.get('nric_number')
		doc.gender = dat.get('gender')
		doc.cell_number = dat.get('cell_number')
		doc.email = dat.get('email')
		doc.meal_option = dat.get('meal_option')
		doc.shirt_size = dat.get('shirt_size')
		doc.profile_photo = dat.get('profile_photo')
		doc.save()
		return doc
	else:
		throw(_("Unable to find member profile for {0}").format(
			frappe.session.user), frappe.DoesNotExistError)

@frappe.whitelist()
def get_main_page_content():
	main_page = {}
	return main_page
