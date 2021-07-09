import { Container } from 'inversify';
import BoundServiceReader from '../../BoundServiceReader';
import EndpointConstructor from '../../../../EndpointConstructor';
import ServiceIdToClassBinder from './ServiceIdToClassBinder';
import ServiceId from '../../../../../../application/_config/ServiceId';
import { BindingAction } from '../../BindingAction';

describe('Binding', () =>
{
    it('Successfully binds service ID to class in transient scope', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClass,
            targetClass: EndpointConstructor,
            serviceId: ServiceId.EndpointConstructorInterface,
        });

        const binder = new ServiceIdToClassBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.get(ServiceId.EndpointConstructorInterface);
        const secondRequestedService = container.get(ServiceId.EndpointConstructorInterface);

        expect(firstRequestedService).toBeInstanceOf(EndpointConstructor);

        expect(firstRequestedService).not.toBe(secondRequestedService);
    });

    it('Correctly binds named scope', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClass,
            targetClass: EndpointConstructor,
            serviceId: ServiceId.EndpointConstructorInterface,
            whenNamed: 'NamedScope',
        });

        const binder = new ServiceIdToClassBinder(serviceReader, container);

        binder.bindService();

        const instance = container.getNamed(ServiceId.EndpointConstructorInterface, 'NamedScope');
        expect(instance).toBeInstanceOf(EndpointConstructor);
    });
});
