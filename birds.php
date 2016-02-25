<!--birds eye view-->
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			updateInputs();
			drawCharts();
			Exceptions.apply();
			updateResult();
		}

		//Wrapper for "updateTable"
		function updateInputs()
		{
			var t=document.getElementById('inputs');
			while(t.rows.length>0){t.deleteRow(-1)}
			//WATER
			var newCell=t.insertRow(-1).insertCell(-1)
			newCell.setAttribute('colspan',5);
			newCell.innerHTML="Inputs WS &rarr; <a style=color:white href=edit.php?level=Water>Go</a>";
			newCell.style.color='white'
			newCell.style.backgroundColor='#0aaeef'
			updateTable(Global.Water,'inputs');
			//WASTEWATER
			var newCell=t.insertRow(-1).insertCell(-1)
			newCell.setAttribute('colspan',5);
			newCell.innerHTML="Inputs WW &rarr; <a style=color:white href=edit.php?level=Waste>Go</a>";
			newCell.style.color='white'
			newCell.style.backgroundColor='#bf5050'
			updateTable(Global.Waste,'inputs');
		}

		/** Redisplay table */
		function updateTable(obj,id_table)
		{
			var t=document.getElementById(id_table);
			for(var field in obj)
			{
				/*first check if function*/
				if(typeof(obj[field])!="number") continue;
				/*check if should be hidden according to questions*/
				if(Questions.isHidden(field)) continue;
				/*check if field is level3 specific*/if(Level3.isInList(field)) continue;
				/*new row*/var newRow=t.insertRow(-1);
				/*hlFields for outputs*/
				var pointer = field.search('^ww')==-1 ? "Global.Water" : "Global.Waste";
				newRow.setAttribute('onmouseover','Formulas.hlOutputs("'+field+'","'+pointer+'",1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlOutputs("'+field+'","'+pointer+'",0)');
				/*attribute field==field>*/newRow.setAttribute('field',field);
				/*description*/ var newCell=newRow.insertCell(-1);
				/*hotfix for non-existing variables (for example: when structure is updated)*/
				if(Info[field]===undefined)
				{
					obj[field]=undefined; //remove it
					continue;
				}
				newCell.setAttribute('title',Info[field].explanation);
				newCell.style.cursor='help';
				newCell.innerHTML=(function()
				{
					var description = Info[field]?Info[field].description:"<span style=color:#ccc>no description</span>";
					var code = "<a href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				//editable cell if not CV
				var newCell=newRow.insertCell(-1);
				newCell.className="input";
				newCell.setAttribute('onclick','transformField(this,'+pointer+')');

				/*value*/
				newCell.innerHTML=format(obj[field]/Units.multiplier(field));

				//unit
				newRow.insertCell(-1).innerHTML=(function()
				{
					if(Info[field].magnitude=="Currency")
					{
						return Global.General.Currency;
					}

					var str="<select onchange=Units.selectUnit('"+field+"',this.value)>";
					if(Info[field]===undefined)
					{
						return "<span style=color:#ccc>no unit</span>";
					}
					if(Units[Info[field].magnitude]===undefined)
					{
						return Info[field].unit
					}
					var currentUnit = Global.Configuration.Units[field] || Info[field].unit
					for(var unit in Units[Info[field].magnitude])
					{
						if(unit==currentUnit)
							str+="<option selected>"+unit+"</option>";
						else
							str+="<option>"+unit+"</option>";
					}
					str+="</select>"
					return str
				})();
				//data quality
				newRow.insertCell(-1).innerHTML=(function()
				{
					var select=document.createElement('select');
					select.setAttribute('onchange','DQ.update("'+field+'",this.value)');
					['Actual','Estimated'].forEach(function(opt)
					{
						var option=document.createElement('option');
						select.appendChild(option);
						option.innerHTML=opt;
						if(Global.Configuration.DataQuality[field]==opt)
							option.setAttribute('selected',true);
							
					});
					return select.outerHTML;
				})();
			}
		}

		function drawCharts()
		{
			withTables=false;
			Graphs.graph1(withTables);
			Graphs.graph2(withTables);
			Graphs.graph3(withTables);
		}

		function transformField(element,obj)
		{
			element.removeAttribute('onclick')
			var field=element.parentNode.getAttribute('field')
			element.innerHTML=""
			var input=document.createElement('input')
			input.id=field
			input.classList.add('input')
			input.autocomplete='off'
			input.onblur=function(){updateField(field,obj,input.value)}
			input.onkeypress=function(event){if(event.which==13){input.onblur()}}
			//value converted
			var multiplier = Units.multiplier(field);
			var currentValue = obj[field]/multiplier;
			input.value=currentValue
			element.appendChild(input)
			input.select()
		}

		function updateField(field,obj,newValue)
		{
			if(typeof(obj[field])=="number")newValue=parseFloat(newValue) //if obj[field] is a number, parse float
			//if a unit change is set, get it:
			var multiplier = Units.multiplier(field);
			obj[field]=multiplier*newValue; //update the field
			init(); //update tables and write cookies
		}
	</script>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Bird's eye view (Level 1) of <script>document.write(Global.General.Name)</script> (workinprogress)</h1>
<!--description--><h4> Water supply system (WS) and Wastewater system (WW) </h4>
</center>

<style>
	td.input input { width:95%;font-size:18px}
	td.input       { width:80px;text-align:right;color:#666;background-color:#eee;cursor:cell}
</style>

<!--tables-->
<div class=inline style="margin-left:5px;width:40%;">
	<table id=inputs></table>
</div>

<!--graphs-->
<div class=inline style="width:55%" id=graphsContainer>
	<style>#graphsContainer table {font-size:8px}</style>
	<div id=graph1 class=inline style=max-width:45%></div>
	<div id=graph2 class=inline style=max-width:45%></div>
	<div id=graph3></div>
	<script>
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(init)
	</script>
</div>

<center><hr style="color:black;margin:1em 0 1em 0">

<!--service level pis-->
<table>
	<tr><th colspan=5>Service level indicators
	<tr><td>Indicator 1<td>Name<td>Value<td>Unit
</table>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>