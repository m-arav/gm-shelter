class Api::ReliefFacilitiesController < ApplicationController

  def search
    @relief_facilities = ReliefFacility
    @relief_facilities = @relief_facilities.within(*params[:within].split(",").collect(&:to_f)) if params[:within]
    if params[:facility_type]
      @relief_facilities = @relief_facilities.shelters if params[:facility_type] == 'shelter'
      @relief_facilities = @relief_facilities.colleciton_centers if params[:facility_type] == 'relief_material_collection'
    end
    setup_result
    render json: @result
  end

  private

  def setup_result
    if params[:within].blank?
      if params[:facility_type].blank?
        @result = ALL_FACILITIES
      elsif params[:facility_type] == 'shelter'
        @result = ALL_SHELTERS
      else
        @result = @relief_facilities.all
      end
    else
      @result = @relief_facilities.all
    end
  end
end
