//Email
export function tempEmailCreateNewAcc(obj: any) {
  return ` <p>Dear You.</p>
      <p>You have been create successfully account App-Chat:</p>
      <p>Email.: ${obj.email} </p>
      <p>Account: ${obj.account_name}</p>
      <p>Phone: ${obj.phone_number}</p>
      <p>Create_at: ${new Date().toDateString()} </p>
      <br/>
      <p>Please click on <a href="http://localhost:3000/login">this link.</a> to login.</p>
      <p>Thank you.</p>
      <p>&nbsp;</p>
      <p>Note: This is an auto generated email. Do not reply this email.</p>
 `;
}

export function tempEmailReCoveryPass(obj: any) {
  return ` <p>Dear You.</p>
      <p>You have been recovery successfully account App-Chat:</p>
      <p>Email.: ${obj.email} </p>
      <p>Create_at: ${new Date().toDateString()} </p>
      <br/>
      <p>Please click on <a href="http://localhost:3000/login">this link.</a> to login.</p>
      <p>Thank you.</p>
      <p>&nbsp;</p>
      <p>Note: This is an auto generated email. Do not reply this email.</p>
 `;
} 