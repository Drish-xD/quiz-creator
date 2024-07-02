'use client';

import {
  AuthOptions,
  BatchOptions,
  GradeOptions,
  GroupOptions,
  SessionTypeOptions,
  TestPlatformOptions,
} from '@/Constants';
import { FormBuilder } from '@/components/FormBuilder';
import { useFormContext } from '@/hooks/useFormContext';
import { setGroupDefaults } from '@/lib/utils';
import {
  FieldSchema,
  Session,
  SessionParams,
  SessionType,
  Steps,
  basicFields,
  basicSchema,
} from '@/types';
import { useParams } from 'next/navigation';
import { useCallback, useMemo, type FC } from 'react';

const BasicForm: FC = () => {
  const { type } = useParams<SessionParams>();
  const { formData, updateFormData } = useFormContext();

  const fieldsSchema: FieldSchema<basicFields> = useMemo(
    () => ({
      group: {
        type: 'select',
        options: GroupOptions,
        placeholder: 'Select a group',
        label: 'Group',
        disabled: type === SessionType.EDIT,
        setValueOnChange: (form) => setGroupDefaults(form, formData, updateFormData),
      },
      batch: {
        type: 'select',
        options: BatchOptions,
        placeholder: 'Select a batch',
        label: 'Batch',
        disabled: type === SessionType.EDIT,
      },
      grade: {
        type: 'select',
        options: GradeOptions,
        placeholder: 'Select a grade',
        label: 'Grade',
      },
      sessionType: {
        type: 'select',
        options: SessionTypeOptions,
        placeholder: 'Select a session type',
        label: 'Session Type',
      },
      authType: {
        type: 'select',
        options: AuthOptions,
        label: 'Auth Type',
        placeholder: 'Select an auth type',
      },
      activateSignUp: {
        type: 'switch',
        label: 'Activate Sign Up',
        helperText: 'Do you want to display sign up form?',
      },
      isPopupForm: {
        type: 'switch',
        label: 'Is Popup Form Allowed',
        helperText: 'Do you want to display popup form?',
      },
      noOfFieldsInPopup: {
        type: 'number',
        label: 'No Of Fields In Popup',
        placeholder: 'Enter no of fields in popup',
        min: 0,
        step: 1,
      },
      isRedirection: {
        type: 'switch',
        label: 'Is Redirection allowed?',
        helperText: 'Do you want to allow redirection?',
      },
      isIdGeneration: {
        type: 'switch',
        label: 'Is ID Generation allowed?',
        helperText: 'Do you want to generate IDs?',
      },
      signupFormName: {
        type: 'text',
        label: 'Signup Form Name',
        placeholder: 'Enter form name',
      },
      platform: {
        type: 'select',
        options: TestPlatformOptions,
        placeholder: 'Select a platform',
        label: 'Platform',
        disabled: type === SessionType.EDIT,
      },
    }),
    []
  );

  const defaultValues: Partial<basicFields> = useMemo(
    () => ({
      group: formData?.meta_data?.group,
      batch: formData?.meta_data?.batch,
      grade: formData?.meta_data?.grade,
      authType: formData?.auth_type,
      activateSignUp: formData?.signup_form,
      isPopupForm: formData?.popup_form,
      noOfFieldsInPopup: formData?.meta_data?.number_of_fields_in_popup_form
        ? Number(formData?.meta_data?.number_of_fields_in_popup_form)
        : '',
      isRedirection: formData?.redirection,
      isIdGeneration: formData?.id_generation,
      platform: formData?.platform,
      sessionType: formData?.type,
      signupFormName: formData?.meta_data?.signup_form_name,
    }),
    [formData]
  );

  const onSubmit = useCallback((data: basicFields) => {
    const addedData: Session = {
      meta_data: {
        ...(formData.meta_data ?? {}),
        group: data.group,
        batch: data.batch,
        grade: data.grade,
        number_of_fields_in_popup_form: data.noOfFieldsInPopup ?? '',
        signup_form_name: data.signupFormName ?? '',
      },
      auth_type: data.authType,
      signup_form: data.activateSignUp,
      popup_form: data.isPopupForm,
      redirection: data.isRedirection,
      id_generation: data.isIdGeneration,
      platform: data.platform,
      type: data.sessionType,
    };
    updateFormData(addedData, Steps.PLATFORM);
  }, []);

  return (
    <FormBuilder
      formSchema={fieldsSchema}
      zodSchema={basicSchema}
      defaultValues={defaultValues}
      handleSubmit={onSubmit}
    />
  );
};

export default BasicForm;
