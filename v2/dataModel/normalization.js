//data structure to perform normalization: the code is the denominator
var Normalization={
  Water:{
    reside:"ws_resi_pop",
    servic:"ws_serv_pop",
    volume:"wsd_auth_con",
    energy:"ws_nrg_cons",
    Abstraction: {volume:"wsa_vol_conv", energy:"wsa_nrg_cons" },
    Treatment:   {volume:"wst_vol_trea", energy:"wst_nrg_cons" },
    Distribution:{volume:"wsd_vol_dist", energy:"wsd_nrg_cons" },
  },
  Waste:{
    reside:"ww_resi_pop",
    servic:"ww_serv_pop",
    volume:"wwt_vol_trea",
    energy:"ww_nrg_cons",
    Collection:{volume:"wwc_vol_conv", energy:"wwc_nrg_cons"},
    Treatment: {volume:"wwt_vol_trea", energy:"wwt_nrg_cons"},
    Discharge: {volume:"wwd_total_m3", energy:"wwd_nrg_cons"},
  },
  Faecl:{
    reside:"fs_resi_pop",
    servic:"fs_onsi_pop",
  },

  /*normalize
    category: (string) reside,servic,volume or energy
    field:    (string) numerator
    level:    (string) Water,Waste,Faecl
    sublevel: (string) Abstraction,Collection,Treatment,Distribution,Discharge
  */
  normalize:function(category,field,level,sublevel) {
    //numerator
    var loc = locateVariable(field);
    var sta = loc.sublevel ? Global[loc.level][loc.sublevel] : Global[loc.level];
    var num = sta[field]();

    //divisor
    var divisor = (sublevel=='false' || category=='reside' || category=='servic') ? this[level][category] : this[level][sublevel][category];
    var loc = locateVariable(divisor);
    var sta = loc.sublevel ?  Global[loc.level][loc.sublevel] : Global[loc.level];
    var div = typeof(sta[divisor])=='function' ? sta[divisor]() : sta[divisor];

    return num/div;
  },
}
