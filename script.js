window.addEventListener("load", () => {
  // ymaps.ready(init);
  // function init() {
  //   // Создание карты.
  //   var myMap = new ymaps.Map("map", {
  //     // Координаты центра карты.
  //     // Порядок по умолчанию: «широта, долгота».
  //     // Чтобы не определять координаты центра карты вручную,
  //     // воспользуйтесь инструментом Определение координат.
  //     center: [55.76, 37.64],
  //     // Уровень масштабирования. Допустимые значения:
  //     // от 0 (весь мир) до 19.
  //     zoom: 7
  //   });
  // }

  ymaps.ready(["AnimatedLine"]).then(init);

  function init(ymaps) {
    // Создаем карту.
    var myMap = new ymaps.Map(
      "map",
      {
        center: [48.773266, 44.55808],
        zoom: 16
      },
      {
        searchControlProvider: "yandex#search"
      }
    );
    // Создаем ломаные линии.
    var firstAnimatedLine = new ymaps.AnimatedLine(
      [
        [48.774901, 44.556077],
        [48.77454, 44.55805],
        [48.773577, 44.560265],
        [48.772935, 44.561843]
        // [55.76070753602857, 37.5772156971609],
        // [55.76099639684956, 37.577322985521505],
        // [55.760916500352934, 37.578192870439906],
        // [55.76091952506843, 37.5785147355217],
        // [55.76098304403938, 37.57876954537813],
        // [55.76109495816394, 37.57893852454606],
        // [55.76122432960969, 37.578535038979666]
      ],
      {},
      {
        // Задаем цвет.
        strokeColor: "#ED4543",
        // Задаем ширину линии.
        strokeWidth: 5,
        // Задаем длительность анимации.
        animationTime: 5000
      }
    );
    var secondAnimatedLine = new ymaps.AnimatedLine(
      [
        [48.774901, 44.556077],
        [48.77454, 44.55805],
        [48.773577, 44.560265],
        [48.772935, 44.561843]
        // [55.761782872763874, 37.578559582240004],
        // [55.7622647306412, 37.57857741008619],
        // [55.76247342821094, 37.57840038429122],
        // [55.762818964832924, 37.57765342764373],
        // [55.76292179998886, 37.57748713068481],
        // [55.762890042102114, 37.577167947812036],
        // [55.76292179998886, 37.576878269238435],
        // [55.763076052212064, 37.57669587902541],
        // [55.76309672830313, 37.57723949881904]
      ],
      {},
      {
        strokeColor: "#1E98FF",
        strokeWidth: 5,
        animationTime: 4000
      }
    );
    // Добавляем линии на карту.
    myMap.geoObjects.add(firstAnimatedLine);
    myMap.geoObjects.add(secondAnimatedLine);
    // Создаем метки.
    var firstPoint = new ymaps.Placemark(
      [48.774901, 44.556077],
      {},
      {
        preset: "islands#redRapidTransitCircleIcon"
      }
    );
    var secondPoint = new ymaps.Placemark(
      [48.773577, 44.560265],
      {},
      {
        preset: "islands#blueMoneyCircleIcon"
      }
    );
    // var thirdPoint = new ymaps.Placemark(
    //   [55.763105418792314, 37.57724573612205],
    //   {},
    //   {
    //     preset: "islands#blackZooIcon"
    //   }
    // );
    // Функция анимации пути.
    function playAnimation() {
      // Убираем вторую линию.
      secondAnimatedLine.reset();
      // Добавляем первую метку на карту.
      myMap.geoObjects.add(firstPoint);
      // Анимируем первую линию.
      firstAnimatedLine
        .animate()
        // После окончания анимации первой линии добавляем вторую метку на карту и анимируем вторую линию.
        .then(function() {
          myMap.geoObjects.add(secondPoint);
          return secondAnimatedLine.animate();
        })
        // После окончания анимации второй линии добавляем третью метку на карту.
        .then(function() {
          myMap.geoObjects.add(thirdPoint);
          // Добавляем паузу после анимации.
          return ymaps.vow.delay(null, 5000);
        })
        // После паузы перезапускаем анимацию.
        .then(function() {
          // Удаляем метки с карты.
          myMap.geoObjects.remove(firstPoint);
          myMap.geoObjects.remove(secondPoint);
          myMap.geoObjects.remove(thirdPoint);
          // Убираем вторую линию.
          secondAnimatedLine.reset();
          // Перезапускаем анимацию.
          playAnimation();
        });
    }
    // Запускаем анимацию пути.
    playAnimation();
  }
});
