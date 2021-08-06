import { Container } from 'inversify';
import BoundServiceReader from '../../BoundServiceReader';
import ServiceIdToConstantValueBinder from './ServiceIdToConstantValueBinder';
import {ServiceId} from "../../Example/ServiceId";
import {BindingAction} from "../../BindingAction";
import FileReader from "../../Example/Class/FileReader";

describe('Binding', () =>
{
    it('Successfully binds service ID to constant value', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToConstantValue,
            targetClass: FileReader,
            serviceId: ServiceId.FileReaderInterface,
            constantValueFactory: (): FileReader =>
            {
                const epConstructor = new FileReader();
                // @ts-ignore
                epConstructor.testValue = 'testValue';

                return epConstructor;
            },
        });

        const binder = new ServiceIdToConstantValueBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.get(ServiceId.FileReaderInterface);
        // @ts-ignore
        expect(firstRequestedService.testValue).toBe('testValue');
    });

    it('Named Scope', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToConstantValue,
            targetClass: FileReader,
            serviceId: ServiceId.FileReaderInterface,
            constantValueFactory: (): FileReader =>
            {
                const epConstructor = new FileReader();
                // @ts-ignore
                epConstructor.testValue = 'testValue';

                return epConstructor;
            },
            whenNamed: 'TestNamedScope',
        });

        const binder = new ServiceIdToConstantValueBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.getNamed(ServiceId.FileReaderInterface, 'TestNamedScope');
        // @ts-ignore
        expect(firstRequestedService.testValue).toBe('testValue');
    });
});
