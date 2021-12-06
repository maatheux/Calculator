(function () {
    function CreateCalculator() {
        const btn = document.querySelector('.btn-container');
        const display = document.querySelector('.display');

        this.start = () => {
            btnsEvents();
        };

        const btnsEvents = () => {
            btn.addEventListener('click', e => {
                let element = e.target;

                if (element.classList.contains('num-btn')) {
                    display.value += element.innerText;
                }

                if (element.classList.contains('cancel')) {
                    display.value = '';
                }

                if (element.classList.contains('backspace')) {
                    display.value = display.value.slice(0, -1);
                }

                if (element.classList.contains('equal')) {
                    display.value = math.evaluate(display.value);
                }
            });
        };
    }

    let calculator = new CreateCalculator();
    calculator.start();
})();
