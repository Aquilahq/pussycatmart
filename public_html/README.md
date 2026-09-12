# Pussycat Mart WordPress install

This directory is the deployable WordPress document root. It includes the official WordPress core and WooCommerce plugin, plus the custom `pussycatmart` theme at:

```text
public_html/wp-content/themes/pussycatmart
```

## Deploy

1. Upload/sync `public_html/` to the hosting document root (`public_html/`).
2. Create a database and copy `wp-config-sample.php` to `wp-config.php`; fill in database credentials and unique salts.
3. Open the site once to finish the WordPress installer.
4. In WordPress admin, activate **Pussycat Mart** under Appearance → Themes.
5. Activate **WooCommerce**, complete its setup, and configure Cart/Checkout pages.
6. Add published WooCommerce products; the home shelf reads native WooCommerce products automatically.

`wp-config.php`, uploads, caches, and environment-specific files are excluded from Git. WordPress core remains unmodified; the custom work is contained in the theme.
