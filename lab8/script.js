const h1 = document.getElementById('h1')
const h2 = document.getElementById('h2')

function getNextFriday() {
    const today = new Date();
    const currentDay = today.getDay(); // 0 - воскресенье, 5 - пятница
    const currentDate = today.getDate();
    
    let daysUntilFriday;
    let message;
    
    if (currentDay === 5) {
        // Сегодня пятница
        daysUntilFriday = 0;
        message = "Сегодня пятница!";
    } else if (currentDay < 5) {
        // Пятница в этой неделе
        daysUntilFriday = 5 - currentDay;
        message = daysUntilFriday === 1 ? "Пятница уже завтра!" : `До пятницы осталось ${daysUntilFriday} дней`;
    } else {
        // Пятница на следующей неделе
        daysUntilFriday = 5 + (7 - currentDay);
        message = `До пятницы осталось ${daysUntilFriday} дней`;
    }
    
    const fridayDate = new Date(today);
    fridayDate.setDate(currentDate + daysUntilFriday);
    
    return {
        date: fridayDate,
        message: message,
        isToday: daysUntilFriday === 0
    };
}

function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('ru-RU', options);
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU');
    document.getElementById('current-time').textContent = timeString;
}

// Обновляем информацию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const fridayInfo = getNextFriday();
    
    h1.textContent = fridayInfo.message;
    h2.textContent = formatDate(fridayInfo.date);
    
    // Обновляем время каждую секунду
    updateTime();
    setInterval(updateTime, 1000);
});