document.addEventListener("DOMContentLoaded", () => {
    const dayInput = document.querySelector(".day");
    const monthInput = document.querySelector(".month");
    const yearInput = document.querySelector(".year");
    const computedYears = document.querySelector(".computed__years");
    const computedMonths = document.querySelector(".computed__months");
    const computedDays = document.querySelector(".computed__days");
    const allInputs = document.querySelectorAll('.inputs');

    document.querySelector(".btn").addEventListener("click", () => {
        const datas = {
            days: parseInt(dayInput.value),
            months: parseInt(monthInput.value),
            years: parseInt(yearInput.value),
        };

        if (validateInputs(datas)) {
            calculateAndDisplayAge(datas);
        } else {
            resetDom();
        }
    });

    function validateInputs({ days, months, years }) {
        let allValid = true;
        allInputs.forEach((input) => {
            const inputValue = parseInt(input.children[1].value);

            if (isNaN(inputValue) || inputValue <= 0) {
                input.children[0].classList.add('error');
                input.children[1].classList.add('error__border');
                input.children[2].classList.add('popup__error');
                allValid = false;
            } else {
                input.children[0].classList.remove('error');
                input.children[1].classList.remove('error__border');
                input.children[2].classList.remove('popup__error');
            }
        });
        return allValid;
    }

    function calculateAndDisplayAge({ days, months, years }) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
        const currentDay = currentDate.getDate();

        let userAge = {
            year: currentYear - years,
            month: currentMonth - months,
            day: currentDay - days,
        };

        if (userAge.day < 0) {
            userAge.month -= 1;
            const prevMonth = new Date(currentYear, currentMonth - 1, 0);
            userAge.day += prevMonth.getDate();
        }

        if (userAge.month < 0) {
            userAge.year -= 1;
            userAge.month += 12;
        }

        updateDom(userAge);
    }

    function updateDom({ year, month, day }) {
        computedYears.textContent = year;
        computedMonths.textContent = month;
        computedDays.textContent = day;
    }

    function resetDom() {
        computedYears.textContent = '--';
        computedMonths.textContent = '--';
        computedDays.textContent = '--';
    }
});
