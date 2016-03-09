/** Find a variable code, e.g 'gV2' inside 'Global' and tell where it is */
function locateVariable(code)
{
	var localization={}; //e.g {"level":"Water","sublevel":"Abstraction"}
	localization['toString']=function()
	{
		var levelName=(function()
		{
			switch(localization.level)
			{
				case "Water": return "Water supply";break;
				case "Waste": return "Wastewater";break;
				default: return localization.level;break;
			}
		})();

		if(localization.sublevel)
		{
			var sublevelName=(function()
			{
				switch(localization.sublevel)
				{
					default: 
						return localization.sublevel;
						break;
				}
			})(); 
			return levelName+"/"+sublevelName
		}
		else
			return levelName;
	};

	for(var level in Global)
	{
		for(var field in Global[level])
		{
			if(typeof(Global[level][field])=='object')
			{
				for(var subfield in Global[level][field])
				{
					if(code==subfield)
					{
						localization["level"]=level;
						localization["sublevel"]=field;
						return localization;
					}
				}
			}
			else
			{
				if(code==field)
				{
					localization["level"]=level;
					localization["sublevel"]=0;
					return localization;
				}
			}
		}
	}
	return false;
}

/** return 3.999,4 instead of 3999.4*/
function format(number)
{
	return new Intl.NumberFormat().format(number);
}
