const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let missed = 0;

function round() {
  //done// FIXME: надо бы убрать "target" прежде чем искать новый
  if ($("div").hasClass("target")) {
    $("div").removeClass("target");
  }

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
 
  //done// TODO: помечать target текущим номером
  $(".target").text(hits + 1);
  
  //done// FIXME: тут надо определять при первом клике firstHitTime
  if (hits === 1) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  //done// FIXME: спрятать игровое поле сначала
  $(".game-field").hide();
 
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis/1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-missed").text(missed);
  $("#total-score").text(maxHits - missed);
  
  //функция управления прогрессбаром
  const setBarWidth = (arg) =>
    $('#my-progress-bar').attr('style', `width: ${arg}%`);  
  //вычисление уровня меткости и передача результата на экран
  let accuracy = Math.round((maxHits - missed) * 100 / maxHits);// % попаданий
  if (accuracy < 0) {accuracy = 0;}//при отрицательном значении теряется смысл
  $("#total-accuracy").text(accuracy);
  setBarWidth(accuracy);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  //done// FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(".target").text("");
    round();
  }
  //done// TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  else {
    //при промахе отмечаем квадрат красным и через небольшую паузу убираем:
    $(event.target).addClass("miss");
    setTimeout(() => $("div").removeClass("miss"), 100);
    missed +=1;//добавляем промах
  }
}

function init() {
  //done// TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(function() {
    if (hits === 0) {
      missed = 0;//обнуляем промахи, если пользователь случайно нажимал на поля до старта!
      round();
      $("#button-start").hide();//скрываем кнопку старт во время игры
    }
  });

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
