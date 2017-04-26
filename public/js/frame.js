
var $container = {};

function stepFlow(index) {
  const $stepList = $('.step');
  const $currentStep = $($stepList[index-1]);
  if ($currentStep[0] === undefined) return;

  $stepList.removeClass('active');
  $currentStep.addClass('active');
  $currentStep[0].scrollIntoView(true);
}

function endFlow() {
  const $stepList = $('.step');
  const $play = $('#play');
  $stepList.removeClass('active');
  $play.text('Play');
  $play.data('state', 'stopped');
  $play
    .removeClass('btn-success')
    .addClass('btn-primary');
}

function changeFlow() {
  const $flow = $('#flow');
  window.location = `./${$flow.val()}`;
}

function play() {
  const $play = $('#play');
  const isPaused = $play.data('state') === 'stopped';

  if (isPaused) {
    $play.text('Playing');
    $play.data('state', 'playing');
    $play
      .removeClass('btn-primary')
      .addClass('btn-success');
    $('.content').fbMessenger('run');
  }
}
