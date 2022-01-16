(function () {
    function CreateCalculator() {
        const btn = document.querySelector('.btn-container');
        const display = document.querySelector('.display');
        const historyContainer = document.querySelector('.history-container');
        const historyMedia = document.querySelector('.history-media');
        const historyMediaContainer = document.querySelector(
            '.history-media-container'
        );
        let bool = true;

        this.start = () => {
            btnsEvents();
            addEvaluateToDisplay();
            showEvaluates();
        };

        const addHistory = function (evaluateStr) {
            let historyContainerArr = [historyContainer, historyMediaContainer];
            for (value of historyContainerArr) {
                let el = document.createElement('div');
                el.classList.add('element-evaluate');
                let evaluatesHistory = document.createElement('div');
                evaluatesHistory.classList.add('evaluates-history');
                evaluatesHistory.innerText = evaluateStr;
                let evaluateResult = document.createElement('div');
                evaluateResult.classList.add('evaluate-result');
                evaluateResult.innerText = Number(
                    math.evaluate(evaluateStr).toFixed(2)
                );

                el.appendChild(evaluatesHistory);
                el.appendChild(evaluateResult);
                el.style.display = 'flex';
                el.style.justifyContent = 'space-between';
                el.style.marginBottom = '1.2rem';
                el.style.fontSize = '1.4rem';
                el.style.cursor = 'pointer';

                evaluatesHistory.style.maxWidth = '5.5rem';
                evaluatesHistory.style.overflow = 'hidden';

                evaluateResult.style.maxWidth = '5.5rem';
                evaluateResult.style.overflow = 'hidden';

                value.insertBefore(el, value.firstChild);
            }
        };

        const addEvaluateToDisplay = function () {
            historyContainer.addEventListener('click', e => {
                let elem = e.target;
                if (elem.classList.contains('element-evaluate')) {
                    let elemChildNode = elem.childNodes;
                    display.value = elemChildNode[0].innerText;
                }
                if (elem.classList.contains('evaluates-history')) {
                    display.value = elem.innerText;
                }
                if (elem.classList.contains('evaluate-result')) {
                    let elemParent = elem.parentNode;
                    let elemChildNode = elemParent.childNodes;
                    display.value = elemChildNode[0].innerText;
                }
            });
        };

        const saveEvaluates = function () {
            let evaluatesArr = [];
            for (value of historyContainer.childNodes) {
                evaluatesArr.push(value.childNodes[0].innerText);
            }

            const evaluatesJSON = JSON.stringify(evaluatesArr);
            localStorage.setItem('evaluates', evaluatesJSON);
        };

        const showEvaluates = function () {
            const savedEvaluates = localStorage.getItem('evaluates');
            const evaluatesArr = JSON.parse(savedEvaluates);

            for (value of evaluatesArr) {
                addHistory(value);
            }
        };

        const doEvaluate = function () {
            try {
                operation = math.evaluate(display.value);

                if (!operation) {
                    alert('Operação inválida!');
                    return;
                }
            } catch (e) {
                alert('Operação inválida!');
                return;
            }

            display.value = operation;
            bool = false;
        };

        const addNumberDisplay = function (element) {
            if (typeof element === 'string') {
                display.value += element;
            } else {
                display.value += element.innerText;
            }
        };

        const btnsEvents = () => {
            btn.addEventListener('click', e => {
                let element = e.target;

                if (bool === false) {
                    display.value = '';
                    bool = true;
                }

                if (element.classList.contains('num-btn')) {
                    addNumberDisplay(element);
                }

                if (element.classList.contains('cancel')) {
                    display.value = '';
                }

                if (element.classList.contains('backspace')) {
                    display.value = display.value.slice(0, -1);
                }

                if (element.classList.contains('equal')) {
                    addHistory(display.value);

                    if (historyContainer.childNodes.length > 10) {
                        historyContainer.lastChild.remove();
                    }
                    doEvaluate();
                    saveEvaluates();
                }

                if (element.classList.contains('history-button')) {
                    historyMedia.classList.add('history-open');
                }
            });

            document.addEventListener('keypress', e => {
                if (e.keyCode === 13) {
                    addHistory(display.value);
                    if (historyContainer.childNodes.length > 10) {
                        historyContainer.lastChild.remove();
                    }
                    doEvaluate();
                    saveEvaluates();
                }

                if (e.keyCode > 48 && e.keyCode < 57) {
                    addNumberDisplay(e.key);
                }
            });

            historyMediaContainer.addEventListener('click', e => {
                let hmcEl = e.target;

                if (hmcEl.classList.contains('element-evaluate')) {
                    let elemChildNode = hmcEl.childNodes;
                    display.value = elemChildNode[0].innerText;
                    historyMedia.classList.remove('history-open');
                }
                if (hmcEl.classList.contains('evaluates-history')) {
                    display.value = hmcEl.innerText;
                    historyMedia.classList.remove('history-open');
                }
                if (hmcEl.classList.contains('evaluate-result')) {
                    let elemParent = hmcEl.parentNode;
                    let elemChildNode = elemParent.childNodes;
                    display.value = elemChildNode[0].innerText;
                    historyMedia.classList.remove('history-open');
                }
            });

            historyMedia.addEventListener('click', e => {
                hmEl = e.target;
                if (hmEl.classList.contains('close-icon')) {
                    historyMedia.classList.remove('history-open');
                }
            });
        };
    }

    let calculator = new CreateCalculator();
    calculator.start();
})();
