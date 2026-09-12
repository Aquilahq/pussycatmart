<?php
/**
 * Plugin Name: Pussycat Mart Catalog
 * Description: Seeds Pussycat Mart's starter catalog as editable WooCommerce products.
 * Version: 1.0.0
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function pussycatmart_seed_catalog() {
    if ( ! class_exists( 'WooCommerce' ) || ! function_exists( 'wc_get_product_id_by_sku' ) ) { return; }
    $products = array(
        array( 'sku' => 'PCM-CLOUD-NAP', 'name' => 'Cloud Nap Cat Cave', 'price' => '48', 'description' => 'Felt hideaway with a plush cushion. 18 hours of snoozing, guaranteed.', 'image' => 'product-bed.jpg' ),
        array( 'sku' => 'PCM-SCRATCH-TOWER', 'name' => 'Oak & Sisal Scratch Tower', 'price' => '89', 'description' => 'Solid wood, two perches, sisal your sofa will thank you for.', 'image' => 'product-scratcher.jpg' ),
        array( 'sku' => 'PCM-FEATHER-FRENZY', 'name' => 'Feather Frenzy Toy Set', 'price' => '19', 'description' => 'Five feather wands and one catnip mouse of pure chaos.', 'image' => 'product-toys.jpg' ),
        array( 'sku' => 'PCM-SLOW-SIP', 'name' => 'Slow Sip Ceramic Diner', 'price' => '34', 'description' => 'Elevated double bowls. Fine dining for a very small critic.', 'image' => 'product-bowl.jpg' ),
    );
    foreach ( $products as $item ) {
        $product_id = wc_get_product_id_by_sku( $item['sku'] );
        $product = $product_id ? wc_get_product( $product_id ) : new WC_Product_Simple();
        if ( ! $product ) { continue; }
        $product->set_name( $item['name'] );
        $product->set_sku( $item['sku'] );
        $product->set_regular_price( $item['price'] );
        $product->set_description( $item['description'] );
        $product->set_short_description( $item['description'] );
        $product->set_status( 'publish' );
        $product->set_catalog_visibility( 'visible' );
        $product_id = $product->save();
        pussycatmart_attach_catalog_image( $product_id, $item['image'] );
    }
    update_option( 'pussycatmart_catalog_seeded', gmdate( 'c' ), false );
}

function pussycatmart_attach_catalog_image( $product_id, $filename ) {
    $product = wc_get_product( $product_id );
    if ( ! $product || $product->get_image_id() ) { return; }
    $path = get_template_directory() . '/assets/images/' . $filename;
    if ( ! file_exists( $path ) ) { return; }
    $uploads = wp_upload_dir();
    $file = wp_unique_filename( $uploads['path'], $filename );
    $destination = trailingslashit( $uploads['path'] ) . $file;
    if ( ! wp_mkdir_p( $uploads['path'] ) || ! copy( $path, $destination ) ) { return; }
    $attachment_id = wp_insert_attachment( array( 'post_mime_type' => wp_check_filetype( $file )['type'], 'post_title' => sanitize_file_name( pathinfo( $file, PATHINFO_FILENAME ) ), 'post_status' => 'inherit' ), $destination, $product_id );
    if ( ! $attachment_id ) { return; }
    require_once ABSPATH . 'wp-admin/includes/image.php';
    wp_update_attachment_metadata( $attachment_id, wp_generate_attachment_metadata( $attachment_id, $destination ) );
    $product->set_image_id( $attachment_id );
    $product->save();
}
register_activation_hook( __FILE__, 'pussycatmart_seed_catalog' );
