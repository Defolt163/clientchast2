let sum = 0;
for (let i = 1; i <= 128; i++) {
    sum += 1 / Math.pow(2 * i, 2);
}
alert(`Сумма ряда для i от 1 до 128 \nРавна: ${sum}`)
document.write(`Сумма ряда S = Σ [1/(2i)²] для i от 1 до 128 <br/> Равна: ${sum}`);