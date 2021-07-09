import ServiceId from '../../../../../../application/_config/ServiceId';
import { BindingAction } from '../../BindingAction';
import HttpClient from '../../../../Client/HttpClient';
import BinderFactory from './BinderFactory';
import BoundServiceReader from '../../BoundServiceReader';
import ServiceIdToClassBinder from '../ServiceIdToClassBinder/ServiceIdToClassBinder';
import ClassToSingletonScopeBinder from '../ClassToSingletonScopeBinder/ClassToSingletonScopeBinder';
import ServiceIdToClassInSingletonScopeBinder from '../ServiceIdToClassInSingletonScopeBinder/ServiceIdToClassInSingletonScopeBinder';
import ServiceIdToConstantValueBinder from '../ServiceIdToConstantValueBinder/ServiceIdToConstantValueBinder';
import MultipleServiceIdsToConstantValueBinder from '../MultipleServiceIdsToConstantValueBinder/MultipleServiceIdsToConstantValueBinder';

describe('Returns Correct Binder', () =>
{
    it('Bind Class to Singleton Scope', () =>
    {
        const boundServiceConfig = {
            serviceId: ServiceId.HttpClientInterface,
            bindingAction: BindingAction.BindClassToSingletonScope,
            targetClass: HttpClient,
            global: true,
        };

        const factory = new BinderFactory();

        const binder = factory.resolveBinder(
            new BoundServiceReader(boundServiceConfig),
        );

        expect(binder).toBeInstanceOf(ClassToSingletonScopeBinder);
    });

    it('Bind Service Id To Class', () =>
    {
        const boundServiceConfig = {
            serviceId: ServiceId.HttpClientInterface,
            bindingAction: BindingAction.BindServiceIdToClass,
            targetClass: HttpClient,
            global: true,
        };

        const factory = new BinderFactory();

        const binder = factory.resolveBinder(
            new BoundServiceReader(boundServiceConfig),
        );

        expect(binder).toBeInstanceOf(ServiceIdToClassBinder);
    });

    it('Bind Service Id To Class in Singleton Scope', () =>
    {
        const boundServiceConfig = {
            serviceId: ServiceId.HttpClientInterface,
            bindingAction: BindingAction.BindServiceIdToClassInSingletonScope,
            targetClass: HttpClient,
            global: true,
        };

        const factory = new BinderFactory();

        const binder = factory.resolveBinder(
            new BoundServiceReader(boundServiceConfig),
        );

        expect(binder).toBeInstanceOf(ServiceIdToClassInSingletonScopeBinder);
    });

    it('Bind Service Id To Constant Value', () =>
    {
        const boundServiceConfig = {
            serviceId: ServiceId.HttpClientInterface,
            bindingAction: BindingAction.BindServiceIdToConstantValue,
            targetClass: HttpClient,
            global: true,
        };

        const factory = new BinderFactory();

        const binder = factory.resolveBinder(
            new BoundServiceReader(boundServiceConfig),
        );

        expect(binder).toBeInstanceOf(ServiceIdToConstantValueBinder);
    });

    it('Bind Multiple Service IDs To Constant Value', () =>
    {
        const boundServiceConfig = {
            serviceId: ServiceId.HttpClientInterface,
            bindingAction: BindingAction.BindMultipleServiceIdsToConstantValue,
            targetClass: HttpClient,
            global: true,
        };

        const factory = new BinderFactory();

        const binder = factory.resolveBinder(
            new BoundServiceReader(boundServiceConfig),
        );

        expect(binder).toBeInstanceOf(MultipleServiceIdsToConstantValueBinder);
    });

    it('Throws Exception when no binder exists for action', () =>
    {
        const boundServiceConfig = {
            serviceId: ServiceId.HttpClientInterface,
            bindingAction: 'Invalid',
            targetClass: HttpClient,
            global: true,
        };

        const factory = new BinderFactory();

        expect(() =>
        {
            factory.resolveBinder(
                // @ts-ignore
                new BoundServiceReader(boundServiceConfig),
            );
        }).toThrow('Container binding for Service Symbol(app.services.common.client.http_client_interface) has failed');
    });
});
