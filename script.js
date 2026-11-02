const resultBox = document.getElementById('result-box');
        const checkButton = document.getElementById('check-button');

        function setAnswerState(input, isCorrect) {
            if (!input) return;
            const label = input.labels && input.labels[0] ? input.labels[0] : document.querySelector(`label[for="${input.id}"]`);
            if (label) {
                label.classList.remove('correct', 'wrong');
                label.classList.add(isCorrect ? 'correct' : 'wrong');
            }
            input.classList.remove('correct', 'wrong');
            input.classList.add(isCorrect ? 'correct' : 'wrong');
        }

        function setSelectState(select, isCorrect) {
            if (!select) return;
            select.classList.remove('correct', 'wrong');
            select.classList.add(isCorrect ? 'correct' : 'wrong');
        }

        function clearAllStates() {
            document.querySelectorAll('input[type="radio"], input[type="checkbox"], select').forEach(input => {
                const label = input.labels && input.labels[0] ? input.labels[0] : document.querySelector(`label[for="${input.id}"]`);
                if (label) label.classList.remove('correct', 'wrong');
                input.classList.remove('correct', 'wrong');
            });
        }

        function markQuiz() {
            clearAllStates();

            let correctCount = 0;
            let wrongCount = 0;

            const q1 = document.querySelector('input[name="kerdes1"]:checked');
            if (q1) {
                if (q1.value === 'hamis') {
                    correctCount += 1;
                    setAnswerState(q1, true);
                } else {
                    wrongCount += 1;
                    setAnswerState(q1, false);
                }
            } else {
                wrongCount += 1;
            }
            setAnswerState(document.getElementById('hamis'), true);

            const q2 = document.querySelector('input[name="kerdes2"]:checked');
            if (q2) {
                if (q2.value === 'A') {
                    correctCount += 1;
                    setAnswerState(q2, true);
                } else {
                    wrongCount += 1;
                    setAnswerState(q2, false);
                }
            } else {
                wrongCount += 1;
            }
            setAnswerState(document.getElementById('valasz2a'), true);

            const q3 = document.querySelector('input[name="kerdes3"]:checked');
            if (q3) {
                if (q3.value === 'D') {
                    correctCount += 1;
                    setAnswerState(q3, true);
                } else {
                    wrongCount += 1;
                    setAnswerState(q3, false);
                }
            } else {
                wrongCount += 1;
            }
            setAnswerState(document.getElementById('valasz3d'), true);

            const checkedBoxes = Array.from(document.querySelectorAll('input[name="kepek"]:checked')).map(input => input.id);
            const correctBoxes = ['kep1', 'kep3', 'kep4'];
            const isCheckboxSetCorrect = checkedBoxes.length === correctBoxes.length && correctBoxes.every(id => checkedBoxes.includes(id)) && checkedBoxes.every(id => correctBoxes.includes(id));

            if (isCheckboxSetCorrect) {
                correctCount += 1;
                correctBoxes.forEach(id => setAnswerState(document.getElementById(id), true));
            } else {
                wrongCount += 1;
                checkedBoxes.forEach(id => {
                    if (!correctBoxes.includes(id)) setAnswerState(document.getElementById(id), false);
                });
                correctBoxes.forEach(id => {
                    if (!checkedBoxes.includes(id)) setAnswerState(document.getElementById(id), true);
                });
            }

            const correctOrder = {
                fejezet1: '1',
                fejezet2: '2',
                fejezet3: '3',
                fejezet4: '4'
            };

            Object.entries(correctOrder).forEach(([id, expectedValue]) => {
                const select = document.getElementById(id);
                if (!select) return;

                if (select.value === expectedValue) {
                    correctCount += 1;
                    setSelectState(select, true);
                } else {
                    wrongCount += 1;
                    setSelectState(select, false);
                }
            });

            resultBox.innerHTML = `
                <div class="score-row">
                    <span class="score correct-score">Helyes: ${correctCount}</span>
                    <span class="score wrong-score">Helytelen: ${wrongCount}</span>
                </div>
            `;
        }

        checkButton.addEventListener('click', markQuiz);