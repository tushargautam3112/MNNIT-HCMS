import SibApiV3Sdk from "sib-api-v3-sdk";
import { Status } from "../Constants/Constants.js";
import User from "../models/userModel.js";
import twilio from "twilio";

const sendEmail = async (complaintData) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    console.log("asjdjd", complaintData);
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    //Instantiate the client
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.EMAILER_API_KEY;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sender = {
      email: "ishaagarwal772000@gmail.com",
    };
    const createdByReciever = [{ email: complaintData.createdBy }];
    const usersData = await User.find({
      email: { $in: [complaintData.createdBy, complaintData.assignedTo] },
    }).lean();
    const userInfoMappingWithEmail = {};
    userInfoMappingWithEmail[usersData[0].email] = usersData[0];
    userInfoMappingWithEmail[usersData[1].email] = usersData[1];
    if (complaintData.status === Status.solved) {
      const htmlContent1 = ` <h3>Hey ${
        userInfoMappingWithEmail[complaintData.createdBy].firstName
      }</h3>
      <br> 
      <span>Your complaint is successfully solved by our worker.</span>
      <br>
      <h4>Regards</h4>
      <h2>HCMS</h2>`;
      await apiInstance.sendTransacEmail({
        sender,
        to: createdByReciever,
        subject: "HCMS - Complaint Info",
        htmlContent: htmlContent1,
      });
    } else if (complaintData.status === Status.assigned) {
      const htmlContent1 = `<h3>Hey ${
        userInfoMappingWithEmail[complaintData.createdBy].firstName
      }</h3>
      <br> 
      <span>Congratulations !! Your complaint has successfully been assigned!</span>
      <br>
      <span>Assigned Person info : </span>
      <span><b>Name : ${
        userInfoMappingWithEmail[complaintData.assignedTo].firstName
      }</b></span>
      <br>
      <span><b>Phone Number : ${
        userInfoMappingWithEmail[complaintData.assignedTo].phoneNumber
      }</b></span>
      <br>
      <span>OTP Assigned to your complaint is : <b>${
        complaintData.otpAssigned
      }</b>. 
      <br>
      Please share it with our worker only at the time he arrives.<span>
      <br>
      <h4>Regards</h4>
      <h2>HCMS</h2>`;
      await apiInstance.sendTransacEmail({
        sender,
        to: createdByReciever,
        subject: "HCMS - Complaint Info",
        htmlContent: htmlContent1,
      });
      const htmlContent2 = `<h3>Hey ${
        userInfoMappingWithEmail[complaintData.assignedTo].firstName
      }</h3>
      <br> 
      <span>You have been assigned an Complaint!</span>
      <br>
      <span>Complaint Person info : </span>
      <br>
      <span><b>Name :${
        userInfoMappingWithEmail[complaintData.createdBy].firstName
      } </b></span>
      <br>
      <span><b>Phone Number : ${
        userInfoMappingWithEmail[complaintData.createdBy].phoneNumber
      }</b></span>
      <br>
      <span><b>Address :${
        userInfoMappingWithEmail[complaintData.createdBy].address
      } </b></span>
      <br>
      <span>OTP Assigned to complaint is : <b>${
        complaintData.otpAssigned
      }</b>.<span>
      <br>
      <h4>Regards</h4>
      <h2>HCMS</h2>`;
      const recievers = [{ email: complaintData.assignedTo }];
      await apiInstance.sendTransacEmail({
        sender,
        to: recievers,
        subject: "HCMS - Complaint Info",
        htmlContent: htmlContent2,
      });
      const mobile = process.env.MOBILE;

      const WorkerSMS = `
      You have been assigned an Complaint! Name :${
        userInfoMappingWithEmail[complaintData.createdBy].firstName
      },Phone Number : ${
        userInfoMappingWithEmail[complaintData.createdBy].phoneNumber
      },  Address :${
        userInfoMappingWithEmail[complaintData.createdBy].address
      }. OTP Assigned to complaint is : ${complaintData.otpAssigned}
      `;
      await client.messages
        .create({
          body: WorkerSMS,
          from: "+13187025213",
          to: '+918955514233',
        })
        .then((message) => console.log(message.sid));
    }
  } catch (err) {
    console.log(err);
  }
};

export default sendEmail;
