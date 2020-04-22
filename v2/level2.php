<!--included once in edit.php-->
<script>
  //namespace to remember folding of questions (not saved to cookies)
  let Expanded=Global.Configuration.Expanded;
</script>
<style>
  span[expanded]{float:left;transition:transform 0.15s;}
  span[expanded='0']{transform:rotate(-90deg);}
</style>

<script>
  let level2 = {};//namespace

  /** Redisplay table id=inputs */
  level2.updateInputs=function() {
    //console.time('updateInputs');
    let t=document.getElementById('inputs');
    while(t.rows.length>2){t.deleteRow(-1)}

    //variables without questions associated
    for(let field in CurrentLevel) {
      /*check if current field is filtered*/
      if(Questions.isInside(field)) continue;

      /*check if CV*/
      if(typeof(CurrentLevel[field])!="number") {
        /*then, check if is calculated variable "c_xxxxxx" */
        if(field.search(/^c_/)==-1) continue;
      }

      /*check if level3 only*/
      if(Level3.list.indexOf(field)+1) continue;

      //create input
      level2.createInput(field,t);
    }

    //go over questions of this level, advanced=0
    Questions.getQuestions(CurrentLevel).forEach(function(question) {
      if(!Questions[question].advanced) {
        level2.createQuestion(question,t);
      }
    });

    //check if table is empty (==t.rows.length is 2)
    if(t.rows.length<3) {
      let newCell=t.insertRow(-1).insertCell(-1);
      newCell.colSpan=4;
      newCell.innerHTML="<span style=color:#999>~All inputs inactive</span>";
    }

    //add bottom decoration with the color of W/WW
    (function(){
      let newRow=t.insertRow(-1);
      let newTh=document.createElement('th');
      newTh.setAttribute('colspan',4);
      newTh.style.borderBottom='none';
      newRow.appendChild(newTh);
    })();
    //console.timeEnd('updateInputs');
  }

  level2.toggleQuestionVisibility=function(cell,question) {
    let btn=cell.querySelector('span[expanded]');
    if(!btn)return;

    let currentState=Expanded[question];
    if(currentState===undefined)currentState=1;//expanded by default

    //toggle html attribute
    if(currentState) {btn.setAttribute('expanded','0')}
    else             {btn.setAttribute('expanded','1')}

    //modify "Expanded" object
    if(currentState) {Expanded[question]=0}
    else             {Expanded[question]=1}

    //hide or show fields
    let trs=document.querySelectorAll('tr[field][question='+question+']');
    let newDisplay = currentState ? 'none':'';
    for(let i=0;i<trs.length;i++) {
      trs[i].style.display=newDisplay;
    }

    //remember "Expanded"
    updateResult();
  }

  /**
   * Transform a <td> cell to a <input> to make modifications in the Global object
   * @param {element} element - the <td> cell
   */
  level2.transformField=function(element) {
    element.removeAttribute('onclick');
    element.innerHTML="";
    let field=element.parentNode.getAttribute('field');
    let input=document.createElement('input');
    element.appendChild(input);
    input.id=field;
    input.classList.add('input');
    input.autocomplete='off';
    //value converted
    let multiplier = Units.multiplier(field);
    let currentValue = CurrentLevel[field]/multiplier;
    input.value=currentValue;
    input.onblur=function(){level2.updateField(field,input.value)};
    input.onkeydown=function(event) {
      function updateChart() {
        //problem: this only updates if we are plotting inputs. WHY?
        let newValue=parseFloat(input.value);
        if(isNaN(newValue))newValue=0;
        newValue*=Units.multiplier(field);
        //only update real inputs
        if(typeof(CurrentLevel[field])!="function") {
          CurrentLevel[field]=newValue;
        }
        //try to draw charts
        drawCharts();
      }
      switch(event.which) {
        case 38: //up key
          if(!event.shiftKey){input.value++;updateChart();}
          break;
        case 40: //down key
          if(!event.shiftKey){input.value--;updateChart();}
          break;
        case  9: //TAB
          setTimeout(function() {
            let el=document.querySelector('#inputs tr[field='+field+']').nextSibling.childNodes[2];
            if(el && el.onclick){el.onclick();}
          },100);
          break;
      }
    }
    input.addEventListener('keypress',function(e){if(e.key=='Enter')this.blur()});
    input.select();
  }

  //draw a dropdown menu in inputs table
  level2.createDropdown=function(field,table,question) {
    question=question||false; //question it belongs to

    let code=field;
    let t=table;

    //if is an option, continue (will show at the end of the table)
    /*new row*/
    let newRow=t.insertRow(-1);
    newRow.setAttribute('field',code);

    //question it belongs to
    if(question) {
      newRow.setAttribute('question',question)
      if(Expanded[question]==0) { newRow.style.display='none'; }
    }

    /*1st cell: show code and description*/
    let newCell=document.createElement('td');
    newRow.appendChild(newCell);
    newCell.style.textAlign="left";
    newCell.setAttribute('title', translate(code+'_expla'));
    newCell.innerHTML=(function() {
      let link="<a style=font-size:10px href=variable.php?id="+code+">"+code+"</a>";
      let warning=(Formulas.outputsPerInput(code).length==0 && Utils.usedInBenchmarks(code).length==0) ?
        " <span class=not_used_input caption='Input not used for any equation'></span>" : "";
      return translate(code+"_descr")+warning+"<br>("+link+")";
    })();

    //3rd cell: value
    newCell=newRow.insertCell(-1);
    newCell.colSpan=2;
    (function() {
      let select=document.createElement('select');
      newCell.appendChild(select)
      select.setAttribute('onchange','level2.updateField("'+code+'",this.value)');
      select.setAttribute('magnitude','Option');
      for(let op in Tables[code]) {
        let option=document.createElement('option');
        let value=parseInt(Tables[code][op].value);
        select.appendChild(option);
        option.value=value;
        option.innerHTML="("+value+") "+translate(op);
        if(CurrentLevel[code]==value) { option.selected=true; }
      }
    })();
  }

  //draw an input in inputs table
  level2.createInput=function(field,table,question) {
    question=question||false; //code of the question it belongs to

    //if dropdown, call create dropdown instead
    if(Info[field] && Info[field].magnitude=="Option") {
      level2.createDropdown(field,table,question);
      return;
    };

    //bool for if current field is a calculated variable (CV)
    let isCV = field.search(/^c_/)+1;

    /*if is a function and not a cv, exit*/
    if(typeof(CurrentLevel[field])!="number" && !isCV) return;

    /*new row*/
    let t=table;
    let newRow=t.insertRow(-1);

    //question it belongs
    if(question) {
      newRow.setAttribute('question',question)
      if(Expanded[question]==0) {
        newRow.style.display='none';
      }
    }

    /*class*/
    if(isCV) newRow.classList.add('isCV');

    /*hlInputs for formula and show formula, only if CV*/
    if(isCV) {
      let formula = CurrentLevel[field].toString();
      let prettyFormula = Formulas.prettify(formula);
      newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
      newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');
    }else{
      newRow.setAttribute('onmouseover','Formulas.hlOutputs("'+field+'",CurrentLevel,1)');
      newRow.setAttribute('onmouseout', 'Formulas.hlOutputs("'+field+'",CurrentLevel,0)');
    }

    /*new attribute field=field>*/
    newRow.setAttribute('field',field);

    /*code and description*/
    let newCell=document.createElement('td');
    newRow.appendChild(newCell);
    if(isCV)newCell.classList.add('isCV');

    //input description
    newCell.appendChild((function(){
      let span=document.createElement('span');
      span.setAttribute('title', translate(field+"_expla"));
      span.innerHTML=translate(field+'_descr');
      return span;
    })());

    //input recommendations button
    if(Recommendations[field]){
      newCell.appendChild((function(){
        let btn=document.createElement('button');
        btn.style.fontSize='smaller';
        btn.style.float='right';
        let multiplier=Units.multiplier(field);
        let rec_value=Recommendations[field]()/multiplier;
        let currentUnit = Global.Configuration.Units[field] || (Info[field] ? Info[field].unit : undefined);
        btn.innerHTML=`Estimation: ${format(rec_value)} ${currentUnit} &rarr;`;
        btn.setAttribute('caption','Estimation based on other inputs:<br> '+Formulas.prettify(Recommendations[field].toString()));
        btn.addEventListener('click',function(){
          CurrentLevel[field] = rec_value*multiplier;
          init();
        });
        return btn;
      })());
    }

    //not used input warning
    newCell.appendChild((function(){
      let span=document.createElement('span');
      if(Formulas.outputsPerInput(field).length==0 && Utils.usedInBenchmarks(field).length==0){
        span.classList.add('not_used_input');
        span.setAttribute('caption','Input not used for any equation');
      }
      return span;
    })());

    //code link
    newCell.appendChild((function(){
      let div=document.createElement('div');
      div.innerHTML="(<a style=font-size:smaller href=variable.php?id="+field+">"+field+"</a>)";
      return div;
    })());

    //editable cell if not CV
    newCell=newRow.insertCell(-1);
    if(!isCV) {
      newCell.classList.add("input");
      newCell.setAttribute('caption',"<?php write('#edit_click_to_modify')?>");
      newCell.setAttribute('onclick','level2.transformField(this)');
    }else{
      //field is calculated variable, so show formula
      newCell.setAttribute('caption',Formulas.prettify(CurrentLevel[field].toString()));
      newCell.style.textAlign="right";
    }

    /*value*/
    newCell.innerHTML=(function() {
      let value = isCV ? CurrentLevel[field]() : CurrentLevel[field];
      value/=Units.multiplier(field);
      let color=value?"":"#ccc";
      return "<span style=color:"+color+">"+format(value)+"</span>";
    })();

    //unit
    newRow.insertCell(-1).innerHTML=(function() {
      if(!Info[field]) return "<span style=color:#ccc>no unit</span>";

      if(Info[field].magnitude=="Currency") { return Global.General.Currency; }

      if(isCV) {
        return Info[field].unit;
      }
      else {
        let str="<select onchange=Units.selectUnit('"+field+"',this.value)>";
        if(Units[Info[field].magnitude]===undefined) {
          return Info[field].unit
        }
        let currentUnit = Global.Configuration.Units[field] || Info[field].unit
        for(let unit in Units[Info[field].magnitude]) {
          if(unit==currentUnit)
            str+="<option selected>"+unit+"</option>";
          else
            str+="<option>"+unit+"</option>";
        }
        str+="</select>"
        return str
      }
    })();
  }

  //create a question in inputs table
  level2.createQuestion=function(question,table) {
    if(Questions.isHiddenQuestion(question)) return;

    let t=table;
    let checked = Global.Configuration["Yes/No"][question];

    //new row
    let newRow=t.insertRow(-1);
    newRow.setAttribute('question',question);
    newRow.style.background = checked ? "lightgreen" : "#eee";

    //1st cell: show question
    let newCell=newRow.insertCell(-1);
    newCell.colSpan=2;
    newCell.style.paddingRight="1em";
    newCell.style.textAlign="right";
    newCell.setAttribute('onclick','level2.toggleQuestionVisibility(this,"'+question+'")');

    newCell.innerHTML=(function() {
      let ret="";
      if(checked) {
        let expanded=Expanded[question];
        if(expanded===undefined)expanded=1;//expanded by default
        ret+="<span expanded="+expanded+">&#9660;</span>"
      }
      ret+=translate(question)+"?";
      return ret;
    })()

    //2nd cell: show yes no
    newCell=newRow.insertCell(-1);
    newCell.colSpan=2;
    newCell.innerHTML=(function() {
      let checked_n = checked ? "" : "checked=true";
      let checked_y = checked ? "checked=true" : "";
      let str = ""+
      "<div class=flex style=justify-content:center>"+
      "  <div>"+
      "    <label>"+translate('no')+" <input type=radio name='l2"+question+"' onclick=setQuestion('"+question+"',0); "+checked_n+"></label>"+
      "  </div>"+
      "  <div>"+
      "    <label>"+translate('yes')+" <input type=radio name='l2"+question+"' onclick=setQuestion('"+question+"',1); "+checked_y+"></label>"+
      "  </div>"+
      "</div>"+
      "";
      return str;
    })();

    //show variables
    if(checked) {
      Questions[question].variables.forEach(function(field) {
        /*check if level3 only*/
        if((Level3.list.indexOf(field)+1)==0) {
          level2.createInput(field,table,question);
        }
      });
    }
  }

  /**
   * Update a field from the Global object
   * @param {string} field - The field of the CurrentLevel object
   * @param {number} newValue - new numeric value of the field
   */
  level2.updateField=function(field,newValue) {
    newValue=parseFloat(newValue);
    if(isNaN(newValue))newValue=0;
    CurrentLevel[field]=newValue*Units.multiplier(field);
    init();
  }
</script>

<table id=inputs style="width:100%">
  <tr><th colspan=5 class=tableHeader>
    <?php write('#INPUTS')?> &mdash;
    <?php write('#Enter values for')?>
    <?php if($sublevel){write("#$sublevel");}else{write("#$level");} ?>
    <?php write('#stages')?>
  <tr>
    <th><?php write('#Description')?>
    <th><?php write('#Current value')?>
    <th><?php write('#edit_unit')?>
  <tr><td colspan=3 style=color:#ccc><?php write('#loading')?>...
</table>
