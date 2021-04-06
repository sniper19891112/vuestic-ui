import './components/vuestic-sass/resources/_css-variables.scss'

export { VuesticPlugin } from './components/vuestic-plugin'
export { useColors, getColor, getColors, setColors } from './services/color-config/color-config'
export { useGlobalConfig, getGlobalConfig, setGlobalConfig } from './services/GlobalConfigPlugin'
export {
  useIcons,
  createIconsConfig,
  VuesticIconFonts,
  VuesticIconAliases,
} from './services/icon-config/icon-config'

export type { GlobalConfig, GlobalConfigUpdater } from './services/GlobalConfigPlugin'
export type { ComponentConfig } from './services/component-config/component-config'
export type { IconsConfig, IconConfig } from './services/icon-config/icon-config'
export type { ColorConfig } from './services/color-config/color-config'
