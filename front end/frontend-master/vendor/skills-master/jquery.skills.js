$.fn.skill = function() {
	mSkill = this;
  $(window).on('scroll', function() { 
	  
	mSkill.find('.skillBar').each(function() {

		if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.90 &&!$(this).hasClass("sk-fired")) {
		
			$(this).addClass('sk-fired');
			var defaultPercentage = "50%";
			
			if($(this).attr('data-percent')) {
				$(this).width($(this).attr('data-percent'));
			} else {
				$(this).width(defaultPercentage);
			}
			
			$(this).parent().find(".skill-image").each(function() {
				var imagen = $(this);
				setInterval(function() {

					imagen.show().addClass("animated").addClass("bounceIn");
				}, 2000);
				
			});
			}
		});

}	);

     return mSkill;
}