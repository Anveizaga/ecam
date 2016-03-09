<?php /*about.php: information about the ecam tool*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		table{display:inline-block;vertical-align:top;margin:0.5em}
		tr:hover {background:lightcoral}
	</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1>Problems (debug mode)</h1>
<script>
	//get unused inputs
	function getUnused(obj)
	{
		var unused=[];
		for(var field in obj)
		{
			var type = typeof(obj[field]);
			switch(type)
			{
				case 'number':
					var n=Formulas.outputsPerInput(field).length;
					if(n==0) unused.push(field);
					break;
				case 'function':
					if(field.search(/^c_/)==0)
					{
						var n=Formulas.outputsPerInput(field).length;
						if(n==0) unused.push(field);
					}
					break;
				case 'object':
					unused=unused.concat(getUnused(obj[field]));
					break;
			}
		}
		return unused;
	}

	//count all variables (inputs and outputs)
	function countVariables(obj)
	{
		var n=0;
		for(var field in obj)
		{
			var type=typeof(obj[field]);
			switch(type)
			{
				case 'number':
				case 'function':
					n++
					break;
				case 'object':
					n+=countVariables(obj[field])
					break;
			}
		}
		return n;
	}
</script>

<table>
	<tr><td colspan=3 style=font-weight:bold>Problem 1: NOT USED INPUTS
	<tr><th>Code<th>Name<th>Stage
	<script>
		['Water','Waste'].forEach(function(level)
		{
			var unused=getUnused(Global[level])
			unused.forEach(function(field)
			{
				var color=field.search('ww')==-1 ? "" : "#bf5050";
				document.write("<tr><td><a style=color:"+color+" href=variable.php?id="+field+">"+field+"</a><td>"+Info[field].description)
				document.write("<td>"+locateVariable(field).toString())
			});
		})

	</script>
</table>

<table>
	<tr><td style=font-weight:bold>Problem 2: NOT USED DESCRIPTIONS
	<tr><th>Code
	<script>
		//find unused definitions in Info
		function getInfoUnused()
		{
			var uu=[];
			for(var field in Info)
			{
				if(locateVariable(field)==false)
					uu.push(field);
			}
			return uu;
		}

		var uu=getInfoUnused();
		if(uu.length==0)
		{
			document.write("<tr><td style=background:lightgreen><i>All descriptions used</i>")
		}
		else
			uu.forEach(function(field)
			{
				document.write("<tr><td>"+field)
			})
	</script>
</table>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>