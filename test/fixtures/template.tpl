<h1>{{ title }}</h1>
<ul>
	{% for item in names %}
	{% include "./includes/item.tpl" %}
	{% endfor %}

	{% set item = "Daniel" %}
	{% include "./includes/item.tpl"  %}
</ul>