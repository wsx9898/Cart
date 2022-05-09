$(function () {
  // This button will increment the value
  $(".remove").click(function (e) {
    // Stop acting like a button
    e.preventDefault();
    // // Get the ID name
    idName = $(this).attr("id");

    theNum = `${idName}`.match(/\d+/)[0];

    $(`#item${theNum}`).detach();
  });
});
