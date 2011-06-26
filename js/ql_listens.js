$(function(){

  $.ajax({
    url: "/json/user.json",
    dataType: "json",
    success: function(data){
      var keyVal = data.key,
          iconPic = data.icon;

      $('#rdio_wrapper img').attr('src', iconPic);

      getHeavyRotation(keyVal);
    }
  });

  function getHeavyRotation(keyVal){

    $.ajax({
      url: "/json/heavyRotation.json",
      dataType: "json",
      success: function(data){
        var items = [];
        $.each(data, function(index, album) {
          items.push('<li id="' + album.artist + '"><h3>' + album.artist + '</h3><a href="http://rdio.com'+ album.url + '"><img src="' + album.icon + '" alt="' + album.artist + '" /></a></li>');
        });

        $('<ul/>', {
          'class': 'heavy-rotation-list',
          html: items.join('')
        }).appendTo('#heavy_rotation');
      }
    });
  }
});