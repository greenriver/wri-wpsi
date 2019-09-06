class CreateWidgetDatapoints < ActiveRecord::Migration[5.2]
  def change
    create_table :widget_datapoints, id: false do |t|
      t.string :"gid_2"
      t.date :"month_indep"
      t.string :"gid_1"
      t.string :"gid_0"
      t.decimal :"SI.POV.DDAY"
      t.decimal :"SI.POV.LMIC"
      t.decimal :"SI.POV.UMIC"
      t.decimal :"SH.STA.STNT.ZS"
      t.decimal :"NY.GDP.PCAP.PP.KD"
      t.decimal :"SL.UEM.TOTL.ZS"
      t.decimal :"FP.CPI.TOTL.ZG"
      t.decimal :"SL.AGR.EMPL.ZS"
      t.decimal :"NV.AGR.TOTL.ZS"
      t.decimal :"rainfed"
      t.decimal :"value_a_2010"
      t.decimal :"value_i_2010"
      t.decimal :"value_r_2010"
      t.decimal :"bci_bci"
      t.decimal :"v2x_corr"
      t.decimal :"v2x_execorr"
      t.decimal :"SP.DYN.IMRT.IN"
      t.decimal :"al_ethnic"
      t.decimal :"al_religion"
      t.binary :"election_recent"
      t.decimal :"reign"
      t.decimal :"et_anom_month"
      t.decimal :"et_act_month"
      t.decimal :"et_anom_year"
      t.decimal :"agreements_count_12m"
      t.decimal :"agreements_fatalities_12m"
      t.decimal :"battles_count_12m"
      t.decimal :"battles_fatalities_12m"
      t.decimal :"peaceful_protests_riots_count_12m"
      t.decimal :"peaceful_protests_riots_fatalities_12m"
      t.decimal :"remote_violence_count_12m"
      t.decimal :"remote_violence_fatalities_12m"
      t.decimal :"strategic_development_count_12m"
      t.decimal :"strategic_development_fatalities_12m"
      t.decimal :"violence_against_civilians_count_12m"
      t.decimal :"violence_against_civilians_fatalities_12m"
      t.decimal :"violent_protests_riots_count_12m"
      t.decimal :"violent_protests_riots_fatalities_12m"
      t.binary :"remote_violence_binary_12m"
      t.binary :"peaceful_protests_riots_binary_12m"
      t.binary :"violence_against_civilians_binary_12m"
      t.binary :"violent_protests_riots_binary_12m"
      t.binary :"agreements_binary_12m"
      t.binary :"battles_binary_12m"
      t.decimal :"loccount"
      t.decimal :"locdensity"
      t.decimal :"age_0-14"
      t.decimal :"age_15-24"
      t.decimal :"age_25-64"
      t.decimal :"age_65+"
      t.decimal :"sex_0-14"
      t.decimal :"sex_15-24"
      t.decimal :"sex_25-64"
      t.decimal :"sex_65+"
      t.decimal :"natpop"
      t.decimal :"rurpop"
      t.decimal :"urbpop"
      t.decimal :"rurratio"
      t.decimal :"spi_3"
      t.decimal :"spi_6"
      t.decimal :"spi_12"
      t.decimal :"spi_24"
      t.decimal :"urbrate"
      t.decimal :"wateraccess"
      t.decimal :"sanitationaccess"
      t.date :"month_start"
      t.decimal :"bwd"
      t.decimal :"bws"
      t.decimal :"iav"
      t.decimal :"rfr"
      t.decimal :"sev"
    end

    # Ensure max one datapoint per month per gid_2 region
    # TODO: Add this back in once data is cleaned up
    # add_index :widget_datapoints, [:gid_2, :month_indep], unique: true
  end
end
