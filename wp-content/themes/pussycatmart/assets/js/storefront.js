(function () {
  document.addEventListener('click', function (event) {
    var link = event.target.closest('.ajax_add_to_cart');
    if (!link) return;
    link.classList.add('is-adding');
    window.setTimeout(function () { link.classList.remove('is-adding'); }, 900);
  });
})();
