import { ApiDocsBlock } from '../../../../types/configTypes'
import linkOptions from './link-options'
import { tableData, columns } from './table-options'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export const codeForCodeblock = '\'<div>Code string</div>\''
export const codeForListBlock = `
<ul>
    <li> Value of the list item 1 </li>
    <li> Value of the list item 2 </li>
</ul>`
export const linkOptionsBlock = `options = {
  preText: 'prefix with **markdown** text',
  afterText: 'suffix',
}`
export const tableDataBlock = `
columns = [
  'col1',
  { title: 'col2', type: 'strong' },
  { title: 'col3', type: 'markdown' },
  { title: 'col4', type: 'code' },
]

tableData = [
  ['d1C1', 'd1C2', '[d1C3](https://en.wikipedia.org/wiki/Markdown)[[target=_blank]]', 'd1C4'],
  ['d2C1', 'd2C2', '<mark>d2C3</mark>', 'd2C4'],
  ['d3C1', 'd3C2', '~~d3C3~~', 'd3C4'],
]`
export const apiOptions = `{
  version: '1.1',
  props: {
    value: {
      hidden: false,
      types: 'String',
      version: '1.0',
    },
  },
  events: {
    input: {
      types: '(value: boolean) => void',
      version: '1.0',
    },
  },
  methods: {
    hide: {
      types: '() => void',
      version: '1.0',
    },
  },
  slots: {
    default: {
      version: '1.0',
    },
  },
}`

export default [
  DocsHelper.title('documentationPage.title'),
  DocsHelper.paragraph('documentationPage.description'),

  DocsHelper.headline('documentationPage.introduction.title'),
  DocsHelper.paragraph('documentationPage.introduction.description'),

  DocsHelper.subtitle('documentationPage.pageConfig.title'),
  DocsHelper.paragraph('documentationPage.pageConfig.generate'),
  DocsHelper.paragraph('documentationPage.pageConfig.description'),

  DocsHelper.headline('documentationPage.blocktypes.title.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.title.text'),
  DocsHelper.code('DocsHelper.title(\'translation.path\')'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.title('documentationPage.blocktypes.title.example'),

  DocsHelper.headline('documentationPage.blocktypes.subtitle.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.subtitle.text'),
  DocsHelper.code('DocsHelper.subtitle(\'translation.path\')'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.subtitle('documentationPage.blocktypes.subtitle.example'),

  DocsHelper.headline('documentationPage.blocktypes.headline.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.headline.text'),
  DocsHelper.code('DocsHelper.headline(\'translation.path\')'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.headline('documentationPage.blocktypes.headline.example'),

  DocsHelper.headline('documentationPage.blocktypes.paragraph.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.paragraph.text'),
  DocsHelper.code('DocsHelper.paragraph(\'translation.path\')'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.paragraph('documentationPage.blocktypes.paragraph.example'),

  DocsHelper.headline('documentationPage.blocktypes.list.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.list.text'),
  DocsHelper.code('DocsHelper.list([\'translation1.path\', \'translation2.path\'])'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.list([
    'documentationPage.blocktypes.list.listExample1',
    'documentationPage.blocktypes.list.listExample2',
  ]),
  DocsHelper.paragraph('documentationPage.blocktypes.list.inCode'),
  DocsHelper.code(codeForListBlock),

  DocsHelper.headline('documentationPage.blocktypes.code.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.code.text'),
  DocsHelper.code(`DocsHelper.code(${codeForCodeblock})`),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.code(codeForCodeblock.slice(1, -1)),

  DocsHelper.headline('documentationPage.blocktypes.example.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.example.text'),
  DocsHelper.code('DocsHelper.example(\'va-component/ComponentName\')'),

  DocsHelper.headline('documentationPage.blocktypes.api.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.api.text'),
  DocsHelper.code('DocsHelper.api(VaComponent, apiOptions)'),

  DocsHelper.headline('documentationPage.apiOptionsTitle'),
  DocsHelper.paragraph('documentationPage.apiOptions.text'),
  DocsHelper.paragraph('documentationPage.apiOptions.hidden'),
  DocsHelper.paragraph('documentationPage.apiOptions.types'),
  DocsHelper.paragraph('documentationPage.apiOptions.version'),
  DocsHelper.code(apiOptions),

  DocsHelper.headline('documentationPage.blocktypes.table.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.table.text'),
  DocsHelper.code(tableDataBlock),
  DocsHelper.code('DocsHelper.table(columns, tableData)'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.table(columns, tableData),

  DocsHelper.headline('documentationPage.blocktypes.link.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.link.text'),
  DocsHelper.code(linkOptionsBlock),
  DocsHelper.code('DocsHelper.link(\'translation.path\', \'/contribution/documentation-page#translation-path\', options)'),
  DocsHelper.code('DocsHelper.link(\'translation.path\', \'/services/components-config\')'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.link('documentationPage.blocktypes.link.exampleWithOptions', '/contribution/documentation-page#translation-path', linkOptions),
  DocsHelper.link('documentationPage.blocktypes.link.example', '/services/components-config#scoped-config'),

  DocsHelper.headline('documentationPage.blocktypes.alert.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.alert.text'),
  DocsHelper.code('DocsHelper.alert(\'translation.path\', \'#ff0000\')'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.alert('documentationPage.blocktypes.alert.example', '#ff0000'),
] as ApiDocsBlock[]
