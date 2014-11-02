$(document).ready(function() {

	// Bootstrap the tables
	$('table').addClass('table table-striped table-bordered table-hover table-condensed');

	// Prettify the <pre> tags
	$('[class^="language-"]').closest('pre').addClass('prettyprint theme-freshcut');

	// Dynamic callouts
	$("blockquote:contains(Attention)").addClass('bs-callout bs-callout-danger');
	$("blockquote:contains(Danger)").addClass('bs-callout bs-callout-danger');

	$("blockquote:contains(Warning)").addClass('bs-callout bs-callout-warning');
	$("blockquote:contains(Notice)").addClass('bs-callout bs-callout-warning');

	$("blockquote:contains(Info)").addClass('bs-callout bs-callout-info');
	$("blockquote:contains(Note)").addClass('bs-callout bs-callout-info');

	$("blockquote:contains(Hint)").addClass('bs-callout bs-callout-success');
	$("blockquote:contains(Tip)").addClass('bs-callout bs-callout-success');
});
