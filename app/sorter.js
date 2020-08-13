var originalArray = [];
var sorters = ["bubble-sort", "merge-sort", "insertion-sort", "sleep-sort"];
var sortersIndex = 0;

$("#num").html(sorters.length);

sorters.forEach(function(i) {
    $("#" + i).hide();
});

$("#" + sorters[sortersIndex]).show();

$("#next").on("click", function() {
    $("#" + sorters[sortersIndex]).hide();
    sortersIndex++;

    if (sortersIndex + 1 > sorters.length) {
        sortersIndex = 0;
    }

    $("#" + sorters[sortersIndex]).show();
});

$("#sleep-sort").on("click", function () {
  var arrayCopy = [...originalArray];
  var outputArray = [];

  arrayCopy.forEach(function (i) {
    setTimeout(function () {
        outputArray.push(i);
        drawArray(outputArray);
    }, 5 * i);
  });
});

$("#bubble-sort").on("click", function () {
    var arrayCopy = [...originalArray];
    var outputArray = [];
    var done = false;

    while (!done) {
        //if (arrayCopy.length <= 1) { return }
        done = true;

        for (var i = 1; i < arrayCopy.length; i++) {
            if (arrayCopy[i - 1] > arrayCopy[i]) {
                done = false;
                var tmp = arrayCopy[i - 1];
                arrayCopy[i - 1] = arrayCopy[i];
                arrayCopy[i] = tmp;
            }
        }
    }

    arrayCopy.forEach(function (i) {
        outputArray.push(i);
        drawArray(outputArray);
    });
});

$("#merge-sort").on("click", function() {
    var arrayCopy = [...originalArray];
    var outputArray = [];

    function merge(left, right, arr) {
        var a = 0;

        while (left.length && right.length) {
            arr[a++] = right[0] < left[0] ? right.shift() : left.shift();
        }

        while (left.length) {
            arr[a++] = left.shift();
        }

        while (right.length) {
            arr[a++] = right.shift();
        }
    }

    function mergeSort(arr) {
        var len = arr.length;

        if (len == 1) {
            return;
        }

        var mid = Math.floor(len / 2),
            left = arr.slice(0, mid),
            right = arr.slice(mid);

        mergeSort(left);
        mergeSort(right);
        merge(left, right, arr);
    }

    mergeSort(arrayCopy);

    arrayCopy.forEach(function (i) {
      outputArray.push(i);
      drawArray(outputArray);
    });
});

$("#insertion-sort").on("click", function() {
    var arrayCopy = [...originalArray];
    var outputArray = [];

    for (var i = 0; i < arrayCopy.length; i++) {
        var k = arrayCopy[i];

        for (var j = i; j > 0 && k < arrayCopy[j - 1]; j--) {
            arrayCopy[j] = arrayCopy[j - 1];
        }

        arrayCopy[j] = k;
    }

    arrayCopy.forEach(function (i) {
        outputArray.push(i);
        drawArray(outputArray);
    });
});

$("#randomize").on("click", function () {
    init();
});

var init = function() {
    originalArray = [];
    $("#array").html("");

    for (var i = 0; i < 6; i++) {
        let number = Math.floor(Math.random() * 99);
        originalArray.push(number);
        $("#array").append(
          "<div class='array-item' value='" + number + "'>" + number + "</div>"
        );
    }
}

var drawArray = function (arr) {
    $("#array").html("");

    arr.forEach(function (i) {
        $("#array").append(
        "<div class='array-item' value='" + i + "'>" + i + "</div>"
        );
    });
};

init();

$(window).scroll(function () {
    if (!$("#algos").is(":visible")) {
         $("#algos").show(1000);
    }
});