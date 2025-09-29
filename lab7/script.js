document.addEventListener('DOMContentLoaded', function() {
    const convertBtn = document.getElementById('convertBtn');
    const numberInput = document.getElementById('number');
    const fromBaseInput = document.getElementById('fromBase');
    const toBaseInput = document.getElementById('toBase');
    const resultValue = document.getElementById('resultValue');
    
    convertBtn.addEventListener('click', convertNumber);
    
    function convertNumber() {
        // Получаем значения из полей ввода
        const numberStr = numberInput.value.trim().toUpperCase();
        const fromBase = parseInt(fromBaseInput.value);
        const toBase = parseInt(toBaseInput.value);
        
        // Проверяем корректность оснований систем счисления
        if (isNaN(fromBase) || fromBase < 2 || fromBase > 36) {
            alert('Исходная система счисления должна быть числом от 2 до 36');
            return
        }
        
        if (isNaN(toBase) || toBase < 2 || toBase > 36) {
            alert('Целевая система счисления должна быть числом от 2 до 36');
            return
        }
        
        // Проверяем, что число не пустое
        if (numberStr === '') {
            resultValue.textContent = '-';
            return;
        }
        
        try {
            // Выполняем перевод
            const result = convertBase(numberStr, fromBase, toBase);
            resultValue.textContent = result;
        } catch (error) {
            alert('Ошибка при переводе: ' + error.message);
        }
    }
    
    function convertBase(numberStr, fromBase, toBase) {
        // Разделяем число на целую и дробную части
        const parts = numberStr.split('.');
        let integerPart = parts[0];
        let fractionalPart = parts[1] || '';
        
        // Переводим целую часть
        let integerValue = 0;
        for (let i = 0; i < integerPart.length; i++) {
            const digit = charToDigit(integerPart[i]);
            integerValue = integerValue * fromBase + digit;
        }
        
        // Переводим дробную часть
        let fractionalValue = 0;
        for (let i = 0; i < fractionalPart.length; i++) {
            const digit = charToDigit(fractionalPart[i]);
            fractionalValue = (fractionalValue + digit) / fromBase;
        }
        
        // Объединяем целую и дробную части в десятичном представлении
        const decimalValue = integerValue + fractionalValue;
        
        // Переводим десятичное число в целевую систему счисления
        return decimalToBase(decimalValue, toBase);
    }
    
    function decimalToBase(decimalValue, base) {
        // Обрабатываем особый случай - ноль
        if (decimalValue === 0) return '0';
        
        // Разделяем на целую и дробную части
        let integerPart = Math.floor(decimalValue);
        let fractionalPart = decimalValue - integerPart;
        
        // Переводим целую часть
        let integerResult = '';
        if (integerPart === 0) {
            integerResult = '0';
        } else {
            while (integerPart > 0) {
                const remainder = integerPart % base;
                integerResult = digitToChar(remainder) + integerResult;
                integerPart = Math.floor(integerPart / base);
            }
        }
        
        // Переводим дробную часть (максимум 20 знаков после точки)
        let fractionalResult = '';
        if (fractionalPart > 0) {
            fractionalResult = '.';
            let precision = 0;
            let tempFractional = fractionalPart;
            
            while (tempFractional > 0 && precision < 20) {
                tempFractional *= base;
                const digit = Math.floor(tempFractional);
                fractionalResult += digitToChar(digit);
                tempFractional -= digit;
                precision++;
            }
        }
        
        return integerResult + fractionalResult;
    }
    
    function charToDigit(char) {
        if (char >= '0' && char <= '9') {
            return parseInt(char);
        }
        return char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    }
    
    function digitToChar(digit) {
        if (digit >= 0 && digit <= 9) {
            return digit.toString();
        }
        return String.fromCharCode(digit - 10 + 'A'.charCodeAt(0));
    }
});