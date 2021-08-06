import { Container } from 'inversify';
import BoundServiceReader from '../../BoundServiceReader';
import ClassToSingletonScopeBinder from './ClassToSingletonScopeBinder';
import FileReader from "../../Example/Class/FileReader";
import {BindingAction} from "../../BindingAction";

describe('Binding', () =>
{
    it('Successfully binds class to self as singleton', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindClassToSingletonScope,
            serviceId: FileReader,
        });

        const binder = new ClassToSingletonScopeBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.get(FileReader);
        const secondRequestedService = container.get(FileReader);

        expect(firstRequestedService).toBe(secondRequestedService);
    });

    it('Binds to name parameter if provided', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindClassToSingletonScope,
            serviceId: FileReader,
            whenNamed: 'test123',
        });

        const binder = new ClassToSingletonScopeBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.getNamed(FileReader, 'test123');
        const secondRequestedService = container.getNamed(FileReader, 'test123');

        expect(firstRequestedService).toBe(secondRequestedService);
    });
});
