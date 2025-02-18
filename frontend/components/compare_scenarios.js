let compare_scenarios=new Vue({
  el:"#compare_scenarios",
  data:{
    visible:false,

    scenarios_compared:[Global],
    current_view:'table',
    hide_zero_valued_variables:false,
    include:{
      inputs:true,
      outputs:true,
    },
    current_unit_ghg:"kgCO2eq",
    current_unit_nrg:"kWh",
    charts:{}, //chart objects from chartjs library stored here

    variable,
    Global,
    Languages,
    Info,
    Structure,
  },

  methods:{
    show_variable(variable){ //->bool
      let sum = variable.scenario_values.map(sce=>sce.sum()).sum();
      let at_least_one_scenario_has_a_substage_with_a_finite_value = variable.scenario_values.some(sce=>sce.some(value=>(value && isFinite(value))));

      return (
        ((variable.type=='input' && this.include.inputs) || (variable.type=='output' && this.include.outputs))
        &&
        (
          !this.hide_zero_valued_variables || (sum>0 && at_least_one_scenario_has_a_substage_with_a_finite_value)
        )
      );
    },

    //emissions are in kg by default
    format_emission(number){
      let divisor = this.current_unit_ghg=='tCO2eq' ? 1000:1;
      let digits  = undefined;
      return format(number,digits,divisor);
    },

    format_energy(number){
      let divisor = this.current_unit_nrg=='MWh' ? 1000:1;
      let digits  = undefined;
      return format(number,digits,divisor);
    },

    //add scenario to comparison table
    add_scenario_to_compared(scenario){
      if(!scenario) return;
      if(scenario.constructor!==Ecam) return;

      let index=this.scenarios_compared.indexOf(scenario);
      if(index==-1){
        this.scenarios_compared.push(scenario);
      }else{
        this.scenarios_compared.splice(index,1);
      }
    },

    get_variables_and_values(level, sublevel){
      let input_codes  = this.include.inputs  ? get_input_codes( level, sublevel) : [];
      let output_codes = this.include.outputs ? get_output_codes(level, sublevel) : [];

      let inputs=[]; //code, value
      input_codes.forEach(code=>{
        let scenario_values = null;
        if(sublevel){
          scenario_values = this.scenarios_compared.map(sce=>{
            return sce[level][sublevel].map(ss=>ss[code]); //array
          });
        }else{
          scenario_values = this.scenarios_compared.map(sce=>{
            return [sce[level][code]]; //array
          })
        }
        inputs.push({code, scenario_values, type:"input"});
      });

      let outputs=[];
      output_codes.forEach(code=>{
        let scenario_values = null;
        if(sublevel){
          scenario_values = this.scenarios_compared.map(sce=>{
            return sce[level][sublevel].map(ss=> get_output_value(code,ss) ); //array
          });
        }else{
          scenario_values = this.scenarios_compared.map(sce=>{
            return [ get_output_value(code,sce[level]) ]; //array
          })
        }

        outputs.push({code, scenario_values, type:"output"});
      });

      return [...inputs, ...outputs];
    },

    get_scenarios(){
      return Scenarios;
    },

    draw_all_charts(){
      //destroy all charts
      Object.values(this.charts).forEach(chart=>chart.destroy());

      //bar charts
        //Chart.js - bar chart: total ghg by scenario
        if(document.getElementById('bar_chart_ghg_total')){
          this.charts.bar_chart_ghg_total=new Chart('bar_chart_ghg_total',{
            type:'bar',
            data:{
              labels:this.scenarios_compared.map(s=>s.General.Name), //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets:[{
                label:`${translate('TotalGHG_descr')} (${this.current_unit_ghg})`,
                data:this.scenarios_compared.map(scenario=>{
                  let divisor = this.current_unit_ghg=='tCO2eq'?1000:1;
                  return scenario.TotalGHG().total/divisor; //current emissions
                }),//[12, 19, 3, 5, 2, 3],
                backgroundColor:['#327ccb'],
                borderColor:['#327ccb'],
                borderWidth:1,
              }],
            },
            options:{
              aspectRatio:4,
              scales:{
                y:{
                  beginAtZero:true,
                  borderWidth:2,
                },
              },
            }
          });
        }

        //Chart.js - line chart: ghg difference between scenarios
        if(document.getElementById('line_chart_ghg_difference')){
          this.charts.line_chart_ghg_difference=new Chart('line_chart_ghg_difference',{
            type:'line',
            data:{
              labels: this.scenarios_compared.map(s=>s.General.Name), //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets:[{
                label:`${translate('Variation of total GHG emissions')} (%)`,
                data: this.scenarios_compared.map((scenario,i)=>{
                  if(i==0) return 0;
                  let curr = scenario.TotalGHG().total; //current emissions
                  let prev = this.scenarios_compared[i-1].TotalGHG().total; //previous scenario
                  variation = 100*(curr-prev)/prev;
                  return variation;
                }),//[12, 19, 3, 5, 2, 3],
                backgroundColor:['#327ccb'],
                borderColor:['#327ccb'],
                borderWidth:1,
              }],
            },
            options: {
              aspectRatio:4,
              scales: {
                y: {
                  beginAtZero: true,
                  borderWidth:2,
                }
              },
              plugins:{
                datalabels: {
                  color: '#36A2EB'
                },
              },
            },
          });
        }

        //Chart.js - line chart: nrg difference between scenarios
        if(document.getElementById('line_chart_nrg_difference')){
          this.charts.line_chart_ghg_difference=new Chart('line_chart_nrg_difference',{
            type:'line',
            data:{
              labels: this.scenarios_compared.map(s=>s.General.Name), //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets:[
                {
                  label: 'Variation of total energy consumption (%)',
                  data: this.scenarios_compared.map((scenario,i)=>{
                    if(i==0) return 0;

                    let curr = scenario.TotalNRG(); //current energy consumption
                    let prev = this.scenarios_compared[i-1].TotalNRG(); //previous scenario
                    variation = 100*(curr-prev)/prev;
                    return variation;
                  }),//[12, 19, 3, 5, 2, 3],
                  backgroundColor:["#ffbe54"],
                  borderColor:["#ffbe54"],
                  borderWidth: 1
                },
              ]
            },
            options: {
              aspectRatio:4,
              scales: {
                y: {
                  beginAtZero: true,
                  borderWidth:2,
                }
              },
              plugins:{
                datalabels: {
                  color: '#36A2EB'
                },
              },
            },
          });
        }

        //Chart.js - bar chart: total ghg by gas
        if(document.getElementById('bar_chart_ghg_by_gas')){
          this.charts.bar_chart_ghg_by_gas= new Chart('bar_chart_ghg_by_gas',{
            type:'bar',
            data:{
              labels:this.scenarios_compared.map(s=>s.General.Name), //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets:[
                ...['co2','ch4','n2o'].map(gas=>{
                  return{
                    label:`${gas.toUpperCase()} (${this.current_unit_ghg})`,
                    data:this.scenarios_compared.map(scenario=>{
                      let divisor = this.current_unit_ghg=='tCO2eq'?1000:1;
                      return scenario.TotalGHG()[gas]/divisor;
                    }),//[12,19,3,5,2,3]
                    backgroundColor:[Charts.gas_colors[gas]],
                    borderColor:[Charts.gas_colors[gas]],
                    borderWidth:1,
                  };
                }),
              ],
            },
            options:{
              aspectRatio:4,
              scales:{
                x:{stacked:true},
                y:{
                  beginAtZero:true,
                  borderWidth:2,
                  stacked:true,
                },
              }
            },
          });
        }

        //Chart.js - bar chart: total ghg by stage
        if(document.getElementById('bar_chart_ghg_by_stage')){
          this.charts.bar_chart_ghg_by_stage = new Chart('bar_chart_ghg_by_stage',{
            type:'bar',
            data:{
              labels: this.scenarios_compared.map(s=>s.General.Name), //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets:[
                //column subdivisions
                ...Structure.filter(s=>s.sublevel).map(stage=>{
                  return {
                    label:`${translate(stage.level)}/${translate(stage.sublevel)} (${this.current_unit_ghg})`,
                    data:this.scenarios_compared.map(scenario=>{
                      let divisor = this.current_unit_ghg=='tCO2eq'?1000:1;
                      return scenario[stage.level][stage.sublevel].map(ss=>ss[stage.prefix+'_KPI_GHG']().total).sum()/divisor;
                    }),
                    backgroundColor:[stage.color],
                    borderColor:[stage.color],
                    borderWidth:1,
                  };
                }),
              ],
            },
            options:{
              aspectRatio:4,
              scales:{
                x:{stacked:true},
                y:{
                  beginAtZero:true,
                  borderWidth:2,
                  stacked:true,
                },
              }
            },
          });
        }

        //Chart.js - bar chart: total ghg by stage
        if(document.getElementById('bar_chart_ghg_by_ipcc_categories')){
          this.charts.bar_chart_ghg_by_ipcc_categories = new Chart('bar_chart_ghg_by_ipcc_categories',{
            type:'bar',
            data:{
              labels:this.scenarios_compared.map(s=>s.General.Name), //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets:[
                //column subdivisions
                ...Object.entries(IPCC_categories).map(([key,obj])=>{
                  return{
                    label:`${obj.description} (${this.current_unit_ghg})`,
                    data:this.scenarios_compared.map(scenario=>{
                      let divisor = this.current_unit_ghg=='tCO2eq'?1000:1;
                      return obj.emissions(scenario)/divisor;
                    }),
                    backgroundColor:[obj.color],
                    borderColor:[obj.color],
                    borderWidth:1,
                  };
                }),
              ],
            },
            options:{
              aspectRatio:4,
              scales:{
                x:{stacked:true},
                y:{
                  beginAtZero:true,
                  borderWidth:2,
                  stacked:true,
                },
              }
            },
          });
        }

        //Chart.js - bar chart: total nrg by scenario
        if(document.getElementById('bar_chart_nrg_by_assessment')){
          this.charts.bar_chart_nrg_by_assessment = new Chart('bar_chart_nrg_by_assessment',{
            type:'bar',
            data:{
              labels:this.scenarios_compared.map(s=>s.General.Name), //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets:[{
                label:`${translate("Energy consumption")} (${this.current_unit_nrg})`,
                data:this.scenarios_compared.map(scenario=>{
                  let divisor = this.current_unit_nrg=='MWh'?1000:1;
                  let total=scenario.TotalNRG()/divisor; //current emissions
                  return total;
                }),//[12,19,3,5,2,3]
                backgroundColor:["#ffbe54"],
                borderColor:["#ffbe54"],
                borderWidth:1,
              }],
            },
            options:{
              aspectRatio:4,
              scales:{
                y:{
                  beginAtZero:true,
                  borderWidth:2,
                },
              },
            },
          });
        }
      //--
    },

    get_level_color,
    get_base_unit,
    format,
    translate,
  },

  updated(){
    let _this=this;
    this.$nextTick(()=>{
      try{
        _this.draw_all_charts();
      }catch(e){
        console.warn(e);
      }
    })
  },

  template:`
    <div id=compare_scenarios v-if="visible && Languages.ready">
      <!--buttons select view-->
      <div id=select_chart_container>
        <button :selected="current_view=='table'" @click="current_view='table'" >
          {{translate("Overview")}}:<br>
          {{translate("Inputs & outputs")}}
        </button>
        <button :selected="current_view=='bar_chart_ghg_total'" @click="current_view='bar_chart_ghg_total'">
          {{translate("Total GHG emissions")}}
        </button>
        <button :selected="current_view=='bar_chart_ghg_by_gas'" @click="current_view='bar_chart_ghg_by_gas'">
          {{translate("Emissions by gas")}}<br>
          (${'CO2, N2O, CH4'.prettify()})
        </button>
        <button :selected="current_view=='bar_chart_ghg_by_stage'" @click="current_view='bar_chart_ghg_by_stage'">
          {{translate("Emissions by stage")}}
        </button>
        <button :selected="current_view=='bar_chart_nrg_by_assessment'" @click="current_view='bar_chart_nrg_by_assessment'">
          {{translate("Total energy consumption")}}
        </button>
        <!--
          <button
            :selected="current_view=='bar_chart_ghg_by_ipcc_categories'"
            @click="current_view='bar_chart_ghg_by_ipcc_categories'">
            Emissions by IPCC category
          </button>
        -->
      </div>

      <!--title-->
      <h1 style="text-align:center">
        {{translate("Compare assessments")}}
      </h1>

      <div
        style="
          display:grid;
          grid-template-columns:50% 50%;
          align-content:center;
          margin-bottom:20px;
          text-align:center;
        "
      >
        <!--select scenarios-->
        <div>
          <p style="text-align:center;color:#666">
            <b>{{translate("Select the assessments to be compared")}}</b>
          </p>

          <!--list of assessments-->
          <div class=flex style="justify-content:center;text-align:center">
            <div class=selectable_scenario v-for="scenario in get_scenarios()">
              <label>
                <input
                  type=checkbox
                  @click="add_scenario_to_compared(scenario)"
                  :checked="scenarios_compared.indexOf(scenario)+1"
                >
                <span>
                  {{scenario.General.Name}}
                </span>
              </label>
            </div>
          </div>

          <tutorial_tip
            id   ="Assessment_comparison"
            title="Assessment_comparison"
            text ="Select_the_assessments_that_you_would_like_to_compare_with_each_other._Please_note_that_the_order_of_the_selection_determines_the_order_of_the_compared_assessments._E.g._If_you_have_3_assessment_for_the_years_2018,_2019_and_2020,_you_will_need_to_select_the_assessments_in_this_particular_order._If_you_select_2019,_2020_and_2018,_the_order_would_be_different."
            style="margin:5px auto"
          ></tutorial_tip>
        </div>

        <!--select units-->
        <div>
          <p style="text-align:center;color:#666">
            <b>{{translate("Select units")}}</b>
          </p>
          <select
            v-model="current_unit_ghg"
            v-if="current_view=='table'||current_view!='bar_chart_nrg_by_assessment'"
          >
            <option>kgCO2eq</option>
            <option>tCO2eq</option>
          </select>
          <select
            v-model="current_unit_nrg"
            v-if="current_view=='table'||current_view=='bar_chart_nrg_by_assessment'"
          >
            <option>kWh</option>
            <option>MWh</option>
          </select>
        </div>

        <!--include inputs outputs-->
        <div style="margin:2em 0" v-if="current_view=='table'">
          <big>{{translate("Compare")}}:</big>
          <label> <input type=checkbox v-model="include.inputs"  > {{translate('INPUTS').toLowerCase() }}</label>
          <label> <input type=checkbox v-model="include.outputs" > {{translate('OUTPUTS').toLowerCase()}}</label>
        </div>

        <!--include zero valued variables or not-->
        <div style="margin:2em 0" v-if="current_view=='table'">
          <label>
            <input type=checkbox v-model="hide_zero_valued_variables">
            {{translate("Hide zero (0) values in results")}}
          </label>
        </div>
      </div>

      <!--table-->
      <div v-if="current_view=='table'">
        <!--compare scenarios table-->
        <table style="margin:10px auto;width:100%" v-if="scenarios_compared.length">
          <!--scenarios names-->
          <tbody v-if="include.inputs || include.outputs">
            <tr>
              <td style="border-top:none;border-left:none"></td>
              <th v-for="scenario in scenarios_compared">
                <b>{{scenario.General.Name}}</b>
              </th>
            </tr>
          </tbody>

          <!--summary header-->
          <tr v-if="include.outputs">
            <td :colspan="1+scenarios_compared.length">
              <div style="font-size:larger;font-weight:bold">
                {{translate("Summary")}}
              </div>
            </td>
          </tr>

          <!--summary: total ghg emissions of assessment-->
          <tbody v-if="include.outputs">
            <tr>
              <td style="font-weight:bolder;">
                {{translate('TotalGHG_descr')}}
              </td>
              <td v-for="scenario in scenarios_compared">
                <div class=number>
                  {{ format_emission(scenario.TotalGHG().total) }}
                </div>
                <div
                  class="unit"
                  style="text-align:right"
                  v-html="current_unit_ghg.prettify()"
                ></div>
              </td>
            </tr>
          </tbody>

          <!--summary: {ws wsa wst wsd ww wwc wwt wwo}_KPI_GHG-->
          <tbody
            v-if="include.outputs"
            v-for="level in Structure.filter(s=>!s.sublevel)"
          >
            <tr>
              <td :style="{background:level.color,fontWeight:'bold'}">
                &emsp; {{ translate(level.prefix+'_KPI_GHG_descr') }}
              </td>
              <td v-for="scenario in scenarios_compared">
                <div class=number>
                  {{format_emission(
                    scenario[level.level][level.prefix+'_KPI_GHG']().total
                  )}}
                </div>
                <div
                  class="unit"
                  style="text-align:right"
                  v-html="current_unit_ghg.prettify()"
                ></div>
              </td>
            </tr>

            <tr
              v-for="stage in Structure.filter(s=>s.sublevel && s.level==level.level)"
              v-if="
                !hide_zero_valued_variables ||
                scenarios_compared.map(sce=>sce[stage.level][stage.sublevel].map(ss=>ss[stage.prefix+'_KPI_GHG']().total).sum()).sum()
              "
            >
              <td :style="{background:stage.color}">
                &emsp;
                &emsp;
                {{translate(stage.prefix+'_KPI_GHG_descr')}}
              </td>
              <!--variable value-->
              <td v-for="scenario in scenarios_compared">
                <div class=number>
                  {{
                    format_emission(
                     scenario[stage.level][stage.sublevel].map(ss=>ss[stage.prefix+'_KPI_GHG']().total).sum()
                    )
                  }}
                </div>
                <div
                  class="unit"
                  style="text-align:right"
                  v-html="current_unit_ghg.prettify()"
                ></div>
              </td>
            </tr>
          </tbody>

          <!--separation row-->
          <tr v-if="include.outputs"><td style="height:15px;border:none"></td></tr>

          <!--iterate stages-->
          <tbody
            v-for="stage in [{level:'General'}].concat(Structure)"
            v-if="
              !stage.sublevel ||
              get_scenarios().map(sce=>sce[stage.level][stage.sublevel].length).sum()
            "
          >
            <tr v-if="!(stage.level=='General' && include.inputs==false)">
              <th
                :colspan="1+scenarios_compared.length"
                :style="'background:'+get_level_color(stage.level)"
              >
                <div style="text-align:left;color:white;font-size:larger;font-weight:bold">
                  {{translate(stage.level)}}
                  <span v-if="stage.sublevel">
                    &rsaquo;
                    {{translate(stage.sublevel)}}
                  </span>
                </div>
              </th>
            </tr>

            <tr
              v-for="v in get_variables_and_values(stage.level, stage.sublevel)"
              v-if="show_variable(v)"
            >
              <!--variable code and description-->
              <th :style="{background:get_level_color(stage.level),paddingLeft:'20px'}">
                <div class=flex style="justify-content:space-between">
                  <div v-if="Info[v.code]">
                    <div
                      v-html="translate(v.code+'_descr').prettify()"
                      style="color:white"
                    ></div>
                  </div>

                  <div style="font-size:smaller">
                    <a
                      @click="variable.view(v.code)"
                      style="color:white"
                    >
                      {{v.code}}
                    </a>
                  </div>
                </div>
              </th>

              <!--variable value-->
              <td
                v-for="arr,i in v.scenario_values"
                :style="scenarios_compared[i]==Global ? 'background:#f6f6f6':''"
              >
                <!--value and unit-->
                <div>
                  <div
                    v-if="arr.length"
                    style="text-align:right"
                  >
                    <div v-if="arr.length==1">{{ format(arr[0]) }}           </div>
                    <div v-else>              {{ arr.map(val=>format(val)) }}</div>
                  </div>
                  <div
                    class="unit"
                    style="text-align:right"
                    v-html="translate(get_base_unit(v.code, scenarios_compared[i]),true).prettify()"
                  ></div>
                </div>
              </td>
            </tr>

            <!--separation row--><tr><td style="height:1px;border:none"></td></tr>
          </tbody>
        </table>
      </div>

      <!--charts-->
      <div>
        <div
          v-if="current_view=='bar_chart_ghg_total'"
          class="chart_container bar"
        >
          <canvas id="bar_chart_ghg_total" width="400" height="400"></canvas>
          <div v-if="scenarios_compared.length>1" style="text-align:center;margin-top:4em">
            <b>{{translate("Variation in respect of previous assessment (%)")}}</b>
            <canvas id="line_chart_ghg_difference" width="400" height="400"></canvas>
          </div>
        </div>

        <div
          v-if="current_view=='bar_chart_ghg_by_gas'"
          class="chart_container bar"
        >
          <canvas id="bar_chart_ghg_by_gas" width="400" height="400"></canvas>
        </div>

        <div
          v-if="current_view=='bar_chart_ghg_by_stage'"
          class="chart_container bar"
        >
          <canvas id="bar_chart_ghg_by_stage" width="400" height="400"></canvas>
        </div>

        <div
          v-if="current_view=='bar_chart_ghg_by_ipcc_categories'"
          class="chart_container bar"
        >
          <canvas id="bar_chart_ghg_by_ipcc_categories" width="400" height="400"></canvas>
        </div>

        <div
          v-if="current_view=='bar_chart_nrg_by_assessment'"
          class="chart_container bar"
        >
          <canvas id="bar_chart_nrg_by_assessment" width="400" height="400"></canvas>
          <div v-if="scenarios_compared.length>1" style="text-align:center;margin-top:4em">
            <b>{{translate("Variation in respect of previous assessment (%)")}}</b>
            <canvas id="line_chart_nrg_difference" width="400" height="400"></canvas>
          </div>
        </div>

        <div
          v-if="current_view=='bar_chart_ghg_by_substage'"
          class="chart_container bar"
        >
          <div id="bar_chart_ghg_by_substage"></div>
        </div>
      </div>

      <!--notification "scenarios_compared is empty"-->
      <div
        v-if="scenarios_compared.length==0"
        style="padding:1em;text-align:center;font-style:italic"
        v-html="'~'+translate('No assessments included to comparison')"
      ></div>
    </div>
  `,

  style:`
    <style>
      #compare_scenarios {
        padding-left:1em;
        padding-right:5px;
        padding-top:2em;
        background:#eff5fb;
      }
      #compare_scenarios div.selectable_scenario{
        border:1px solid #ccc;
        padding:0.5em;
        background:white;
      }
      #compare_scenarios div.selectable_scenario:hover{
        color:var(--color-level-generic);
      }
      #compare_scenarios button[selected]{
        background:var(--color-level-generic);
        color:white;
      }

      /*bar chart css*/
      #compare_scenarios div.chart_container.bar svg {
        font: 10px sans-serif;
        shape-rendering: crispEdges;
      }
      #compare_scenarios div.chart_container.bar .axis path,
      #compare_scenarios div.chart_container.bar .axis line {
        fill: none;
        stroke: #000;
      }
      #compare_scenarios div.chart_container.bar path.domain {
        stroke: none;
      }
      #compare_scenarios div.chart_container.bar .y .tick line {
        stroke: #ddd;
      }
      #compare_scenarios div#select_chart_container {
        display:grid;
        grid-template-columns:repeat(5,1fr);
        grid-gap:1px;
      }
      #compare_scenarios div#select_chart_container button {
        height:60px;
        text-overflow:ellipsis;
        overflow:hidden;
      }
      #compare_scenarios div#select_chart_container button:hover {
        background:var(--color-level-generic);
        color:white;
      }

      /*table: summary*/
      #compare_scenarios tr.summary_row th {
        background:var(--color-level-generic);
        color:white;
        text-align:left;
      }
    </style>
  `,
});
