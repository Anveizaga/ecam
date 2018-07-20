/**
*
	Info: one-level-depth object that stores magnitudes and units for all inputs and outputs
		descriptions in english are inside languages/en.php
		descriptions in spanish are inside languages/es.php

	Format:
		"code": { "magnitude": string, "unit": string }
*/

var Info = {
  //fsm emissions
  fs_KPI_GHG:  {magnitude:"Mass", unit:"kg CO<sub>2</sub>e"},
  fsc_KPI_GHG: {magnitude:"Mass", unit:"kg CO<sub>2</sub>e"},
  fse_KPI_GHG: {magnitude:"Mass", unit:"kg CO<sub>2</sub>e"},
  fst_KPI_GHG: {magnitude:"Mass", unit:"kg CO<sub>2</sub>e"},
  fsr_KPI_GHG: {magnitude:"Mass", unit:"kg CO<sub>2</sub>e"},

  //fsm energy consumed
  fs_nrg_cons: {magnitude:"Energy", unit:"kWh"},
  fsc_nrg_cons: {magnitude:"Energy", unit:"kWh"},
  fse_nrg_cons: {magnitude:"Energy", unit:"kWh"},
  fst_nrg_cons: {magnitude:"Energy", unit:"kWh"},
  fsr_nrg_cons: {magnitude:"Energy", unit:"kWh"},

  //after water reuse edits
  ww_GHG_avoided:     {magnitude:"Mass", unit:"kg CO<sub>2</sub>e"},
  wwt_SL_GHG_avoided: {magnitude:"Mass", unit:"kg CO<sub>2</sub>e"},
  wwt_slu_comp_C_seq: {magnitude:"Mass", unit:"kg CO<sub>2</sub>e"},
  wwt_slu_app_C_seq:  {magnitude:"Mass", unit:"kg CO<sub>2</sub>e"},
  wwt_slu_land_C_seq: {magnitude:"Mass", unit:"kg CO<sub>2</sub>e"},
  wwt_wr_C_seq_slu:   {magnitude:"Mass", unit:"kg CO<sub>2</sub>e"},

  //wate reuse
  wwd_wr_N_rec:     {magnitude:"Mass",   unit:"kg"},
  wwd_wr_P_rec:     {magnitude:"Mass",   unit:"kg"},
  wwd_wr_adnrg:     {magnitude:"Energy", unit:"kWh"},
  wwd_wr_vol_d:     {magnitude:"Volume", unit:"m3"},
  wwd_wr_GHG_avo_N: {magnitude:"Mass",   unit:"kg CO<sub>2</sub>e"},
  wwd_wr_GHG_avo_P: {magnitude:"Mass",   unit:"kg CO<sub>2</sub>e"},
  wwd_wr_GHG_avo:   {magnitude:"Mass",   unit:"kg CO<sub>2</sub>e"},
  wwd_wr_nrg_sav:   {magnitude:"Energy", unit:"kWh"},
  wwd_wr_GHG_avo_d: {magnitude:"Mass",   unit:"kg CO<sub>2</sub>e"},

  //pump edits
  wsa_pmp_pf: {magnitude:"No magnitude",unit:"no unit"},
  wsd_pmp_pf: {magnitude:"No magnitude",unit:"no unit"},
  wwc_pmp_pf: {magnitude:"No magnitude",unit:"no unit"},

  //untreated, onsite and uncollected
  ww_KPI_GHG_unt:     {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
  ww_KPI_GHG_unt_n2o: {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
  ww_KPI_GHG_unt_ch4: {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
  ww_SL_ghg_ons:      {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
  ww_SL_ghg_ons_ch4:  {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
  ww_SL_ghg_ons_n2o:  {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
  ww_SL_ghg_unc:      {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
  ww_SL_ghg_unc_ch4:  {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
  ww_SL_ghg_unc_n2o:  {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	//GENERAL
	Days:{magnitude:"Time",unit:"days"},
	Years:{magnitude:"Time",unit:"years"},
	conv_kwh_co2:{magnitude:"Conversion",unit:"kg CO<sub>2</sub>/kWh"},
  prot_con:{magnitude:"Annual per capita consumption",unit:"kg/person/year"},
  bod_pday:{magnitude:"Mass/inhab/time",unit:"g/person/day"},
	TotalGHG :{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
  TotalNRG :{magnitude:"Energy", unit:"kWh"},
	content_C:{magnitude:"Mass",unit:"kg C"},
	content_N:{magnitude:"Mass",unit:"kg N"},

	/* +============+ */
	/* | Fuel types |
	/* +============+ */
	wsa_fuel_typ:{magnitude:"Option",unit:"Fuel type"},
	wst_fuel_typ:{magnitude:"Option",unit:"Fuel type"},
	wsd_fuel_typ:{magnitude:"Option",unit:"Fuel type"},
	wwc_fuel_typ:{magnitude:"Option",unit:"Fuel type"},
	wwt_fuel_typ:{magnitude:"Option",unit:"Fuel type"},
	wwd_fuel_typ:{magnitude:"Option",unit:"Fuel type"},
	wsd_trck_typ:{magnitude:"Option",unit:"Fuel type"},
	wwt_trck_typ:{magnitude:"Option",unit:"Fuel type"},
	wwd_trck_typ:{magnitude:"Option",unit:"Fuel type"},
	wwt_dige_typ:{magnitude:"Option",unit:"Fuel type"},

	//fuel ghg emissions splitted
	wsa_KPI_GHG_fuel:    {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsa_KPI_GHG_fuel_co2:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsa_KPI_GHG_fuel_n2o:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsa_KPI_GHG_fuel_ch4:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wst_KPI_GHG_fuel:    {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wst_KPI_GHG_fuel_co2:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wst_KPI_GHG_fuel_n2o:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wst_KPI_GHG_fuel_ch4:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsd_KPI_GHG_fuel:    {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsd_KPI_GHG_fuel_co2:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsd_KPI_GHG_fuel_n2o:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsd_KPI_GHG_fuel_ch4:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwc_KPI_GHG_fuel:    {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwc_KPI_GHG_fuel_co2:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwc_KPI_GHG_fuel_n2o:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwc_KPI_GHG_fuel_ch4:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG_fuel:    {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG_fuel_co2:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG_fuel_n2o:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG_fuel_ch4:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG_fuel:    {magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG_fuel_co2:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG_fuel_n2o:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG_fuel_ch4:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	/* +================+ */
	/* | Service levels | */
	/* +================+ */
	//Water Supply
	ws_SL_serv_pop:{magnitude:"Percentage",unit:"%"},
	ws_SL_auth_con:{magnitude:"Volume/inhab/time",unit:"L/serv.pop./day"},
	ws_SL_nrg_cost:{magnitude:"Percentage",unit:"%"},

	//Wastewater
	ww_SL_serv_pop:{magnitude:"Percentage",unit:"%"},
	ww_SL_treat_m3:{magnitude:"Percentage",unit:"%"},
	ww_SL_nrg_cost:{magnitude:"Percentage",unit:"%"},



	//L1 Water Supply
	ws_resi_pop:{magnitude:"People",unit:"People"},
	ws_serv_pop:{magnitude:"People",unit:"People"},
	ws_nrg_cons:{magnitude:"Energy",unit:"kWh"},
	ws_vol_fuel:{magnitude:"Volume",unit:"L"},
	ws_nrg_cost:{magnitude:"Currency",unit:"USD"},
	ws_run_cost:{magnitude:"Currency",unit:"USD"},
	ws_KPI_GHG :{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	//L1 Wastewater
	ww_resi_pop:{magnitude:"People",unit:"People"},
	ww_conn_pop:{magnitude:"People",unit:"People"},
	ww_serv_pop:{magnitude:"People",unit:"People"},
	ww_onsi_pop:{magnitude:"People",unit:"People"},
  ww_uncl_pop:{magnitude:"People",unit:"People"},
  ww_untr_pop:{magnitude:"People",unit:"People"},

  ww_nrg_cons:{magnitude:"Energy",unit:"kWh"},
  ww_nrg_cost:{magnitude:"Currency",unit:"USD"},
  ww_run_cost:{magnitude:"Currency",unit:"USD"},
	ww_vol_fuel:{magnitude:"Volume",unit:"L"},
	ww_KPI_GHG :{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	//L2 Water Abstraction
	wsa_nrg_cons:{magnitude:"Energy",unit:"kWh"},
	wsa_nrg_pump:{magnitude:"Energy",unit:"kWh"},
	wsa_vol_conv:{magnitude:"Volume",unit:"m3"},
	wsa_vol_pump:{magnitude:"Volume",unit:"m3"},
	wsa_vol_fuel:{magnitude:"Volume",unit:"L"},
	wsa_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m"},
	wsa_pmp_head:{magnitude:"Head",unit:"m"},
	wsa_sta_head:{magnitude:"Head",unit:"m"},
	wsa_main_len:{magnitude:"Distance",unit:"km"},
	wsa_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km"},
	wsa_KPI_GHG_elec:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsa_KPI_GHG:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsa_nrg_per_abs_watr:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
  wsa_nrg_per_pmp_watr:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wsa_pmp_type:{magnitude:"Option",unit:"Pump Type"},
	wsa_pmp_size:{magnitude:"Option",unit:"Pump Size"},
	wsa_pmp_flow:{magnitude:"Flow",unit:"L/s"},
	wsa_pmp_volt:{magnitude:"Voltage",unit:"V"},
	wsa_pmp_amps:{magnitude:"Intensity",unit:"A"},
	wsa_pmp_exff:{magnitude:"Efficiency",unit:"%"},
	c_wsa_pmp_pw:{magnitude:"Power",unit:"kW"},
	wsa_KPI_nrg_elec_eff:{magnitude:"Efficiency",unit:"%"},
	wsa_KPI_std_nrg_newp:{magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m"},
	wsa_KPI_nrg_cons_new:{magnitude:"Energy",unit:"kWh"},
	wsa_KPI_nrg_estm_sav:{magnitude:"Energy",unit:"kWh"},
	wsa_KPI_ghg_estm_red:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	//L2 Water Treatment
	wst_vol_trea:{magnitude:"Volume",unit:"m3"},
	wst_vol_fuel:{magnitude:"Volume",unit:"L"},
	wst_nrg_cons:{magnitude:"Energy",unit:"kWh"},
	wst_nrg_pump:{magnitude:"Energy",unit:"kWh"},
	wst_tst_carr:{magnitude:"Percentage",unit:"%"},
	wst_mass_slu:{magnitude:"Mass",unit:"kg"},
	wst_trea_cap:{magnitude:"Volume",unit:"m3"},
	wst_treatmen:{magnitude:"Option",unit:"Technology"},
	wst_vol_pump:{magnitude:"Volume",unit:"m3"},
	wst_pmp_head:{magnitude:"Head",unit:"m"},
	wst_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wst_KPI_slu_per_m3:{magnitude:"Mass/Volume",unit:"kg/m<sup>3</sup>"},
	wst_KPI_capac_util:{magnitude:"Percentage",unit:"%"},
	wst_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m"},
	wst_KPI_tst_carr:{magnitude:"Percentage",unit:"%"},
	wst_KPI_GHG:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wst_KPI_GHG_elec:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	//L2 Water Distribution
	wsd_nrg_cons:{magnitude:"Energy",unit:"kWh"},
	wsd_nrg_pump:{magnitude:"Energy",unit:"kWh"},
	wsd_vol_dist:{magnitude:"Volume",unit:"m3"},
	wsd_auth_con:{magnitude:"Volume",unit:"m3"},
	wsd_bill_con:{magnitude:"Volume",unit:"m3"},

	wsd_SL_nr_water:{magnitude:"Percentage",unit:"%"},
	wsd_SL_ghg_attr:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsd_SL_GHG_nrw:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wst_SL_GHG_nrw:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsa_SL_GHG_nrw:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wsd_SL_water_loss:{magnitude:"Percentage",unit:"%"},

	wsd_deli_pts:{magnitude:"Number",unit:"number"},
	wsd_ser_cons:{magnitude:"Number",unit:"number"},
	wsd_time_pre:{magnitude:"% Time",unit:"hours/day"},
	wsd_min_pres:{magnitude:"Pressure",unit:"m"},
	wsd_hi_no_el:{magnitude:"Elevation",unit:"m asl"},
	wsd_lo_no_el:{magnitude:"Elevation",unit:"m asl"},
	wsd_av_no_el:{magnitude:"Elevation",unit:"m asl"},
	wsd_wt_el_no:{magnitude:"Elevation",unit:"m"},
	wsd_vol_pump:{magnitude:"Volume",unit:"m3"},
	wsd_pmp_head:{magnitude:"Head",unit:"m"},
	wsd_main_len:{magnitude:"Distance",unit:"km"},
	wsd_vol_fuel:{magnitude:"Volume",unit:"L"},
	wsd_vol_trck:{magnitude:"Volume",unit:"L"},
	wsd_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wsd_KPI_nrg_per_vd:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wsd_SL_pres_ade:{magnitude:"Percentage",unit:"%"},
	wsd_SL_cont_sup:{magnitude:"Percentage",unit:"%"},
	c_wsd_nrg_natu:{magnitude:"Energy",unit:"kWh"},
	c_wsd_nrg_mini:{magnitude:"Energy",unit:"kWh"},
	c_wsd_nrg_supp:{magnitude:"Energy",unit:"kWh"},
	c_wsd_nrg_topo:{magnitude:"Energy",unit:"kWh"},
	wsd_KPI_nrg_efficien:{magnitude:"Percent",unit:"%"},
	wsd_KPI_nrg_topgraph:{magnitude:"Percent",unit:"%"},
	wsd_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m"},
	wsd_KPI_water_losses:{magnitude:"Volume/Distance/Time",unit:"m<sup>3</sup>/km/year"},
	wsd_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km"},
	wsd_pmp_size:{magnitude:"Option",unit:"Pump Size"},
	wsd_sta_head:{magnitude:"Head",unit:"m"},
	wsd_KPI_GHG_elec:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	wsd_KPI_GHG_trck:     {magnitude:"Mass",               unit:"kg CO<sub>2</sub>e"},
	wsd_KPI_GHG_trck_co2: {magnitude:"Mass",               unit:"kg CO<sub>2</sub>e"},
	wsd_KPI_GHG_trck_n2o: {magnitude:"Mass",               unit:"kg CO<sub>2</sub>e"},
	wsd_KPI_GHG_trck_ch4: {magnitude:"Mass",               unit:"kg CO<sub>2</sub>e"},
  wsd_KPI_GHG:          {magnitude:"Mass",               unit:"kg CO<sub>2</sub>e"},
  wsd_pmp_flow:         {magnitude:"Flow",               unit:"L/s"},
  wsd_pmp_volt:         {magnitude:"Voltage",            unit:"V"},
  wsd_pmp_amps:         {magnitude:"Intensity",          unit:"A"},
  wsd_pmp_exff:         {magnitude:"Efficiency",         unit:"%"},
  c_wsd_pmp_pw:         {magnitude:"Power",              unit:"kW"},
  wsd_KPI_nrg_elec_eff: {magnitude:"Efficiency",         unit:"%"},
  wsd_KPI_std_nrg_newp: {magnitude:"Energy/Volume/Head", unit:"kWh/m3/100m"},
  wsd_KPI_nrg_cons_new: {magnitude:"Energy",             unit:"kWh"},
  wsd_KPI_nrg_estm_sav: {magnitude:"Energy",             unit:"kWh"},
  wsd_KPI_ghg_estm_red: {magnitude:"Mass",               unit:"kg CO<sub>2</sub>e"},

	//L2 Wastewater Collection
	wwc_vol_conv:{magnitude:"Volume",unit:"m3"},
	wwc_nrg_cons:{magnitude:"Energy",unit:"kWh"},
  wwc_conn_pop:{magnitude:"People",unit:"People"},
	wwc_vol_pump:{magnitude:"Volume",unit:"m3"},
	wwc_nrg_pump:{magnitude:"Energy",unit:"kWh"},
	wwc_pmp_head:{magnitude:"Head",unit:"m"},
	wwc_sta_head:{magnitude:"Head",unit:"m"},
	wwc_vol_fuel:{magnitude:"Volume",unit:"L"},
	wwc_coll_len:{magnitude:"Distance",unit:"km"},
	wwc_wet_flow:{magnitude:"Average Flow",unit:"m3/day"},
	wwc_dry_flow:{magnitude:"Average Flow",unit:"m3/day"},
	wwc_rain_day:{magnitude:"Time",unit:"day"},
	c_wwc_vol_infl:{magnitude:"Volume",unit:"m3"},
	wwc_SL_GHG_ii:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwc_SL_fratio:{magnitude:"No dimension",unit:"ratio"},
	wwc_SL_inf_emis:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwc_SL_GHG_inf:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_SL_GHG_inf:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_SL_GHG_inf:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwc_SL_conn_pop:{magnitude:"People",unit:"%"},
	wwc_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wwc_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m"},
	wwc_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km"},
	wwc_KPI_GHG_elec:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	wwc_KPI_GHG:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwc_pmp_flow:{magnitude:"Flow",unit:"L/s"},
	wwc_pmp_volt:{magnitude:"Voltage",unit:"V"},
	wwc_pmp_amps:{magnitude:"Intensity",unit:"A"},
	wwc_pmp_exff:{magnitude:"Efficiency",unit:"%"},
	c_wwc_pmp_pw:{magnitude:"Power",unit:"kW"},
	wwc_KPI_nrg_elec_eff:{magnitude:"Efficiency",unit:"%"},
	wwc_KPI_std_nrg_newp:{magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m"},
	wwc_KPI_nrg_cons_new:{magnitude:"Energy",unit:"kWh"},
	wwc_KPI_nrg_estm_sav:{magnitude:"Energy",unit:"kWh"},
	wwc_KPI_ghg_estm_red:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	//L2 Wastewater Treatment
  wwt_serv_pop:{magnitude:"People",unit:"People"},
	wwt_biog_pro:{magnitude:"Volume",unit:"m3"},
	wwt_biog_val:{magnitude:"Volume",unit:"m3"},
	wwt_vol_trea:{magnitude:"Volume",unit:"m3"},
	wwt_nrg_cons:{magnitude:"Energy",unit:"kWh"},
	wwt_vol_fuel:{magnitude:"Volume",unit:"L"},
	wwt_bod_infl:{magnitude:"Mass",unit:"kg"},
	wwt_bod_effl:{magnitude:"Mass",unit:"kg"},
	wwt_bod_slud:{magnitude:"Mass",unit:"kg"},
	wwt_nrg_biog:{magnitude:"Energy",unit:"kWh"},
	wwt_ch4_biog:{magnitude:"Percentage",unit:"%"},
	wwt_tst_cmpl:{magnitude:"Number",unit:"number"},
	wwt_tst_cond:{magnitude:"Number",unit:"number"},
	wwt_mass_slu:{magnitude:"Mass",unit:"kg"},
	wwt_dryw_slu:{magnitude:"Mass",unit:"kg"},
	wwt_trea_cap:{magnitude:"Volume",unit:"m3"},
  wwt_vol_tslu:{magnitude:"Volume",unit:"L"},

	wwt_type_tre:{magnitude:"Option",unit:"Technology"},
	wwt_vol_pump:{magnitude:"Volume",unit:"m3"},
	wwt_nrg_pump:{magnitude:"Energy",unit:"kWh"},
	wwt_pmp_head:{magnitude:"Head",unit:"m"},
	wwt_slu_disp:{magnitude:"Option",unit:"Sludge type disposed of"},
	wwt_slu_type:{magnitude:"Option",unit:"Disposal type"},
	wwt_ch4_efac:{magnitude:"Mass/Mass",unit:"kgCH<sub>4</sub>/kgBOD"},
	c_wwt_nrg_biog:{magnitude:"Energy",unit:"kWh"},
	c_wwt_bod_rmvd:{magnitude:"Mass",unit:"kg"},
	wwt_biog_fla:{magnitude:"Volume",unit:"m3"},
	wwt_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wwt_KPI_nrg_per_kg:{magnitude:"Energy/Mass",unit:"kWh/kg"},
	wwt_KPI_biog_x_bod:{magnitude:"Volume/Mass",unit:"Nm<sup>3</sup>/kg"},
	wwt_KPI_nrg_biogas:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wwt_KPI_nrg_x_biog:{magnitude:"Percent",unit:"%"},
	wwt_KPI_sludg_prod:{magnitude:"Mass/Volume",unit:"kg/m<sup>3</sup>"},
	wwt_KPI_dry_sludge:{magnitude:"Percent",unit:"% DW"},
	wwt_KPI_capac_util:{magnitude:"Percent",unit:"%"},
	wwt_SL_qual_com :{magnitude:"Percentage",unit:"%"},
  wwt_SL_vol_pday:{magnitude:"Volume/inhab/time",unit:"L/serv.pop./day"},
	wwt_KPI_nrg_per_pump:{magnitude:"Energy/Volume",unit:"kWh/m3"},
	wwt_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m"},
	wwt_KPI_GHG_elec:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG_tre_ch4:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG_tre_n2o:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG_tre:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwt_KPI_GHG_biog:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

  wwt_GHG_tre_n2o:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},//input

	//sludge mgmt
	wwt_fuel_dig:{magnitude:"Volume",unit:"L"},
	wwt_mass_slu_app:{magnitude:"Mass",unit:"kg"},
	wwt_mass_slu_comp:{magnitude:"Mass",unit:"kg"},
	wwt_mass_slu_inc:{magnitude:"Mass",unit:"kg"},
	wwt_mass_slu_land:{magnitude:"Mass",unit:"kg"},
	wwt_mass_slu_sto:{magnitude:"Mass",unit:"kg"},
	wwt_mass_slu_stock:{magnitude:"Mass",unit:"kg"},
	wwt_temp_inc:{magnitude:"Temperature",unit:"K"},
	wwt_time_slu_sto:{magnitude:"Storage time",unit:"day"},
	wwt_soil_typ:{magnitude:"Option",unit:"Soil type"},
	c_wwt_ch4_pot:{magnitude:"Mass",unit:"kg CH<sub>4</sub>"},
  wwt_KPI_GHG_dig_fuel:{magnitude:"Mass",      unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_GHG_dig_fuel_co2:{magnitude:"Mass",  unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_GHG_dig_fuel_n2o:{magnitude:"Mass",  unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_GHG_dig_fuel_ch4:{magnitude:"Mass",  unit:"kg CO<sub>2</sub>e"},
  wwt_slu_storage_ch4:{magnitude:"Mass",       unit:"kg CO<sub>2</sub>e"},
  wwt_slu_composting_ch4:{magnitude:"Mass",    unit:"kg CO<sub>2</sub>e"},
  wwt_slu_composting_n2o:{magnitude:"Mass",    unit:"kg CO<sub>2</sub>e"},
  wwt_slu_inciner_ch4:{magnitude:"Mass",       unit:"kg CO<sub>2</sub>e"},
  wwt_slu_inciner_n2o:{magnitude:"Mass",       unit:"kg CO<sub>2</sub>e"},
  wwt_slu_landapp_n2o:{magnitude:"Mass",       unit:"kg CO<sub>2</sub>e"},
  wwt_slu_landfill_ch4:{magnitude:"Mass",      unit:"kg CO<sub>2</sub>e"},
  wwt_slu_landfill_n2o:{magnitude:"Mass",      unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_ghg_sto_co2eq:{magnitude:"Mass",     unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_ghg_comp_co2eq:{magnitude:"Mass",    unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_ghg_inc_co2eq:{magnitude:"Mass",     unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_ghg_app_co2eq:{magnitude:"Mass",     unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_ghg_land_co2eq:{magnitude:"Mass",    unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_ghg_stock_co2eq:{magnitude:"Mass",   unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_ghg_tsludge:{magnitude:"Mass",       unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_ghg_tsludge_co2:{magnitude:"Mass",   unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_ghg_tsludge_n2o:{magnitude:"Mass",   unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_ghg_tsludge_ch4:{magnitude:"Mass",   unit:"kg CO<sub>2</sub>e"},
  wwt_KPI_GHG_slu:{magnitude:"Mass",           unit:"kg CO<sub>2</sub>e"},

	//L2 Wastewater Discharge
	wwd_vol_disc:{magnitude:"Volume",unit:"m3"},
  wwd_total_m3:{magnitude:"Volume",unit:"m3"},
	wwd_nrg_cons:{magnitude:"Energy",unit:"kWh"},
	wwd_nrg_pump:{magnitude:"Energy",unit:"kWh"},
	wwd_vol_pump:{magnitude:"Volume",unit:"m3"},
	wwd_pmp_head:{magnitude:"Head",unit:"m"},
	wwd_vol_fuel:{magnitude:"Volume",unit:"L"},
	wwd_vol_trck:{magnitude:"Volume",unit:"L"},
	wwd_vol_nonp:{magnitude:"Volume",unit:"m3"},
	wwd_n2o_effl:{magnitude:"Mass/Volume",unit:"mg/L"},
	wwd_SL_ghg_non:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},
	wwd_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m"},
	wwd_KPI_GHG_elec:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG_trck:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG_trck_co2:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG_trck_n2o:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG_trck_ch4:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG_tre_n2o:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	wwd_KPI_GHG:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

	//UNFCCC categories
	unfccc_1A1 :{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	unfccc_1A3 :{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	unfccc_5A  :{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	unfccc_5B  :{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	unfccc_5C  :{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},
	unfccc_5D  :{magnitude:"Mass",unit:"kg CO<sub>2</sub>e"},

}
