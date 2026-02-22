// jQuery (used by API utils for $.ajax)
import jQuery from "jquery"
window.$ = jQuery
window.jQuery = jQuery

// Active Storage
import * as ActiveStorage from "@rails/activestorage"
ActiveStorage.start()

// React application
import "../../frontend/web_hunt"
