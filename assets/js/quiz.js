/* Mixed mastery quiz (Unit 0 page). Edit quizQuestions to add questions:
   q = prompt, a = choices, c = index of correct choice, x = explanation. */
document.addEventListener('DOMContentLoaded', function () {
// ----- Unit 0 mixed quiz -----
        const quizQuestions = [
            {
                q: "Which change is chemical?",
                a: ["Melting ice", "Boiling water", "Electrolysis of water", "Condensing steam"],
                c: 2,
                x: "Electrolysis breaks water molecules and rearranges atoms into new substances."
            },
            {
                q: "Which statement describes precision?",
                a: ["A result close to the accepted value", "Repeated measurements close to one another", "A result with many significant figures", "A measurement with no uncertainty"],
                c: 1,
                x: "Precision is the closeness of repeated measurements to one another."
            },
            {
                q: "How many significant figures are in 0.004070?",
                a: ["2", "3", "4", "5"],
                c: 2,
                x: "The leading zeros do not count. The 4, captive 0, 7, and final decimal-place 0 do count: 4 sig figs."
            },
            {
                q: "For multiplication and division, the final answer is limited by...",
                a: ["The fewest decimal places", "The fewest significant figures", "The largest exponent", "The smallest numerical value"],
                c: 1,
                x: "Multiplication/division use the fewest significant figures."
            },
            {
                q: "What is the correct formula for aluminum sulfate?",
                a: ["AlSO4", "Al3SO4", "Al2(SO4)3", "Al(SO4)2"],
                c: 2,
                x: "2 Al³⁺ gives +6 and 3 SO₄²⁻ gives −6, so Al₂(SO₄)₃ is neutral."
            },
            {
                q: "What is Cu2O called?",
                a: ["Copper oxide", "Copper(II) oxide", "Copper(I) oxide", "Dicopper monoxide"],
                c: 2,
                x: "O is −2 overall, so the two Cu atoms total +2. Each Cu is +1 → copper(I) oxide."
            },
            {
                q: "Which is the correct name for N2O5?",
                a: ["Nitrogen oxide", "Nitrogen(V) oxide", "Dinitrogen pentoxide", "Dinitrogen pentaoxide"],
                c: 2,
                x: "Two nonmetals use molecular prefixes: di- + nitrogen and pentoxide."
            },
            {
                q: "The chlorate ion forms which acid name?",
                a: ["Hydrochloric acid", "Chlorous acid", "Chloric acid", "Perchloric acid"],
                c: 2,
                x: "For oxoacids, -ate becomes -ic: chlorate → chloric acid."
            },
            {
                q: "An atom has Z = 17 and A = 37. How many neutrons does it have?",
                a: ["17", "20", "37", "54"],
                c: 1,
                x: "Neutrons = A − Z = 37 − 17 = 20."
            },
            {
                q: "A negative ion forms when an atom...",
                a: ["Loses protons", "Gains protons", "Loses electrons", "Gains electrons"],
                c: 3,
                x: "An anion has more electrons than protons because it gained electrons."
            },
            {
                q: "Which scientist is associated with the oil-drop experiment in the Unit 0 notes?",
                a: ["J. J. Thomson", "Millikan", "Rutherford", "Chadwick"],
                c: 1,
                x: "Millikan's oil-drop experiment determined the charge on the electron."
            },
            {
                q: "Gas changing directly to solid is called...",
                a: ["Sublimation", "Deposition", "Condensation", "Freezing"],
                c: 1,
                x: "Gas → solid is deposition (also called reverse sublimation in the notes)."
            },
            {
                q: "Which formula is an empirical formula?",
                a: ["C6H12O6", "C2H4O2", "CH2O", "C4H8O4"],
                c: 2,
                x: "CH₂O is the simplest whole-number ratio among these formulas."
            },
            {
                q: "If the empirical formula is CH2O and the molar mass is about 180 g/mol, what is the molecular formula?",
                a: ["CH2O", "C2H4O2", "C6H12O6", "C12H24O12"],
                c: 2,
                x: "Empirical-formula mass is about 30 g/mol; 180 ÷ 30 = 6, so multiply every subscript by 6."
            }
        ];

        const qEl = document.getElementById('qprompt');
        const choicesEl = document.getElementById('choices');
        const feedbackEl = document.getElementById('feedback');
        const nextEl = document.getElementById('nextQ');

        let currentQuestion = null;
        let lastIndex = -1;

        function loadQuestion(){
            if (!qEl || !choicesEl || !feedbackEl) return;

            let idx = Math.floor(Math.random() * quizQuestions.length);
            if (quizQuestions.length > 1 && idx === lastIndex) idx = (idx + 1) % quizQuestions.length;
            lastIndex = idx;
            currentQuestion = quizQuestions[idx];

            qEl.textContent = currentQuestion.q;
            choicesEl.innerHTML = '';
            feedbackEl.textContent = '';
            feedbackEl.className = 'feedback';

            currentQuestion.a.forEach((label, i) => {
                const b = document.createElement('button');
                b.type = 'button';
                b.textContent = label;
                b.addEventListener('click', function(){
                    [...choicesEl.querySelectorAll('button')].forEach(btn => btn.disabled = true);

                    if (i === currentQuestion.c) {
                        feedbackEl.className = 'feedback ok';
                        feedbackEl.textContent = 'Correct — ' + currentQuestion.x;
                        b.style.borderColor = '#6f9d76';
                        b.style.background = '#edf7ee';
                    } else {
                        feedbackEl.className = 'feedback bad';
                        feedbackEl.textContent = 'Not quite — ' + currentQuestion.x;
                        b.style.borderColor = '#b87a7a';
                        b.style.background = '#f9eeee';

                        const correctBtn = choicesEl.querySelectorAll('button')[currentQuestion.c];
                        if (correctBtn) {
                            correctBtn.style.borderColor = '#6f9d76';
                            correctBtn.style.background = '#edf7ee';
                        }
                    }
                });
                choicesEl.appendChild(b);
            });
        }

        if (nextEl) {
            nextEl.type = 'button';
            nextEl.addEventListener('click', loadQuestion);
        }
        loadQuestion();
});
