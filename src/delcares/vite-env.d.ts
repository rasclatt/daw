/**
 * @important   This file needs to sync with the Vite configuration file.
 *              This allows VS to recognize the environment variables and provide
 */
interface ImportMetaEnv {
    readonly VITE_USER_ENDPOINT: string;
    readonly VITE_CORP_EMAIL: string;
    readonly VITE_CORP_PHONE: string;
    readonly VITE_CORP_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}