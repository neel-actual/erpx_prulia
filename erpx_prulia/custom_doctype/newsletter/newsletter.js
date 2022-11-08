frappe.ui.form.on('Newsletter', {
        refresh(frm) {

	if(!frm.doc.__islocal && !cint(frm.doc.email_sent) && !frm.doc.__unsaved) {

        frm.add_custom_button('Send Email', () => {
            frappe.call({
                //'method': 'erpx_prulia.custom_doctype.newsletter.newsletter.send_email_sendin_blue',
                'method': 'erpx_prulia.prulia_members.doctype.newsletter.send_email_sendin_blue',
                'args':{
                    doc: frm.doc
                },
                callback: (r) => {
		    frm.set_value('email_sent', 1 )
		    //cur_frm.refresh();
			window.location.reload();
                    console.log(r)
                },
                error: (r) => {
                    console.log(r)
                }
            });
        })
        }

	}
})
