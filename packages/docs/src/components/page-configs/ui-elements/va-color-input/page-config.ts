import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaColorInput from 'vuestic-ui/src/components/va-color-input/VaColorInput.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'colorInput.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorInput.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'colorInput.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorInput.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-color-input/Default',
  },
  // {
  //   type: BlockType.HEADLINE,
  //   translationString: 'colorInput.examples.selected.title',
  // },
  // {
  //   type: BlockType.PARAGRAPH,
  //   translationString: 'colorInput.examples.selected.text',
  // },
  // {
  //   type: BlockType.EXAMPLE,
  //   component: 'va-color-input/Selected',
  // },
  {
    type: BlockType.HEADLINE,
    translationString: 'colorInput.examples.disabled.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorInput.examples.disabled.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-color-input/Disabled',
  },
  // {
  //   type: BlockType.HEADLINE,
  //   translationString: 'colorInput.examples.advanced.title',
  // },
  // {
  //   type: BlockType.PARAGRAPH,
  //   translationString: 'colorInput.examples.advanced.text',
  // },
  // {
  //   type: BlockType.EXAMPLE,
  //   component: 'va-color-input/Advanced',
  // },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'colorInput.api.colorInput',
  },

  DocsHelper.api(VaColorInput, apiOptions),
]

export default config
