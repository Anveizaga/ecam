<?php
  /* variable.php
  *  view info of a single variable
  */
?>

<?php
  //input: variable id
  if(!isset($_GET['id'])){die('no input specified');}
  $id = $_GET['id'];
?>
<!doctype html><html><head>
  <?php include'imports.php'?>
  <!--prettify benchmark code-->
  <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
</head><body onload="init()"><center>
<?php include'sidebar.php'    ?>
<?php include'navbar.php'     ?>
<?php include'linear.php'     ?>
<?php include'caption.php'    ?>
<?php include'currentJSON.php'?>

<!--model ecam v2-->
<script>
  let id='<?php echo $id?>'; //$id variable live in javascript scope

  function init() {
    updateInfoTable();
    Exceptions.apply();
    Caption.listeners();
    updateResult();
    PR.prettyPrint();
  }

  /**
   * Update a field from the Global object
   * @param {string} field - The field of the CurrentLevel object
   * @param {float} newValue - The new value of the field
   */
  function updateField(field,newValue) {
    newValue = parseFloat(newValue);
    newValue = (isNaN(newValue)) ? 0 : newValue;
    let multiplier = Units.multiplier(field);
    currentStage[field] = multiplier*newValue;
    init();
  }

  /** Refresh table id=info */
  function updateInfoTable() {
    let t=document.getElementById('info');
    while(t.rows.length>0)t.deleteRow(-1);
    let newRow,newCell;

    //Stage
    newRow=t.insertRow(-1)
    newCell=newRow.insertCell(-1)
    newCell.className='th'
    newCell.innerHTML="<?php write('#variable_stage')?>"
    newCell=newRow.insertCell(-1)
    if(sublevel) {
      let url = "edit.php";
      newCell.innerHTML+="&larr; <a href="+url+"?level="+level+">"+levelAlias+"</a>/<a href="+url+"?level="+level+"&sublevel="+sublevel+">"+sublevelAlias+"</a>"
    }
    else newCell.innerHTML="<?php write('#variable_go_back_to')?> <a href=edit.php?level="+level+">"+levelAlias+"</a>"

    //Explanation
    newRow=t.insertRow(-1)
    newCell=newRow.insertCell(-1)
    newCell.className='th'
    newCell.innerHTML="<?php write('#variable_explanation')?>"
    newRow.insertCell(-1).innerHTML=(function() {
      //let exp = Info[id].explanation
      let exp = translate(id+"_expla") || translate(id);
      if(exp=="")
        return "<span style=color:#999>No explanation</span>";
      else
        return exp;
    })();

    //Type (input or output)
    newRow=t.insertRow(-1)
    newCell=newRow.insertCell(-1)
    newCell.className='th'
    newCell.innerHTML="<?php write('#variable_type')?>"
    newRow.insertCell(-1).innerHTML=(function(){
      if(typeof(currentStage[id])=="function"){
        let pretf = Formulas.prettify(currentStage[id].toString());
        let ret = "Output <div><pre class=prettyprint style='padding:1em;background:#eee'><b><?php write('#variable_formula')?>:</b>"+pretf+"<pre></div>";
        return ret;
      }else{
        return "Input";
      }
    })();

    //Is filtered?
    (function(){
      let question=Questions.isInside(id);
      if(question) {
        newRow=t.insertRow(-1)
        newCell=newRow.insertCell(-1)
        newCell.className='th';
        newCell.innerHTML="<?php write("#Filter that activates it")?>";
        newCell=newRow.insertCell(-1)
        let currentAnswer = Global.Configuration['Yes/No'][question] ? "Yes" : "No";
        newCell.innerHTML=translate(question)+"? ["+currentAnswer+"]";
      }
    })();

    //if output: show inputs involved
    if(typeof(currentStage[id])=="function") {
      //add a row with matched variables in formula
      newRow=t.insertRow(-1)
      newCell=newRow.insertCell(-1)
      newCell.className='th'
      newCell.innerHTML="<?php write('#variable_inputs_involved')?>"
      newCell=newRow.insertCell(-1)
      newCell.innerHTML=(function(){
        let matches=Formulas.idsPerFormula(currentStage[id].toString())
        let ret="<table id=ininv>"
        matches.forEach(function(match) {
          //means this is a constant
          if(match.substring(0,3)=="ct_") {
            ret+="<tr><td class=constant caption='CONSTANT: "+Cts[match].descr+"'><a href=constant.php?id="+match+">"+match+"</a><td caption='"+Cts[match].value+"'>"+format(Cts[match].value)+"<td class=unit>"+Cts[match].unit;
          }
          //check if its a fuel type input
          else if(Tables[match]==Tables["Fuel types"]) {
            let fuel=Tables.find(match,currentStage[match]);
            ret+="<tr><td class=fuel><a href=variable.php?id="+match+">"+match+" (fuel type)</a>:<td><b>"+fuel+"</b><td><a href=fuelInfo.php>(more info)</a>";
            ret+="<tr><td class=fuel caption='Fuel density       '         >&emsp; · FD              <td>"+Tables["Fuel types"][fuel].FD             +"<td class=unit>kg/L";
            ret+="<tr><td class=fuel caption='Net calorific value'         >&emsp; · NCV             <td>"+Tables["Fuel types"][fuel].NCV            +"<td class=unit>TJ/Gg";
            ret+="<tr><td class=fuel caption='CO2 emission factor'         >&emsp; · EFCO2          <td>"+Tables["Fuel types"][fuel].EFCO2          +"<td class=unit>kg<sub>CO<sub>2</sub></sub>/TJ";
            ret+="<tr><td class=fuel caption='CH4 emission factor engines' >&emsp; · EFCH4.engines  <td>"+Tables["Fuel types"][fuel].EFCH4.engines  +"<td class=unit>kg<sub>CH<sub>4</sub></sub>/TJ";
            ret+="<tr><td class=fuel caption='CH4 emission factor vehicles'>&emsp; · EFCH4.vehicles <td>"+Tables["Fuel types"][fuel].EFCH4.vehicles +"<td class=unit>kg<sub>CH<sub>4</sub></sub>/TJ";
            ret+="<tr><td class=fuel caption='N2O emission factor engines' >&emsp; · EFN2O.engines  <td>"+Tables["Fuel types"][fuel].EFN2O.engines  +"<td class=unit>kg<sub>N<sub>2</sub>O</sub>/TJ";
            ret+="<tr><td class=fuel caption='N2O emission factor vehicles'>&emsp; · EFN2O.vehicles <td>"+Tables["Fuel types"][fuel].EFN2O.vehicles +"<td class=unit>kg<sub>N<sub>2</sub>O</sub>/TJ";
          }
          else { //normal inputs
            let match_localization = locateVariable(match)
            let match_level = match_localization.level
            let match_sublevel = match_localization.sublevel
            let match_stage = match_sublevel ? Global[match_level][match_sublevel] : Global[match_level]
            let currentUnit="";
            if(Info[match]) {
              currentUnit=(Info[match].magnitude=="Currency") ? Global.General.Currency : (Global.Configuration.Units[match]||Info[match].unit);
            }
            else{
              currentUnit = "no unit";
            }
            //matches can be either numbers or other functions
            let currValue = typeof(match_stage[match])=="function" ? match_stage[match]() : match_stage[match];
            currValueF=format(currValue);

            //handle dropdowns
            if(Info[match].magnitude=="Option") {
              currValueF=Tables.find(match,currValue);
            }

            let color = match.search('ww')==-1 ? "#0aaff1":"#bf5050";

            //here we have to show the internal value of inputs, not the multiplied by the unit multiplier
            let multiplier=Units.multiplier(match);
            if(multiplier!=1) {
              let magnitude=Info[match].magnitude;
              for(let unit in Units[magnitude]) {
                if(Units[magnitude][unit]===1) {  // believe it meant to be matching multiplier //no: it should be 1, because we want the original unit
                  currentUnit=unit;
                  break;
                }
              }
            }

            ret+="<tr>"+
              "<td class=variableCode><a style='color:"+color+"' href=variable.php?id="+match+" "+
              "caption='INPUT: "+(translate(match+"_descr")||translate(match))+"'"+
              ">"+match+"</a> "+
              "<td caption='"+currValue+"' style=cursor:help>"+currValueF+"<td><span class=unit>"+currentUnit+"</span> "+
              "";
          }
        });
        ret+="</table>";
        return ret;
      })();
    }

    //Current Value
    newRow=t.insertRow(-1);
    newCell=newRow.insertCell(-1);
    newCell.className='th';
    newCell.innerHTML="<?php write("#Current value")?>";
    newCell=newRow.insertCell(-1);
    newCell.style.fontSize="18px";

    //calculate value if it is an output
    if(typeof(currentStage[id])=="function"){
      newCell.innerHTML=(function() {
        let unit=Info[id].magnitude=="Currency"?Global.General.Currency : Info[id].unit;
        let currValue=currentStage[id]()/Units.multiplier(id);
        currValueF=format(currValue);
        newCell.setAttribute('caption',currValue);
        newCell.style.cursor='help';
        return currValueF+" &emsp;<span class=unit>"+unit+"</span>";
      })();
    }else{
      newCell.innerHTML=format(currentStage[id]/Units.multiplier(id));
      newCell.className='input'
      //if input has magnitude Option
      if(Info[id].magnitude=="Option") {
        let select=document.createElement('select');
        newCell.innerHTML="";
        newCell.appendChild(select);
        select.setAttribute('onchange','currentStage["'+id+'"]=parseInt(this.value);init()')
        for(let op in Tables[id]) {
          let option = document.createElement('option');
          let value = parseInt(Tables[id][op].value);
          select.appendChild(option);
          option.value=value;
          option.innerHTML="("+value+") "+op;
          if(currentStage[id]==value) {
            option.selected=true;
          }
        }
      }else{
        newCell.setAttribute('onclick',"transformField(this)")
      }
    }

    //Magnitude
    newRow=t.insertRow(-1)
    newCell=newRow.insertCell(-1)
    newCell.className='th'
    newCell.innerHTML="<?php write('#variable_magnitude')?>"
    newRow.insertCell(-1).innerHTML=Info[id].magnitude

    //Select units -- only inputs!
    if(typeof(currentStage[id])=='number') {
      newRow=t.insertRow(-1)
      newCell=newRow.insertCell(-1)
      newCell.className='th'
      newCell.innerHTML="<?php write('#variable_unit')?>"
      newRow.insertCell(-1).innerHTML=(function() {
        if(Info[id].magnitude=="Currency") {
          return Global.General.Currency;
        }
        let str="<select onchange=Units.selectUnit('"+id+"',this.value)>";
        if(Units[Info[id].magnitude]===undefined) {
          return Info[id].unit
        }
        let currentUnit = Global.Configuration.Units[id] || Info[id].unit
        for(unit in Units[Info[id].magnitude]) {
          if(unit==currentUnit)
            str+="<option selected>"+unit+"</option>";
          else
            str+="<option>"+unit+"</option>";
        }
        str+="</select>"
        return str
      })();
    }

    //Values in substages
    if(typeof(currSubstage)=="object" && currSubstage.length > 0) {
      newRow=t.insertRow(-1);
      newCell=newRow.insertCell(-1);
      newCell.className='th';
      newCell.innerHTML="<?php write('#Substages')?>";
      newCell=newRow.insertCell(-1);

      //copy all functions inside substages
      Object.keys(currentStage).forEach(key=>{
        if(typeof currentStage[key] == 'function'){
          currSubstage.forEach(substage=>{
            substage[key]=currentStage[key];
          });
        }
      });

      //show all substage values in a table
      (function(){
        let t=document.createElement('table');
        newCell.appendChild(t);
        t.style.fontSize="10px";
        t.style.marginTop="5px";
        let s_newRow=t.insertRow(-1);
        let n=currSubstage.length;
        for(let i=0;i<n;i++){
          let s_newRow=t.insertRow(-1);
          let value = (function(){
            if(typeof(currentStage[id])=='function'){
              return currSubstage[i][id]()/Units.multiplier(id);
            }else{
              if(Info[id].magnitude=='Option'){
                return Tables.find(id,currSubstage[i][id]);
              }else{
                return currSubstage[i][id]/Units.multiplier(id);
              }
            }
          })();
          s_newRow.insertCell(-1).innerHTML="<a href=substage.php?level="+level+"&sublevel="+sublevel+"&index="+i+">Substage "+(i+1)+" ("+currSubstage[i].name+")</a>";
          s_newRow.insertCell(-1).innerHTML=typeof(value)=='number'?format(value):value;
        }
        s_newRow=t.insertRow(-1);
        if(Sumable_magnitudes.indexOf(Info[id].magnitude)+1){
          s_newRow.insertCell(-1).outerHTML="<td class=th>Substage total";
          if(typeof(currentStage[id])=='function')
            s_newRow.insertCell(-1).innerHTML=format(currSubstage.map(s=>s[id]()).reduce((pr,cu)=>pr+cu)/Units.multiplier(id));
          else
            s_newRow.insertCell(-1).innerHTML=format(currSubstage.map(s=>s[id]  ).reduce((pr,cu)=>pr+cu)/Units.multiplier(id));
        }
      })();
    }

    //Is used to calculate "utc"
    newRow=t.insertRow(-1);
    newCell=newRow.insertCell(-1);
    newCell.className='th';
    newCell.innerHTML="<?php write("#Outputs that use this value")?>";

    newCell=newRow.insertCell(-1);
    newCell.innerHTML=(function() {
      let ret=document.createElement('table');
      ret.id='utc';

      //look for the code "id" inside each output
      let outputsPerInput=Formulas.outputsPerInput(id)

      //if is not used to calculate anything, hide row
      if(outputsPerInput.length==0) {
        return "<span style=color:#999><?php write('#variable_nothing')?></span>";
      }

      outputsPerInput.forEach(function(output) {
        let match_localization = locateVariable(output);
        let match_level = match_localization.level;

        let match_sublevel = match_localization.sublevel;
        let match_stage = match_sublevel ? Global[match_level][match_sublevel] : Global[match_level];
        let currentUnit="";
        if(Info[output]) {
          currentUnit=(Info[output].magnitude=="Currency") ?
            Global.General.Currency : (Global.Configuration.Units[output]||Info[output].unit);
        }
        else currentUnit = "no unit";

        //check if the detected output is an estimation
        let is_input = typeof match_stage[output]=='number';

        //compute the value
        let currValue=null;
        if(is_input){
          currValue=match_stage[output]/Units.multiplier(output);
        }else{
          try{
            currValue=match_stage[output]()/Units.multiplier(output);
          }catch(e){
            currValue=0;
          }
        }

        currValueF=format(currValue);
        let pretf=Formulas.prettify(match_stage[output].toString());
        let color=output.search('ww')==-1 ? "#0aaff1":"#bf5050";
        let ret_newRow=ret.insertRow(-1);

        //variable code
        ret_newRow.insertCell(-1).outerHTML=""+
          "<td class=variableCode>"+
          "  <a style='color:"+color+"' "+
          "    href=variable.php?id="+output+
          "    caption='["+match_localization.toString()+"] "+ (translate(output+"_descr")||translate(output))+"'"+
          "  >"+output+"</a>"+(is_input?" <span>("+translate('estimation')+")</span>":"");

        //variable value and formula
        if(!is_input){
          let ret_newCell=ret_newRow.insertCell(-1);
          ret_newCell.innerHTML=currValueF;
          ret_newCell.setAttribute('caption',pretf);

          //unit
          ret_newRow.insertCell(-1).innerHTML="<span class=unit>"+currentUnit+"</span> ";
        }
      });

      return ret.outerHTML;
    })();

    //Is "id" level 3 specific?
    if(Level3.list.indexOf(id)>-1) {
      newRow=t.insertRow(-1)
      newCell=newRow.insertCell(-1)
      newCell.className='th'
      newCell.innerHTML="<?php write('#variable_advanced')?>"
      newRow.insertCell(-1).innerHTML="YES";
    }

    //It has recommendations?
    if(Recommendations[id]) {
      newRow=t.insertRow(-1);
      newCell=newRow.insertCell(-1);
      newCell.className='th';
      newCell.innerHTML="Estimation of this input";

      //value of recommendation
      let newCell=newRow.insertCell(-1);
      newCell.appendChild((function(){
        let div=document.createElement('div');
        let r_value=Recommendations[id]()/Units.multiplier(id);
        let currentUnit= (Info[id].magnitude=="Currency") ? Global.General.Currency : (Global.Configuration.Units[id]||Info[id].unit);
        div.innerHTML=format(r_value)+" "+currentUnit;
        return div;
      })());

      //formula for recommendation
      newCell.appendChild((function(){
        let pre=document.createElement('pre');
        pre.classList.add('prettyprint');
        pre.innerHTML=Formulas.prettify(Recommendations[id].toString().replace(/  /g,' '));
        return pre;
      })());

      //inputs involved in recommendation
      let inputs_involved_in_rec=document.createElement('div');
      newCell.appendChild(inputs_involved_in_rec);
      inputs_involved_in_rec.innerHTML=(function(){
        let matches=Formulas.idsPerFormula(Recommendations[id].toString());
        let ret="<table id=ininv>";
        matches.forEach(function(match) {
          //means this is a constant
          if(match.substring(0,3)=="ct_") {
            ret+="<tr><td class=constant caption='CONSTANT: "+Cts[match].descr+"'><a href=constant.php?id="+match+">"+match+"</a><td caption='"+Cts[match].value+"'>"+format(Cts[match].value)+"<td class=unit>"+Cts[match].unit;
          }
          //check if its a fuel type input
          else if(Tables[match]==Tables["Fuel types"]) {
            let fuel=Tables.find(match,currentStage[match]);
            ret+="<tr><td class=fuel><a href=variable.php?id="+match+">"+match+" (fuel type)</a>:<td><b>"+fuel+"</b><td><a href=fuelInfo.php>(more info)</a>";
            ret+="<tr><td class=fuel caption='Fuel density       '         >&emsp; · FD              <td>"+Tables["Fuel types"][fuel].FD             +"<td class=unit>kg/L";
            ret+="<tr><td class=fuel caption='Net calorific value'         >&emsp; · NCV             <td>"+Tables["Fuel types"][fuel].NCV            +"<td class=unit>TJ/Gg";
            ret+="<tr><td class=fuel caption='CO2 emission factor'         >&emsp; · EFCO2          <td>"+Tables["Fuel types"][fuel].EFCO2          +"<td class=unit>kg<sub>CO<sub>2</sub></sub>/TJ";
            ret+="<tr><td class=fuel caption='CH4 emission factor engines' >&emsp; · EFCH4.engines  <td>"+Tables["Fuel types"][fuel].EFCH4.engines  +"<td class=unit>kg<sub>CH<sub>4</sub></sub>/TJ";
            ret+="<tr><td class=fuel caption='CH4 emission factor vehicles'>&emsp; · EFCH4.vehicles <td>"+Tables["Fuel types"][fuel].EFCH4.vehicles +"<td class=unit>kg<sub>CH<sub>4</sub></sub>/TJ";
            ret+="<tr><td class=fuel caption='N2O emission factor engines' >&emsp; · EFN2O.engines  <td>"+Tables["Fuel types"][fuel].EFN2O.engines  +"<td class=unit>kg<sub>N<sub>2</sub>O</sub>/TJ";
            ret+="<tr><td class=fuel caption='N2O emission factor vehicles'>&emsp; · EFN2O.vehicles <td>"+Tables["Fuel types"][fuel].EFN2O.vehicles +"<td class=unit>kg<sub>N<sub>2</sub>O</sub>/TJ";
          }else{ //normal inputs
            let match_localization = locateVariable(match)
            let match_level = match_localization.level
            let match_sublevel = match_localization.sublevel
            let match_stage = match_sublevel ? Global[match_level][match_sublevel] : Global[match_level]
            let currentUnit="";
            if(Info[match]) {
              currentUnit= (Info[match].magnitude=="Currency") ? Global.General.Currency : (Global.Configuration.Units[match]||Info[match].unit);
            }
            else currentUnit = "no unit";

            //matches can be either numbers or other functions
            let currValue = typeof(match_stage[match])=="function" ? match_stage[match]() : match_stage[match];
            currValueF=format(currValue);

            //handle dropdowns
            if(Info[match].magnitude=="Option") {
              currValueF=Tables.find(match,currValue);
            }

            let color = match.search('ww')==-1 ? "#0aaff1":"#bf5050";

            //here we have to show the internal value of inputs, not the multiplied by the unit multiplier
            let multiplier=Units.multiplier(match);
            if(multiplier!=1) {
              let magnitude=Info[match].magnitude;
              for(let unit in Units[magnitude]) {
                if(Units[magnitude][unit]===1) {  // believe it meant to be matching multiplier //no: it should be 1, because we want the original unit
                  currentUnit=unit;
                  break;
                }
              }
            }

            ret+="<tr>"+
              "<td class=variableCode><a style='color:"+color+"' href=variable.php?id="+match+" "+
              "caption='INPUT: "+(translate(match+"_descr")||translate(match))+"'"+
              ">"+match+"</a> "+
              "<td caption='"+currValue+"' style=cursor:help>"+currValueF+"<td><span class=unit>"+currentUnit+"</span> "+
              "";
          }
        });
        ret+="</table>";
        return ret;
      })();
    }

    //If input:is used in benchmarking?
    if(typeof(currentStage[id])=='number') {
      newRow=t.insertRow(-1);
      newCell=newRow.insertCell(-1);
      newCell.className='th';
      newCell.innerHTML="Benchmarks where is used";
      newCell=newRow.insertCell(-1);
      newCell.innerHTML=(function() {
        //find if input is used in benchmark
        let benchmarks=Utils.usedInBenchmarks(id);
        if(benchmarks.length==0) {
          newRow.style.display='none';
          return "<span style=color:#999>None</span>";
        }

        let ret="<table id=bminv>";
        benchmarks.forEach(function(bm) {
          ret+="<tr><td><a caption='"+translate(bm+"_descr")+"' href=variable.php?id="+bm+">"+bm+"</a>";
        });
        ret+="</table>";
        return ret;
      })();
    }

    //Is "id" benchmarked?
    if(RefValues.hasOwnProperty(id)) {
      newRow=t.insertRow(-1);
      newCell=newRow.insertCell(-1);
      newCell.className='th';
      newCell.innerHTML="Is benchmarked?";
      //evaluate benchmarking and show formula
      newRow.insertCell(-1).innerHTML=""+
        "<div style='margin:1em 0'><b>Benchmarking status &rarr;</b> <span style=font-size:16px>\""+RefValues[id](currentStage)+"\"</span></div>"+
        "<div class='card folded' style=margin:0>"+
        "<div class=menu onclick=this.parentNode.classList.toggle('folded')>"+
        " <button></button> Benchmarking Formula"+
        "</div>"+
        "<pre class='prettyprint'>"+RefValues[id].toString().replace(/  /g,' ')+"</pre>"+
        "</div>"+
        "<div style=margin-top:1em><a href=benchmark.php>All variables benchmarked</a></div>"+
        "";
    }

  }

  /**
   * Add a <input> to a <td> cell to make modifications in the Global object
   * @param {element} element - the <td> cell
   */
  function transformField(element) {
    element.removeAttribute('onclick')
    element.innerHTML=""
    let input=document.createElement('input')
    input.className='input'
    input.autocomplete='off'
    input.setAttribute('onkeypress',"if(event.which==13){updateField('"+id+"',this.value)}")
    input.setAttribute('onblur',"updateField('"+id+"',this.value)") //now works ok!
    let multiplier = Units.multiplier(id);
    let currentValue = currentStage[id]/multiplier;
    input.value=currentValue
    element.appendChild(input)
    input.select()
  }
</script>

<script>
  if(!Info[id]) {
    document.body.innerHTML="<div class=error>ERROR: Variable '"+id+"' not defined in dataModel/Info.js</div>";
    window.stop()
  }

  //Define some necessary global variables
  let localization = locateVariable(id);
  if(!localization) {
    document.body.innerHTML="<div class=error>ERROR: Variable '"+id+"' not found in dataModel/Global.js</div>";
    window.stop()
  }

  let level        = localization.level;
  let sublevel     = localization.sublevel;
  let currentStage = sublevel ? Global[level][sublevel] : Global[level];
  let currSubstage = sublevel ? Substages[level][sublevel] : Substages[level];

  //make the user see "Water Supply" instead of "Water"
  let levelAlias;
  switch(level) {
    case "Water":levelAlias="<?php write('#Water')?>";break;
    case "Waste":levelAlias="<?php write('#Waste')?>";break;
    case "Faecl":levelAlias="<?php write('#Faecl')?>";break;
    default:levelAlias=level;break;
  }

  let sublevelAlias = false;
  if(sublevel) {
    switch(sublevel) {
      case "Abstraction":  sublevelAlias="<?php write('#Abstraction')?>"; break;
      case "Treatment":    sublevelAlias="<?php write('#Treatment')?>";   break;
      case "Distribution": sublevelAlias="<?php write('#Distribution')?>";break;
      case "Collection":   sublevelAlias="<?php write('#Collection')?>";  break;
      case "Discharge":    sublevelAlias="<?php write('#Discharge')?>";   break;
      default:             sublevelAlias=sublevel;                        break;
    }
  }
</script>

<!--template ecam v2-->
<h1>
  <span style=color:#999>
    <?php write('#variable_detailed_info')?>
    &rarr;
  </span>
  <code id=variable_id></code>
  <code id=variable_descr></code>
  <script>
    (function(){
      let description=translate(id+'_descr')||translate(id);
      document.querySelector('#variable_id').innerHTML="<code>"+id+"</code>";
      document.querySelector('#variable_descr').innerHTML="<p style=margin-bottom:0>"+description+"</p>";
    })();
  </script>
</h1>

<div id=main>
  <table
    id=info
    style="text-align:left;width:50%;margin-bottom:3em"
  >
  </table>
</div>

<!--css ecam v2-->
<style>
  #info th,#info td{padding:1em}
  #info td.th{background:#00aff1;color:white;vertical-align:middle}
  #info td.input{color:#666;background-color:#eee;cursor:cell}
  #info td.input input {margin:0;padding:0;width:95%;}
  .variableCode { font-family:monospace; }
  <?php
    if(preg_match("/^ww/",$id)) {
      ?>
      #info td.th{background:#d71d24}
      #info a,#info a:visited,h1{color:#bf5050}
      <?php
    }
    else if(preg_match("/^fs/",$id)) {
      ?>
      #info td.th{background:green}
      #info a,#info a:visited,h1{color:green}
      <?php
    }
  ?>
  /** table "used to calculate" and "inputs involved" */
  table#bminv td, table#utc td, table#ininv td{padding:2px 5px 2px 7px;border:none}
  .unit{color:#aaa}
  #info .constant a {color:blue; !important}
  .fuel {color:#088A29}
  .fuel a {font-weight:bold;color:#088A29;}
  pre.prettyprint {margin:0.5em;margin-left:0;padding:1em}
  div.error {
    font-size:16px;
    padding:10px;
  }
</style>

<!--template ecam v3-->
<table id=variable></table>

<!--model ecam v3-->
<script>
  let variable=new Vue({
    //TODO
  });
</script>