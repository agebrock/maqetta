define([
	"dojo/_base/declare",
	"davinci/actions/Action",
	"davinci/Runtime",
	"dojox/widget/Toaster",
	"dojo/i18n!./nls/actions"
], function(declare, Action, Runtime, Toaster, nls) {

if (typeof davinci.review.actions === "undefined") {
	davinci.review.actions = {};
}

var OpenVersionAction = davinci.review.actions.OpenVersionAction = declare("davinci.review.actions.OpenVersionAction", Action, {

	run: function(context) {
		var selection = Runtime.getSelection();
		if (!selection)  { 
			return;
		}
		var item = selection[0].resource.elementType=="ReviewFile"?selection[0].resource.parent:selection[0].resource;
		var location = davinci.Workbench.location().match(/http:\/\/.*:\d+\//);
		dojo.xhrGet({
			url: location + "maqetta/cmd/managerVersion",
			sync:false,
			handleAs:"text",
			content:{
				'type' :'open',
				'vTime':item.timeStamp}
		}).then(function (result) {
			if (result=="OK") {
				if (typeof hasToaster == "undefined") {
					new Toaster({
						position: "br-left",
						duration: 4000,
						messageTopic: "/davinci/review/resourceChanged"
					});
					hasToaster = true;
				}
				dojo.publish("/davinci/review/resourceChanged", [{message:nls.openSuccessful, type:"message"},"open",item]);
			}
		});
	},

	shouldShow: function(context) {
		return true;
	},

	isEnabled: function(context) {
		if (davinci.Runtime.getRole()!="Designer") { 
			return false;
		}
		var selection = davinci.Runtime.getSelection();
		if (!selection || selection.length == 0) { 
			return false;
		}
		var item = selection[0].resource.elementType=="ReviewFile"?selection[0].resource.parent:selection[0].resource;
		if (item.closed&&item.closedManual&&!item.isDraft) { 
			return true;
		}
		return false;
	}

});

return OpenVersionAction;

});