# == Schema Information
#
# Table name: tasks
#
#  id          :integer          not null, primary key
#  title       :string(255)
#  description :string(255)
#  duedate     :date
#  is_complete :boolean          default(FALSE)
#  user_id     :integer
#  priority_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  address     :text
#  latitude    :float            default(0.0)
#  longitude   :float            default(0.0)
#

class Task < ActiveRecord::Base
  before_save :geocode ##before we do anything runs the geocode

  attr_accessible :title, :description, :duedate, :is_complete, :user_id, :address, :priority_id #not mass assigning long and latitude so we dont' add to attr accessiblwe
  belongs_to :user, :inverse_of => :tasks
  belongs_to :priority, :inverse_of => :tasks

  private
  def geocode
    result = Geocoder.search(self.address).first

    if result.present?
        self.latitude = result.latitude #set latitude and longitude to our model before we save, whenever they enter an address
        self.longitude = result.longitude
      end
    end
end
