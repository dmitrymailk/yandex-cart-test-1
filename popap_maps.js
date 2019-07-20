let OPEN_POPAP = false;

window.addEventListener("load", () => {
  ymaps.ready(init);

  function init() {
    // Создаем карту.
    var myMap = new ymaps.Map(
      "map_2",
      {
        center: [48.710368, 44.523968],
        zoom: 9
      },
      {
        searchControlProvider: "yandex#search"
      }
    );

    let myCoords = null;
    myMap.events.add("click", e => {
      var coords = e.get("coords");
      myCoords = coords;
      console.log(myCoords);
      if (!OPEN_POPAP) {
        // Создаем метку.
        console.log("Создаем метку");
        OPEN_POPAP = !OPEN_POPAP;
        var myPlacemark = new ymaps.Placemark(
          [myCoords[0], myCoords[1]],
          {
            iconContent: "Щелкни по мне правой кнопкой мыши!"
          },
          {
            // Красная иконка, растягивающаяся под содержимое.
            preset: "islands#redStretchyIcon"
          }
        );
        console.log(myPlacemark);
        delete myPlacemark;

        // Контекстное меню, позволяющее изменить параметры метки.
        // Вызывается при нажатии правой кнопкой мыши на метке.
        myPlacemark.events.add("contextmenu", function(e) {
          // Если меню метки уже отображено, то убираем его.
          if ($("#menu").css("display") == "block") {
            $("#menu").remove();
          } else {
            // HTML-содержимое контекстного меню.
            var menuContent =
              '<div id="menu">\
                  <ul id="menu_list">\
                      <li>Название: <br /> <input type="text" name="icon_text" /></li>\
                      <li>Подсказка: <br /> <input type="text" name="hint_text" /></li>\
                      <li>Балун: <br /> <input type="text" name="balloon_text" /></li>\
                  </ul>\
              <div align="center"><input type="submit" value="Сохранить" /></div>\
              </div>';

            // Размещаем контекстное меню на странице
            $("body").append(menuContent);

            // Задаем позицию меню.
            $("#menu").css({
              left: e.get("pagePixels")[0],
              top: e.get("pagePixels")[1]
            });

            // Заполняем поля контекстного меню текущими значениями свойств метки.
            $('#menu input[name="icon_text"]').val(
              myPlacemark.properties.get("iconContent")
            );
            $('#menu input[name="hint_text"]').val(
              myPlacemark.properties.get("hintContent")
            );
            $('#menu input[name="balloon_text"]').val(
              myPlacemark.properties.get("balloonContent")
            );

            // При нажатии на кнопку "Сохранить" изменяем свойства метки
            // значениями, введенными в форме контекстного меню.
            $('#menu input[type="submit"]').click(function() {
              myPlacemark.properties.set({
                iconContent: $('input[name="icon_text"]').val(),
                hintContent: $('input[name="hint_text"]').val(),
                balloonContent: $('input[name="balloon_text"]').val()
              });
              // Удаляем контекстное меню.
              $("#menu").remove();
            });
          }
        });

        myMap.geoObjects.add(myPlacemark);
      } else {
        console.log("Удаляем метку");
        $("#menu").remove();
        OPEN_POPAP = !OPEN_POPAP;
        myMap.geoObjects.removeAll();
      }
    });
  }
});
