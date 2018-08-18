class Api::ReliefFacilitiesController < ApplicationController

  def search
    render :json => ReliefFacility.all
  end
end
