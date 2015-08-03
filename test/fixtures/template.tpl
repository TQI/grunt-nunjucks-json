<h1>{{ title }}</h1>
<ul>
	{% for item in names %}
	{% include "./includes/item.tpl" %}
	{% endfor %}
</ul>