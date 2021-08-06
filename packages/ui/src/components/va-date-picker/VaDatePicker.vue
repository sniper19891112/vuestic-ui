<template>
  <div class="va-date-picker" :class="{ 'va-date-picker__without-week-days': hideWeekDays }" :style="colorsStyle">
    <va-date-picker-header
      v-bind="headerProps"
      v-model:view="syncView"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="bind">
        <slot :name="name" v-bind="bind" />
      </template>
    </va-date-picker-header>

    <div class="va-date-picker__picker-wrapper">
      <va-day-picker
        v-if="syncView.type === 'day'"
        v-bind="dayPickerProps"
        v-model="valueComputed"
        ref="currentPicker"
        :view="syncView"
        @hover:day="(value) => $emit('hover:day', value)"
        @click:day="(value) => $emit('click:day', value)"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="bind">
          <slot :name="name" v-bind="bind" />
        </template>
      </va-day-picker>

      <va-month-picker
        v-if="syncView.type === 'month'"
        v-bind="monthPickerProps"
        ref="currentPicker"
        :view="syncView"
        :model-value="valueComputed"
        @update:model-value="onMonthModelValueUpdate"
        @hover:month="(value) => $emit('hover:month', value)"
        @click:month="onMonthClick"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="bind">
          <slot :name="name" v-bind="bind" />
        </template>
      </va-month-picker>

      <va-year-picker
        v-if="syncView.type === 'year'"
        v-bind="yearPickerProps"
        ref="currentPicker"
        :view="syncView"
        :model-value="valueComputed"
        @hover:year="(value) => $emit('hover:year', value)"
        @update:model-value="onYearModelValueUpdate"
        @click:year="onYearClick"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="bind">
          <slot :name="name" v-bind="bind" />
        </template>
      </va-year-picker>
    </div>
  </div>
</template>

<script lang="ts">
import { ComponentOptions, defineComponent, nextTick, PropType, ref, watch } from 'vue'
import { useStateful, statefulComponentOptions } from '../../mixins/StatefulMixin/cStatefulMixin'
import { useColors } from '../../services/color-config/color-config'

import { VaDatePickerModelValue, VaDatePickerType, VaDatePickerView } from './types/types'
import { filterComponentProps, extractComponentProps, extractComponentEmits } from './utils/child-props'
import { useView } from './hooks/view'

import VaDayPicker from './components/VaDayPicker/VaDayPicker.vue'
import VaDatePickerHeader from './components/VaDatePickerHeader/VaDatePickerHeader.vue'
import VaMonthPicker from './components/VaMonthPicker/VaMonthPicker.vue'
import VaYearPicker from './components/VaYearPicker/VaYearPicker.vue'

const DEFAULT_MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DEFAULT_WEEKDAY_NAMES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

export default defineComponent({
  name: 'VaDatePicker',

  components: { VaDayPicker, VaDatePickerHeader, VaMonthPicker, VaYearPicker },

  props: {
    ...statefulComponentOptions.props,
    ...extractComponentProps(VaDayPicker),
    ...extractComponentProps(VaMonthPicker),
    ...extractComponentProps(VaYearPicker),
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue | undefined> },
    monthNames: { type: Array as PropType<string[]>, required: false, default: DEFAULT_MONTH_NAMES },
    weekdayNames: { type: Array as PropType<string[]>, required: false, default: DEFAULT_WEEKDAY_NAMES },
    view: { type: Object as PropType<VaDatePickerView> },
    type: { type: String as PropType<VaDatePickerType>, default: 'day' },

    // Colors
    color: { type: String, default: undefined },
    weekendsColor: { type: String, default: undefined },
  },

  emits: [
    ...statefulComponentOptions.emits,
    ...extractComponentEmits(VaDatePickerHeader),
    ...extractComponentEmits(VaYearPicker),
    ...extractComponentEmits(VaDayPicker),
    ...extractComponentEmits(VaMonthPicker),
  ],

  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit, undefined)

    const { syncView } = useView(props, emit, { type: props.type })

    const onMonthClick = (date: Date) => {
      emit('click:month', date)
      const year = date.getFullYear()
      const month = date.getMonth()
      if (props.type !== 'month') {
        syncView.value = { type: 'day', year, month }
      }
    }

    const onMonthModelValueUpdate = (modelValue: VaDatePickerModelValue) => {
      // Do not update model value if we just want to change view
      if (props.type === 'month') { valueComputed.value = modelValue }
    }

    const onYearClick = (date : Date) => {
      emit('click:year', date)

      const year = date.getFullYear()

      if (props.type !== 'year') {
        syncView.value = { type: 'month', year, month: syncView.value.month }
      }
    }

    const onYearModelValueUpdate = (modelValue: VaDatePickerModelValue) => {
      // Do not update model value if we just want to change view
      if (props.type === 'year') { valueComputed.value = modelValue }
    }

    const { colorsToCSSVariable } = useColors()

    const colorsStyle = colorsToCSSVariable({
      color: props.color,
      'weekends-color': props.weekendsColor,
    }, 'va-date-picker')

    const currentPicker = ref<ComponentOptions | null>(null)

    watch(syncView, (newValue, prevValue) => {
      // Don't focus new picker if user does not change type
      if (newValue.type === prevValue.type) { return }

      nextTick(() => {
        if (currentPicker.value) { currentPicker.value.$el.focus() }
      })
    })

    return {
      dayPickerProps: filterComponentProps(props, extractComponentProps(VaDayPicker)),
      headerProps: filterComponentProps(props, extractComponentProps(VaDatePickerHeader)),
      monthPickerProps: filterComponentProps(props, extractComponentProps(VaMonthPicker)),
      yearPickerProps: filterComponentProps(props, extractComponentProps(VaYearPicker)),

      syncView,

      valueComputed,
      onMonthClick,
      onMonthModelValueUpdate,

      onYearClick,
      onYearModelValueUpdate,

      colorsStyle,
      currentPicker,
    }
  },
})
</script>

<style lang="scss">
@import './_variables.scss';

.va-date-picker {
  --va-date-picker-content-height: calc(var(--va-date-picker-cell-size) * 7 + var(--va-date-picker-cell-gap) * 6);

  width: calc(var(--va-date-picker-cell-size) * 7 + var(--va-date-picker-cell-gap) * 6);

  &__picker-wrapper {
    height: var(--va-date-picker-content-height);
  }

  &__without-week-days {
    --va-date-picker-content-height: calc(var(--va-date-picker-cell-size) * 6 + var(--va-date-picker-cell-gap) * 6);
  }

  &_mobile {
    .va-day-picker,
    .va-month-picker,
    .va-year-picker {
      height: 100%;
    }
  }
}

.va-date-picker-header {
  padding-bottom: 0.25rem;
}
</style>