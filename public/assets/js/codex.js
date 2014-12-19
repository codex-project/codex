$(document).ready(function() {

	// affix the side menu when it is placed on the left
	// add listener to remove affix when window is resized below 1000px for responsiveness
	$(window).resize(function() {
		if (! $(".toc").length) return;

		if (window.innerWidth > 1000) {
			$(".toc").affix();
		} else {
			$(window).off('.affix');
			$(".toc").removeClass("affix affix-top").removeData("bs.affix");
		}
	}).trigger('resize');

	// Bootstrap the tables
	$(".documentation table").addClass("table table-striped table-bordered table-hover table-condensed");

	// Bootstrap the images
	$(".documentation img").addClass("img-responsive img-thumbnail");

	// Prettify the <pre> tags
	$(".documentation [class^='language-']").closest("pre").addClass("prettyprint theme-freshcut");

	// Dynamic callouts
	$(".documentation blockquote:contains(Attention)").addClass("bs-callout bs-callout-danger");
	$(".documentation blockquote:contains(Danger)").addClass("bs-callout bs-callout-danger");

	$(".documentation blockquote:contains(Warning)").addClass("bs-callout bs-callout-warning");
	$(".documentation blockquote:contains(Notice)").addClass("bs-callout bs-callout-warning");

	$(".documentation blockquote:contains(Info)").addClass("bs-callout bs-callout-info");
	$(".documentation blockquote:contains(Note)").addClass("bs-callout bs-callout-info");

	$(".documentation blockquote:contains(Hint)").addClass("bs-callout bs-callout-success");
	$(".documentation blockquote:contains(Tip)").addClass("bs-callout bs-callout-success");

	// Change h1 to h4 for search results
	$("#search-results h1").replaceWith(function() {
		return "<h4>" + $(this).text() + "</h4>";
	});

	// Create anchor tags on header spans within documentation
	// This can be done better/smarter
	$(".documentation h2, .documentation h3, .documentation h4, .documentation h5, .documentation h6").each(function() {

		// We want to ignore header spans within blockquotes
		if ($(this).parent().get(0).tagName != "BLOCKQUOTE") {
			var anchor = $(this).text().toLowerCase().trim();

			var hyphenNeedle = [/ /g];
			var emptyNeedle = [/\[/g, /\]/g, /\(/g, /\)/g, /\:/g];

			hyphenNeedle.forEach(function(word) {
				anchor = anchor.replace(word, "-");
			});

			emptyNeedle.forEach(function(word) {
				anchor = anchor.replace(word, "");
			});

			$(this).append(" <a class=\"header-anchor\" id=\"" + anchor + "\" href=\"#" + anchor + "\"></a>");
		}

	});
});
