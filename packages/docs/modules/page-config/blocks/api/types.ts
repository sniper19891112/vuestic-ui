// This file is intended to collect high level types for ApiDocs component.
// These will be run through mapping step before they get to components
// as strings.

export type TranslationString = string
export type TranslationStringList = TranslationString[]
export type VersionString = string | '' // vuestic-ui version at which feature was first introduced

// Universal options for props, events, methods, slots.
export type ManualApiOptionsItem = {
  version?: VersionString;
  name?: string;

  /**
   * Used for custom translation string.
   *
   * @example props: { inputColor: 'api.VaInput.props.color' }
   */
  translation?: string;
}

export type ManualPropApiOptions = ManualApiOptionsItem & {
  hidden?: boolean; // Won't appear in documentation. Intended for internal usage props, such as icon and color configs.
  types?: string;
  default?: any;
  // add more here
}

export type ManualMethodApiOptions = ManualApiOptionsItem & {
  types: string;
}

export type ManualEventApiOptions = ManualApiOptionsItem & {
  types?: string;
  hidden?: boolean; // Won't appear in documentation. Intended for internal usage events.
  isDOMEvent?: boolean;
  // add more here
}

export type ManualSlotApiOptions = ManualApiOptionsItem & {
  types?: string;
  // add more here
}

// Assembly of things that we need in api docs,
// but can't derive in automated way.
export type ManualApiOptions = {
  version?: VersionString;
  props?: Record<string, ManualPropApiOptions>;
  methods?: Record<string, ManualMethodApiOptions>;
  events?: Record<string, ManualEventApiOptions>;
  slots?: Record<string, ManualSlotApiOptions>;
}

/** Name, Value, Comment */
export type CssVariables = [string, string, string | undefined][]

export type VisualOptions = {
  hideProps?: boolean
  hidePropsTitle?: boolean
  hideEvents?: boolean
  hideEventsTitle?: boolean
  hideMethods?: boolean
  hideMethodsTitle?: boolean
  hideSlots?: boolean
  hideSlotsTitle?: boolean
  hideCssVariables?: boolean
  hideCssVariablesTitle?: boolean
}

export type APIDescriptionType = 'props' | 'events' | 'slots' | 'methods';
export type APIDescriptionOptions = {
  [k in APIDescriptionType]?: Record<string, string>;
}

export type ComponentMeta = {
  props: Required<ManualPropApiOptions>[];
  events: Required<ManualEventApiOptions>[];
  methods: Required<ManualMethodApiOptions>[];
  slots: Required<ManualSlotApiOptions>[];
}