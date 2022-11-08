// Copyright (c) 2016, Alpha Herald Management and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Prulia Member Library Events"] = {
	"filters": [

	],
	onload: function(report) {
		report.page.add_inner_button(__("Download Excel"), function() {
			debugger;
			var me = report;
			me.title = report.report_name;
			console.log(me);
			console.log(report);

			frappe.call({
				method: "erpx_prulia.prulia_members.report.prulia_member_library_events.prulia_member_library_events.get_column_data", 
				args: {
				},
				callback: function(res){
					console.log(res)
					var view_data = []
					var column = []
					
					for(var i in res.message[0]){
						column[i]= res.message[0][i]['label']
					}
					view_data[0]= column;
					var k = 1;
					for(var i in res.message[1]){
						var row = []
						for(var j in res.message[0]){
							row[j]= res.message[1][i][res.message[0][j]['fieldname']];
							if(!row[j]){
								row[j] = ""
							}
						}
						view_data[k]= row;
						k++;
					}
					var result = view_data.map(row => row.splice(0));

					frappe.tools.downloadify(result, null, me.title);
				}
			});
		});
	},
}
