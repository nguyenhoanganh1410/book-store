import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import useChangePassword, { initialValues, passwordSchema } from './hook';
import { Formik } from 'formik';
import Input from '@/components/Input';
import { LoadingPage } from '@/components';

export default function ModelChangePassword() {
  const {
    isOpen,
    showPassword,
    loading,
    closeModal,
    openModal,
    onSubmit,
    onToggleShowPassword,
  } = useChangePassword();
  return (
    <React.Fragment>
      { loading && <LoadingPage />}
      <div
        onClick={openModal}
        className='text-right text-teal-500 text-md 2xl:text-xl font-semibold font-Inter cursor-pointer hover:opacity-80'
      >
        CHANGE PASSWORD
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900 font-Inter'
                  >
                    Change Password
                  </Dialog.Title>
                  <Formik
                    validationSchema={passwordSchema}
                    initialValues={initialValues}
                    validateOnMount={false}
                    onSubmit={onSubmit}
                  >
                    {(props) => (
                      <form onSubmit={props.handleSubmit}>
                        <div className='mt-6'>
                          <div className='mb-6'>
                            <label
                              htmlFor='password'
                              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white font-Inter'
                            >
                              Current Password
                            </label>
                            <Input
                              name='currentPassword'
                              type={showPassword ? 'text' : 'password'}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.currentPassword}
                              placeholder='Current Password'
                              passwordField
                              onToggleShowPassword={onToggleShowPassword}
                              showPassword={showPassword}
                            />
                          </div>

                          <div className='mb-6'>
                            <label
                              htmlFor='password'
                              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white font-Inter'
                            >
                              New Password
                            </label>
                            <Input
                              name='password'
                              type={showPassword ? 'text' : 'password'}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.password}
                              placeholder='Password'
                              passwordField
                              onToggleShowPassword={onToggleShowPassword}
                              showPassword={showPassword}
                            />
                          </div>
                          <div className='mb-6'>
                            <label
                              htmlFor='confirm_password'
                              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white font-Inter'
                            >
                              Confirm password
                            </label>
                            <Input
                              name='confirmPassword'
                              type={showPassword ? 'text' : 'password'}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.confirmPassword}
                              placeholder='Password'
                              passwordField
                              onToggleShowPassword={onToggleShowPassword}
                              showPassword={showPassword}
                            />
                          </div>
                        </div>
                        <div className='mt-4'>
                          <button
                            type='submit'
                            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                            // onClick={closeModal}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </React.Fragment>
  );
}
