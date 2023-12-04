const calculatorImage = document.getElementById('calculator-image');
const display = document.getElementById('display');

const areaKey1 = {
    xInicio: 20,
    xFin: 95,
    yInicio: 320,
    yFin: 391,
};

const areaKey4 = {
    xInicio: 20,
    xFin: 95,
    yInicio: 230,
    yFin: 305,
};

const areaKey7 = {
    xInicio: 20,
    xFin: 95,
    yInicio: 142,
    yFin: 217,
};

const areaKey2 = {
    xInicio: 107,
    xFin: 184,
    yInicio: 320,
    yFin: 391,
};

const areaKey5 = {
    xInicio: 107,
    xFin: 184,
    yInicio: 230,
    yFin: 305,
};

const areaKey8 = {
    xInicio: 107,
    xFin: 184,
    yInicio: 142,
    yFin: 217,
};

const areaKey3 = {
    xInicio: 193,
    xFin: 268,
    yInicio: 320,
    yFin: 391,
};

const areaKey6 = {
    xInicio: 193,
    xFin: 268,
    yInicio: 230,
    yFin: 305,
};

const areaKey9 = {
    xInicio: 193,
    xFin: 268,
    yInicio: 142,
    yFin: 217,
};

const areaKey0 = {
    xInicio: 20,
    xFin: 95,
    yInicio: 402,
    yFin: 477,
};

const areaClear = {
    xInicio: 106,
    xFin: 182,
    yInicio: 402,
    yFin: 477,
};

const areaSum = {
    xInicio: 193,
    xFin: 268,
    yInicio: 402,
    yFin: 477,
}

const areaEqual = {
    xInicio: 279,
    xFin: 355,
    yInicio: 402,
    yFin: 477,
}

const areaSubtraction = {
    xInicio: 279,
    xFin: 355,
    yInicio: 320,
    yFin: 391,
}

const areaMultiply = {
    xInicio: 279,
    xFin: 355,
    yInicio: 230,
    yFin: 305,
}

const areaDivision = {
    xInicio: 279,
    xFin: 355,
    yInicio: 142,
    yFin: 217,
}


calculatorImage.addEventListener('click', function (event) {

    const x = event.offsetX;
    const y = event.offsetY;

    console.log(`Coordenadas X: ${event.offsetX}, Coordenadas Y: ${event.offsetY}`);

    const maxLenght = 20;
    const excessMessageTime = 2000;

    if (display.textContent.length < maxLenght) {

        if (x > areaKey1.xInicio && x < areaKey1.xFin && y > areaKey1.yInicio && y < areaKey1.yFin) {

            display.textContent += '1';

        } else if (x > areaKey4.xInicio && x < areaKey4.xFin && y > areaKey4.yInicio && y < areaKey4.yFin) {

            display.textContent += '4';

        } else if (x > areaKey7.xInicio && x < areaKey7.xFin && y > areaKey7.yInicio && y < areaKey7.yFin) {

            display.textContent += '7';

        } else if (x > areaKey2.xInicio && x < areaKey2.xFin && y > areaKey2.yInicio && y < areaKey2.yFin) {

            display.textContent += '2';

        } else if (x > areaKey5.xInicio && x < areaKey5.xFin && y > areaKey5.yInicio && y < areaKey5.yFin) {

            display.textContent += '5';

        } else if (x > areaKey8.xInicio && x < areaKey8.xFin && y > areaKey8.yInicio && y < areaKey8.yFin) {

            display.textContent += '8';

        } else if (x > areaKey3.xInicio && x < areaKey3.xFin && y > areaKey3.yInicio && y < areaKey3.yFin) {

            display.textContent += '3';

        } else if (x > areaKey6.xInicio && x < areaKey6.xFin && y > areaKey6.yInicio && y < areaKey6.yFin) {

            display.textContent += '6';

        } else if (x > areaKey9.xInicio && x < areaKey9.xFin && y > areaKey9.yInicio && y < areaKey9.yFin) {

            display.textContent += '9';

        } else if (x > areaKey0.xInicio && x < areaKey0.xFin && y > areaKey0.yInicio && y < areaKey0.yFin) {

            display.textContent += '0';

        } else if (x > areaSum.xInicio && x < areaSum.xFin && y > areaSum.yInicio && y < areaSum.yFin) {

            display.textContent += '+';

        } else if (x > areaSubtraction.xInicio && x < areaSubtraction.xFin && y > areaSubtraction.yInicio && y < areaSubtraction.yFin) {

            display.textContent += '-';

        } else if (x > areaMultiply.xInicio && x < areaMultiply.xFin && y > areaMultiply.yInicio && y < areaMultiply.yFin) {

            display.textContent += '*';

        } else if (x > areaDivision.xInicio && x < areaDivision.xFin && y > areaDivision.yInicio && y < areaDivision.yFin) {

            display.textContent += '/';

        } else if (x > areaClear.xInicio && x < areaClear.xFin && y > areaClear.yInicio && y < areaClear.yFin) {

            display.textContent = '';
        }

    } else {

        display.textContent = 'Exceso de dígitos';
        display.classList.add('display-alert');

        setTimeout(() => {
            display.textContent = '';
            display.classList.remove('display-alert');
        }, excessMessageTime);
    }

    if (x > areaEqual.xInicio && x < areaEqual.xFin && y > areaEqual.yInicio && y < areaEqual.yFin) {

        let expression = display.textContent;

        try {
            if (expression !== '') {

                let result = eval(expression);

                display.textContent = result;
            }
        } catch (error) {
            display.textContent = "Operación invalida";
            display.classList.add('display-alert');
            setTimeout(() => {
                display.textContent = '';
                display.classList.remove('display-alert');
            }, 1000);
        }

    }

    function addClickedEffect(area) {
        const calculatorContainer = document.querySelector('#calculator-image');

        if (x > area.xInicio && x < area.xFin && y > area.yInicio && y < area.yFin) {
            calculatorContainer.classList.add('area-clicked');

            setTimeout(() => {
                calculatorContainer.classList.remove('area-clicked');
            }, 100);
        }
    }

    addClickedEffect(areaKey1);
    addClickedEffect(areaKey2);
    addClickedEffect(areaKey3);
    addClickedEffect(areaKey4);
    addClickedEffect(areaKey5);
    addClickedEffect(areaKey6);
    addClickedEffect(areaKey7);
    addClickedEffect(areaKey8);
    addClickedEffect(areaKey9);
    addClickedEffect(areaKey0);

});



