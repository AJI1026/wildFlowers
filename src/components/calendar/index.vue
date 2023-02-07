<template>
  <div class="calendar-container">
    <div class="calendar light">
      <!--日历头部-->
      <div class="calendar-header">
        <span class="month-picker" id="month-picker" @click="monthList">December</span>
        <div class="year-picker">
          <span class="year-change" id="prev-year">
            <pre><</pre>
          </span>
          <span id="year">2022</span>
          <span class="year-change" id="next-year">
            <pre>></pre>
          </span>
        </div>
      </div>
      <!--日历主干-->
      <div class="calendar-body">
        <!--星期-->
        <div class="calendar-week-day">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wen</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <!--几号-->
        <div class="calendar-days">
          <div>
            1
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
        </div>
      </div>
      <!--日历底部-->
      <div class="calendar-footer">
        <div class="toggle">
          <span>Dark Mode</span>
          <div class="dark-mode-switch" @click="changeMode">
            <div class="dark-mode-switch-ident"></div>
          </div>
        </div>
      </div>
      <div class="month-list"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'calendar-container',
  data() {
    return {
      month_names: '',
      month_picker: '',
      curr_year: '',
      curr_month: '',
      calendar: '',
      month_list: ''
    }
  },
  methods: {
    // DARK MODE TOGGLE
    changeMode() {
      document.querySelector('.calendar').classList.toggle('dark')
      document.querySelector('.calendar').classList.toggle('light')
      document.querySelector('.section2').classList.toggle('dark')
      document.querySelector('.section2').classList.toggle('light')
    },
    // CHECK LEAP YEAR
    isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0 && year % 400 !==0)
      || (year % 100 === 0 && year % 400 === 0)
    },
    getFebDays(year) {
      return this.isLeapYear(year) ? 29 : 28
    },
    // GENERATE CALENDAR
    generateCalendar(month, year) {
      let calendar_days = document.querySelector('.calendar-days')
      calendar_days.innerHTML = ''
      let calendar_header_year = document.querySelector('#year')

      let days_of_month = [31, this.getFebDays(year),31,30,31,30,31,31,30,31,30,31]

      let currDate = new Date()
      this.month_picker.innerHTML = this.month_names[month]
      calendar_header_year.innerHTML = year

      // get first day of month
      let first_day = new Date(month, year, 1)

      for(let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if(i >= first_day.getDay()) {
          day.classList.add('calendar-day-hover')
          day.innerHTML = `${i - first_day.getDay() + 1}`
          day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
          if(i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
            day.classList.add('curr-date')
          }
        }
        calendar_days.appendChild(day)
      }
    },
    // 月份选择
    monthList() {
      this.month_list.classList.add('show')
    },
    // run
    run() {
      this.month_names.forEach((e,index) => {
        let month = document.createElement('div')
        month.innerHTML = `<div>${e}</div>`
        month.onclick = () => {
          this.month_list.classList.remove('show')
          this.curr_month.value = index
          this.generateCalendar(this.curr_month.value, this.curr_year.value)
        }
        this.month_list.appendChild(month)
      })
      this.generateCalendar(this.curr_month.value, this.curr_year.value)

      // 年份选择
      document.querySelector('#prev-year').onclick = () => {
        --this.curr_year.value
        this.generateCalendar(this.curr_month.value, this.curr_year.value)
      }

      document.querySelector('#next-year').onclick = () => {
        ++this.curr_year.value
        this.generateCalendar(this.curr_month.value, this.curr_year.value)
      }
    }
  },
  created() {
    this.$nextTick(function () {
      let currDate = new Date()
      this.calendar = document.querySelector('.calendar')
      this.month_list = this.calendar.querySelector('.month-list')
      this.month_names = ['January','February','March','April','May', 'June','July','August','September','October','November','December']
      this.month_picker = document.querySelector('.month-picker')
      this.curr_month = {value: currDate.getMonth()}
      this.curr_year = {value: currDate.getFullYear()}
    })
    this.$nextTick(this.run)
    // this.$nextTick(this.monthList)
  },
}
</script>

<style lang="css">
  .calendar-container {
    z-index: 1;
    display: grid;
    place-items: center;
    position: absolute;
    font-family: var(--font-family);
  }
  .calendar {
    width: max-content;
    height: max-content;
    position: absolute;
    left: 30px;
    top: 30px;
    background-color: var(--bg-main);
    border-radius: 30px;
    padding: 20px;
    overflow: hidden;
  }
  .light .calendar {
    box-shadow: var(--shadow);
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 25px;
    font-weight: 600;
    color: var(--color-text);
    padding: 10px;
  }

  .calendar-body {
    padding: 10px;
  }

  .calendar-week-day {
    height: 50px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-weight: 600;
  }

  .calendar-week-day div {
    display: grid;
    place-items: center;
    color: var(--bg-second);
  }
  .calendar-days {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    color: var(--color-text);
  }

  .calendar-days div {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    position: relative;
    cursor: pointer;
    animation: to-top 1s forwards;
    /* border-radius: 50%; */
  }

  .calendar-days div span {
    position: absolute;
  }

  .calendar-days div:hover span {
    transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
  }

  .calendar-days div span:nth-child(1),
  .calendar-days div span:nth-child(3) {
    width: 2px;
    height: 0;
    background-color: var(--color-text);
  }

  .calendar-days div:hover span:nth-child(1),
  .calendar-days div:hover span:nth-child(3) {
    height: 100%;
  }

  .calendar-days div span:nth-child(1) {
    bottom: 0;
    left: 0;
  }

  .calendar-days div span:nth-child(3) {
    top: 0;
    right: 0;
  }

  .calendar-days div span:nth-child(2),
  .calendar-days div span:nth-child(4) {
    width: 0;
    height: 2px;
    background-color: var(--color-text);
  }

  .calendar-days div:hover span:nth-child(2),
  .calendar-days div:hover span:nth-child(4) {
    width: 100%;
  }

  .calendar-days div span:nth-child(2) {
    top: 0;
    left: 0;
  }

  .calendar-days div span:nth-child(4) {
    bottom: 0;
    right: 0;
  }

  .calendar-days div:hover span:nth-child(2) {
    transition-delay: 0.2s;
  }

  .calendar-days div:hover span:nth-child(3) {
    transition-delay: 0.4s;
  }

  .calendar-days div:hover span:nth-child(4) {
    transition-delay: 0.6s;
  }

  .calendar-days div.curr-date,
  .calendar-days div.curr-date:hover {
    background-color: var(--color-date);
    color: var(--white);
    border-radius: 50%;
  }

  .calendar-days div.curr-date span {
    display: none;
  }

  .month-picker {
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
  }

  .month-picker:hover {
    background-color: var(--color-hover);
  }

  .year-picker {
    display: flex;
    align-items: center;
  }

  .year-change {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin: 0 10px;
    cursor: pointer;
  }

  .year-change:hover {
    background-color: var(--color-hover);
  }

  .calendar-footer {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .toggle {
    display: flex;
  }

  .toggle span {
    margin-right: 10px;
    color: var(--color-text);
  }

  .dark-mode-switch {
    position: relative;
    width: 48px;
    height: 25px;
    border-radius: 14px;
    background-color: var(--bg-second);
    cursor: pointer;
  }

  .dark-mode-switch-ident {
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background-color: var(--bg-main);
    position: absolute;
    top: 2px;
    left: 2px;
    transition: left 0.2s ease-in-out;
  }

  .dark .dark-mode-switch .dark-mode-switch-ident {
    top: 2px;
    left: calc(2px + 50%);
  }

  .month-list {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--bg-main);
    grid-template-columns: repeat(3, auto);
    gap: 5px;
    display: grid;
    transform: scale(1.5);
    visibility: hidden;
    pointer-events: none;
  }

  .month-list.show {
    transform: scale(1);
    visibility: visible;
    pointer-events: visible;
    place-items: center;
    transition: all 0.2s ease-in-out;
  }

  .month-list > div {
    display: grid;
    place-items: center;
  }

  .month-list > div > div {
    width: 100%;
    padding: 5px 20px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    color: var(--color-text);
  }

  .month-list > div > div:hover {
    background-color: var(--color-hover);
  }

  @keyframes to-top {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }


</style>
