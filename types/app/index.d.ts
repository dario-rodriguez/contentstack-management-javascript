import { ContentstackCollection } from "../contentstackCollection";
import { AnyProperty, SystemFields } from "../utility/fields";
import { Creatable, SystemFunction } from "../utility/operations";
import { Installation, Installations } from "./installation";

export interface App extends SystemFields, SystemFunction<App> {
    fetchOAuth(param?: AnyProperty): Promise<AppOAuth>
    updateOAuth(data: { config: AppOAuth, param?: AnyProperty }): Promise<AppOAuth>
    install(data: {targetUid: string, targetType: AppTarget}): Promise<Installation>
    installation(): Installations
    installation(uid: string): Installation
}

export interface Apps extends Creatable<App, AppData> {
    findAll(param?: AnyProperty): Promise<ContentstackCollection<App>>
}

export interface AppData extends AnyProperty {
    name: string
    description?: string
    icon?: string
    target_type: AppTarget
    ui_location?: UILocation 
    webhook?: AppWebhook | AppWebhookChannel
    oauth?: AppOAuth
}

export interface AppOAuth extends AnyProperty {
    redirect_uri?: string
    app_token_config?: TokenConfig
    user_token_config?: TokenConfig
}

export interface TokenConfig extends AnyProperty {
    enabled: boolean
    scopes: string[]
}

export interface AppWebhookChannel extends AppWebhook {
    target_url: string
    channels: string[]
}

export interface AppWebhook extends AnyProperty {
    signed: boolean
    name: string
    enabled?: boolean
    app_lifecycle_enabled?: boolean
    retry_policy?: string
}

export interface UILocation extends AnyProperty {
    signed: boolean
    base_url?: string
    locations: Location[]
}

export interface Location extends AnyProperty {
    type: string
    meta: LocationMeta[]
}

export interface LocationMeta extends AnyProperty {
    signed: boolean
    path: string
    name: string
    data_type?: string
}

export type AppTarget =
  | 'stack'
  | 'organization'