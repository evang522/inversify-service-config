import { Container } from 'inversify';
import BoundServiceReader from '../../BoundServiceReader';
import EndpointConstructor from '../../../../EndpointConstructor';
import MultipleServiceIdsToConstantValueBinder from './MultipleServiceIdsToConstantValueBinder';
import ServiceId from '../../../../../../application/_config/ServiceId';

describe('Binding', () =>
{
    it('Successfully performs binding for multiple service IDs to constant value', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindMultipleServiceIdsToConstantValue',
            serviceId: [
                EndpointConstructor, ServiceId.EndpointConstructorInterface,
            ],
            constantValueFactory: (): EndpointConstructor =>
            {
                const epConstructor = new EndpointConstructor();
                // @ts-ignore
                epConstructor.testValue = 'testValue';

                return epConstructor;
            },
        });

        const binder = new MultipleServiceIdsToConstantValueBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.get(EndpointConstructor);
        const secondRequestedService = container.get(ServiceId.EndpointConstructorInterface);

        expect(firstRequestedService).toBe(secondRequestedService);
        // @ts-ignore
        expect(firstRequestedService.testValue).toBe('testValue');
        // @ts-ignore
        expect(secondRequestedService.testValue).toBe('testValue');
    });

    it('Correctly assigns named parameters when provided', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindMultipleServiceIdsToConstantValue',
            serviceId: [
                EndpointConstructor, ServiceId.EndpointConstructorInterface,
            ],
            constantValueFactory: (): EndpointConstructor =>
            {
                const epConstructor = new EndpointConstructor();
                // @ts-ignore
                epConstructor.testValue = 'testValue';

                return epConstructor;
            },
            whenNamed: 'test1234',
        });

        const binder = new MultipleServiceIdsToConstantValueBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.getNamed(EndpointConstructor, 'test1234');
        const secondRequestedService = container.getNamed(EndpointConstructor, 'test1234');

        expect(firstRequestedService).toBe(secondRequestedService);
        // @ts-ignore
        expect(firstRequestedService.testValue).toBe('testValue');
        // @ts-ignore
        expect(secondRequestedService.testValue).toBe('testValue');
    });
});
