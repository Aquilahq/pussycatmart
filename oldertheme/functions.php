<?php
/** Pussycat Mart theme setup and WooCommerce hooks. */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function pussypress_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'woocommerce' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'gallery', 'caption', 'style', 'script' ) );
    register_nav_menus( array( 'primary' => __( 'Primary menu', 'pussypress' ) ) );
}
add_action( 'after_setup_theme', 'pussypress_setup' );

function pussypress_assets() {
    wp_enqueue_style( 'pussypress-style', get_stylesheet_uri(), array(), '1.0.0' );
    wp_enqueue_style( 'pussypress-storefront', get_template_directory_uri() . '/assets/css/storefront.css', array( 'pussypress-style' ), '1.0.0' );
    wp_enqueue_script( 'pussypress-storefront', get_template_directory_uri() . '/assets/js/storefront.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'pussypress_assets' );

function pussypress_product_image( $product, $size = 'woocommerce_thumbnail' ) {
    if ( ! $product ) { return; }
    echo wp_kses_post( $product->get_image( $size, array( 'loading' => 'lazy', 'decoding' => 'async' ) ) );
}

function pussypress_loop_button() {
    global $product;
    if ( ! $product ) { return; }
    woocommerce_template_loop_add_to_cart();
}

/** Seed the starter products once when the theme is active, keeping them editable in WooCommerce. */
function pussypress_seed_catalog_once() {
    if ( ! class_exists( 'WooCommerce' ) || get_option( 'pussycatmart_catalog_seeded' ) ) { return; }
    $catalog_plugin = WP_PLUGIN_DIR . '/pussycatmart-catalog/pussycatmart-catalog.php';
    if ( file_exists( $catalog_plugin ) ) {
        require_once $catalog_plugin;
        if ( function_exists( 'pussycatmart_seed_catalog' ) ) { pussycatmart_seed_catalog(); }
    }
}
add_action( 'init', 'pussypress_seed_catalog_once', 20 );
