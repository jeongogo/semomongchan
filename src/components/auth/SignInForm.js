import React, {useRef} from 'react'
import CustomInput from '../common/CustomInput'

function SignInForm({isSignUp, onSubmit, form, createChangeTextHandler}) {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
      <CustomInput
        hasMarginBottom
        placeholder='이메일'
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType='next'
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <CustomInput
        hasMarginBottom={isSignUp}
        placeholder='비밀번호'
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry
        ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPasswordRef.current.focus();
          } else {
            onSubmit();
          }
        }}
      />
      {isSignUp && (
        <CustomInput
          placeholder='비밀번호 확인'
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          secureTextEntry
          ref={confirmPasswordRef}
          returnKeyType='done'
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  )
}

export default SignInForm