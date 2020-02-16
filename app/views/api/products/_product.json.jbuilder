json.extract! product, :id, :launch_date, :title, :tagline, :description, :website, :thumbnail, :status, :youtube, :twitter, :hunter_id
json.logoUrl url_for(product.logo)
json.screenshotUrls product.screenshots.map { |screenshot| url_for(screenshot) }