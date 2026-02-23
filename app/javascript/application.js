// jQuery (used by API utils for $.ajax)
import jQuery from "jquery"
window.$ = jQuery
window.jQuery = jQuery

// Send Rails CSRF token with every jQuery AJAX request
$.ajaxSetup({
  headers: {
    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  }
})

// Active Storage
import * as ActiveStorage from "@rails/activestorage"
ActiveStorage.start()

// React application
import "../../frontend/web_hunt"
