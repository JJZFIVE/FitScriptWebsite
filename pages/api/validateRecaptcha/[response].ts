// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  success: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    console.log("Hello  ");
    if (req.method !== "GET") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
    }

    const RECAPTCHA_PRIVATE = process.env.RECAPTCHA_PRIVATE as string;
    const { response } = req.query;

    console.log("RECAPTCHA_PRIVATE: ", RECAPTCHA_PRIVATE);

    const verificationResponse = await axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_PRIVATE}&response=${response}`
      )
      .then((res) => res.data);
    console.log(verificationResponse);

    return verificationResponse.success
      ? res.status(200).json({ success: true })
      : res.status(400).json({ success: false, message: "Invalid captcha" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error verifying ReCAPTCHA",
    });
  }
}
