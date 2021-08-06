# Inversify Container Bindings via Config
[![npm version](https://badge.fury.io/js/inversify-service-config.svg)](https://badge.fury.io/js/inversify-service-config)

The purpose of this project is to provide a ts-file config based approach to registering container services with
inversify instead of needing to do so via procedural code.

❌ For example, the *typical* way of registering services ❌:
```ts
// registerServices.ts

if (process.env.NODE_ENV === 'prod')
{
    container.bind(interfaces.HttpClient).to(CurlHttpClient);
    container.bind(interfaces.SenderInterface).to(EmailClient)
}
elseif(process.env.NODE_ENV === 'dev')
{
    container.bind(interfaces.HttpClient).to(MockCurlHttpClient);
    container.bind(interfaces.SenderInterface).to(MockEmailClient)
}

// This tends to get messy pretty quickly.

```

✅ With this package's configuration ✅:

```ts
// serviceConfig.ts

export const infrastructureConfig: BoundServiceStructure[] = [
    {
        bindingAction: BindingAction.BindServiceIdToClass,
        serviceId: interfaces.HttpClient,
        targetClass: CurlHttpClient,
        global: true,
    },
    {
        bindingAction: BindingAction.BindServiceIdToClass,
        serviceId: interfaces.SenderInterface,
        targetClass: MockEmailClient,
        environments: ['dev', 'test'],
    },
    {
        bindingAction: BindingAction.BindServiceIdToClass,
        serviceId: interfaces.SenderInterface,
        targetClass: EmailClient,
        environments: ['staging', 'prod', 'qa'],
    },
];
```


## Quick Start

```ts
import { BindingManager } from 'inversify-service-config';
import container from './inversify.config.ts';  // however you decide to initialise your inversify container.


const manager = new BindingManager(
    infrastructureConfig,
    new Environment<'development'|'production'>('development'),
    container,
);

// Running 'processServicesConfig' will bind all services according to your configuration.

manager.processServicesConfig();

// Done. 
```


> The package comes with validation and will throw proper and helpful exceptions when a passed configuration does not make sense or contradicts another. 
