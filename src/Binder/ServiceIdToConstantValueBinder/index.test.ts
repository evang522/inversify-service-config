import { Container } from 'inversify';
import BoundServiceReader from '../../BoundServiceReader';
import EndpointConstructor from '../../../../EndpointConstructor';
import ServiceId from '../../../../../../application/_config/ServiceId';
import ServiceIdToConstantValueBinder from './ServiceIdToConstantValueBinder';

describe('Binding', () =>
{
    it('Successfully binds service ID to constant value', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindServiceIdToConstantValue',
            targetClass: EndpointConstructor,
            serviceId: ServiceId.EndpointConstructorInterface,
            constantValueFactory: (): EndpointConstructor =>
            {
                const epConstructor = new EndpointConstructor();
                // @ts-ignore
                epConstructor.testValue = 'testValue';

                return epConstructor;
            },
        });

        const binder = new ServiceIdToConstantValueBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.get(ServiceId.EndpointConstructorInterface);
        // @ts-ignore
        expect(firstRequestedService.testValue).toBe('testValue');
    });

    it('Named Scope', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindServiceIdToConstantValue',
            targetClass: EndpointConstructor,
            serviceId: ServiceId.EndpointConstructorInterface,
            constantValueFactory: (): EndpointConstructor =>
            {
                const epConstructor = new EndpointConstructor();
                // @ts-ignore
                epConstructor.testValue = 'testValue';

                return epConstructor;
            },
            whenNamed: 'TestNamedScope',
        });

        const binder = new ServiceIdToConstantValueBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.getNamed(ServiceId.EndpointConstructorInterface, 'TestNamedScope');
        // @ts-ignore
        expect(firstRequestedService.testValue).toBe('testValue');
    });
});
