var fileInput = document.getElementById("fileUpload");

var all_scores = [];
var first_person_wins = 0;
var second_person_wins = 0;
var draw = 0;
var first_person_goals = 0;
var second_person_goals = 0;

// Function to convert a text file to CSV and process it
function convertTextToCSV(file, callback) {
    var reader = new FileReader();

    reader.onload = function() {
        var fileContent = reader.result;
        
        // Convert the text to a CSV-like format
        fileContent = fileContent.replace(/,/g, " "); // Remove commas
        fileContent = fileContent.replace(/\n/g, ",\n"); // Add comma and newline
        fileContent = fileContent.replace(/:/, ""); // Remove all of the text before the first colon

        // Call the callback function with the CSV-like data
        callback(fileContent);
    };

    // Read the file as text
    reader.readAsText(file);
}

fileInput.addEventListener("change", function(event) {
    var file = event.target.files[0]; // Assign the file selected to the variable 'file'

    // Call the convertTextToCSV function to convert and process the text file
    convertTextToCSV(file, function(csvData) {
        // Split the CSV-like data into lines
        var lines = csvData.split("\n");

        for (var i = 0; i < lines.length; i++) {
            // Check if the line is empty or not
            if (lines[i]) {
                var values = lines[i].split(","); // Split the lines by a ','
                var numbers = [];

                for (var j = 0; j < values.length; j++) {
                    // Remove the \r character from each value
                    values[j] = values[j].replace(/\r/g, "");
                    // Split the value by brackets and dashes
                    values[j] = values[j].split(/[^0-9,]/);

                    // Remove the empty string from the value array
                    values[j] = values[j].filter(Boolean);

                    for (var k = 0; k < values[j].length; k++) {
                        values[j][k] = values[j][k].replace(/\s/g, "");
                    }

                    // Concatenate the value array to the numbers array
                    numbers = numbers.concat(values[j]);
                }

                if (numbers.length === 2 || numbers.length === 4) {
                    all_scores.push(numbers);
                } else {
                    var scores_not_processed = document.getElementById("scores-not-processed");
                    var div = document.createElement("div");
                    div.innerHTML = `<h3>${numbers}</h3>`;
                    scores_not_processed.appendChild(div);
                }
            }
        }

        all_scores = all_scores.map(array => array.map(Number)); // Change the Array of Strings to an Array of Numbers

        // Find the number of wins, losses and draws
        for (let i = 0; i < all_scores.length; i++) {
            if (all_scores[i][0] > all_scores[i][1]) {
              first_person_wins += 1;
            } else if (all_scores[i][0] < all_scores[i][1]) {
              second_person_wins += 1;
            } else if (all_scores[i][0] === all_scores[i][1]) {
              if (all_scores[i][2] > all_scores[i][3]) {
                first_person_wins += 1;
              } else if (all_scores[i][2] < all_scores[i][3]) {
                second_person_wins += 1;
              } else {
                draw += 1;
              }
            }
          }

        // Find the number of goals
        for (let i = 0; i < all_scores.length; i++) {
            first_person_goals += all_scores[i][0];
            second_person_goals += all_scores[i][1];
        }

          let first_person_points = (first_person_wins * 3) + draw;
          let second_person_points = (second_person_wins * 3) + draw;

          document.getElementById('person1Points').innerHTML = `${first_person_points}`;
          document.getElementById('person2Points').innerHTML =`${second_person_points}`;
          document.getElementById('person1Wins').innerHTML = `${first_person_wins}`;
          document.getElementById('person2Wins').innerHTML = `${second_person_wins}`;
          document.getElementById('person1Losses').innerHTML = `${second_person_wins}`;
          document.getElementById('person2Losses').innerHTML = `${first_person_wins}`;
          let drawElement = document.getElementsByClassName('draw');
          for (let index=0; index < 2; index++) {
            drawElement[index].innerHTML = `${draw}`;
          }
          let gamesPlayed = document.getElementsByClassName('gamesPlayed');
          for (let ins=0; ins < 2; ins++) {
            gamesPlayed[ins].innerHTML = `${all_scores.length}`
          }
          document.getElementById('person1GoalsFor').innerHTML = `${first_person_goals}`;
          document.getElementById('person1GoalsAgainst').innerHTML = `${second_person_goals}`;
          document.getElementById('person1GoalDifference').innerHTML = `${first_person_goals - second_person_goals}`;
          document.getElementById('person2GoalsFor').innerHTML = `${second_person_goals}`;
          document.getElementById('person2GoalsAgainst').innerHTML = `${first_person_goals}`;
          document.getElementById('person2GoalDifference').innerHTML = `${second_person_goals - first_person_goals}`;

          let first_person_name = "Abdul Rehman";
          let second_person_name = "Abdul Razzaq";

          if (person1Points > person2Points) {
            document.getElementById('player1').innerHTML = `${first_person_name}`;
            document.getElementById('player2').innerHTML = `${second_person_name}`;
          } else if (person1Points < person2Points) {
            document.getElementById('player1').innerHTML = `${second_person_name}`;
            document.getElementById('player2').innerHTML = `${first_person_name}`;
          } else {
            document.getElementById('player1').innerHTML = `${first_person_name}`;
            document.getElementById('player2').innerHTML = `${second_person_name}`;
          }
    });
});
