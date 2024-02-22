import { Container, LoadingPage } from '@/components';
import withAuth from '@/components/AuthHOC';
import Input from '@/components/Input';
import { AddNewLeadIcon, ArrowRight } from '@/icons';
import { Formik } from 'formik';
import { NextPage } from 'next';
import useNewLeadHook, { inititalValues, leadSchema } from './hook';

const NewLead: NextPage = () => {
  const { loading, onSubmitForm } = useNewLeadHook();
  
  return (
    <Container headTitle='Add new lead'>
      {loading && <LoadingPage />}
      <div className='flex flex-col'>
        <div className='w-full bg-white h-24 flex justify-center items-center'>
          <div className='w-auto'>
            <span className='text-cyan-800 text-[22px] xl:text-[25px] font-normal font-Poppins'>
              Health
            </span>
            <span className='text-cyan-800 text-[22px] xl:text-[25px] font-bold font-Poppins'>
              care{' '}
            </span>
            <span className='text-teal-500 text-[22px] xl:text-[25px] font-semibold font-Poppins'>
              Marketplace
            </span>
          </div>
        </div>
        <div className='bg-bgF6FAFD w-full h-[85vh] flex flex-col justify-center items-center gap-8'>
          <AddNewLeadIcon />
          <div>
            <p className='text-center text-[30px] font-normal text-[#35B0A4]'>
              Custom Health Plan Review
            </p>
            <p className='text-center font-light text-[#9CA3AF]'>
              Please input your information below
            </p>
          </div>
          <Formik
            validationSchema={leadSchema}
            initialValues={inititalValues}
            validateOnMount={false}
            onSubmit={onSubmitForm}
          >
            {(props) => {
              return (
                <form
                  className='w-[90%] md:w-[430px]'
                  onSubmit={props.handleSubmit}
                >
                  <div className='flex mt-4 2xl:mt-8 flex-row justify-center items-center relative'>
                    <Input
                      name='name'
                      type='text'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                      placeholder='What is your name?'
                    />
                  </div>

                  <div className='flex mt-4 2xl:mt-8 flex-row justify-center items-center relative'>
                    <Input
                      name='phone'
                      type='text'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.phone}
                      placeholder='What is a good phone number to reach you?'
                    />
                  </div>

                  <button
                    type='submit'
                    className='mt-6 hover:opacity-75 w-full bg-[#396589] rounded-lg h-10 2xl:h-12'
                  >
                    <p className='text-base font-normal text-white flex justify-center items-center gap-1'>
                      Submit <ArrowRight />
                    </p>
                  </button>
                  <div className="sm:hidden mt-8 w-[347.56px] text-gray-400 text-[8.12px] font-normal font-['Lexend Deca']">
                    Your privacy is our top priority. The Healthcare
                    Marketplace, ensures that the information you provide is
                    secure and solely used for identification and communication
                    with us. We employ advanced security measures to protect
                    your data and never share it with third parties. Your trust
                    in us as your healthcare partner is highly valued. If you
                    have any questions or concerns, please don't hesitate to
                    reach out to our in-house support team; we are here to
                    assist you.
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default withAuth(NewLead, 'all');
