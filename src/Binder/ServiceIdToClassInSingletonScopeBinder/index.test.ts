import { Container } from 'inversify';
import BoundServiceReader from '../../BoundServiceReader';
import ServiceIdToClassInSingletonScopeBinder from './ServiceIdToClassInSingletonScopeBinder';
import {BindingAction} from "../../BindingAction";
import FileReader from "../../Example/Class/FileReader";
import {ServiceId} from "../../Example/ServiceId";

describe('Binding', () =>
{
    it('Successfully Binds service ID to class in singleton scope', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClassInSingletonScope,
            targetClass: FileReader,
            serviceId: ServiceId.FileReaderInterface,
        });

        const binder = new ServiceIdToClassInSingletonScopeBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.get(ServiceId.FileReaderInterface);
        const secondRequestedService = container.get(ServiceId.FileReaderInterface);

        expect(firstRequestedService).toBeInstanceOf(FileReader);

        expect(firstRequestedService).toBe(secondRequestedService);
    });

    it('With named Scope', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClassInSingletonScope,
            targetClass: FileReader,
            serviceId: ServiceId.FileReaderInterface,
            whenNamed: 'NamedScope',
        });

        const binder = new ServiceIdToClassInSingletonScopeBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.getNamed(ServiceId.FileReaderInterface, 'NamedScope');
        const secondRequestedService = container.getNamed(ServiceId.FileReaderInterface, 'NamedScope');

        expect(firstRequestedService).toBeInstanceOf(FileReader);

        expect(firstRequestedService).toBe(secondRequestedService);
    });
});
