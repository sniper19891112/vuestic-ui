import { mixins, prop, Vue } from 'vue-class-component'
import { normalizeValue } from '../../../../services/utils'

class ProgressProps {
  modelValue = prop({ type: Number, default: 0 })
  color = prop({ type: String, default: 'primary' })
  // If 'indeterminate' is 'true' 'value' prop will be ignored.
  indeterminate = prop({ type: Boolean, default: false })
}

const ProgressPropsMixin = Vue.with(ProgressProps)

export class ProgressComponentMixin extends mixins(
  ProgressPropsMixin,
) {
  get normalizedValue (): number {
    return normalizeValue(this.modelValue)
  }
}
