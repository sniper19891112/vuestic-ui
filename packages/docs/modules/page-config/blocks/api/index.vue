<script setup lang="ts">
import { DefineComponent, PropType } from 'vue';
import merge from 'lodash/merge'
import camelCase from 'lodash/camelCase'
import ApiTable from './components/ApiDocs.vue';
import { MarkdownView } from '../shared/markdown'
import {
  CssVariables,
  ManualApiOptions,
  VisualOptions,
  APIDescriptionOptions,
  APIDescriptionType,
  ComponentMeta,
} from './types';
import commonDescription from "./common-description";

const props = defineProps({
  componentName: {
    type: String,
    required: true,
  },
  component: {
    type: Object as PropType<DefineComponent>,
    required: true,
  },
  manual: {
    type: Object as PropType<ManualApiOptions>,
    default: () => {},
  },
  cssVariables: {
    type: Array as PropType<CssVariables>,
    required: true,
  },
  meta: {
    type: Object as PropType<ComponentMeta>,
    required: true
  },
  visualOptions: {
    type: Object as PropType<VisualOptions>,
    default: () => ({}),
  },
  descriptionOptions: {
    type: Object as PropType<APIDescriptionOptions>,
    required: true,
  }
})

const withManual = computed(() => {
  return merge(props.meta, props.manual as ManualApiOptions)
})

function getDescription (type: APIDescriptionType, name: string): string {
  const nameCamel = camelCase(name)

  return props.descriptionOptions?.[type]?.[nameCamel]
    ?? (commonDescription[type] as Record<string, string>)[nameCamel]
    ?? '';
}

const cleanDefaultValue = (o: Record<string, any> | string) => {
  if (!o) { return o }
  const str: string = o.toString()

  const defaultFnStartRegex = /function _default\(\) \{\n\s*return\s*/

  if (defaultFnStartRegex.test(str)) {
    const defaultFnEndRegex = /\s*}$/

    return str
      .replace(defaultFnStartRegex, '')
      .replace(defaultFnEndRegex, '')
  }

  return str
}

const propsOptions = computed(() => {
  if (!withManual.value.props) { return [] }

  return Object
    .entries(withManual.value.props)
    .filter(([name, prop]) => !prop.hidden)
    .map(([name, prop]) => ({
      name: name,
      description: getDescription('props', name),
      types: '`' + prop.types + '`',
      default: cleanDefaultValue(prop.default) ?? '',
    }))
    .sort((a, b) => (a.name || '').localeCompare(b.name))
  }
)

const eventsOptions = computed(() => Object
  .entries(withManual.value.events || {})
  .filter(([key, prop]) => !prop.hidden)
  .map(([key, prop]) => ({
    name: key,
    description: prop.types && typeof prop.types === 'string'
      ? {
          text: getDescription('events', key) + '. ' + getDescription('events', 'eventArgument'),
          code: prop.types
        }
      : getDescription('events', key)
  }))
  .sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
)

const slotsOptions = computed(() => Object
  .entries(withManual.value.slots || {})
  .map(([key, prop]) => ({
    name: key,
    description: prop.types
      ? {
          text: getDescription('slots', key) + '. ' + getDescription('slots', 'scopeAvailable'),
          code: prop.types
        }
      : getDescription('slots', key)
  }))
  .sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
)

const methodsOptions = computed(() => Object
  .entries(withManual.value.methods || {})
  .map(([key, prop]) => ({
    name: key,
    description: getDescription('methods', key),
  }))
  .sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
)

const cssVariablesOptions = computed(() => props.cssVariables.map(([name, value, comment]) => ({
  name, value, /* comment */ // TODO: Enable comment when everywhere is used correct comments
  // TODO: Or add tanslations after i18n splitted
})))

const isValueIsDefaultTranslation = (value: String) => {
  return value.startsWith('`"$t:');
}
</script>

<template>
  <va-content>
    <ApiTable
      v-if="propsOptions.length > 0 && !visualOptions.hideProps"
      :title="visualOptions.hidePropsTitle ? '' : 'Props'"
      :columns="['Name', 'Description', 'Types', 'Default']"
      :data="propsOptions"
    >
      <template #name="{ value, row }">
        <strong>{{ value }}</strong>
        <va-badge
          v-if="row.required"
          class="ml-2"
          text="required"
          color="primary"
        />
      </template>
      <template
        #default="{value}"
      >
        <div class="flex items-center gap-1">
          <markdown-view :content="value" />        
          <va-popover
            placement="right"
            trigger="click"
          >
            <va-icon
              v-if="isValueIsDefaultTranslation(value)"
              name="info"
              color="secondary"
            />
            <template #body>
              <nuxt-link to="/services/i18n#translations">
                Read more
              </nuxt-link>
            </template>
          </va-popover>
        </div> 
      </template>
    </ApiTable>

    <ApiTable
      v-if="eventsOptions.length > 0 && !visualOptions.hideEvents"
      :title="visualOptions.hideEventsTitle ? '' : 'Events'"
      :columns="['Name', 'Description']"
      :data="eventsOptions"
    />

    <ApiTable
      v-if="slotsOptions.length > 0 && !visualOptions.hideSlots"
      :title="visualOptions.hideEventsTitle ? '' : 'Slots'"
      :columns="['Name', 'Description']"
      :data="slotsOptions"
    />

    <ApiTable
      v-if="methodsOptions.length > 0 && !visualOptions.hideMethods"
      :title="visualOptions.hideEventsTitle ? '' : 'Methods'"
      :columns="['Name', 'Description']"
      :data="methodsOptions"
    />

    <ApiTable
      v-if="cssVariablesOptions.length > 0 && !visualOptions.hideCssVariables"
      :title="visualOptions.hideEventsTitle ? '' : 'Css Variables'"
      :columns="['Name', 'Default Value']"
      :data="cssVariablesOptions"
    >
      <template #name="{ value }">
        <strong class="va-text-code">{{ value }}</strong>
      </template>
      <template #value="{ value }">
        <span class="va-text-code va-text-secondary">{{ value }}</span>
      </template>
    </ApiTable>
  </va-content>
</template>
