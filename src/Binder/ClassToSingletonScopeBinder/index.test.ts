import { Container } from 'inversify';
import BoundServiceReader from '../../BoundServiceReader';
import EndpointConstructor from '../../../../EndpointConstructor';
import ClassToSingletonScopeBinder from './ClassToSingletonScopeBinder';

describe('Binding', () =>
{
    it('Successfully binds class to self as singleton', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindClassToSingletonScope',
            serviceId: EndpointConstructor,
        });

        const binder = new ClassToSingletonScopeBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.get(EndpointConstructor);
        const secondRequestedService = container.get(EndpointConstructor);

        expect(firstRequestedService).toBe(secondRequestedService);
    });

    it('Binds to name parameter if provided', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindClassToSingletonScope',
            serviceId: EndpointConstructor,
            whenNamed: 'test123',
        });

        const binder = new ClassToSingletonScopeBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.getNamed(EndpointConstructor, 'test123');
        const secondRequestedService = container.getNamed(EndpointConstructor, 'test123');

        expect(firstRequestedService).toBe(secondRequestedService);
    });
});
