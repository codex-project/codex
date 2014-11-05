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

	// Change h1 to h4 for search results
	$('#search-results h1').replaceWith(function() {
		return '<h4>'+$(this).text()+'</h4>';
	});

	// Create anchor tags on header spans within documentation
	// This can be done better/smarter
	$(".documentation h2, .documentation h3, .documentation h4, .documentation h5, .documentation h6").each(function() {

		// We want to ignore header spans within blockquotes
		if ($(this).parent().get(0).tagName != "BLOCKQUOTE") {
			var anchor = $(this).text().toLowerCase().trim();

			var hyphenNeedle = [/ /g];
			var emptyNeedle = ['[', ']', '(', ')', ':'];

			hyphenNeedle.forEach(function(word) {
				anchor = anchor.replace(word, "-");
			});

			emptyNeedle.forEach(function(word) {
				anchor = anchor.replace(word, "");
			});

			$(this).append(' <a class="hover-anchor" id="' + anchor + '" href="#' + anchor + '"><small><span class="glyphicon glyphicon-link"></span></small></a>');
		}

	});
});
