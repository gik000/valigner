(function($, Drupal) {
  // Theme custom js.

  /**
   * VAligner
   * @type {{attach: attach}}
   */
  Drupal.behaviors.valigner = {
    /**
     *
     * @param context
     * @param settings
     */
    attach: function (context, settings) {
      // Init valigner
      Drupal.settings.valigner.jsEnabled = false; //FIXME create system_settings_form and load
      if(Drupal.settings.valigner.jsEnabled){
        this.init();
      }
    },
    /**
     *
     */
    init: function(){
      // Initialize settings.
      $('.valigner').each(function(){
        this.prepareIt($(this));
      });
    },
    /**
     *
     * @param target
     * @returns string
     */
    getWay: function(target){
      return target.getAttr('way');
    },

    /**
     */
    prepareIt: function(it){
      // Adding wrappers
      it.once(function () {
        // Getting a way.
        var way = this.getWay($(this));
        // Creating wrappers.
        $(this)
          .wrapAll("<div class='valigner-pa' way='" + way + "'></div>")
          .parent()
          .wrapAll("<div class='valigner-granpa' way='" + way + "'></div>");
        // Evaluating heights changing.
        if($(this).getAttr('refElement') != ''){
          var refElement = $(this).getAttr('refElement');
          Drupal.behaviors.valigner.sameHeight($(this),$(refElement));
        }
      });
    },
    /**
     *
     * @param target
     * @param refElement
     */
    sameHeight: function(target,refElement){
      var minHeight = target.outerHeight();
      var maxHeight = refElement.outerHeight();
      var overflow = target.getAttr('overflow');

      // FIXME so bad no way to extend equalheights
      // disable imagesloaded for IE<=8
      var imagesLoadedIE8 = Drupal.settings.equalHeightsModule.imagesloaded_ie8;
      if (imagesLoadedIE8 && window.attachEvent && !window.addEventListener) {
        target.equalHeights(minHeight, maxHeight).css('overflow', overflow);
      } else {
        // imagesloaded library checks if all images are loaded before callback
        target.imagesLoaded({
          callback: function($images, $proper, $broken) {
            this.equalHeights(minHeight, maxHeight).css('overflow', overflow);
          }
        });
      }
    },
  };

})(jQuery, Drupal);