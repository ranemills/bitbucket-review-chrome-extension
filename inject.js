// Constants
var buttonContainerId = 'pullrequest-actions';
var buttonClasses = 'aui-button';
var existingStopReviewButtonIds = ['fulfill-pullrequest', 'reject-pullrequest', 'approve-button'];

// Script variables
var reviewSession = {
  in_progress: false,
  startTime: '',
  stopTime: ''
};

// Execute on run
initialize();

// Function definitions
function initialize()
{
  initializeContainer();
  addStartReviewButton();
  addStopReviewActionToExistingButtons();
}

function initializeContainer()
{
  var buttonContainer = document.getElementById(buttonContainerId);
  var reviewButtonContainer = document.createElement("div");
  reviewButtonContainer.id = 'review-timer-container';

  buttonContainer.appendChild(reviewButtonContainer);
}

function addStartReviewButton()
{
  var buttonContainer = document.getElementById('review-timer-container');

  var startReviewButton = document.createElement('button');
  startReviewButton.innerText = 'Start Review';
  startReviewButton.id = 'start-review-button';
  startReviewButton.className = buttonClasses;
  startReviewButton.onclick = startTimer;

  buttonContainer.appendChild(startReviewButton);
}

function removeStartReviewButton()
{
  var startReviewButton = document.getElementById('start-review-button');
  var buttonContainer = document.getElementById('review-timer-container');
  buttonContainer.removeChild(startReviewButton);
}

function addStopReviewButton()
{
  var buttonContainer = document.getElementById('review-timer-container');

  var stopReviewButton = document.createElement('button');
  stopReviewButton.innerText = 'Stop Review';
  stopReviewButton.id = 'stop-review-button';
  stopReviewButton.className = buttonClasses;
  stopReviewButton.onclick = stopTimer;

  buttonContainer.appendChild(stopReviewButton);
}

function removeStopReviewButton()
{
  var stopReviewButton = document.getElementById('stop-review-button');
  var buttonContainer = document.getElementById('review-timer-container');
  buttonContainer.removeChild(stopReviewButton);
}

function addStopReviewActionToExistingButtons()
{
  existingStopReviewButtonIds.forEach(function(id) {
    var button = document.getElementById(id);
    button.onclick = stopTimer;
  });
}

function startTimer()
{
  reviewSession.in_progress = true;
  reviewSession.startTime = new Date();

  removeStartReviewButton();

  addStopReviewButton();
}

function stopTimer()
{
  if(reviewSession.in_progress)
  {
    reviewSession.in_progress = false;
    reviewSession.stopTime = new Date();
    
    alertReviewSession(reviewSession)

    reviewSession = {
      in_progress: false,
      startTime: '',
      stopTime: ''
    };

    removeStopReviewButton();
    addStartReviewButton();
  }
}

function alertReviewSession(reviewSession)
{
  var alertText = 'start: ' + reviewSession.startTime.toLocaleString() + ', stop: ' + reviewSession.stopTime.toLocaleString();

  alert(alertText);
}