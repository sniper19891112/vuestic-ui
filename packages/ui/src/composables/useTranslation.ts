import { computed } from 'vue'
import { useGlobalConfig } from '../composables'
import { I18nConfig } from '../services/i18n'
import { warn } from '../utils/console'

type Stringable = number | string | boolean | undefined

const applyI18nTemplate = (key: string, values?: Record<string, Stringable>) => {
  if (!values) { return key }

  Object.keys(values).forEach((valueKey) => {
    key = key.replace(`{${valueKey}}`, String(values[valueKey]))
  })
  return key
}

export const useTranslation = () => {
  const { globalConfig } = useGlobalConfig()

  const config = computed(() => globalConfig.value.i18n)

  return {
    /** Translate prop. Translate only if key has `$t:` prefix */
    tp: <Key extends string | undefined>(key: Key, values?: Record<string, Stringable>): string => {
      if (!key) { return '' }

      if (key.startsWith('$t:')) {
        key = (config.value[key.slice(3) as keyof I18nConfig] || key) as NonNullable<Key>
      }

      return (applyI18nTemplate(key, values) || key)
    },
    t (key: string, values?: Record<string, Stringable>) {
      const translated = config.value[key as keyof I18nConfig]
      if (!translated) {
        warn(`${key} not found in VuesticUI i18n config`)
        return key
      }
      return (applyI18nTemplate(translated, values) || key)
    },
  }
}
