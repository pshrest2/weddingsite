class ApplicationController < ActionController::API
  def render_success(message = "Success", status = :ok)
    render json: { message: }, status:
  end

  def render_error(message = "Something went wrong", status = :unprocessable_entity)
    render json: { error: message }, status:
  end
end
