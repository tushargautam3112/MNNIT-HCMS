import otpGenerator from 'otp-generator'
import { OTPLength,OTPConfig } from '../Constants/Constants.js'

const generateOTP = () => {
    const OTP = otpGenerator.generate(OTPLength,OTPConfig)
    return OTP
}

export default generateOTP