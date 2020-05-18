//-----------------------------------------------------------------------------
// table that lists inputs involved in a formula
//-----------------------------------------------------------------------------

Vue.component('inputs_involved_table',{
  template:`<div>
    <table class=inputs_involved>
      <tbody v-for="match in Formulas.ids_per_formula(current_stage[code].toString())">
        <!--input involved is a constant-->
        <tr v-if="Cts[match]" :title="'CONSTANT: '+Cts[match].descr">
          <!--involved constant code-->
          <td>
            <a
              style="color:grey;font-weight:bold"
              @click="constant.view(match)"
            >
              {{ match }}
            </a>
          </td>

          <!--involved constant value-->
          <td :title="Cts[match].value">
            {{ format(Cts[match].value) }}
          </td>

          <!--involved constant unit-->
          <td class=unit v-html="Cts[match].unit"></td>
        </tr>

        <!--input involved is an Option-->
        <tr v-else-if="Tables[match]">
          <!--input involved code-->
          <td :title="translate(match+'_descr')">
            <a @click="variable.view(match)">{{match}}</a>
          </td>

          <!--input involved value-->
          <td colspan=2>
            {{
              Tables.find(match, get_variable_value(match))
            }}
          </td>
        </tr>

        <!--input involved is a normal one (input or output)-->
        <tr v-else>
          <td :title="translate(match+'_descr')">
            <a @click="variable.view(match)">{{match}}</a>
          </td>
          <td v-html="format(get_variable_value(match))">
          </td>
          <td class=unit v-html="Info[match].unit.prettify()">
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,

  props:[
    'code',
    'current_stage',
  ],

  data:function(){
    return{
      variable,
      constant,
      caption,

      Global,
      Info,
      Tables,
      Recommendations,
      Formulas,
      Cts,
    };
  },
  methods:{
    translate,
    format,
    get_variable_value: variable.get_variable_value,
  },
});
