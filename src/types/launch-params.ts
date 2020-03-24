// Source:
// eslint-disable-next-line max-len
// https://vk.com/dev/vk_apps_docs3?f=6.%2B%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%2B%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA%D0%B0
type Language = 'ru' | 'uk' | 'be' | 'kz' | 'en' | 'es' | 'fi' | 'de' | 'it';

type Ref =
  | 'catalog'
  | 'catalog_popular'
  | 'catalog_new'
  | 'featuring_discover'
  | 'featuring_menu'
  | 'featuring_new'
  | 'group_menu'
  | 'left_nav'
  | 'quick_search'
  | 'other'
  | string;

type ViewerGroupRole = 'none' | 'member' | 'moder' | 'editor' | 'admin';

type Platform =
  | 'mobile_android'
  | 'mobile_iphone'
  | 'mobile_web'
  | 'desktop_web'
  | 'mobile_android_messenger'
  | 'mobile_iphone_messenger';

// Параметры запуска приложения которые приходят извне
export interface LaunchParams {
  accessTokenSettings: string[];
  appId: number;
  areNotificationsEnabled: boolean;
  isAppUser: boolean;
  isFavorite: boolean;
  language: Language;
  platform: Platform;
  ref: Ref;
  userId: number;
  groupId: number | null;
  viewerGroupRole: ViewerGroupRole | null;
  sign: string;
}
