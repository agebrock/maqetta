define([
	"dojo/_base/declare",
	"davinci/review/actions/_DrawingCommon",
	"davinci/Runtime"
], function(declare, _DrawingCommon, Runtime) {

if (typeof davinci.review.actions === "undefined") {
	davinci.review.actions = {};
}

var EllipseAction = davinci.review.actions.EllipseAction = declare("davinci.review.actions.EllipseAction", _DrawingCommon, {

	run: function(context) {
		this.inherited(arguments);
		var commentPalette = dijit.byId("davinci.review.comment");
		if(!commentPalette._commentForm.isShowing) {
			return;
		}
		var surface = this.doc.annotationSurface, 
		createTool = surface.createTool;

		createTool.deactivate();
		createTool.setShape("Ellipse", {
			colorAlias: surface.currentReviewer,
			a2c: dojo.hitch(Runtime, Runtime.getColor),
			commentId: surface.commentId,
			state: ""
		});
		createTool.activate();
	}

});

return EllipseAction;

});
