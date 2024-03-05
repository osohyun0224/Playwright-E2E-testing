//실행 방법 : node basketball.js
const readline = require('readline');

function generateRandomNumbers() {
    const numbers = [];
    while (numbers.length < 3) {
        const randomNum = Math.floor(Math.random() * 9) + 1;
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }
    return numbers;
}

function evaluateGuess(guess, computerNumbers) {
    const guessDigits = String(guess).split('').map(Number);
    let strikes = 0;
    let balls = 0;

    if (new Set(guessDigits).size !== 3 || guessDigits.includes(0)) {
        throw new Error('Invalid input: Enter three different digits from 1 to 9.');
    }

    guessDigits.forEach((digit, index) => {
        if (computerNumbers[index] === digit) {
            strikes++;
        } else if (computerNumbers.includes(digit)) {
            balls++;
        }
    });

    return { strikes, balls };
}

function playBaseball() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('숫자 야구 게임을 시작합니다.');
    const computerNumbers = generateRandomNumbers();

    const askQuestion = () => {
        rl.question('숫자를 입력해주세요 : ', (guess) => {
            try {
                const { strikes, balls } = evaluateGuess(guess, computerNumbers);

                if (strikes === 3) {
                    console.log('3스트라이크\n3개의 숫자를 모두 맞히셨습니다! 게임 종료');
                    rl.question('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요: ', (answer) => {
                        if (answer === '1') {
                            rl.close();
                            playBaseball(); // Restart the game
                        } else {
                            rl.close();
                        }
                    });
                } else if (strikes === 0 && balls === 0) {
                    console.log('낫싱');
                    askQuestion();
                } else {
                    console.log(`${balls}볼 ${strikes}스트라이크`);
                    askQuestion();
                }
            } catch (error) {
                console.error(error.message);
                rl.close();
            }
        });
    };

    askQuestion();
}

playBaseball();
