var config = {
    apiKey: "AIzaSyDcYm2vBc50RuFCjhVT3KAj2f3ps2vVP_E",
    authDomain: "train-schedule-a9e95.firebaseapp.com",
    databaseURL: "https://train-schedule-a9e95.firebaseio.com",
    projectId: "train-schedule-a9e95",
    storageBucket: "train-schedule-a9e95.appspot.com",
    messagingSenderId: "909496737822"
  };
  
  firebase.initializeApp(config);
  
  
  var database = firebase.database();
  
  $("#submitBtn").on("click", function (event) {
    event.preventDefault();
  
    var trainName = $("#trainName")
      .val()
      .trim();
    var trainDestination = $("#destination")
      .val()
      .trim();
    var firstTrainTime = $("#firstTrainTime")
      .val()
      .trim();
    var frequency = $("#frequency")
      .val()
      .trim();
  
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    };
  
    database.ref().push(newTrain);
  
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
  });
  
  database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
  
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(frequency);
  
    var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(
      1,
      "years"
    );
  
    var currentTime = moment();
  
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
  
    var remainder = diffTime % frequency;
  
    var tMinutesTillTrain = frequency - remainder;
  
    var nextTrain = moment()
      .add(tMinutesTillTrain, "minutes")
      .format("hh:mm");
  
    $("#trainTable > tbody").append(
      "<tr><td>" +
      trainName +
      "</td><td>" +
      trainDestination +
      "</td><td>" +
      frequency +
      "</td><td>" +
      nextTrain +
      "</td><td>" +
      tMinutesTillTrain +
      "</td><td>"
    );
  });