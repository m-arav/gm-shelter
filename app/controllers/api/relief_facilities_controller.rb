class Api::ReliefFacilitiesController < ApplicationController

  def search
    @relief_facilities = ReliefFacility
    @relief_facilities = @relief_facilities.within(*params[:within].split(",").collect(&:to_f)) if params[:within]
    render :json => @relief_facilities.all
  end
end
