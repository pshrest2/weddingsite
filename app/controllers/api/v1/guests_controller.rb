module Api
  module V1
    class GuestsController < ApplicationController
      before_action :set_wedding
      before_action :set_guest, only: %i[show update destroy]

      # GET /weddings/:wedding_id/guests
      def index
        @guests = @wedding.guests
        render json: @guests
      end

      # GET /weddings/:wedding_id/guests/:id
      def show
        render json: @guest
      end

      # GET /weddings/:wedding_id/guests/:passcode
      def show_by_passcode
        @guest = @wedding.guests.find_by(passcode: params[:passcode])

        if @guest
          render json: @guest, status: :ok
        else
          render_error("Guest not found with the provided passcode for this wedding", :not_found)
        end
      end

      # POST /weddings/:wedding_id/guests
      def create
        @guest = @wedding.guests.new(guest_params)
        @guest.passcode = generate_unique_code_for_wedding

        if @guest.save
          render json: @guest, status: :created
        else
          render_error("Could not create guests at the moment")
        end
      end

      # PATCH|PUT /weddings/:wedding_id/guests
      def update
        if @guest.update(guest_params)
          render json: @guest
        else
          render_error("Could not update guests at the moment")
        end
      end

      # DELETE /weddings/:wedding_id/guests/:id
      def destroy
        @guest.destroy
        head :no_content
      end

      private

      def set_wedding
        @wedding = Wedding.find(params[:wedding_id])
      end

      def set_guest
        @guest = @wedding.guests.find(params[:id])
      end

      def guest_params
        params.require(:guest).permit(:name, :email, :phone, :nimto_type, :additional_info)
      end

      def generate_unique_code_for_wedding
        loop do
          passcode = SecureRandom.random_number(10_000)
          return passcode.to_s.rjust(4, '0') unless Guest.exists?(passcode: passcode, wedding: @wedding)
        end
      end
    end
  end
end
