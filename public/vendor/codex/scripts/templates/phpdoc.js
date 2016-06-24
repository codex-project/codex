this["JST"] = this["JST"] || {};

this["JST"]["src/views/templates/phpdoc"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (description, e, makeClassLink, methods, name, namespace, properties, typeIcon, undefined) {
function visibilityColor(vis){
var visibilityColor = 'color-green-700';
if(vis== 'protected') visibilityColor = 'color-yellow-900';
if(vis== 'private') visibilityColor = 'color-red-700';
return visibilityColor
}
jade_mixins["visibilityIcon"] = jade_interp = function(vis){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if ( vis === 'public')
{
buf.push("<i title=\"Public\"" + (jade.cls(['fa','fa-unlock','visibility-icon',visibilityColor(vis)], [null,null,null,true])) + "></i>");
}
if ( vis === 'protected')
{
buf.push("<i title=\"Protected\"" + (jade.cls(['fa','fa-unlock-alt','visibility-icon',visibilityColor(vis)], [null,null,null,true])) + "></i>");
}
if ( vis === 'private')
{
buf.push("<i title=\"Private\"" + (jade.cls(['fa','fa-lock-alt','visibility-icon',visibilityColor(vis)], [null,null,null,true])) + "></i>");
}
};
jade_mixins["methodDesc"] = jade_interp = function(method, withType){
var block = (this && this.block), attributes = (this && this.attributes) || {};
withType = withType || false
if ( typeof method !== 'undefined')
{
buf.push("<span" + (jade.cls([visibilityColor(method.visibility)], [true])) + ">" + (jade.escape(null == (jade_interp = method.visibility) ? "" : jade_interp)) + "</span><span>  " + (jade.escape((jade_interp = method.name) == null ? '' : jade_interp)) + "<strong>(</strong></span>");
if ( method.parameters.length > 0)
{
// iterate method.parameters
;(function(){
  var $$obj = method.parameters;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var parameter = $$obj[i];

if ( i > 0)
{
buf.push("<strong>,</strong>");
}
if ( withType)
{
buf.push("<span class=\"color-blue-500\">" + (null == (jade_interp = parameter.type || 'mixed') ? "" : jade_interp) + "</span>");
}
buf.push("<span" + (jade.attr("title", parameter.description, true, false)) + " class=\"color-teal-500\">" + (jade.escape(null == (jade_interp = parameter.name) ? "" : jade_interp)) + "</span>");
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var parameter = $$obj[i];

if ( i > 0)
{
buf.push("<strong>,</strong>");
}
if ( withType)
{
buf.push("<span class=\"color-blue-500\">" + (null == (jade_interp = parameter.type || 'mixed') ? "" : jade_interp) + "</span>");
}
buf.push("<span" + (jade.attr("title", parameter.description, true, false)) + " class=\"color-teal-500\">" + (jade.escape(null == (jade_interp = parameter.name) ? "" : jade_interp)) + "</span>");
    }

  }
}).call(this);

}
buf.push("<strong>)</strong>");
}
};
buf.push("<header class=\"phpdoc-file-header\"><i" + (jade.cls(['fa',typeIcon], [null,true])) + "></i><h3 class=\"fs22\">");
if ( typeof namespace == 'string')
{
buf.push("<span class=\"color-green-a700\">" + (jade.escape(null == (jade_interp = namespace + '\\' + name) ? "" : jade_interp)) + "</span>");
}
else
{
buf.push("<span class=\"color-green-a700\">" + (jade.escape(null == (jade_interp = name) ? "" : jade_interp)) + "</span>");
}
if ( typeof e.extends == 'string')
{
buf.push("<a href=\" this.getClassLink(extend) \" class=\"pull-right pl-md color-orange-800 fs-13\">" + (jade.escape(null == (jade_interp = e.extends) ? "" : jade_interp)) + "</a><small class=\"pull-right pl-md\">extends</small>");
}
buf.push("</h3></header>");
if ( description)
{
buf.push("<blockquote><p class=\"phpdoc-file-description fs-13\">" + (jade.escape(null == (jade_interp = description) ? "" : jade_interp)) + "</p></blockquote><div class=\"alert\">");
jade_mixins["methodDesc"](methods[10]);
buf.push("</div>");
}
if ( typeof properties == 'object' && properties.length > 0)
{
buf.push("<h4 class=\"doc-heading\">Properties<a href=\"#\" aria-expanded=\"false\" aria-controls=\"phpdoc-content-properties\" class=\"pull-right content-toggle\"><i class=\"fa fa-angle-up\"></i></a></h4><div id=\"phpdoc-content-properties\" class=\"collapse\"><table class=\"table table-hover table-striped table-bordered table-phpdoc-properties\"><thead><tr><th width=\"200px\" class=\"text-right pr-xs pl-xs\"><strong>Property</strong></th><th width=\"130px\" class=\"text-center\"><strong>Type</strong></th><th><strong>Description</strong></th></tr></thead><tbody>");
// iterate properties
;(function(){
  var $$obj = properties;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var property = $$obj[$index];

buf.push("<tr><td class=\"text-right color-teal-500 pr-xs pl-xs\">");
if ((property.static == true))
{
buf.push("<span class=\"label label-xs label-info\">static</span>");
}
jade_mixins["visibilityIcon"](property.visibility);
buf.push("" + (jade.escape((jade_interp = property.name) == null ? '' : jade_interp)) + "</td><td><p class=\"m-n\">" + (null == (jade_interp = makeClassLink(property.type || 'mixed')) ? "" : jade_interp) + "</p><!--this.makeClassLink(property.type || 'mixed')--></td><td><small>" + (jade.escape(null == (jade_interp = property.description + (typeof property['long-description'] == 'string' ? property['long-description'] : '')) ? "" : jade_interp)) + "</small></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var property = $$obj[$index];

buf.push("<tr><td class=\"text-right color-teal-500 pr-xs pl-xs\">");
if ((property.static == true))
{
buf.push("<span class=\"label label-xs label-info\">static</span>");
}
jade_mixins["visibilityIcon"](property.visibility);
buf.push("" + (jade.escape((jade_interp = property.name) == null ? '' : jade_interp)) + "</td><td><p class=\"m-n\">" + (null == (jade_interp = makeClassLink(property.type || 'mixed')) ? "" : jade_interp) + "</p><!--this.makeClassLink(property.type || 'mixed')--></td><td><small>" + (jade.escape(null == (jade_interp = property.description + (typeof property['long-description'] == 'string' ? property['long-description'] : '')) ? "" : jade_interp)) + "</small></td></tr>");
    }

  }
}).call(this);

buf.push("</tbody></table></div>");
if ( typeof methods === 'object' && methods.length > 0)
{
buf.push("<h4 class=\"doc-heading\">Methods</h4><div class=\"tabbable tabs-left\"><ul role=\"tablist\" class=\"nav nav-tabs\">");
// iterate methods
;(function(){
  var $$obj = methods;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var method = $$obj[$index];

var visibilityColor = 'color-green-800';
if(method.visibility == 'protected') visibilityColor = 'color-deep-orange-800';
if(method.visibility == 'private') visibilityColor = 'color-grey-700';
buf.push("<li role=\"presentation\"><a" + (jade.attr("href", '#' + method.name, true, false)) + (jade.attr("aria-controls", method.name, true, false)) + " role=\"tab\" data-toggle=\"tab\">");
jade_mixins["methodDesc"](method);
buf.push("</a></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var method = $$obj[$index];

var visibilityColor = 'color-green-800';
if(method.visibility == 'protected') visibilityColor = 'color-deep-orange-800';
if(method.visibility == 'private') visibilityColor = 'color-grey-700';
buf.push("<li role=\"presentation\"><a" + (jade.attr("href", '#' + method.name, true, false)) + (jade.attr("aria-controls", method.name, true, false)) + " role=\"tab\" data-toggle=\"tab\">");
jade_mixins["methodDesc"](method);
buf.push("</a></li>");
    }

  }
}).call(this);

buf.push("</ul><div class=\"tab-content\">");
// iterate methods
;(function(){
  var $$obj = methods;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var method = $$obj[$index];

buf.push("<div" + (jade.attr("id", method.name, true, false)) + " role=\"tabpanel\" class=\"tab-pane\"><h5><small" + (jade.cls(['visibility',visibilityColor(method.visibility)], [null,true])) + ">" + (jade.escape((jade_interp = method.visibility) == null ? '' : jade_interp)) + "</small>" + (jade.escape((jade_interp = method.full_name) == null ? '' : jade_interp)) + "</h5><p>" + (jade.escape(null == (jade_interp = method.description) ? "" : jade_interp)) + "</p><p>" + (jade.escape(null == (jade_interp = method['long-description']) ? "" : jade_interp)) + "</p></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var method = $$obj[$index];

buf.push("<div" + (jade.attr("id", method.name, true, false)) + " role=\"tabpanel\" class=\"tab-pane\"><h5><small" + (jade.cls(['visibility',visibilityColor(method.visibility)], [null,true])) + ">" + (jade.escape((jade_interp = method.visibility) == null ? '' : jade_interp)) + "</small>" + (jade.escape((jade_interp = method.full_name) == null ? '' : jade_interp)) + "</h5><p>" + (jade.escape(null == (jade_interp = method.description) ? "" : jade_interp)) + "</p><p>" + (jade.escape(null == (jade_interp = method['long-description']) ? "" : jade_interp)) + "</p></div>");
    }

  }
}).call(this);

buf.push("</div></div>");
}
}}.call(this,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"e" in locals_for_with?locals_for_with.e:typeof e!=="undefined"?e:undefined,"makeClassLink" in locals_for_with?locals_for_with.makeClassLink:typeof makeClassLink!=="undefined"?makeClassLink:undefined,"methods" in locals_for_with?locals_for_with.methods:typeof methods!=="undefined"?methods:undefined,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined,"namespace" in locals_for_with?locals_for_with.namespace:typeof namespace!=="undefined"?namespace:undefined,"properties" in locals_for_with?locals_for_with.properties:typeof properties!=="undefined"?properties:undefined,"typeIcon" in locals_for_with?locals_for_with.typeIcon:typeof typeIcon!=="undefined"?typeIcon:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};