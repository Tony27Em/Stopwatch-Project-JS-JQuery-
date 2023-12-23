$(document).ready(function() {  
    const alarm_btn = $('#alarm'),
          sw_btn = $('#stopwatch'),
          timer_btn = $('#timer');
    const options = $('.options');
    const alarm_area = $('.options-alarm'),
          alarm_items = $('.options-alarm-items'),
          alarm_add_btn = $('.options-alarm-btn'),
          alarm_set_hrs = document.querySelector('.options-alarm-set-hours-numbers'),
          alarm_set_min = document.querySelector('.options-alarm-set-min-numbers'),
          alarm_set_hrs_item = $('.options-alarm-set-hours-numbers-item'),
          alarm_set_min_item = $('.options-alarm-set-min-numbers-item');
    const sw_area = $('.options-stopwatch'),
          sw_text = $('.options-stopwatch-text'),
          sw_start_btn = $('.options-stopwatch-btns-start'),
          sw_pause_btn = $('.options-stopwatch-btns-pause'),
          sw_reset_btn = $('.options-stopwatch-btns-reset'),
          sw_interval_btn = $('.options-stopwatch-btns-interval'),
          sw_intervals = $('.options-stopwatch-intervals');
    const timer_area = $('.options-timer'),        
          t_start_btn = $('.options-timer-btns-start'),
          t_pause_btn = $('.options-timer-btns-pause'),
          t_reset_btn = $('.options-timer-btns-reset'),
          timer_set_hrs = document.querySelector('.options-timer-set-hours-numbers'),
          timer_set_min = document.querySelector('.options-timer-set-min-numbers'),
          timer_set_sec = document.querySelector('.options-timer-set-sec-numbers'),
          timer_set_hrs_item = $('.options-timer-set-hours-numbers-item'),
          timer_set_min_item = $('.options-timer-set-min-numbers-item'),
          timer_set_sec_item = $('.options-timer-set-sec-numbers-item');  
    const sevenDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'];
    
    // Установка текущего времени на странице
    const setCurrentTime = () => {
        let fullDate = new Date(); // Полная текущая дата
        let currentDay = sevenDays[fullDate.getDay()]; // Название такущего дня недели        
        let currentDate = fullDate.toLocaleDateString();
        let currentTime = fullDate.toLocaleTimeString();

        $('.clock-day').text(currentDay);           
        $('.clock-date').text(currentDate);           
        $('.clock-time').text(currentTime);           
    }
    setCurrentTime(); // Отобразить при загрузке страницы
    setInterval(setCurrentTime, 1000); // Периодичный вызов функции с интервалом 1 секунда
    
    // Общая функция для отображения дополнительных опций (будильник, секундомер, таймер)
    let showOption = (button, option_1, option_2, option_3) => {
        button.click(() => {
            options.slideDown(250).css('display', 'flex');
            option_1.show().animate({opacity: 1}, 200).css('display', 'flex');
            option_2.hide().css('opacity', 0);
            option_3.hide().css('opacity', 0);
        })
    }    
    showOption(alarm_btn, alarm_area, sw_area, timer_area);
    showOption(sw_btn, sw_area, alarm_area, timer_area);
    showOption(timer_btn, timer_area, alarm_area, sw_area);
    
    // Скрыть блок опций
    $('.options-hide').click(function() {
        options.slideUp(250);
    })

    // Сокрытие блоков с набором допустимых значений (НДЗ) ЧЧ:ММ:СС при нажатии вне их области
    $(document).click((e) => {
        if(!e.target.closest('.options-alarm-set-hours')) alarm_set_hrs.classList.add('hide');
        if(!e.target.closest('.options-alarm-set-min')) alarm_set_min.classList.add('hide');

        if(!e.target.closest('.options-timer-set-hours')) timer_set_hrs.classList.add('hide');
        if(!e.target.closest('.options-timer-set-min')) timer_set_min.classList.add('hide');
        if(!e.target.closest('.options-timer-set-sec')) timer_set_sec.classList.add('hide');        
    })

    // Отображение блоков с НДЗ для ЧЧ:ММ:СС
    const chooseTime = (numbers, num_items, num_limit_1, num_limit_2) => {
        numbers.classList.toggle('hide');
        num_items.empty();

        // Создание пяти начальных значений
        for (let i = 0; i < 5; i++) {
            const number = document.createElement('p');
            number.textContent = num_limit_1 + i;    
            +number.textContent >= num_limit_2 ? number.textContent = +number.textContent - num_limit_2 : '';
            +number.textContent < 10 ? number.textContent = '0' + number.textContent : '';
            num_items.append(number); 
        }

        numbers.scrollTop = (numbers.scrollHeight - numbers.clientHeight) / 2; // Скролл на середину для правильного отображения значений

        timer_set_hrs_item.children().click(function() {$('.options-timer-set-hours-initial').text($(this).text())});
        timer_set_min_item.children().click(function() {$('.options-timer-set-min-initial').text($(this).text())});
        timer_set_sec_item.children().click(function() {$('.options-timer-set-sec-initial').text($(this).text())});

        alarm_set_hrs_item.children().click(function() {$('.options-alarm-set-hours-initial').text($(this).text())});
        alarm_set_min_item.children().click(function() {$('.options-alarm-set-min-initial').text($(this).text())});
    }
    
    // Функция создания бесконечного НДЗ (бесконечный скролл)
    const scrollTime = (item, e, num_limit_1, num_limit_2) => {
        let temp;
        let number = document.createElement('p');

        // Действия при том или ином направлении скролла
        if (e.deltaY >= 0) {
            temp = +item.children().last().text() + 1;
            temp == num_limit_2 ? temp = 0 : temp;
            temp < 10 ? temp = '0' + temp : temp;
            number.textContent = temp;
            item.append(number);
            item.children().first().remove();                
        } else {
            temp = +item.children().first().text() - 1;
            temp == -1 ? temp = num_limit_1 : temp;
            temp < 10 ? temp = '0' + temp : temp;
            number.textContent = temp;
            item.prepend(number);
            item.children().last().remove();
        } 

        // Установка выбранного значения при клике в один из основных блоков ЧЧ:ММ:СС 
        timer_set_hrs_item.children().click(function() {$('.options-timer-set-hours-initial').text($(this).text())});
        timer_set_min_item.children().click(function() {$('.options-timer-set-min-initial').text($(this).text())});
        timer_set_sec_item.children().click(function() {$('.options-timer-set-sec-initial').text($(this).text())});

        alarm_set_hrs_item.children().click(function() {$('.options-alarm-set-hours-initial').text($(this).text())});
        alarm_set_min_item.children().click(function() {$('.options-alarm-set-min-initial').text($(this).text())});
    }


    // ----- ALARM -----
    // Вкл/выкл будильник
    let alarms_array = [];
    const check_alarm_status = (alarms) => {
        $('.alarm-toggle').off('change');
        $('.alarm-toggle').on('change', function(e) {
            let index = alarms.index($(e.target).parent());
            let temp = JSON.parse(localStorage.getItem('alarms'));
            temp[index].status = !temp[index].status;
            alarms_array = [...temp];
            localStorage.setItem('alarms', JSON.stringify(temp));
        })
    }

    // Удалить будильник
    const delete_alarm = () => {
        $('.options-alarm-items-X-delete').off('click');
        $('.options-alarm-items-X-delete').on('click', function(e) {
            let temp = alarm_items.children();
            let index = temp.index($(e.target).parent());

            alarms_array.splice(index, 1);
            $(this).parent().fadeOut(500, function() {
                $(this).remove();
            });
            localStorage.setItem('alarms', JSON.stringify(alarms_array));

            if(alarms_array.length == 0) localStorage.clear();
        })
    }
      
    // Добавить будильник
    alarm_add_btn.on('click', function() {
        let alarm_hrs_initial = $('.options-alarm-set-hours-initial');
        let alarm_min_initial = $('.options-alarm-set-min-initial');
        let id;

        do {
            id = Math.floor(Math.random() * 10000); // Установка уникального ID для каждого будильника
        } while ($('#' + id).length > 0)        
        
        const alarm_item = `
            <div class="options-alarm-items-X"">
                <input type="checkbox" name="alarm-toggle" class="alarm-toggle" id="${id}" checked>
                <label for="${id}">
                    <div></div>
                </label>
                <p class="options-alarm-items-X-time">${alarm_hrs_initial.text()}:${alarm_min_initial.text()}</p> 
                <p class="options-alarm-items-X-delete">&times;</p>               
            </div>
        `;
        alarm_items.append(alarm_item);

        let alarm = {
            'time': alarm_hrs_initial.text() + ':' + alarm_min_initial.text(),
            'status': true,
            'id': id,
        };
        alarms_array.push(alarm);        

        localStorage.setItem('alarms', JSON.stringify(alarms_array));
        check_alarm_status(alarm_items.children());
        delete_alarm();
    })
    
    // Получение существующих будильников при загрузке страницы
    if(localStorage.getItem('alarms')) {
        alarms_array = JSON.parse(localStorage.getItem('alarms'));
        alarms_array.forEach(item => {
            let status;
            status = item.status == true ? 'checked' : '';
            const alarm_item = `
                <div class="options-alarm-items-X">
                    <input type="checkbox" name="alarm-toggle" class="alarm-toggle" id="${item.id}" ${status}>
                    <label for="${item.id}">
                        <div></div>
                    </label>
                    <p class="options-alarm-items-X-time">${item.time.split(':')[0]}:${item.time.split(':')[1]}</p>
                    <p class="options-alarm-items-X-delete">&times;</p>
                </div>
            `;
            alarm_items.append(alarm_item);
        })
        check_alarm_status(alarm_items.children());
        delete_alarm();
    }

    // Аудио-оповещение для будильника
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './audio/audio-1.mp3'; 
    const check_alarms = setInterval(() => {
        let full_time = new Date();
        let current_time = full_time.toLocaleTimeString();
        if(alarms_array.length != 0) {
            alarms_array.forEach(item => {
                if(item.status == true && item.time + ':00' == current_time) {
                    audio.play();
                    console.log('Звенит будильник');
                }
            })
        }
    }, 1000)

    alarm_set_hrs.addEventListener('mousewheel', (e) => scrollTime(alarm_set_hrs_item, e, 23, 24));
    alarm_set_min.addEventListener('mousewheel', (e) => scrollTime(alarm_set_min_item, e, 59, 60));
    $('.options-alarm-set-hours').on('click', () => chooseTime(alarm_set_hrs, alarm_set_hrs_item, 22, 24));
    $('.options-alarm-set-min').on('click', () => chooseTime(alarm_set_min, alarm_set_min_item, 58, 60));   
    


    // ----- STOPWATCH (sw - stopwatch) -----
    let sw_action;
    let sw_ms = 0,
        sw_s = 0,
        sw_m = 0,
        sw_h = 0;
    let sw_ms_,
        sw_s_,
        sw_m_,
        sw_h_;
        
    // Пуск секундомера
    sw_start_btn.on('click', function() {        
        $(this).prop('disabled', true); // Смена статуса кнопок при взаимодейтвии с ними
        sw_pause_btn.prop('disabled', false); // ..........
        sw_reset_btn.prop('disabled', false); // ..........
        sw_interval_btn.prop('disabled', false); // ..........

        // Подсчет и отображение времени
        sw_action = setInterval(() => {  
            sw_ms++;
            
            if(sw_ms == 100) {
                sw_ms = 0;
                sw_s++;
            }              
            if(sw_s == 60) {
                sw_s = 0;
                sw_m++;
            }             
            if(sw_m == 60) {
                sw_m = 0;
                sw_h++;
            }
            
            sw_ms < 10 ? sw_ms_ = '00' + sw_ms : sw_ms_ = '0' + sw_ms;
            sw_s < 10 ? sw_s_ = '0' + sw_s : sw_s_ = sw_s;
            sw_m < 10 ? sw_m_ = '0' + sw_m : sw_m_ = sw_m;
            sw_h < 10 ? sw_h_ = '0' + sw_h : sw_h_ = sw_h;
            sw_text.text(`${sw_h_}:${sw_m_}:${sw_s_}:${sw_ms_}`);    
        }, 10)
    })

    // Пауза секундомера
    sw_pause_btn.on('click', function() {
        clearInterval(sw_action);      
        
        $(this).prop('disabled', true);
        sw_start_btn.prop('disabled', false);
        sw_reset_btn.prop('disabled', false);
    })

    // Сброс секундомера
    sw_reset_btn.click(function() {
        clearInterval(sw_action);

        $(this).prop('disabled', true); // Смена статуса кнопок при взаимодейтвии с ними
        sw_start_btn.prop('disabled', false); // ..........
        sw_pause_btn.prop('disabled', true); // ..........
        sw_interval_btn.prop('disabled', true); // ..........

        // Обнуление всех задействованных элементов
        sw_text.text('00:00:00:000');
        sw_intervals.text('');
        sw_ms = 0;
        sw_h = 0;
        sw_m = 0;
        sw_s = 0;
    })

    // Интервал секундомера
    sw_interval_btn.click(() => {
        if(sw_text.text() !== '00:00:00:000') {
            let interval_item = document.createElement('p');
            interval_item.textContent = sw_text.text();
            sw_intervals.append(interval_item);
        }
    })



    // ----- TIMER (t - timer) -----         
    // Кнопка СТАРТ таймера
    let count_down;
    t_start_btn.on('click', function() {
        // Условие для начала работы функции (установленные значения должны быть не нулевыми)
        if(+$('.options-timer-set-sec-initial').text() != 0 || +$('.options-timer-set-min-initial').text() != 0 || +$('.options-timer-set-hours-initial').text() != 0) {            
            $(this).prop('disabled', true); // ЭТА кнопка - неактивна
            t_pause_btn.prop('disabled', false); // Кнопка ПАУЗА - активна
            t_reset_btn.prop('disabled', false); // Кнопка СБРОС - активна
            
            $('.options-timer-set-hours').off(); // Удаление обработчиков событий с блоков установки ЧЧ:ММ:СС
            $('.options-timer-set-min').off(); // ..........
            $('.options-timer-set-sec').off(); // ..........
            
            // Интервал в 1 секунду
            count_down = setInterval(() => {
                let count_down_sec = $('.options-timer-set-sec-initial'); // Запись элементов в переменные
                let count_down_min = $('.options-timer-set-min-initial'); // ..........
                let count_down_hrs = $('.options-timer-set-hours-initial'); // ..........

                if(+count_down_sec.text() < 11 && +count_down_sec.text() != 0) {
                    count_down_sec.text('0' + (+count_down_sec.text() - 1));
                } else {
                    count_down_sec.text(+count_down_sec.text() - 1); // Уменьшение значения секунд на 1
                }
                
                // Ряд проверок для правильного отсчета и отображения ЧЧ:ММ:СС
                if(+count_down_sec.text() == 0 && +count_down_min.text() == 0 && +count_down_hrs.text() == 0) {
                    clearInterval(count_down);
                    t_start_btn.prop('disabled', false);
                    t_pause_btn.prop('disabled', true);
                    t_reset_btn.prop('disabled', true);
                    $('.options-timer-set-hours').on('click', () => chooseTime(timer_set_hrs, timer_set_hrs_item, 21, 24)); // Добавление обработчиков событий на блоки установки ЧЧ:ММ:СС
                    $('.options-timer-set-min').on('click', () => chooseTime(timer_set_min, timer_set_min_item, 57, 60)); // ..........
                    $('.options-timer-set-sec').on('click', () => chooseTime(timer_set_sec, timer_set_sec_item, 57, 60)); // ..........
                    $('.options-timer-message').fadeIn();
                    $('.options-timer-message').fadeOut(3000);
                } 
                if(+count_down_sec.text() < 0 && (+count_down_min.text() != 0 || +count_down_hrs.text() != 0)) {
                    count_down_sec.text('59');
                    if(+count_down_min.text() < 11 && +count_down_min.text() != 0) {
                        count_down_min.text('0' + (+count_down_min.text() - 1));
                    } else {
                        count_down_min.text(+count_down_min.text() - 1);
                    }               
                }
                if((+count_down_sec.text() == 0 && +count_down_min.text() < 0) && +count_down_hrs.text() != 0) {
                    count_down_min.text('59');
                    if(+count_down_hrs.text() < 11 && +count_down_hrs.text() != 0) {
                        count_down_hrs.text('0' + (+count_down_hrs.text() - 1));
                    } else {
                        count_down_hrs.text(+count_down_hrs.text() - 1);
                    }     
                }
                if(+count_down_min.text() < 0) {
                    count_down_min.text('59');
                    if(+count_down_hrs.text() < 11 && +count_down_hrs.text() != 0) {
                        count_down_hrs.text('0' + (+count_down_hrs.text() - 1));
                    } else {
                        count_down_hrs.text(+count_down_hrs.text() - 1);
                    }  
                }   
            }, 1000)
        }
    })

    // Кнопка ПАУЗА таймера
    t_pause_btn.on('click', function() {
        clearInterval(count_down); // Удаление интервала

        $(this).prop('disabled', true); // ЭТА кнопка - неактивна
        t_start_btn.prop('disabled', false); // Кнопка СТАРТ - активна
    })

    // Кнопка СБРОС таймера
    t_reset_btn.on('click', function() {
        clearInterval(count_down); // Удаление интервала

        $(this).prop('disabled', true); // ЭТА кнопка - неактивна
        t_start_btn.prop('disabled', false); // Кнопка СТАРТ - активна
        t_pause_btn.prop('disabled', true); // Кнопка ПАУЗА - неактивна

        $('.options-timer-set-sec-initial').text('00'); // Установка начального текста
        $('.options-timer-set-min-initial').text('00'); // ..........
        $('.options-timer-set-hours-initial').text('00'); // ..........

        $('.options-timer-set-hours').on('click', () => chooseTime(timer_set_hrs, timer_set_hrs_item, 21, 24)); // Добавление обработчиков событий на блоки установки ЧЧ:ММ:СС
        $('.options-timer-set-min').on('click', () => chooseTime(timer_set_min, timer_set_min_item, 57, 60)); // ..........
        $('.options-timer-set-sec').on('click', () => chooseTime(timer_set_sec, timer_set_sec_item, 57, 60)); // ..........
    })

    timer_set_hrs.addEventListener('mousewheel', (e) => scrollTime(timer_set_hrs_item, e, 23, 24));
    timer_set_min.addEventListener('mousewheel', (e) => scrollTime(timer_set_min_item, e, 59, 60));
    timer_set_sec.addEventListener('mousewheel', (e) => scrollTime(timer_set_sec_item, e, 59, 60));
    $('.options-timer-set-hours').on('click', () => chooseTime(timer_set_hrs, timer_set_hrs_item, 22, 24));
    $('.options-timer-set-min').on('click', () => chooseTime(timer_set_min, timer_set_min_item, 58, 60));
    $('.options-timer-set-sec').on('click', () => chooseTime(timer_set_sec, timer_set_sec_item, 58, 60));     
})
