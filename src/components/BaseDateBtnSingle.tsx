import Component from 'vue-class-component';
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import dayjs from 'dayjs';

enum DateKeyword {
    TODAY = '今天',
    YESTODAY = '昨天',
    FIRST_DAY_IN_MONTH = '本月初',
    THIS_MONTH = '本月',
    LAST_MONTH = '上月',
    RECENT_7_DAYS = '近 7 天',
    RECENT_15_DAYS = '近 15 天',
    RECENT_30_DAYS = '近 30 天',
}

@Component({
    model: {
        prop: 'date',
        event: 'change',
    }
})
export default class BaseDateBtnSingle extends Vue {

    // 日期
    @Prop({ required: true }) date!: number | number[];

    get isDateRange() {
      return Array.isArray(this.date);
    }

    // 一天时间
    private DAY_TIME = 3600 * 24 * 1000;

    get buttonArray() {
      const ret = [
        { day: DateKeyword.TODAY, label: '今天'},
        { day: DateKeyword.YESTODAY, label: '昨天'},
        { day: -1, label: '前一天'},
        { day: 1, label: '后一天'},
        !this.isDateRange ? { day: -7, label: '7 天前'} : { day: DateKeyword.RECENT_7_DAYS, label: '近 7 天'} ,
        !this.isDateRange ? { day: -15, label: '15 天前'} : { day: DateKeyword.RECENT_15_DAYS, label: '近 15 天'} ,
        !this.isDateRange ? { day: -30, label: '30 天前'} : { day: DateKeyword.RECENT_30_DAYS, label: '近 30 天'} ,
        !this.isDateRange ? { day: DateKeyword.FIRST_DAY_IN_MONTH, label: '本月初'} : { day: DateKeyword.THIS_MONTH, label: '本月'} ,
      ]
      if (this.isDateRange) {
        ret.push({ day: DateKeyword.LAST_MONTH, label: '上月'});
      }
      return ret;
    }

    render(h: any) {
      const { buttonArray, changeDate } = this;
      const ret = 
      <div style="display: inline-block;">
        <el-button-group>
          { buttonArray.map(item => {
            return <el-button onClick={ (a: PointerEvent) => { changeDate(item.day)} } style={ this.getStyle(item.day) }>{ item.label }</el-button>
          })}
        </el-button-group>
      </div>
      return ret;
    }

    // 切换日期
    changeDate(day: number | DateKeyword) {
      let ret: number | number[] | null = null;
      const { calcuteTargetDay, date } = this
      ret = calcuteTargetDay(date, day);
      this.$emit('change:date', ret);
      this.$emit('change', ret);
    }

    /**
     * 计算偏移后的日期
     * @param pre 之前的日期
     * @param day 偏移的日期
     */
    calcuteTargetDay(pre: number | number[], day: number | DateKeyword) {
      const { isDateRange, DAY_TIME, getRecentDays } = this;
      let ret = pre;
      const date = new Date();
      switch (day) {
        case DateKeyword.TODAY:
          const today = date.setHours(0,0,0,0);
          ret = isDateRange ? [today, today + DAY_TIME - 1] : today;
          break;
        case DateKeyword.YESTODAY:
          const yestoday = date.setHours(0,0,0,0) - DAY_TIME;
          ret = isDateRange ? [yestoday, yestoday + DAY_TIME - 1] : yestoday;
          break;
        case DateKeyword.FIRST_DAY_IN_MONTH:
          const firstDayInMonth = date;
          firstDayInMonth.setDate(1);
          const fdim = firstDayInMonth.setHours(0,0,0,0);
          ret = isDateRange ? [fdim, fdim + DAY_TIME - 1] : fdim;
          break;
        case DateKeyword.RECENT_7_DAYS:
          ret = getRecentDays(7);
          break;
        case DateKeyword.RECENT_15_DAYS:
          ret = getRecentDays(15);
          break;
        case DateKeyword.RECENT_30_DAYS:
          ret = getRecentDays(30);
          break;
        case DateKeyword.THIS_MONTH:
          const end = date.getTime();
          date.setDate(1);
          const start = date.setHours(0,0,0,0);
          ret = [start, end];
          break;
        case DateKeyword.LAST_MONTH:
          date.setHours(0,0,0,0);
          const lastMonthEnd = date.setDate(1) - 1;
          date.setDate(0);
          const lastMonthStart = date.setDate(1);
          ret = [lastMonthStart, lastMonthEnd];
          break;
        default:
          if (isDateRange) {
            ret = (ret as number[]).map(item => item + day * DAY_TIME);
          } else {
            ret = (ret as number) + day * DAY_TIME;
          }
          break;
      }
      // console.log(new Date(ret));
      return ret;
    }

    private getRecentDays(days: number) {
      const date = new Date();
      date.setTime(date.getTime() - days * this.DAY_TIME);
      const days_ago = date.setHours(0,0,0,0);
      const ret = [days_ago, days_ago + this.DAY_TIME - 1];
      return ret;
    }

    // 按钮颜色设置
    getStyle (day: number | DateKeyword) {
      const focus_style = 'color: #409eff; background: #ecf5ff; border-color: #b3d8ff;';
      const { date } = this;
      const ret = this.calcuteTargetDay(date, day);
      return this.isSameDay(date as number, ret as number) ? focus_style : '';
    }
    
    // 是否是同一天
    isSameDay(day1: number, day2: number) {
      return dayjs(day1).format('YYYY-MM-DD') === dayjs(day2).format('YYYY-MM-DD')
    }
}
