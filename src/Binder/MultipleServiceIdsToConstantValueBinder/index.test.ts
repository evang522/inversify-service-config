import { Container } from 'inversify';
import BoundServiceReader from '../../BoundServiceReader';
import MultipleServiceIdsToConstantValueBinder from './MultipleServiceIdsToConstantValueBinder';
import {BindingAction} from "../../BindingAction";
import FileReader from "../../Example/Class/FileReader";
import {ServiceId} from "../../Example/ServiceId";

describe('Binding', () =>
{
    it('Successfully performs binding for multiple service IDs to constant value', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindMultipleServiceIdsToConstantValue,
            serviceId: [
                FileReader,
                ServiceId.FileReaderInterface,
            ],
            constantValueFactory: (): FileReader =>
            {
                const epConstructor = new FileReader();
                // @ts-ignore
                epConstructor.testValue = 'testValue';

                return epConstructor;
            },
        });

        const binder = new MultipleServiceIdsToConstantValueBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.get(FileReader);
        const secondRequestedService = container.get(ServiceId.FileReaderInterface);

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
            bindingAction: BindingAction.BindMultipleServiceIdsToConstantValue,
            serviceId: [
                FileReader, ServiceId.FileReaderInterface,
            ],
            constantValueFactory: (): FileReader =>
            {
                const epConstructor = new FileReader();
                // @ts-ignore
                epConstructor.testValue = 'testValue';

                return epConstructor;
            },
            whenNamed: 'test1234',
        });

        const binder = new MultipleServiceIdsToConstantValueBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.getNamed(FileReader, 'test1234');
        const secondRequestedService = container.getNamed(FileReader, 'test1234');

        expect(firstRequestedService).toBe(secondRequestedService);
        // @ts-ignore
        expect(firstRequestedService.testValue).toBe('testValue');
        // @ts-ignore
        expect(secondRequestedService.testValue).toBe('testValue');
    });
});
