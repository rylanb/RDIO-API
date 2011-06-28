/* This is a work in progress. Refactors/Clean Up to come */
$(function(){
  /* Get the user(s) from RDIO for avatars */
  $.ajax({
    url: "http://qlrdio.herokuapp.com/user/collin?callback=?",
    dataType: "jsonp",
    success: function(data){
      var keyVal = data.key,
          iconPic = data.icon;

      $('#rdio_wrapper img').attr('src', iconPic);

      getHeavyRotation(keyVal);
      $('#rdio_wrapper').slideDown();
      $('#loader').addClass('load_2');
    }
  });

  function getHeavyRotation(keyVal){
    /* Get most played albums from RDIO */
    $.ajax({
      url: "http://qlrdio.herokuapp.com/collin/getHeavyRotation",
      dataType: "jsonp",
      success: function(data){
        $('#loader').fadeOut(300);
        /* Changes to JST */
        var items = [];
        $.each(data, function(index, album) {
          items.push('<li id="' + album.artist + '"><h3>' + album.artist +
            '</h3><a href="http://rdio.com'+ album.url + '" target="_blank"><img src="' + album.icon + '" alt="' +
            album.artist + '" /></a><h4>' + album.name + '</h4></li>');
        });

        $('<ul/>', {
          'class': 'heavy-rotation-list',
          html: items.join('')
        }).appendTo('#heavy_rotation');
        $('#music_wrap').delay(400).slideDown(1000);

      }
    });
  }
});