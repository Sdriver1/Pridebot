jQuery(window).scroll(startCounter);
function startCounter() {
  var hT = jQuery(".love_counter").offset().top,
    hH = jQuery(".love_counter").outerHeight(),
    wH = jQuery(window).height();
  if (jQuery(window).scrollTop() > hT + hH - wH) {
    jQuery(window).off("scroll", startCounter);
    jQuery(".love_count").each(function () {
      var $this = jQuery(this);
      var text = $this.text();
      var hasK = text.toLowerCase().includes("k");
      var number = parseFloat(text);

      if (!isNaN(number) && hasK) {
        jQuery({ Counter: 0 }).animate(
          { Counter: number },
          {
            duration: 2000,
            easing: "swing",
            step: function () {
              $this.text(this.Counter.toFixed(1) + "k+");
            },
          },
        );
      } else if (!isNaN(number)) {
        jQuery({ Counter: 0 }).animate(
          { Counter: number },
          {
            duration: 2000,
            easing: "swing",
            step: function () {
              $this.text(Math.ceil(this.Counter));
            },
          },
        );
      } else {
        $this.text(text);
      }
    });
  }
}
