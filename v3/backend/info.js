/*
  Info: one-level-depth object that stores magnitudes and units for all inputs
  and outputs

	Format:
		"code": { "magnitude": string, "unit": string }

  inputs with magnitude=='Option' have an extra field ('table') which is the
  name of the table that has the options to pick
*/

let Info={
  //General
  version              :{magnitude:"text",unit:"text"},
  Name                 :{magnitude:"text",unit:"text"}, //name of assessment
  name                 :{magnitude:"text",unit:"text"}, //name of substages
  AssessmentPeriodStart:{magnitude:"text",unit:"YYYY-MM-DD"},
  AssessmentPeriodEnd  :{magnitude:"text",unit:"YYYY-MM-DD"},
  Comments             :{magnitude:"text",unit:"text"},
  Currency             :{magnitude:"text",unit:"text"},
  Country              :{magnitude:"text",unit:"text"},

  wwt_slu_comp_seqst_rate:{magnitude:"Mass/Mass",unit:"kgCO2eq/kgSludge"},
  wwt_slu_la_seqst_rate:{magnitude:"Mass/Mass",unit:"kgCO2eq/kgSludge"},
  wwo_la_seqst_rate:{magnitude:"Mass/Mass",unit:"kgCO2eq/kgSludge"},

  wwo_opd_tn:{magnitude:"Mass",unit:"kg"},

  wwt_slu_lf_DOCf:{magnitude:"Percent", unit:"%"},
  wwo_lf_DOCf:{magnitude:"Percent", unit:"%"},

  F_NON_CON:{magnitude:"Mass/Mass",unit:"kgN/kgN"},
  F_IND_COM:{magnitude:"Mass/Mass",unit:"kgN/kgN"},
  N_HH:{magnitude:"Mass/Mass",unit:"kgN/kgN"},

  wwt_slu_lf_decomp_3yr:{magnitude:"Percent", unit:"%"},
  wwo_lf_decomp_3yr:{magnitude:"Percent", unit:"%"},

  wwt_slu_lf_CH4_in_gas:{magnitude:"Percent", unit:"%"},
  wwo_lf_CH4_in_gas:{magnitude:"Percent", unit:"%"},

  wwt_slu_comp_uncovered_pile_EF:{magnitude:"Mass/Mass",unit:"kgCH4-C/kgC"},

  wwt_slu_lf_uncertainty:{magnitude:"uncertainty",unit:"adimensional"},
  wwo_lf_uncertainty:{magnitude:"uncertainty",unit:"adimensional"},

  wwt_slu_comp_low_CN_EF:{magnitude:"Mass/Mass",unit:"kgN2O-N/kgN"},
  wwt_slu_lf_low_CN_EF:{magnitude:"Mass/Mass",unit:"kgN2O-N/kgN"},
  wwo_lf_low_CN_EF:{magnitude:"Mass/Mass",unit:"kgN2O-N/kgN"},

  wwo_la_solids_content:{magnitude:"Percent", unit:"%"},
  wwo_la_TVS:{magnitude:"Percent", unit:"%"},
  wwt_slu_sp_lifespan:{magnitude:"Stockpile lifespan time",unit:"years"},

  //sludge storing
  wwt_slu_sto_TVS:{magnitude:"Percent", unit:"%"},
  wwt_slu_sto_f_CH4:{magnitude:"Percent", unit:"%"},
  wwt_slu_sto_EF:{magnitude:"Percent", unit:"%"},

  //sludge composting
  wwt_slu_comp_emis_treated_or_piles_covered:{magnitude:"Option", table:"Yes/No", unit:"Yes/No"},
  wwt_slu_comp_solids_content:{magnitude:"Percentage", unit:"%"},
  wwt_slu_comp_TVS:{magnitude:"Percent", unit:"%"},
  wwt_slu_comp_N_cont:{magnitude:"Percent", unit:"%"},

  //sludge incineration
  wwt_slu_inc_N_cont:{magnitude:"Percent", unit:"%"},
  wwt_slu_inc_SNCR:{magnitude:"Option", table:"Yes/No", unit:"Yes/No"},

  //sludge land application
  wwt_slu_la_solids_content:{magnitude:"Percent",unit:"%"},
  wwt_slu_la_TVS           :{magnitude:"Percent",unit:"%"},
  wwt_slu_la_N_cont        :{magnitude:"Percent",unit:"%"},
  wwt_slu_la_EF            :{magnitude:"Mass/Mass",unit:"kgN2O-N/kgN"},

  //sludge landfilling wwt
  wwt_slu_lf_N_cont:{magnitude:"Percent", unit:"%"},
  wwt_slu_lf_TVS:{magnitude:"Percent", unit:"%"},
  wwt_slu_lf_MCF:{magnitude:"Ratio", unit:"ratio"},

  //sludge landfilling wwo
  wwo_lf_MCF:{magnitude:"Ratio", unit:"ratio"},


  //wwo
  wwo_KPI_GHG_sludge:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_bod_cont:{magnitude:"Mass",unit:"kg"},
  wwo_la_N_to_N2O:{magnitude:"Mass/Mass",unit:"kgN2O-N/kgN"},
  wwo_ch4_efac_con:{magnitude:"Mass/Mass",unit:"kgCH4/kgBOD" },
  wwo_KPI_GHG_containment:{magnitude:"Mass",unit:"kgCO2eq"},

  //biogas
  wwt_biog_pro:{magnitude:"Volume of biogas",unit:"Nm3"},
  wwt_biog_fla:{magnitude:"Percentage",unit:"%"},
  wwt_biog_val:{magnitude:"Percentage",unit:"%"},
  wwt_biog_lkd:{magnitude:"Percentage",unit:"%"},
  wwt_biog_sold:{magnitude:"Percentage",unit:"%"},
  wwo_KPI_GHG_dig_fuel:{magnitude:"Mass",unit:"kgCO2eq"},

  wwt_moles_biogas_produced:{magnitude:"Moles",unit:"moles"},
  wwt_biogas_usage:{magnitude:"Percentage",unit:"%"},
  wwt_KPI_GHG_biog_flared:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_GHG_biog_valorized:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_GHG_biog_leaked:{magnitude:"Mass",unit:"kgCO2eq"},

  wwo_biog_pro:{magnitude:"Volume of biogas",unit:"Nm3"},
  wwo_biog_fla:{magnitude:"Percentage",unit:"%"},
  wwo_biog_val:{magnitude:"Percentage",unit:"%"},
  wwo_biog_lkd:{magnitude:"Percentage",unit:"%"},
  wwo_biog_sold:{magnitude:"Percentage",unit:"%"},
  wwo_fuel_dig:{magnitude:"Volume",unit:"L"},
  wwo_dige_typ:{magnitude:"Option",table:"Fuel type",unit:"Fuel type"},
  wwo_moles_biogas_produced:{magnitude:"Moles",unit:"moles"},
  wwo_biogas_usage:{magnitude:"Percentage",unit:"%"},
  wwo_KPI_GHG_biog_flared:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_GHG_biog_valorized:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_GHG_biog_leaked:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_nrg_biog_val:{magnitude:"Energy",unit:"kWh"},

  //costs
  ws_nrg_cost:{magnitude:"Currency",unit:"USD"},
  ws_run_cost:{magnitude:"Currency",unit:"USD"},
  ww_nrg_cost:{magnitude:"Currency",unit:"USD"},
  ww_run_cost:{magnitude:"Currency",unit:"USD"},

  wwo_n2o_efac_opd:{magnitude:"Mass/Mass",unit:"kgN2O-N/kgN"},

  wsa_conv_kwh:{magnitude:"Conversion",unit:"kgCO2eq/kWh"},
  wst_conv_kwh:{magnitude:"Conversion",unit:"kgCO2eq/kWh"},
  wsd_conv_kwh:{magnitude:"Conversion",unit:"kgCO2eq/kWh"},
  wwc_conv_kwh:{magnitude:"Conversion",unit:"kgCO2eq/kWh"},
  wwt_conv_kwh:{magnitude:"Conversion",unit:"kgCO2eq/kWh"},
  wwo_conv_kwh:{magnitude:"Conversion",unit:"kgCO2eq/kWh"},

  ww_SL_serv_pop:{magnitude:"Percentage",unit:"%"},
  wwc_tn:{magnitude:"Mass", unit:"kg"},
  wwc_bod:{magnitude:"Mass", unit:"kg"},
  wwc_n2o_efac_cso:{magnitude:"Mass/Mass", unit:"kgN2O-N/kgN"},
  wwc_n2o_efac_col:{magnitude:"Mass/Mass", unit:"kgN2O-N/kgN"},

  //inputs that are options instead of numeric
  wsa_fuel_typ     : {magnitude:"Option", table:"Fuel type",                unit:"Fuel type"},
  wst_fuel_typ     : {magnitude:"Option", table:"Fuel type",                unit:"Fuel type"},
  wsd_fuel_typ     : {magnitude:"Option", table:"Fuel type",                unit:"Fuel type"},
  wsd_trck_typ     : {magnitude:"Option", table:"Fuel type",                unit:"Fuel type"},
  wwc_fuel_typ     : {magnitude:"Option", table:"Fuel type",                unit:"Fuel type"},
  wwt_fuel_typ     : {magnitude:"Option", table:"Fuel type",                unit:"Fuel type"},
  wwt_trck_typ     : {magnitude:"Option", table:"Fuel type",                unit:"Fuel type"},
  wwt_dige_typ     : {magnitude:"Option", table:"Fuel type",                unit:"Fuel type"},
  wwt_reus_trck_typ: {magnitude:"Option", table:"Fuel type",                unit:"Fuel type"},
  wwo_fuel_typ     : {magnitude:"Option", table:"Fuel type",                unit:"Fuel type"},
  wwo_trck_typ     : {magnitude:"Option", table:"Fuel type",                unit:"Fuel type"},
  wsa_pmp_type     : {magnitude:"Option", table:"Pump type",                unit:"Pump type"},
  wsa_pmp_size     : {magnitude:"Option", table:"Pump size",                unit:"Pump size"},
  wsd_pmp_size     : {magnitude:"Option", table:"Pump size",                unit:"Pump size"},
  wst_treatment    : {magnitude:"Option", table:"Potabilization chain",     unit:"Potabilization chain"},
  wwo_flooding     : {magnitude:"Option", table:"Yes/No",                   unit:"Yes/No"},

  //numeric variables
  conv_kwh_co2:{magnitude:"Conversion",unit:"kgCO2/kWh"},
  bod_pday:{magnitude:"Mass/inhab/time",unit:"g/person/day"},
  prot_con:{magnitude:"Annual per capita consumption",unit:"kg/person/year"},
	Days:{magnitude:"Time",unit:"days"},
  Years:{magnitude:"Time",unit:"years"},
  TotalNRG:{magnitude:"Energy", unit:"kWh"},
  TotalGHG:{magnitude:"Mass",unit:"kgCO2eq"},

	ws_KPI_GHG:{magnitude:"Mass",unit:"kgCO2eq"},
	ws_SL_serv_pop:{magnitude:"Percentage",unit:"%"},
	ws_nrg_cons:{magnitude:"Energy",unit:"kWh"},
	ws_resi_pop:{magnitude:"People", unit:"people"},
	ws_vol_fuel:{magnitude:"Volume",unit:"L"},
	wsa_KPI_GHG:{magnitude:"Mass",unit:"kgCO2eq"},
	wsa_KPI_GHG_elec:{magnitude:"Mass",unit:"kgCO2eq"},
	wsa_KPI_GHG_fuel:{magnitude:"Mass",unit:"kgCO2eq"},
	wsa_KPI_ghg_estm_red:{magnitude:"Mass",unit:"kgCO2eq"},
	wsa_KPI_nrg_cons_new:{magnitude:"Energy",unit:"kWh"},
	wsa_KPI_nrg_elec_eff:{magnitude:"Efficiency",unit:"%"},
	wsa_KPI_nrg_estm_sav:{magnitude:"Energy",unit:"kWh"},
	wsa_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m"},
	wsa_KPI_std_nrg_newp:{magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m"},
	wsa_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km"},
	wsa_main_len:{magnitude:"Distance",unit:"km"},
	wsa_nrg_cons:{magnitude:"Energy",unit:"kWh"},
	wsa_nrg_per_abs_watr:{magnitude:"Energy/Volume",unit:"kWh/m3"},
	wsa_nrg_pump:{magnitude:"Energy",unit:"kWh"},
	wsa_pmp_amps:{magnitude:"Intensity",unit:"A"},
	wsa_pmp_exff:{magnitude:"Efficiency",unit:"%"},
	wsa_pmp_flow:{magnitude:"Flow",unit:"L/s"},
	wsa_pmp_head:{magnitude:"Head",unit:"m"},
	wsa_pmp_pw:{magnitude:"Power",unit:"kW"},
	wsa_pmp_volt:{magnitude:"Voltage",unit:"V"},
	wsa_sta_head:{magnitude:"Head",unit:"m"},
	wsa_vol_conv:{magnitude:"Volume",unit:"m3"},
	wsa_vol_fuel:{magnitude:"Volume",unit:"L"},
	wsa_vol_pump:{magnitude:"Volume",unit:"m3"},
	wsd_KPI_GHG_elec:{magnitude:"Mass",unit:"kgCO2eq"},
	wsd_KPI_GHG_fuel:{magnitude:"Mass",unit:"kgCO2eq"},
	wsd_KPI_GHG_trck:{magnitude:"Mass",unit:"kgCO2eq"},
	wsd_KPI_nrg_efficien:{magnitude:"Percent",unit:"%"},
	wsd_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m3"},
	wsd_KPI_nrg_per_vd:{magnitude:"Energy/Volume",unit:"kWh/m3"},
	wsd_KPI_nrg_topgraph:{magnitude:"Percent",unit:"%"},
	wsd_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m"},
	wsd_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km"},
	wsd_KPI_water_losses:{magnitude:"Volume/Distance",unit:"m3/km"},
	wsd_SL_cont_sup:{magnitude:"Percentage",unit:"%"},
	wsd_SL_nr_water:{magnitude:"Percentage",unit:"%"},
	wsd_SL_pres_ade:{magnitude:"Percentage",unit:"%"},
	wsd_SL_water_loss:{magnitude:"Percentage",unit:"%"},
	wsd_auth_con:{magnitude:"Volume",unit:"m3"},
	wsd_av_no_el:{magnitude:"Elevation",unit:"m asl"},
	wsd_bill_con:{magnitude:"Volume",unit:"m3"},
	wsd_deli_pts:{magnitude:"Number",unit:"number"},
	wsd_hi_no_el:{magnitude:"Elevation",unit:"m asl"},
	wsd_lo_no_el:{magnitude:"Elevation",unit:"m asl"},
	wsd_main_len:{magnitude:"Distance",unit:"km"},
	wsd_min_pres:{magnitude:"Pressure",unit:"m"},
	wsd_nrg_cons:{magnitude:"Energy",unit:"kWh"},
	wsd_nrg_mini:{magnitude:"Energy",unit:"kWh"},
	wsd_nrg_natu:{magnitude:"Energy",unit:"kWh"},
	wsd_nrg_pump:{magnitude:"Energy",unit:"kWh"},
	wsd_nrg_supp:{magnitude:"Energy",unit:"kWh"},
	wsd_nrg_topo:{magnitude:"Energy",unit:"kWh"},
	wsd_pmp_head:{magnitude:"Head",unit:"m"},
	wsd_ser_cons:{magnitude:"Number",unit:"number"},
	wsd_serv_pop:{magnitude:"People", unit:"people"},
	wsd_sta_head:{magnitude:"Head",unit:"m"},
	wsd_time_pre:{magnitude:"% Time",unit:"hours/day"},
	wsd_vol_dist:{magnitude:"Volume",unit:"m3"},
	wsd_vol_fuel:{magnitude:"Volume",unit:"L"},
	wsd_vol_pump:{magnitude:"Volume",unit:"m3"},
	wsd_vol_trck:{magnitude:"Volume",unit:"L"},
	wsd_wt_el_no:{magnitude:"Elevation",unit:"m"},
	wst_KPI_GHG:{magnitude:"Mass",unit:"kgCO2eq"},
	wst_KPI_GHG_elec:{magnitude:"Mass",unit:"kgCO2eq"},
	wst_KPI_GHG_fuel:    {magnitude:"Mass",unit:"kgCO2eq"},
	wst_KPI_capac_util:{magnitude:"Percentage",unit:"%"},
	wst_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m3"},
	wst_KPI_tst_carr:{magnitude:"Percentage",unit:"%"},
	wst_nrg_cons:{magnitude:"Energy",unit:"kWh"},
	wst_trea_cap:{magnitude:"Volume",unit:"m3"},
	wst_tst_carr:{magnitude:"Percentage",unit:"%"},
	wst_vol_fuel:{magnitude:"Volume",unit:"L"},
	wst_vol_trea:{magnitude:"Volume",unit:"m3"},
	ww_KPI_GHG :{magnitude:"Mass",unit:"kgCO2eq"},
	ww_resi_pop:{magnitude:"People", unit:"people"},
	ww_vol_fuel:{magnitude:"Volume",unit:"L"},
	wwc_KPI_GHG:{magnitude:"Mass",unit:"kgCO2eq"},
	wwc_KPI_GHG_elec:{magnitude:"Mass",unit:"kgCO2eq"},
	wwc_KPI_GHG_fuel:    {magnitude:"Mass",unit:"kgCO2eq"},
	wwc_KPI_ghg_estm_red:{magnitude:"Mass",unit:"kgCO2eq"},
	wwc_KPI_nrg_cons_new:{magnitude:"Energy",unit:"kWh"},
	wwc_KPI_nrg_elec_eff:{magnitude:"Efficiency",unit:"%"},
	wwc_KPI_nrg_estm_sav:{magnitude:"Energy",unit:"kWh"},
	wwc_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m3"},
	wwc_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m"},
	wwc_KPI_std_nrg_newp:{magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m"},
	wwc_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km"},
	wwc_coll_len:{magnitude:"Distance",unit:"km"},
	wwc_nrg_cons:{magnitude:"Energy",unit:"kWh"},
	wwc_nrg_pump:{magnitude:"Energy",unit:"kWh"},
	wwc_pmp_amps:{magnitude:"Intensity",unit:"A"},
	wwc_pmp_exff:{magnitude:"Efficiency",unit:"%"},
	wwc_pmp_flow:{magnitude:"Flow",unit:"L/s"},
	wwc_pmp_head:{magnitude:"Head",unit:"m"},
	wwc_pmp_pw:{magnitude:"Power",unit:"kW"},
	wwc_pmp_volt:{magnitude:"Voltage",unit:"V"},
	wwc_sta_head:{magnitude:"Head",unit:"m"},
	wwc_vol_coll:{magnitude:"Volume",unit:"m3"},
	wwc_vol_fuel:{magnitude:"Volume",unit:"L"},
	wwc_vol_pump:{magnitude:"Volume",unit:"m3"},
	wwt_KPI_GHG:{magnitude:"Mass",unit:"kgCO2eq"},
	wwt_KPI_GHG_biog:{magnitude:"Mass",unit:"kgCO2eq"},
	wwt_KPI_GHG_elec:{magnitude:"Mass",unit:"kgCO2eq"},
	wwt_KPI_GHG_fuel:{magnitude:"Mass",unit:"kgCO2eq"},
	wwt_KPI_GHG_tre:{magnitude:"Mass",unit:"kgCO2eq"},
	wwt_KPI_capac_util:{magnitude:"Percent",unit:"%"},
	wwt_KPI_nrg_biogas:{magnitude:"Energy/Volume",unit:"kWh/m3"},
	wwt_KPI_nrg_per_kg:{magnitude:"Energy/Mass",unit:"kWh/kgBOD"},
	wwt_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m3"},
	wwt_KPI_nrg_per_pump:{magnitude:"Energy/Volume",unit:"kWh/m3"},
	wwt_KPI_nrg_x_biog:{magnitude:"Percent",unit:"%"},
	wwt_KPI_sludg_prod:{magnitude:"Mass/Volume",unit:"kg/m3"},
	wwt_SL_qual_com :{magnitude:"Percentage",unit:"%"},

	wwt_bod_effl:{magnitude:"Mass",unit:"kg"},
	wwt_bod_infl:{magnitude:"Mass",unit:"kg"},
	wwt_bod_rmvd:{magnitude:"Mass",unit:"kg"},
	wwt_bod_slud:{magnitude:"Mass",unit:"kg"},
	wwt_ch4_biog:{magnitude:"Percentage",unit:"%"},
	wwt_fuel_dig:{magnitude:"Volume",unit:"L"},
	wwt_mass_slu:{magnitude:"Mass",unit:"kg"},
	wwt_mass_slu_app:{magnitude:"Mass",unit:"kg"},
	wwt_mass_slu_comp:{magnitude:"Mass",unit:"kg"},
	wwt_mass_slu_inc:{magnitude:"Mass",unit:"kg"},
	wwt_mass_slu_land:{magnitude:"Mass",unit:"kg"},
	wwt_mass_slu_sto:{magnitude:"Mass",unit:"kg"},
	wwt_mass_slu_stock:{magnitude:"Mass",unit:"kg"},
	wwt_nrg_biog:{magnitude:"Energy",unit:"kWh"},
	wwt_nrg_biog_val:{magnitude:"Energy",unit:"kWh"},
	wwt_nrg_cons:{magnitude:"Energy",unit:"kWh"},
	wwt_temp_inc:{magnitude:"Temperature",unit:"K"},
	wwt_time_slu_sto:{magnitude:"Storage time",unit:"days"},
	wwt_tn_effl:{magnitude:"Mass",unit:"kg"},
	wwt_trea_cap:{magnitude:"Volume",unit:"m3"},
	wwt_tst_cmpl:{magnitude:"Number",unit:"number"},
	wwt_tst_cond:{magnitude:"Number",unit:"number"},
	wwt_vol_disc:{magnitude:"Volume",unit:"m3"},
	wwt_vol_fuel:{magnitude:"Volume",unit:"L"},
	wwt_vol_nonp:{magnitude:"Volume",unit:"m3"},
	wwt_vol_trea:{magnitude:"Volume",unit:"m3"},
  ws_KPI_GHG_abs:{magnitude:"Mass",unit:"kgCO2eq"},
  ws_KPI_GHG_dis:{magnitude:"Mass",unit:"kgCO2eq"},
  ws_KPI_GHG_tre:{magnitude:"Mass",unit:"kgCO2eq"},
  ws_SL_auth_con:{magnitude:"Volume/inhab/time",unit:"L/serv.pop./day"},
  ws_serv_pop:{magnitude:"People",unit:"people"},
  wsa_nrg_cost:{magnitude:"Currency",unit:"USD"},
  wsa_nrg_per_pmp_watr:{magnitude:"Energy/Volume",unit:"kWh/m3"},
  wsa_pmp_pf:{magnitude:"Power factor",unit:"ratio"},
  wsa_run_cost:{magnitude:"Currency",unit:"USD"},
  wsd_KPI_GHG:          {magnitude:"Mass",               unit:"kgCO2eq"},
  wsd_KPI_ghg_estm_red: {magnitude:"Mass",               unit:"kgCO2eq"},
  wsd_KPI_nrg_cons_new: {magnitude:"Energy",             unit:"kWh"},
  wsd_KPI_nrg_elec_eff: {magnitude:"Efficiency",         unit:"%"},
  wsd_KPI_nrg_estm_sav: {magnitude:"Energy",             unit:"kWh"},
  wsd_KPI_std_nrg_newp: {magnitude:"Energy/Volume/Head", unit:"kWh/m3/100m"},
  wsd_nrg_cost:{magnitude:"Currency",unit:"USD"},
  wsd_pmp_amps:         {magnitude:"Intensity",          unit:"A"},
  wsd_pmp_exff:         {magnitude:"Efficiency",         unit:"%"},
  wsd_pmp_flow:         {magnitude:"Flow",               unit:"L/s"},
  wsd_pmp_pf:{magnitude:"Power factor",unit:"ratio"},
  wsd_pmp_pw:           {magnitude:"Power",              unit:"kW"},
  wsd_pmp_volt:         {magnitude:"Voltage",            unit:"V"},
  wsd_run_cost:{magnitude:"Currency",unit:"USD"},
  wst_KPI_ghg_estm_red:{magnitude:"Mass",unit:"kgCO2eq"},
  wst_KPI_nrg_cons_new:{magnitude:"Energy",unit:"kWh"},
  wst_KPI_nrg_elec_eff:{magnitude:"Efficiency",unit:"%"},
  wst_KPI_nrg_estm_sav:{magnitude:"Energy",unit:"kWh"},
  wst_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m"},
  wst_KPI_std_nrg_newp:{magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m"},
  wst_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km"},
  wst_coll_len:{magnitude:"Distance",unit:"km"},
  wst_nrg_cost:{magnitude:"Currency",unit:"USD"},
  wst_nrg_pump:{magnitude:"Energy",unit:"kWh"},
  wst_pmp_amps:{magnitude:"Intensity",unit:"A"},
  wst_pmp_exff:{magnitude:"Efficiency",unit:"%"},
  wst_pmp_flow:{magnitude:"Flow",unit:"L/s"},
  wst_pmp_head:{magnitude:"Head",unit:"m"},
  wst_pmp_pf:  {magnitude:"Power factor",unit:"ratio"},
  wst_pmp_pw:{magnitude:"Power",unit:"kW"},
  wst_pmp_volt:{magnitude:"Voltage",unit:"V"},
  wst_run_cost:{magnitude:"Currency",unit:"USD"},
  wst_sta_head:{magnitude:"Head",unit:"m"},
  wst_vol_pump:{magnitude:"Volume",unit:"m3"},
  ww_KPI_GHG_col:{magnitude:"Mass",unit:"kgCO2eq"},
  ww_KPI_GHG_ons:{magnitude:"Mass",unit:"kgCO2eq"},
  ww_KPI_GHG_tre:{magnitude:"Mass",unit:"kgCO2eq"},
  ww_nrg_cons:{magnitude:"Energy",unit:"kWh"},
  ww_serv_pop:{magnitude:"People",unit:"people"},
  ww_vol_gene:{magnitude:"Volume",unit:"m3"},
  wwc_KPI_GHG_col:{magnitude:"Mass",unit:"kgCO2eq"},
  wwc_KPI_GHG_cso:{magnitude:"Mass",unit:"kgCO2eq"},
  wwc_ch4_efac_col: {magnitude:"Mass/Mass", unit:"kgCH4/kgBOD" },
  wwc_ch4_efac_cso: {magnitude:"Mass/Mass", unit:"kgCH4/kgBOD" },
  wwc_conn_pop:{magnitude:"People",unit:"people"},
  wwc_nrg_cost:{magnitude:"Currency",unit:"USD"},
  wwc_pmp_pf:{magnitude:"Power factor",unit:"ratio"},
  wwc_run_cost:{magnitude:"Currency",unit:"USD"},
  wwc_vol_coll    :{magnitude:"Volume",unit:"m3"},
  wwc_vol_coll_tre:{magnitude:"Volume",unit:"m3"},
  wwc_vol_coll_unt:{magnitude:"Volume",unit:"m3"},
  wwo_KPI_GHG:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_GHG_biog:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_GHG_dis:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_GHG_dumping:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_GHG_elec:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_GHG_fuel:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_GHG_landapp:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_GHG_landfil:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_GHG_trck:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_GHG_tre:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_GHG_unt_opd:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_GHG_urine:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_ghg_estm_red:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_KPI_nrg_cons_new:{magnitude:"Energy",unit:"kWh"},
  wwo_KPI_nrg_elec_eff:{magnitude:"Efficiency",unit:"%"},
  wwo_KPI_nrg_estm_sav:{magnitude:"Energy",unit:"kWh"},
  wwo_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m"},
  wwo_KPI_std_nrg_newp:{magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m"},
  wwo_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km"},

  wwo_N_urine:{magnitude:"Mass",unit:"kg"},
  wwo_N_dumping:{magnitude:"Mass",unit:"kg"},
  wwo_N_urine_EF:{magnitude:"Mass/Mass",unit:"kgN2O-N/kgN"},

  wwo_bod_conc_fs:{magnitude:"Concentration", unit:"kg/m3" },
  wwo_bod_effl:{magnitude:"Mass",  unit:"kg" },
  wwo_bod_infl:     {magnitude:"Mass",       unit:"kg"}, //influent bod load
  wwo_bod_rmvd:     {magnitude:"Mass",       unit:"kg"}, //bod removed as FS
  wwo_bod_slud:{magnitude:"Mass",  unit:"kg" },
  wwo_ch4_biog:{magnitude:"Percent",unit:"%" },
  wwo_ch4_efac_dis: {magnitude:"Mass/Mass",        unit:"kgCH4/kgBOD" },
  wwo_ch4_efac_dumping:{magnitude:"Mass/Mass",unit:"kgCH4/kgBOD"},
  wwo_n2o_efac_dumping:{magnitude:"Mass/Mass", unit:"kgN2O-N/kgN"},
  wwo_ch4_efac_tre: {magnitude:"Mass/Mass",        unit:"kgCH4/kgBOD" },
  wwo_coll_len:{magnitude:"Distance",unit:"km"},
  wwo_cont_emp:     {magnitude:"Percentage", unit:"%"},
  wwo_fdensity:{magnitude:"Concentration", unit:"kg/m3" },
  wwo_fslu_emp:     {magnitude:"Volume",     unit:"m3"}, //FS emptied

  ww_GHG_avoided:{magnitude:"Mass", unit:"kgCO2eq"},

  wwt_ghg_avoided:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_ghg_avoided_biogas:{magnitude:"Mass", unit:"kgCO2eq"},
  wwt_ghg_avoided_reuse_nutrient:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_ghg_avoided_reuse_water:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_ghg_avoided_sequestration:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_ghg_avoided_sequestration_composting:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_ghg_avoided_sequestration_landapp:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_ghg_avoided_sequestration_landfil:{magnitude:"Mass",unit:"kgCO2eq"},

  wwo_ghg_avoided:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_ghg_avoided_biogas:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_ghg_avoided_landapp:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_ghg_avoided_landfil:{magnitude:"Mass",unit:"kgCO2eq"},
  wwo_ghg_avoided_reuse:{magnitude:"Mass",unit:"kgCO2eq"},

  wwo_la_N_cont:{magnitude:"Percent", unit:"%"},
  wwo_lf_N_cont:{magnitude:"Percent",unit:"%"},
  wwo_lf_TVS:{magnitude:"Percent",unit:"%"},
  wwo_mass_landapp:{magnitude:"Mass",    unit:"kg"},
  wwo_mass_landfil:{magnitude:"Mass",unit:"kg"},
  wwo_n2o_efac_dis: {magnitude:"Mass/Mass", unit:"kgN2O-N/kgN"},
  wwo_n2o_efac_tre: {magnitude:"Mass/Mass", unit:"kgN2O-N/kgN"},
  wwo_tn_infl:{magnitude:"Mass",unit:"kg"},
  wwo_tn_effl:{magnitude:"Mass",unit:"kg"},
  wwo_nrg_biog:{magnitude:"Energy",unit:"kWh"},
  wwo_nrg_cons:{magnitude:"Energy",unit:"kWh"},
  wwo_nrg_cost:{magnitude:"Currency",unit:"USD"},
  wwo_nrg_pump:{magnitude:"Energy",unit:"kWh"},
  wwo_onsi_pop:    {magnitude:"People",unit:"people"},
  wwo_open_pop:    {magnitude:"People",unit:"people"},
  wwo_pmp_amps:{magnitude:"Intensity",unit:"A"},
  wwo_pmp_exff:{magnitude:"Efficiency",unit:"%"},
  wwo_pmp_flow:{magnitude:"Flow",unit:"L/s"},
  wwo_pmp_head:{magnitude:"Head",unit:"m"},
  wwo_pmp_pf:  {magnitude:"Power factor",unit:"ratio"},
  wwo_pmp_pw:{magnitude:"Power",unit:"kW"},
  wwo_pmp_volt:{magnitude:"Voltage",unit:"V"},
  wwo_reused_N:{magnitude:"Mass",unit:"kg"},
  wwo_reused_P:{magnitude:"Mass",unit:"kg"},
  wwo_run_cost:{magnitude:"Currency",unit:"USD"},
  wwo_sta_head:{magnitude:"Head",unit:"m"},
  wwo_vol_dumping:{magnitude:"Volume",unit:"m3"},
  wwo_vol_fuel:{magnitude:"Volume",unit:"L"},
  wwo_vol_pump:{magnitude:"Volume",unit:"m3"},
  wwo_vol_trck:{magnitude:"Volume",unit:"L"},
  wwt_KPI_GHG_dig_fuel:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_GHG_disc:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_GHG_reus_trck:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_GHG_slu:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_GHG_slu_composting:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_GHG_slu_incineration:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_GHG_slu_land_application:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_GHG_slu_landfilling:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_GHG_slu_stockpilling:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_GHG_slu_storage:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_GHG_slu_transport:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_ghg_estm_red:{magnitude:"Mass",unit:"kgCO2eq"},
  wwt_KPI_nrg_cons_new:{magnitude:"Energy",unit:"kWh"},
  wwt_KPI_nrg_elec_eff:{magnitude:"Efficiency",unit:"%"},
  wwt_KPI_nrg_estm_sav:{magnitude:"Energy",unit:"kWh"},
  wwt_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m"},
  wwt_KPI_std_nrg_newp:{magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m"},
  wwt_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km"},

  wwt_ch4_efac_dis:{magnitude:"Mass/Mass", unit:"kgCH4/kgBOD" },
  wwt_ch4_efac_tre:{magnitude:"Mass/Mass", unit:"kgCH4/kgBOD" },
  wwt_coll_len:{magnitude:"Distance",unit:"km"},
  wwt_n2o_efac_dis:{magnitude:"Mass/Mass", unit:"kgN2O-N/kgN"},
  wwt_n2o_efac_tre:{magnitude:"Mass/Mass", unit:"kgN2O-N/kgN"},
  wwt_nrg_cost:{magnitude:"Currency",unit:"USD"},
  wwt_nrg_pump:{magnitude:"Energy",unit:"kWh"},
  wwt_pmp_amps:{magnitude:"Intensity",unit:"A"},
  wwt_pmp_exff:{magnitude:"Efficiency",unit:"%"},
  wwt_pmp_flow:{magnitude:"Flow",unit:"L/s"},
  wwt_pmp_head:{magnitude:"Head",unit:"m"},
  wwt_pmp_pf:  {magnitude:"Power factor",unit:"ratio"},
  wwt_pmp_pw:{magnitude:"Power",unit:"kW"},
  wwt_pmp_volt:{magnitude:"Voltage",unit:"V"},
  wwt_reus_vol_trck:{magnitude:"Volume",unit:"L"},
  wwt_run_cost:{magnitude:"Currency",unit:"USD"},
  wwt_serv_pop:{magnitude:"People",unit:"people"},
  wwt_slu_la_N_cont:{magnitude:"Percent", unit:"%"},
  wwt_sta_head:{magnitude:"Head",unit:"m"},
  wwt_tn_infl:{magnitude:"Mass",unit:"kg"},
  wwt_total_m3:{magnitude:"Volume",unit:"m3"},
  wwt_vol_pump:{magnitude:"Volume",unit:"m3"},
  wwt_vol_tslu:{magnitude:"Volume",unit:"L"},
  wwt_wr_N_rec:     {magnitude:"Mass",   unit:"kg"},
  wwt_wr_P_rec:     {magnitude:"Mass",   unit:"kg"},
};
