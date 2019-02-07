// Initialize Firebase
var config = {
    apiKey: "AIzaSyBL9U3ejMyuRZX0Em2UT9ZmYR4c2Bx21KE",
    authDomain: "seitz-train-scheduler.firebaseapp.com",
    databaseURL: "https://seitz-train-scheduler.firebaseio.com",
    projectId: "seitz-train-scheduler",
    storageBucket: "seitz-train-scheduler.appspot.com",
    messagingSenderId: "264496366009"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTime = $("#first-time").val().trim();
    var frequency = $("#frequency").val().trim();

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "days");
    var currentTime = moment();
    var diffInTime = moment().diff(moment(firstTimeConverted), "minutes");
    var timeRemaining = diffInTime % frequency;
    var minutesAway = frequency - timeRemaining;
    var nextArrival = moment().add(minutesAway, "minutes");
    nextArrival = moment(nextArrival).format("HH:mm");

    database.ref().push({
        trainName,
        destination,
        frequency,
        nextArrival,
        minutesAway
    });
});

database.ref().on("child_added", function (childSnapshot) {
    $("table > tbody").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + childSnapshot.val().nextArrival + "</td><td>" + childSnapshot.val().minutesAway + "</td>")
});