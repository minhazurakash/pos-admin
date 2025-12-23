import { cn } from '@lib/utils/cn';
import { Button, Form, FormInstance } from 'antd';
import React, { useState } from 'react';

interface Step {
  label: string;
  content: React.ReactNode;
}

interface IProps {
  className?: string;
  formType?: 'create' | 'update';
  formInstance: FormInstance;
  initialValues?: any;
  isLoading: boolean;
  steps: Step[];
  onSubmit: (values: any) => void;
}

const MultiStepForm: React.FC<IProps> = ({
  className,
  formType = 'create',
  formInstance,
  initialValues,
  isLoading,
  steps,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [persist, setPersist] = useState<Record<string, any>>(initialValues || {});

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handlePrevFn = () => {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  };

  const handleNextFn = async () => {
    try {
      const currentValues = await formInstance.validateFields();

      setPersist((prev) => ({ ...prev, ...currentValues }));
      setCurrentStep((prev) => prev + 1);

      formInstance.setFieldsValue({ ...persist, ...currentValues });
    } catch (error) {
      console.info(error);
    }
  };

  const handleFinishFn = async () => {
    try {
      const lastStepValues = await formInstance.validateFields();
      const purifiedValues = { ...persist, ...lastStepValues };

      onSubmit(purifiedValues);
    } catch (error) {
      console.info(error);
    }
  };

  return (
    <div className={cn(className, 'space-y-6')}>
      <div className="flex justify-between gap-4 overflow-x-auto md:gap-2">
        {steps.map((step, idx) => (
          <div key={idx} className="flex-1 text-center">
            <div
              className={cn(
                'mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white',
                idx === currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700',
              )}
            >
              {idx + 1}
            </div>
            <p className={cn('text-sm', idx === currentStep ? 'font-semibold' : 'text-gray-500')}>{step.label}</p>
          </div>
        ))}
      </div>
      <Form form={formInstance} layout="vertical" size="large" initialValues={initialValues} onFinish={handleFinishFn}>
        <div>{steps[currentStep].content}</div>
        <div className="mt-4 flex justify-between border-t pt-4">
          <Button onClick={handlePrevFn} disabled={isFirstStep}>
            Back
          </Button>
          {isLastStep ? (
            <Button key="submit" type="primary" htmlType="submit" loading={isLoading}>
              {formType === 'create' ? 'Submit' : 'Update'}
            </Button>
          ) : (
            <Button key="next" type="primary" onClick={handleNextFn}>
              Next
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default MultiStepForm;
