import AbstractValidator from '../AbstractValidator';

export default class GenericValidator extends AbstractValidator
{
    protected assertActionBindingConfigIsValid(): void
    {
        // Do nothing because this binding action needs no specific validation.
    }
}
