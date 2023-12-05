$(function () {

  function updatePage() {
    // Updates and shows the date
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

    // Updates the time
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  // This function keeps data in local storage so that information is saved.
  function savedData() {
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      var savedInput = localStorage.getItem(blockId);

      if (savedInput !== null) {
        $(this).find("textarea").val(savedInput);
      }
    });
  }

  updatePage();
  savedData();

  // Add a listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");

    // Save the user input in local storage using the time block id as a key.
    var userInput = $(this).siblings("textarea").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Set up an interval to update the page every 5 minutes (300,000 milliseconds).
  setInterval(updatePage, 300000);
});
