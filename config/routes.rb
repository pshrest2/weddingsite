Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :weddings do
        resources :guests do 
          collection do
            get 'show_by_passcode/:passcode', action: :show_by_passcode, as: :show_by_passcode
          end
        end
      end
    end
  end
end
