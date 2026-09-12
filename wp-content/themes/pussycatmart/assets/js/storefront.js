(function () {
  var drawer = document.getElementById('cart-drawer');
  var openDrawer = function () { if (!drawer) return; drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); };
  var closeDrawer = function () { if (!drawer) return; drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); };
  document.addEventListener('click', function (event) {
    var add = event.target.closest('.ajax_add_to_cart');
    if (add) { add.classList.add('is-adding'); window.setTimeout(function () { add.classList.remove('is-adding'); }, 900); }
    var cart = event.target.closest('.cart-link');
    if (cart && drawer) { event.preventDefault(); openDrawer(); }
    if (event.target.closest('.cart-drawer-close')) closeDrawer();
  });
  document.body.addEventListener('added_to_cart', openDrawer);
  document.body.addEventListener('wc_fragments_refreshed', function () { if (drawer && drawer.classList.contains('is-open')) openDrawer(); });
})();
