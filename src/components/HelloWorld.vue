<template>
  <div class="hello">
    <el-button @click="changeAdType()">模拟列变化</el-button>
    <el-button @click="changeDataValue()">模拟数据变化</el-button>
    <!-- <tooltip-column tooltip="123456" label="标题">5566</tooltip-column> -->
    <el-table v-lazy-load="tableData" :data="tableData" @sort-change="sortByServer">
      <base-money-column label="新增成本" prop="new_cost" width="80" />
      <num-col label="数字" prop="date" width="100" sortable="custom" />
      <money-column label="当前花费" prop="cost" width="100" :fen="100" dec="2" sortable="custom">
        <template #default="{ row }">
          {{ row.cost }}
        </template>
      </money-column>
      <tooltip-column label="tooltip" tooltip="tooltip" prop="date" width="90" />
      <!-- <el-table-column label="日期" prop="date" width="165" fixed>
        <template #default="{row}">
              <div v-if="row.date">
                <span>{{ row.date }}</span>
              </div>
              <div v-else>汇总</div>
        </template>
      </el-table-column>
      <el-table-column label="支出" prop="cost" width="120" fixed sortable="custom" />
      <el-table-column label="新增成本" prop="new_cost" width="80" fixed />
      <el-table-column label="活跃成本" prop="active_cost" width="80" fixed />
      <el-table-column label="新增首日收入成分" align="center">
          <el-table-column label="充值收入" prop="pay_new_user_income" width="120" :fen="100" />
          <el-table-column label="广告收入" prop="ad_new_user_income" width="120" :fen="100" />
          <el-table-column label="收入占比" prop="ad_new_user_income" width="80" align="right" tooltip="充值收入 : 广告收入">
            <template #default="{row}">
              <div v-if="row.pay_new_user_income + row.ad_new_user_income">
                <span>{{ (row.pay_new_user_income / (row.pay_new_user_income + row.ad_new_user_income)) *  100  }}</span> :
                <span>{{ (row.ad_new_user_income / (row.pay_new_user_income + row.ad_new_user_income)) *  100  }}</span>
              </div>
              <p v-else class="tar">--</p>
            </template>
          </el-table-column>
      </el-table-column> -->
      <template v-for="(label, key) in ad_types">
          <tooltip-column
            :label="label"
            :key="key"
            tooltip="修改好了"
            :prop="key"
            align="center">
            <el-table-column label="IPU" width="60" :prop="`${key}_IPU`" :sortable="false" align="right" :tooltip="`IPU = ${ad_types[key]}播放次数 / 活跃用户`">
              <template #default="{row}">
                <p v-if="row.active_users && row[`adtype_${key}_display_pv`] !== undefined">
                  {{ row[`adtype_${key}_display_pv`] / row.active_users }}
                </p>
                <p v-else>--</p>
              </template>
            </el-table-column>
            <tooltip-column label="CPM" width="70" :prop="`${key}_CPM`" :sortable="false" align="right" :tooltip="`CPM = ${ad_types[key]}收入 / 曝光数 * 1000`">
              <template #default="{row}">
                <p v-if="row[`adtype_${key}_display_pv`]">
                  <span>￥</span>
                  <span>{{ row[`adtype_${key}_income`] / 100 / row[`adtype_${key}_display_pv`] * 1000 }}</span>
                </p>
                <p v-else>--</p>
              </template>
            </tooltip-column>
          </tooltip-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseMoneyColumn from './BaseMoneyColumn.vue';
import MoneyColumn from './MoneyColumn.vue';
import NumCol from './NumCol.vue';
import TooltipColumn from './TooltipColumn';

@Component({
  components: { TooltipColumn, NumCol, MoneyColumn, BaseMoneyColumn }
})
export default class HelloWorld extends Vue {
  public count = 0;

  public tableData = [
    {
        "active_users": 5029699,
        "ad_followup_income_total": 15075136.034499997,
        "ad_income": 22038618.964300003,
        "ad_new_user_income": 8681308.823800001,
        "adtype_banner_display_pv": 10,
        "adtype_banner_income": 1713735.9959,
        "adtype_box_display_pv": 20,
        "adtype_box_income": 24627,
        "adtype_building_block_display_pv": 30,
        "adtype_building_block_income": 4355,
        "adtype_general_video_display_pv": 9603256,
        "adtype_general_video_income": 19245653.969200004,
        "adtype_interstitial_display_pv": 40,
        "adtype_interstitial_income": 1018977.9992000002,
        "adtype_loading_display_pv": 50,
        "adtype_loading_income": 31269,
        "adtype_reward_video_display_pv": 9603256,
        "adtype_reward_video_income": 19245653.969200004,
        "cost": 1749034,
        "followup_income_total": 15075136.034499997,
        "income": 22038618.964300003,
        "new_user_income": 8681308.823800001,
        "new_users": 2245788,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "date": "汇总",
        "new_cost": "0.008",
        "active_cost": "0.003",
        "new_arpu": "0.067",
        "active_arpu": "0.044",
        "new_user_income_cost": "496.35"
    },
    {
        "active_users": 1438652,
        "ad_followup_income_total": 0,
        "ad_income": 0,
        "ad_new_user_income": 0,
        "date": 20210801,
        "followup_income_total": 0,
        "income": 0,
        "new_user_income": 0,
        "new_users": 705182,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "--",
        "active_cost": "--",
        "new_arpu": "--",
        "active_arpu": "--",
        "new_user_income_cost": "--"
    },
    {
        "active_users": 130609,
        "ad_followup_income_total": 0,
        "ad_income": 0,
        "ad_new_user_income": 0,
        "date": 20210802,
        "followup_income_total": 0,
        "income": 0,
        "new_user_income": 0,
        "new_users": 58784,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "--",
        "active_cost": "--",
        "new_arpu": "--",
        "active_arpu": "--",
        "new_user_income_cost": "--"
    },
    {
        "active_users": 233930,
        "ad_followup_income_total": 885560.9304,
        "ad_income": 1161639.9984,
        "ad_new_user_income": 396577.3694,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 108109.9988,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 1856,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 289,
        "adtype_general_video_display_pv": 700616,
        "adtype_general_video_income": 993877,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 56012.999599999996,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 1495,
        "adtype_reward_video_display_pv": 700616,
        "adtype_reward_video_income": 993877,
        "date": 20210820,
        "followup_income_total": 885560.9304,
        "income": 1161639.9984,
        "new_user_income": 396577.3694,
        "new_users": 110738,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "--",
        "active_cost": "--",
        "new_arpu": "0.080",
        "active_arpu": "0.050",
        "new_user_income_cost": "--"
    },
    {
        "active_users": 299647,
        "ad_followup_income_total": 2163376.8582000006,
        "ad_income": 2311979.9942,
        "ad_new_user_income": 1255305.2138,
        "adtype_banner_display_pv": 10,
        "adtype_banner_income": 113126.99979999999,
        "adtype_box_display_pv": 20,
        "adtype_box_income": 1750,
        "adtype_building_block_display_pv": 30,
        "adtype_building_block_income": 342,
        "adtype_general_video_display_pv": 798005,
        "adtype_general_video_income": 2096135.9926,
        "adtype_interstitial_display_pv": 40,
        "adtype_interstitial_income": 98756.0018,
        "adtype_loading_display_pv": 50,
        "adtype_loading_income": 1869,
        "adtype_reward_video_display_pv": 798005,
        "adtype_reward_video_income": 2096135.9926,
        "cost": 155200,
        "date": 20210821,
        "followup_income_total": 2163376.8582000006,
        "income": 2311979.9942,
        "new_user_income": 1255305.2138,
        "new_users": 162728,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.010",
        "active_cost": "0.005",
        "new_arpu": "0.133",
        "active_arpu": "0.077",
        "new_user_income_cost": "808.83"
    },
    {
        "active_users": 244088,
        "ad_followup_income_total": 1174638.2131999999,
        "ad_income": 1836941.9984,
        "ad_new_user_income": 689399.4237,
        "adtype_banner_display_pv": 40,
        "adtype_banner_income": 101749.9999,
        "adtype_box_display_pv": 20,
        "adtype_box_income": 1678,
        "adtype_building_block_display_pv": 30,
        "adtype_building_block_income": 295,
        "adtype_general_video_display_pv": 716908,
        "adtype_general_video_income": 1659091.9979,
        "adtype_interstitial_display_pv": 40,
        "adtype_interstitial_income": 72134.0006,
        "adtype_loading_display_pv": 50,
        "adtype_loading_income": 1993,
        "adtype_reward_video_display_pv": 716908,
        "adtype_reward_video_income": 1659091.9979,
        "cost": 52661,
        "date": 20210822,
        "followup_income_total": 1174638.2131999999,
        "income": 1836941.9984,
        "new_user_income": 689399.4237,
        "new_users": 113999,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.005",
        "active_cost": "0.002",
        "new_arpu": "0.103",
        "active_arpu": "0.075",
        "new_user_income_cost": "1309.13"
    },
    {
        "active_users": 213901,
        "ad_followup_income_total": 1051604.602,
        "ad_income": 1468830.9913,
        "ad_new_user_income": 560958.7307,
        "adtype_banner_display_pv": 10,
        "adtype_banner_income": 92420.0004,
        "adtype_box_display_pv": 20,
        "adtype_box_income": 1901,
        "adtype_building_block_display_pv": 30,
        "adtype_building_block_income": 351,
        "adtype_general_video_display_pv": 635843,
        "adtype_general_video_income": 1310348.992,
        "adtype_interstitial_display_pv": 40,
        "adtype_interstitial_income": 61959.9989,
        "adtype_loading_display_pv": 50,
        "adtype_loading_income": 1850,
        "adtype_reward_video_display_pv": 635843,
        "adtype_reward_video_income": 1310348.992,
        "cost": 35806,
        "date": 20210823,
        "followup_income_total": 1051604.602,
        "income": 1468830.9913,
        "new_user_income": 560958.7307,
        "new_users": 92323,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.004",
        "active_cost": "0.002",
        "new_arpu": "0.114",
        "active_arpu": "0.069",
        "new_user_income_cost": "1566.66"
    },
    {
        "active_users": 212779,
        "ad_followup_income_total": 1087328.9705000003,
        "ad_income": 1435575.0036,
        "ad_new_user_income": 575628.4663,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 84269.00030000001,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 1851,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 277,
        "adtype_general_video_display_pv": 608826,
        "adtype_general_video_income": 1289267.0045,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 57511.9988,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 2399,
        "adtype_reward_video_display_pv": 608826,
        "adtype_reward_video_income": 1289267.0045,
        "cost": 52839,
        "date": 20210824,
        "followup_income_total": 1087328.9705000003,
        "income": 1435575.0036,
        "new_user_income": 575628.4663,
        "new_users": 93562,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.006",
        "active_cost": "0.002",
        "new_arpu": "0.116",
        "active_arpu": "0.067",
        "new_user_income_cost": "1089.40"
    },
    {
        "active_users": 218101,
        "ad_followup_income_total": 1165249.2174,
        "ad_income": 1617463.0041,
        "ad_new_user_income": 666073.2287,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 102244.0004,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 2022,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 343,
        "adtype_general_video_display_pv": 632886,
        "adtype_general_video_income": 1444142.0061,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 65413.9976,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 3298,
        "adtype_reward_video_display_pv": 632886,
        "adtype_reward_video_income": 1444142.0061,
        "cost": 56336,
        "date": 20210825,
        "followup_income_total": 1165249.2174,
        "income": 1617463.0041,
        "new_user_income": 666073.2287,
        "new_users": 98673,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.006",
        "active_cost": "0.003",
        "new_arpu": "0.118",
        "active_arpu": "0.074",
        "new_user_income_cost": "1182.32"
    },
    {
        "active_users": 193779,
        "ad_followup_income_total": 952300.7153999999,
        "ad_income": 1467553.997,
        "ad_new_user_income": 562815.2744,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 100666.9991,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 1937,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 211,
        "adtype_general_video_display_pv": 606827,
        "adtype_general_video_income": 1305781.9985,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 56618.9994,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 2338,
        "adtype_reward_video_display_pv": 606827,
        "adtype_reward_video_income": 1305781.9985,
        "cost": 43927,
        "date": 20210826,
        "followup_income_total": 952300.7153999999,
        "income": 1467553.997,
        "new_user_income": 562815.2744,
        "new_users": 76399,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.006",
        "active_cost": "0.002",
        "new_arpu": "0.125",
        "active_arpu": "0.076",
        "new_user_income_cost": "1281.25"
    },
    {
        "active_users": 195350,
        "ad_followup_income_total": 831375.8040999998,
        "ad_income": 1357458.9957,
        "ad_new_user_income": 488170.3868,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 115088.99859999999,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 1679,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 311,
        "adtype_general_video_display_pv": 601550,
        "adtype_general_video_income": 1175487.997,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 62367.0001,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 2525,
        "adtype_reward_video_display_pv": 601550,
        "adtype_reward_video_income": 1175487.997,
        "cost": 21043,
        "date": 20210827,
        "followup_income_total": 831375.8040999998,
        "income": 1357458.9957,
        "new_user_income": 488170.3868,
        "new_users": 78518,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.003",
        "active_cost": "0.001",
        "new_arpu": "0.106",
        "active_arpu": "0.069",
        "new_user_income_cost": "2319.87"
    },
    {
        "active_users": 221617,
        "ad_followup_income_total": 771166.9888999999,
        "ad_income": 1168634.0074,
        "ad_new_user_income": 440605.9776,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 114200.00110000001,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 1497,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 288,
        "adtype_general_video_display_pv": 659022,
        "adtype_general_video_income": 985530.0065,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 65250.9998,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 1868,
        "adtype_reward_video_display_pv": 659022,
        "adtype_reward_video_income": 985530.0065,
        "cost": 14478,
        "date": 20210828,
        "followup_income_total": 771166.9888999999,
        "income": 1168634.0074,
        "new_user_income": 440605.9776,
        "new_users": 94837,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.002",
        "active_cost": "0.001",
        "new_arpu": "0.081",
        "active_arpu": "0.053",
        "new_user_income_cost": "3043.28"
    },
    {
        "active_users": 207776,
        "ad_followup_income_total": 600675.0033000001,
        "ad_income": 1033724.9874,
        "ad_new_user_income": 352667.7781,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 105777.9998,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 1394,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 196,
        "adtype_general_video_display_pv": 625461,
        "adtype_general_video_income": 876047.9872,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 48751.0004,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 1558,
        "adtype_reward_video_display_pv": 625461,
        "adtype_reward_video_income": 876047.9872,
        "cost": 4739,
        "date": 20210829,
        "followup_income_total": 600675.0033000001,
        "income": 1033724.9874,
        "new_user_income": 352667.7781,
        "new_users": 81589,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.001",
        "active_cost": "0.000",
        "new_arpu": "0.074",
        "active_arpu": "0.050",
        "new_user_income_cost": "7441.82"
    },
    {
        "active_users": 206647,
        "ad_followup_income_total": 684335.1277,
        "ad_income": 985942.9966,
        "ad_new_user_income": 390040.1262,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 95395.9982,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 1211,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 186,
        "adtype_general_video_display_pv": 576962,
        "adtype_general_video_income": 840864.9983,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 46553.000100000005,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 1732,
        "adtype_reward_video_display_pv": 576962,
        "adtype_reward_video_income": 840864.9983,
        "cost": 9509,
        "date": 20210830,
        "followup_income_total": 684335.1277,
        "income": 985942.9966,
        "new_user_income": 390040.1262,
        "new_users": 96606,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.001",
        "active_cost": "0.000",
        "new_arpu": "0.071",
        "active_arpu": "0.048",
        "new_user_income_cost": "4101.80"
    },
    {
        "active_users": 187986,
        "ad_followup_income_total": 691071.8769,
        "ad_income": 1043698.9962,
        "ad_new_user_income": 408096.7756,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 72341.9984,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 946,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 195,
        "adtype_general_video_display_pv": 431159,
        "adtype_general_video_income": 922692.9978,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 46431,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 1092,
        "adtype_reward_video_display_pv": 431159,
        "adtype_reward_video_income": 922692.9978,
        "cost": 26885,
        "date": 20210831,
        "followup_income_total": 691071.8769,
        "income": 1043698.9962,
        "new_user_income": 408096.7756,
        "new_users": 80993,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.003",
        "active_cost": "0.001",
        "new_arpu": "0.085",
        "active_arpu": "0.056",
        "new_user_income_cost": "1517.93"
    },
    {
        "active_users": 112108,
        "ad_followup_income_total": 466765.87489999994,
        "ad_income": 716582.0043,
        "ad_new_user_income": 253668.5014,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 54702.001299999996,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 706,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 145,
        "adtype_general_video_display_pv": 203110,
        "adtype_general_video_income": 620438.0027,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 38951.0003,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 1640,
        "adtype_reward_video_display_pv": 203110,
        "adtype_reward_video_income": 620438.0027,
        "cost": 2726,
        "date": 20210901,
        "followup_income_total": 466765.87489999994,
        "income": 716582.0043,
        "new_user_income": 253668.5014,
        "new_users": 38661,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.001",
        "active_cost": "0.000",
        "new_arpu": "0.121",
        "active_arpu": "0.064",
        "new_user_income_cost": "9305.52"
    },
    {
        "active_users": 87279,
        "ad_followup_income_total": 335109.9136000001,
        "ad_income": 621004.9996,
        "ad_new_user_income": 191983.5444,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 53173.0001,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 753,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 112,
        "adtype_general_video_display_pv": 174297,
        "adtype_general_video_income": 534171.9984,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 31455.001099999998,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 1340,
        "adtype_reward_video_display_pv": 174297,
        "adtype_reward_video_income": 534171.9984,
        "cost": 2768,
        "date": 20210902,
        "followup_income_total": 335109.9136000001,
        "income": 621004.9996,
        "new_user_income": 191983.5444,
        "new_users": 25972,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.001",
        "active_cost": "0.000",
        "new_arpu": "0.129",
        "active_arpu": "0.071",
        "new_user_income_cost": "6935.82"
    },
    {
        "active_users": 105676,
        "ad_followup_income_total": 399132.7997,
        "ad_income": 630189.0022,
        "ad_new_user_income": 219170.2973,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 50093.9992,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 839,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 196,
        "adtype_general_video_display_pv": 213805,
        "adtype_general_video_income": 541525.0018,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 36591.0012,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 944,
        "adtype_reward_video_display_pv": 213805,
        "adtype_reward_video_income": 541525.0018,
        "cost": 1835,
        "date": 20210903,
        "followup_income_total": 399132.7997,
        "income": 630189.0022,
        "new_user_income": 219170.2973,
        "new_users": 35846,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.001",
        "active_cost": "0.000",
        "new_arpu": "0.111",
        "active_arpu": "0.060",
        "new_user_income_cost": "11943.89"
    },
    {
        "active_users": 168734,
        "ad_followup_income_total": 626620.4515,
        "ad_income": 859073.9925,
        "ad_new_user_income": 354249.5838,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 84711.99949999999,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 1388,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 401,
        "adtype_general_video_display_pv": 444116,
        "adtype_general_video_income": 714918.9937,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 56195.999299999996,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 1458,
        "adtype_reward_video_display_pv": 444116,
        "adtype_reward_video_income": 714918.9937,
        "cost": 703,
        "date": 20210904,
        "followup_income_total": 626620.4515,
        "income": 859073.9925,
        "new_user_income": 354249.5838,
        "new_users": 63633,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.000",
        "active_cost": "0.000",
        "new_arpu": "0.098",
        "active_arpu": "0.051",
        "new_user_income_cost": "50391.12"
    },
    {
        "active_users": 172779,
        "ad_followup_income_total": 647021.2661,
        "ad_income": 1015250.0011,
        "ad_new_user_income": 434367.5885,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 134601.0001,
        "adtype_box_display_pv": 0,
        "adtype_box_income": 1219,
        "adtype_building_block_display_pv": 0,
        "adtype_building_block_income": 217,
        "adtype_general_video_display_pv": 514324,
        "adtype_general_video_income": 817968.0003,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 59375.000700000004,
        "adtype_loading_display_pv": 0,
        "adtype_loading_income": 1870,
        "adtype_reward_video_display_pv": 514324,
        "adtype_reward_video_income": 817968.0003,
        "cost": 795,
        "date": 20210905,
        "followup_income_total": 647021.2661,
        "income": 1015250.0011,
        "new_user_income": 434367.5885,
        "new_users": 72824,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.000",
        "active_cost": "0.000",
        "new_arpu": "0.089",
        "active_arpu": "0.059",
        "new_user_income_cost": "54637.43"
    },
    {
        "active_users": 82526,
        "ad_followup_income_total": 329182.846,
        "ad_income": 657700.9962,
        "ad_new_user_income": 228911.9835,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 60405.0002,
        "adtype_general_video_display_pv": 210466,
        "adtype_general_video_income": 569394.9954,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 27901.0006,
        "adtype_reward_video_display_pv": 210466,
        "adtype_reward_video_income": 569394.9954,
        "cost": 3533,
        "date": 20210906,
        "followup_income_total": 329182.846,
        "income": 657700.9962,
        "new_user_income": 228911.9835,
        "new_users": 30470,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.001",
        "active_cost": "0.000",
        "new_arpu": "0.108",
        "active_arpu": "0.080",
        "new_user_income_cost": "6479.25"
    },
    {
        "active_users": 79256,
        "ad_followup_income_total": 212618.5747,
        "ad_income": 649372.9981,
        "ad_new_user_income": 212618.5736,
        "adtype_banner_display_pv": 0,
        "adtype_banner_income": 70657.0007,
        "adtype_general_video_display_pv": 209481,
        "adtype_general_video_income": 547967.9985,
        "adtype_interstitial_display_pv": 0,
        "adtype_interstitial_income": 30747.9989,
        "adtype_reward_video_display_pv": 209481,
        "adtype_reward_video_income": 547967.9985,
        "cost": 1263251,
        "date": 20210907,
        "followup_income_total": 212618.5747,
        "income": 649372.9981,
        "new_user_income": 212618.5736,
        "new_users": 27488,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "0.460",
        "active_cost": "0.159",
        "new_arpu": "0.077",
        "active_arpu": "0.082",
        "new_user_income_cost": "16.83"
    },
    {
        "active_users": 16479,
        "ad_followup_income_total": 0,
        "ad_income": 0,
        "ad_new_user_income": 0,
        "adtype_general_video_display_pv": 39592,
        "adtype_general_video_income": 0,
        "adtype_reward_video_display_pv": 39592,
        "adtype_reward_video_income": 0,
        "cost": 0,
        "date": 20210908,
        "followup_income_total": 0,
        "income": 0,
        "new_user_income": 0,
        "new_users": 5963,
        "pay_followup_income_total": 0,
        "pay_income": 0,
        "pay_new_user_income": 0,
        "new_cost": "--",
        "active_cost": "--",
        "new_arpu": "--",
        "active_arpu": "--",
        "new_user_income_cost": "--"
    }
  ]

  public ad_types: any = {
    "reward_video": "激励视频",
    "banner": "Banner",
    "interstitial": "插屏广告",
    "box": "盒子广告",
    "building_block": "积木广告",
    "loading": "loading 广告"
  }

  changeAdType() {
    this.count++;
    if (this.count % 4 === 0) {
      this.ad_types = {};
    } else if (this.count % 2 === 0) {
      this.ad_types = {
        "reward_video": "激励视频",
        "banner": "Banner",
        "interstitial": "插屏广告",
        "box": "盒子广告",
        "building_block": "积木广告",
        "loading": "loading 广告"
      }
    } else {
      this.ad_types = {
        "reward_video": "激励视频",
        "banner": "Banner",
        "interstitial": "插屏广告",
      }
    }
  }

  changeDataValue() {
    this.tableData.reverse();
  }

  sortByServer(column: any) {
    console.log(1)
    let order: string | null = null;
    if (column.order === 'ascending') {
      order = '';
    } else if (column.order === 'descending') {
      order = '-';
    }
    console.log('sort');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ad {
  background: red;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
::v-deep .el-button {
  padding: 10px !important;
}
</style>
