import { Signal, computed } from '@angular/core';
import {
    ValidationError,
    WithOptionalFieldTree,
} from '@angular/forms/signals';

export function createFieldAdapter(
    errors: Signal<readonly WithOptionalFieldTree<ValidationError>[]>,
    touched: Signal<boolean>,
    value: Signal<string>
) {
    const state = computed(() => ({
        errors: () =>
            errors().map(e => ({
                message: e.message,
            })),

        touched: () => touched(),

        value: () => value(),
    }));

    return () => state();
}