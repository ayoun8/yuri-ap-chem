/* Unit 0 practice tests — answer keys and grading.
   gradeTest()/resetTest() run Practice Test 1; gradeTest2()/resetTest2() run Practice Test 2.
   Mastery checkboxes are handled by site.js. */
const mcqKey = {"1": {"answer": "C", "why": "The values are tightly clustered (precise) but centered far from the accepted 25.70 g (not accurate)."}, "2": {"answer": "A", "why": "A constant offset is systematic error: it shifts the center away from truth but can leave repeated values tightly clustered."}, "3": {"answer": "B", "why": "|7.52\u22127.87|/7.87\u00d7100 = 4.45%."}, "4": {"answer": "C", "why": "Leading zeros do not count; 2,0,4,0 count = 4."}, "5": {"answer": "B", "why": "0.20 has 2 significant figures, so 0.912 \u2192 0.91."}, "6": {"answer": "C", "why": "Addition is limited by decimal place. 2.7 is only to tenths, so 21.188 \u2192 21.2."}, "7": {"answer": "B", "why": "Scientific notation clearly shows 1,5,0 are significant."}, "8": {"answer": "C", "why": "Counted/defined exact numbers are treated as having unlimited significant figures."}, "9": {"answer": "B", "why": "km must cancel, leaving m."}, "10": {"answer": "B", "why": "(10\u207b\u00b2 m/cm)\u00b2 = 10\u207b\u2074."}, "11": {"answer": "C", "why": "m = DV = 1.25\u00d716.0 = 20.0 g."}, "12": {"answer": "A", "why": "1 mL and 1 cm\u00b3 represent the same volume."}, "13": {"answer": "B", "why": "p=20, n=40\u221220=20, and a 2+ ion has lost 2 e\u207b \u2192 18."}, "14": {"answer": "B", "why": "charge = p\u2212e = 17\u221218 = \u22121."}, "15": {"answer": "B", "why": "Mass number A is p+n and does not change when only electrons are gained/lost."}, "16": {"answer": "D", "why": "Al\u00b3\u207a and O\u00b2\u207b balance at +6 and \u22126 \u2192 Al\u2082O\u2083."}, "17": {"answer": "C", "why": "O is 2\u2212 total, so the two Cu atoms total +2; each is +1."}, "18": {"answer": "C", "why": "Ca\u00b2\u207a requires two NO\u2083\u207b ions."}, "19": {"answer": "C", "why": "N and O are both nonmetals."}, "20": {"answer": "C", "why": "Binary molecular compounds use prefixes: di- and penta- (pentoxide)."}, "21": {"answer": "B", "why": "SO\u2084\u00b2\u207b is sulfate; SO\u2083\u00b2\u207b is sulfite."}, "22": {"answer": "B", "why": "Two NH\u2084\u207a are needed to balance SO\u2084\u00b2\u207b."}, "23": {"answer": "B", "why": "NO\u2082\u207b is nitrite; -ite \u2192 -ous acid."}, "24": {"answer": "C", "why": "Evaporation changes phase but not molecular identity."}, "25": {"answer": "C", "why": "Formation of a precipitate indicates a new substance formed."}, "26": {"answer": "B", "why": "Same molecular identity means no new substance formed."}, "27": {"answer": "C", "why": "To cancel miles, use m/mi; meters belongs in the numerator."}, "28": {"answer": "B", "why": "Finer resolution and repeated measurements reduce scatter/uncertainty; recalibration addresses systematic accuracy."}, "29": {"answer": "D", "why": "1,2,3,0,0 are all significant in scientific notation."}, "30": {"answer": "B", "why": "The main power of factor-label analysis is that unit cancellation checks the setup."}};

function gradeTest() {
  let correct = 0;
  let answered = 0;
  const total = Object.keys(mcqKey).length;

  Object.keys(mcqKey).forEach(qn => {
    const picked = document.querySelector('input[name="q'+qn+'"]:checked');
    const fb = document.getElementById('feedback'+qn);
    const correctLetter = mcqKey[qn].answer;

    document.querySelectorAll('input[name="q'+qn+'"]').forEach(inp => {
      inp.closest('.mcq-option').classList.remove('correct-choice','wrong-choice');
    });

    const correctLabel = document.getElementById('q'+qn+correctLetter);
    if (correctLabel) correctLabel.classList.add('correct-choice');

    if (picked) {
      answered++;
      if (picked.value === correctLetter) {
        correct++;
        fb.innerHTML = '<b>Correct.</b> ' + mcqKey[qn].why;
      } else {
        const pickedLabel = document.getElementById('q'+qn+picked.value);
        if (pickedLabel) pickedLabel.classList.add('wrong-choice');
        fb.innerHTML = '<b>Not quite.</b> The correct answer is <b>' + correctLetter + '</b>. ' + mcqKey[qn].why;
      }
    } else {
      fb.innerHTML = '<b>Unanswered.</b> The correct answer is <b>' + correctLetter + '</b>. ' + mcqKey[qn].why;
    }
    fb.classList.add('show');
  });

  const pct = Math.round((correct / total) * 100);
  document.getElementById('gradeResult').innerHTML =
    '<div class="grade-summary"><strong>' + correct + ' / ' + total + ' correct (' + pct + '%)</strong><br>' +
    answered + ' of ' + total + ' questions answered. Review the explanation under each missed question, then retry.</div>';
}

function resetTest() {
  document.querySelectorAll('.interactive-q input[type="radio"]').forEach(x => x.checked = false);
  document.querySelectorAll('.mcq-option').forEach(x => x.classList.remove('correct-choice','wrong-choice'));
  document.querySelectorAll('.question-feedback').forEach(x => {
    x.classList.remove('show');
    x.innerHTML = '';
  });
  const box = document.getElementById('gradeResult');
  if (box) box.innerHTML = '';
}


const mcqKey2 = {"1": {"answer": "C", "why": "The measurements are tightly grouped, so they are precise, but they are not close to the accepted value of 19.10 g."}, "2": {"answer": "B", "why": "Unpredictable trial-to-trial variation is random error, which primarily reduces precision."}, "3": {"answer": "B", "why": "% error = |2.61\u22122.70|/2.70\u00d7100 = 3.33%."}, "4": {"answer": "C", "why": "The leading zeros do not count. The digits 5, 0, 6, 0, 0 are significant, for 5 significant figures."}, "5": {"answer": "C", "why": "0.40 has 2 significant figures, so 2.924 rounds to 2.9."}, "6": {"answer": "C", "why": "For addition, round to the least precise decimal place. 3.1 is only precise to the tenths place."}, "7": {"answer": "B", "why": "Scientific notation makes the four significant digits 8, 2, 0, 0 explicit."}, "8": {"answer": "C", "why": "The 2 is an exact relationship, not a measurement, so it does not contribute uncertainty."}, "9": {"answer": "B", "why": "Each unwanted unit cancels: cm cancels first, then m, leaving km."}, "10": {"answer": "B", "why": "Because the unit is squared, the conversion factor is squared: (10\u207b\u00b2 m/cm)\u00b2 = 10\u207b\u2074."}, "11": {"answer": "A", "why": "m = DV = (0.875 g/mL)(12.0 mL) = 10.5 g, to 3 significant figures."}, "12": {"answer": "A", "why": "One cubic centimeter and one milliliter are equivalent volumes."}, "13": {"answer": "B", "why": "p=15, n=31\u221215=16, and a 3\u2212 ion has gained 3 electrons, giving 18 electrons."}, "14": {"answer": "D", "why": "charge = protons \u2212 electrons = 12\u221210 = +2."}, "15": {"answer": "B", "why": "The element is defined by proton number. Isotopes differ in neutron number and therefore mass number."}, "16": {"answer": "C", "why": "Mg\u00b2\u207a and N\u00b3\u207b balance at +6 and \u22126, giving Mg\u2083N\u2082."}, "17": {"answer": "C", "why": "O is 2\u2212, so Fe must be 2+ in FeO: iron(II) oxide."}, "18": {"answer": "C", "why": "Al\u00b3\u207a requires three nitrate ions, each NO\u2083\u207b, giving Al(NO\u2083)\u2083."}, "19": {"answer": "B", "why": "S and O are both nonmetals, so SO\u2083 is a molecular compound."}, "20": {"answer": "C", "why": "Binary molecular compounds use prefixes; mono- is omitted on the first element."}, "21": {"answer": "B", "why": "NO\u2082\u207b is nitrite; NO\u2083\u207b is nitrate."}, "22": {"answer": "C", "why": "Three Ca\u00b2\u207a ions give +6 and two PO\u2084\u00b3\u207b ions give \u22126."}, "23": {"answer": "B", "why": "SO\u2083\u00b2\u207b is sulfite, and -ite becomes -ous acid."}, "24": {"answer": "D", "why": "Burning methane forms new substances, so chemical identity changes."}, "25": {"answer": "C", "why": "Boiling forms gas bubbles but is only a physical phase change; H\u2082O remains H\u2082O."}, "26": {"answer": "B", "why": "A change in arrangement or phase without a change in particle identity is physical."}, "27": {"answer": "B", "why": "Kilometers are in the numerator initially, so km must be in the denominator of the next factor: 1000 m/1 km."}, "28": {"answer": "B", "why": "A consistent +0.50 g error is systematic; recalibration addresses that bias."}, "29": {"answer": "C", "why": "6, 0, 2, and the trailing 0 are all significant in scientific notation."}, "30": {"answer": "B", "why": "Units act like algebraic quantities; if they do not cancel to the desired final unit, the setup is probably wrong."}};

function gradeTest2() {
  let correct = 0, answered = 0;
  const total = Object.keys(mcqKey2).length;
  Object.keys(mcqKey2).forEach(qn => {
    const picked = document.querySelector('input[name="t2q'+qn+'"]:checked');
    const fb = document.getElementById('t2feedback'+qn);
    const correctLetter = mcqKey2[qn].answer;

    document.querySelectorAll('input[name="t2q'+qn+'"]').forEach(inp => {
      inp.closest('.mcq-option').classList.remove('correct-choice','wrong-choice');
    });

    const correctLabel = document.getElementById('t2q'+qn+correctLetter);
    if (correctLabel) correctLabel.classList.add('correct-choice');

    if (picked) {
      answered++;
      if (picked.value === correctLetter) {
        correct++;
        fb.innerHTML = '<b>Correct.</b> ' + mcqKey2[qn].why;
      } else {
        const pickedLabel = document.getElementById('t2q'+qn+picked.value);
        if (pickedLabel) pickedLabel.classList.add('wrong-choice');
        fb.innerHTML = '<b>Not quite.</b> The correct answer is <b>' + correctLetter + '</b>. ' + mcqKey2[qn].why;
      }
    } else {
      fb.innerHTML = '<b>Unanswered.</b> The correct answer is <b>' + correctLetter + '</b>. ' + mcqKey2[qn].why;
    }
    fb.classList.add('show');
  });
  const pct = Math.round(correct/total*100);
  document.getElementById('gradeResult2').innerHTML =
    '<div class="grade-summary"><strong>'+correct+' / '+total+' correct ('+pct+'%)</strong><br>'+
    answered+' of '+total+' questions answered. Review the explanations below the missed questions, then retry.</div>';
}

function resetTest2() {
  document.querySelectorAll('.interactive-q2 input[type="radio"]').forEach(x => x.checked = false);
  document.querySelectorAll('.interactive-q2 .mcq-option').forEach(x => x.classList.remove('correct-choice','wrong-choice'));
  document.querySelectorAll('.interactive-q2 .question-feedback').forEach(x => {x.classList.remove('show'); x.innerHTML='';});
  const box = document.getElementById('gradeResult2'); if (box) box.innerHTML = '';
}
