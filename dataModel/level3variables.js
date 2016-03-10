/* variables hidden in level 2, shown in level3: */

var Level3={};

Level3.list=
[
	//WSA
	"wsa_pmp_head", "wsa_vol_pump", "wsa_vol_turb", "wsa_vol_turb", "wsa_trb_head", "wsa_wat_loss", "wsa_main_len", "wsa_fri_loss",
	"c_wsa_vol_head", "c_wsa_trb_head", "wsa_KPI_std_nrg_cons", "wsa_KPI_std_nrg_recv", "wsa_KPI_water_losses", "wsa_KPI_un_head_loss",
	//WST
	"wst_tst_carr", "wst_tst_aest", "wst_tst_micr", "wst_tst_phch", "wst_tst_radi", "wst_tst_disc", "wst_mass_slu", "wst_trea_cap", "wst_t_PCFSFD", "wst_t_PCF_FD", "wst_t__CFSFD", "wst_t__CF_FD", "wst_t______D", "wst_t__other",
	"c_wst_tests_compl", "wst_KPI_slu_per_m3", "wst_KPI_capac_util", "wst_SL_qual_com", "wst_KPI_t_PCFSFD", "wst_KPI_t_PCF_FD", "wst_KPI_t__CFSFD", "wst_KPI_t__CF_FD", "wst_KPI_t______D", "wst_KPI_t__other",
	//WSD
	"wsd_deli_pts", "wsd_ser_cons", "wsd_time_pre", "wsd_vol_inje", "wsd_min_pres", "wsd_hi_no_el", "wsd_lo_no_el", "wsd_av_no_el", "wsd_wt_el_no", "wsd_vol_pump", "wsd_pmp_head", "wsd_nrg_recv", "wsd_main_len", "wsd_fri_loss",
	"c_wsd_nrg_natu", "c_wsd_nrg_mini", "c_wsd_nrg_supp", "c_wsd_nrg_topo", "c_wsd_vol_head", "wsd_SL_pres_ade", "wsd_SL_cont_sup", "wsd_KPI_water_losses", "wsd_KPI_un_head_loss", "wsd_KPI_std_nrg_cons", "wsd_KPI_nrg_efficien", "wsd_KPI_nrg_topgraph",
	//todo
	//WWC
	"wwc_vol_pump", "wwc_pmp_head", "c_wwc_vol_head", "wwc_KPI_std_nrg_co",
	//WWT
	"wwt_tst_cmpl", "wwt_tst_cond", "wwt_t_T_____", "wwt_t__A____", "wwt_t__A_CF_", "wwt_t__ANCF_", "wwt_t______L", "wwt_t__other", "wwt_mass_slu", "wwt_dryw_slu", "wwt_trea_cap",
	"wwt_KPI_sludg_prod", "wwt_KPI_dry_sludge", "wwt_KPI_capac_util", "wwt_KPI_t_T_____", "wwt_KPI_t__A____", "wwt_KPI_t__A_CF_", "wwt_KPI_t__ANCF_", "wwt_KPI_t______L", "wwt_KPI_t__other", "wwt_SL_qual_com",
	//WWD
	"wwd_vol_pump", "wwd_pmp_head", "wwd_vol_turb", "wwd_trb_head",
	"c_wwd_vol_head", "c_wwd_trb_head", "wwd_KPI_std_nrg_cons", "wwd_KPI_std_nrg_recv",
];

Level3.isInList=function(code)
{
	for(var i in this.list)
	{
		if(code==this.list[i]){return true;break;}
	}
	return false;
}
