# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "erpx_prulia"
app_title = "PRULIA"
app_publisher = "Alpha Herald Management"
app_description = "ERP-X Extension for PRULIA"
app_icon = "fa fa-star-o"
app_color = "#ED1C24"
app_email = "support@erpx.com.my"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/erpx_prulia/css/erpx_prulia.css"
app_include_js = "/assets/js/erpx_prulia.min.js"

# include js, css files in header of web template
# web_include_css = "/assets/erpx_prulia/css/erpx_prulia.css"
# web_include_js = "/assets/erpx_prulia/js/erpx_prulia.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "erpx_prulia.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "erpx_prulia.install.before_install"
after_install = "erpx_prulia.install.after_install"

boot_session = "erpx_prulia.boot.boot_session"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "erpx_prulia.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"erpx_prulia.tasks.all"
# 	],
# 	"daily": [
# 		"erpx_prulia.tasks.daily"
# 	],
# 	"hourly": [
# 		"erpx_prulia.tasks.hourly"
# 	],
# 	"weekly": [
# 		"erpx_prulia.tasks.weekly"
# 	]
# 	"monthly": [
# 		"erpx_prulia.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "erpx_prulia.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
override_whitelisted_methods = {
	"frappe.core.doctype.user.user.update_password": "erpx_prulia.prulia_members.doctype.prulia_member.prulia_member.update_password"
}


# Overriding Whitelisted Methods
# ------------------------------
#
fixtures = ["Property Setter", "Custom Field"]