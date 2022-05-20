import s from './PasswordInput.module.css';

import cn from 'classnames';

import { LockClosedIcon } from 'components/icons';
import { FC, useImperativeHandle, useState, forwardRef, Ref } from 'react';
import { Input } from '../../ui/Input';
import { Text } from '../../ui/Text';

const PasswordInput = (props: any, ref: Ref<any>) => {
  const [password, setPassword] = useState<string>('');
  const [isValidPassword, setIsValidPassword] = useState(false);

  const validate = () => {
    setIsValidPassword(password.length >= 8);
  };

  const handlePasswordInput = (e: any) => {
    setPassword(e.target.value);
    validate();
  };

  useImperativeHandle(ref, () => ({
    value: password
  }));

  return (
    <>
      <div className={s.root}>
        <Text className={s.label} clean>
          Password
        </Text>

        <Input
          className={cn(s.input, {
            [s.invalid]: password.length > 0 && !isValidPassword
          })}
          onChange={handlePasswordInput}
          ref={ref}
          type="password"
          name="password"
          {...props}
        />

        <LockClosedIcon className={s.icon} />
      </div>
    </>
  );
};

export default forwardRef(PasswordInput);
