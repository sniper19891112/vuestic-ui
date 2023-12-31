import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaTabs from './VaTabs.vue'

export { VaTab } from './components/VaTab'

export const VaTabs = withConfigTransport(_VaTabs)

export * from './types'
