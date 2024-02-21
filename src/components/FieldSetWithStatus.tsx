'use client';

import { LegacyRef } from 'react';
import { useFormStatus } from 'react-dom';
import Spinner from './Spinner';
import { clsx } from 'clsx/lite';
import { FieldSetType, AnnotatedTag } from '@/photo/form';
import TagInput from './TagInput';

export default function FieldSetWithStatus({
  id,
  label,
  note,
  error,
  value,
  onChange,
  selectOptions,
  selectOptionsDefaultLabel,
  tagOptions,
  placeholder,
  loading,
  required,
  readOnly,
  capitalize,
  type = 'text',
  inputRef,
}: {
  id: string
  label: string
  note?: string
  error?: string
  value: string
  onChange?: (value: string) => void
  selectOptions?: { value: string, label: string }[]
  selectOptionsDefaultLabel?: string
  tagOptions?: AnnotatedTag []
  placeholder?: string
  loading?: boolean
  required?: boolean
  readOnly?: boolean
  capitalize?: boolean
  type?: FieldSetType
  inputRef?: LegacyRef<HTMLInputElement>
}) {
  const { pending } = useFormStatus();

  return (
    <div className="space-y-1">
      <label
        className="flex gap-2 items-center select-none"
        htmlFor={id}
      >
        {label}
        {note && !error &&
          <span className="text-gray-400 dark:text-gray-600">
            ({note})
          </span>}
        {error &&
          <span className="text-error">
            {error}
          </span>}
        {required &&
          <span className="text-gray-400 dark:text-gray-600">
            Required
          </span>}
        {loading &&
          <span className="translate-y-[1.5px]">
            <Spinner />
          </span>}
      </label>
      {selectOptions
        ? <select
          id={id}
          name={id}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          className={clsx(
            'w-full',
            clsx(Boolean(error) && 'error'),
            // Use special class because `select` can't be readonly
            readOnly || pending && 'disabled-select',
          )}
        >
          {selectOptionsDefaultLabel &&
            <option value="">{selectOptionsDefaultLabel}</option>}
          {selectOptions.map(({ value: optionValue, label: optionLabel }) =>
            <option
              key={optionValue}
              value={optionValue}
            >
              {optionLabel}
            </option>)}
        </select>
        : tagOptions
          ? <TagInput
            name={id}
            value={value}
            options={tagOptions}
            onChange={onChange}
            className={clsx(Boolean(error) && 'error')}
            readOnly={readOnly || pending}
          />
          : <input
            ref={inputRef}
            id={id}
            name={id}
            value={value}
            checked={type === 'checkbox' ? value === 'true' : undefined}
            placeholder={placeholder}
            onChange={e => onChange?.(type === 'checkbox'
              ? e.target.value === 'true' ? 'false' : 'true'
              : e.target.value)}
            type={type}
            autoComplete="off"
            autoCapitalize={!capitalize ? 'off' : undefined}
            readOnly={readOnly || pending}
            className={clsx(
              type === 'text' && 'w-full',
              Boolean(error) && 'error',
            )}
          />}
    </div>
  );
};
