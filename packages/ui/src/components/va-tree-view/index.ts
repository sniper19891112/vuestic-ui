import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaTreeView from './VaTreeView.vue'

export type { TreeNode } from './types'

export const VaTreeView = withConfigTransport(_VaTreeView)
