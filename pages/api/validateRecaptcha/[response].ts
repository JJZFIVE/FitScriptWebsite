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
    if (req.method !== "GET") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
    }

    const RECAPTCHA_PRIVATE = process.env.RECAPTCHA_PRIVATE as string;
    const { response } = req.query;

    const verificationResponse = await axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_PRIVATE}&response=${response}`
      )
      .then((res) => res.data);

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
