class Api::ReliefFacilitiesController < ApplicationController

  def search
    @relief_facilities = ReliefFacility
    @relief_facilities = @relief_facilities.within(*params[:within].split(",").collect(&:to_f)) if params[:within]
    if params[:facility_type]
      @relief_facilities = @relief_facilities.shelters if params[:facility_type] == 'shelter'
      @relief_facilities = @relief_facilities.colleciton_centers if params[:facility_type] == 'relief_material_collection'
    end
    render json: @relief_facilities.all
  end
end
