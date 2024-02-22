import { ErrorMessage, ErrorMessageProps } from "formik";
import { FC } from "react"

interface IProps extends ErrorMessageProps {}

const ErrorMessageForm: FC<IProps> = ({ ...props }) => {
  return (
    <ErrorMessage {...props}>
      {(message: string) => <p className="mt-1 text-red-500 text-xs font-Poppins font-medium ">{message}</p>}
    </ErrorMessage>
  )
}

export default ErrorMessageForm;