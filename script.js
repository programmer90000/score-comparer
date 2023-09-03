let fileInput = document.getElementById("fileUpload");

let all_scores = [];
let person_1_wins = 0;
let person_1_goals = 0;
let person_2_wins = 0;
let person_2_goals = 0;
let draw = 0;

function convertTextToCSV(file, callback) {
    let reader = new FileReader();

    reader.onload = function() {
        let fileContent = reader.result;
        let lines = fileContent.split('\n');

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();

            

            if (line.length > 0) {
                let colonIndex = line.indexOf(':', line.indexOf(':') + 1);
                let lineContent = colonIndex !== -1 ? line.slice(colonIndex + 1).trim() : line;

                lineContent = lineContent.match(/\d+/g);
                if (lineContent !== null && lineContent.length === 2 || lineContent != null && lineContent.length === 4) {

                let parsedNumbers = lineContent.map(function (string) {
                    return parseInt(string, 10); // Turn the String into a Number using the Base 10 System
                });
                if (parsedNumbers[0].toString().length === 1 && parsedNumbers[1].toString().length === 1) {


                person_1_goals += parsedNumbers[0];
                person_2_goals += parsedNumbers[1];

                if (parsedNumbers[0] > parsedNumbers[1]) {
                    person_1_wins += 1;
                  } else if (parsedNumbers[0] < parsedNumbers[1]) {
                    person_2_wins += 1;
                  } else if (parsedNumbers[0] === parsedNumbers[1]) {
                    if (parsedNumbers[2] > parsedNumbers[3]) {
                      person_1_wins += 1;
                    } else if (parsedNumbers[2] < parsedNumbers[3]) {
                      person_2_wins += 1;
                    } else {
                      draw += 1;
                    }
                }
                all_scores.push(parsedNumbers);
            }
        } else {
          if (lineContent !== null) {
            console.log(lineContent);
          } 

        }
      }};

        let first_person_points = (person_1_wins * 3) + draw;
        let second_person_points = (person_2_wins * 3) + draw;
        document.getElementById('person1Points').innerHTML = `${first_person_points}`;
        document.getElementById('person2Points').innerHTML =`${second_person_points}`;
        document.getElementById('person1Wins').innerHTML = `${person_1_wins}`;
        document.getElementById('person2Wins').innerHTML = `${person_2_wins}`;
        document.getElementById('person1Losses').innerHTML = `${person_2_wins}`;
        document.getElementById('person2Losses').innerHTML = `${person_1_wins}`;
        let drawElement = document.getElementsByClassName('draw');
        for (let index=0; index < 2; index++) {
          drawElement[index].innerHTML = `${draw}`;
        }
        let gamesPlayed = document.getElementsByClassName('gamesPlayed');
        for (let ins=0; ins < 2; ins++) {
          gamesPlayed[ins].innerHTML = `${all_scores.length}`
        }
        document.getElementById('person1GoalsFor').innerHTML = `${person_1_goals}`;
        document.getElementById('person1GoalsAgainst').innerHTML = `${person_2_goals}`;
        document.getElementById('person1GoalDifference').innerHTML = `${person_1_goals - person_2_goals}`;
        document.getElementById('person2GoalsFor').innerHTML = `${person_2_goals}`;
        document.getElementById('person2GoalsAgainst').innerHTML = `${person_1_goals}`;
        document.getElementById('person2GoalDifference').innerHTML = `${person_2_goals - person_1_goals}`;

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

        callback();
    }

    reader.readAsText(file);
}

fileInput.addEventListener("change", function (event) {
    let file = event.target.files[0];

    convertTextToCSV(file, function() {
    })
})
