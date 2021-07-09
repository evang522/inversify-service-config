import { Container } from 'inversify';
import BoundServiceReader from '../../BoundServiceReader';
import EndpointConstructor from '../../../../EndpointConstructor';
import ServiceId from '../../../../../../application/_config/ServiceId';
import ServiceIdToClassInSingletonScopeBinder from './ServiceIdToClassInSingletonScopeBinder';

describe('Binding', () =>
{
    it('Successfully Binds service ID to class in singleton scope', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindServiceIdToClassInSingletonScope',
            targetClass: EndpointConstructor,
            serviceId: ServiceId.EndpointConstructorInterface,
        });

        const binder = new ServiceIdToClassInSingletonScopeBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.get(ServiceId.EndpointConstructorInterface);
        const secondRequestedService = container.get(ServiceId.EndpointConstructorInterface);

        expect(firstRequestedService).toBeInstanceOf(EndpointConstructor);

        expect(firstRequestedService).toBe(secondRequestedService);
    });

    it('With named Scope', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindServiceIdToClassInSingletonScope',
            targetClass: EndpointConstructor,
            serviceId: ServiceId.EndpointConstructorInterface,
            whenNamed: 'NamedScope',
        });

        const binder = new ServiceIdToClassInSingletonScopeBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.getNamed(ServiceId.EndpointConstructorInterface, 'NamedScope');
        const secondRequestedService = container.getNamed(ServiceId.EndpointConstructorInterface, 'NamedScope');

        expect(firstRequestedService).toBeInstanceOf(EndpointConstructor);

        expect(firstRequestedService).toBe(secondRequestedService);
    });
});
