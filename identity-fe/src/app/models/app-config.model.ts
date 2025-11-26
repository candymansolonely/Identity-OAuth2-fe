export interface IAppConfig {
  api: {
    baseUrl: string,
  };
  projectTitle: string;
  favicon: string;
}

export const INIT_APP_CONFIG_MODEL: IAppConfig = {
  api: {
    baseUrl: '',
  },
  projectTitle: '',
  favicon: '',
};
